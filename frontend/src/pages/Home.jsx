import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import PartnerGrid from "../components/PartnerGrid.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";

const OFFERING_ICONS = ["🛡️", "🔩", "🔥"];

export default function Home() {
  const { tr } = useI18n();
  const { data: company } = useApi(api.company);
  const { data: catalogue } = useApi(api.catalogue);
  const { data: partners } = useApi(api.partners);
  const { data: projects } = useApi(api.projects);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__inner">
          <div className="eyebrow hero__eyebrow">HGP INDUSTRIAL CO., LTD</div>
          <h1 className="hero__title">THINK BIG, GO FAR</h1>
          <p className="hero__sub">{tr(company?.subtitle)}</p>
          <p className="hero__intro">{tr(company?.intro)}</p>
          <div className="hero__actions">
            <Link to="/catalogue" className="btn btn--primary">
              {tr("hero_cta_catalogue")}
            </Link>
            <a href="/about#contact" className="btn btn--ghost">
              {tr("hero_cta_contact")}
            </a>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="HGP INDUSTRIAL"
            title={tr("home_focus")}
            center
          />
          <div className="grid grid-2 focus-grid">
            {company?.focus?.map((f, i) => (
              <div className="focus-item" key={i}>
                <span className="focus-item__num">0{i + 1}</span>
                <p>{tr(f)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="section section--soft">
        <div className="container">
          <SectionTitle
            eyebrow={tr("home_offerings")}
            title={tr("nav_catalogue")}
            center
          />
          <div className="grid grid-3">
            {catalogue?.map((cat, i) => (
              <div className="offering card" key={cat.id}>
                <div className="offering__icon">{OFFERING_ICONS[i]}</div>
                <h3>{tr(cat.title)}</h3>
                <p>{tr(cat.tagline)}</p>
                <Link to="/catalogue" className="offering__link">
                  {tr("learn_more")} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="HGP" title={tr("home_partners")} center />
          <PartnerGrid partners={partners} />
        </div>
      </section>

      {/* Projects */}
      <section className="section section--soft">
        <div className="container">
          <SectionTitle
            eyebrow="HGP"
            title={tr("home_projects")}
            center
          />
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* Commitment band */}
      <section className="section section--ink commitment">
        <div className="container">
          <SectionTitle eyebrow="HGP" title={tr("home_commitment")} center />
          <div className="commitment__row">
            {company?.commitment?.map((c, i) => (
              <div className="commitment__item" key={i}>
                <span>✓</span>
                {tr(c)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
