import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import PartnerGrid from "../components/PartnerGrid.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import Stats from "../components/Stats.jsx";
import Icon from "../components/Icon.jsx";

// Focus items (content order): building materials, coatings, finishing, supply.
const FOCUS_IMAGES = [
  "/visualization/building-material.png",
  "/visualization/paint.png",
  "/visualization/finish-material.png",
  "/visualization/supply-chain.png",
];
// Offerings (catalogue order): coatings, fasteners, fireproofing.
const OFFER_ICONS = ["shield", "bolt", "flame"];

export default function Home() {
  const { tr } = useI18n();
  const { data: company } = useApi(api.company);
  const { data: catalogue } = useApi(api.catalogue);
  const { data: partners } = useApi(api.partners);
  const { data: projects } = useApi(api.projects);

  return (
    <>
      {/* Cinematic hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="eyebrow hero__eyebrow">HGP INDUSTRIAL CO., LTD</div>
          <h1 className="hero__title">
            THINK BIG,<br />
            <span className="hero__title-accent">GO FAR</span>
          </h1>
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
        <a href="#focus" className="hero__scroll" aria-label="Scroll down">
          <span />
        </a>
      </section>

      {/* Stats band */}
      <section className="section--ink stats-band">
        <div className="container">
          <Stats stats={company?.stats} />
        </div>
      </section>

      {/* Focus areas */}
      <section className="section" id="focus">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="HGP INDUSTRIAL"
              title={tr("home_focus")}
              center
            />
          </Reveal>
          <div className="focus-grid">
            {company?.focus?.map((f, i) => (
              <Reveal as="article" key={i} delay={i * 90} className="focus-card">
                <img
                  className="focus-card__img"
                  src={FOCUS_IMAGES[i]}
                  alt=""
                  loading="lazy"
                />
                <div className="focus-card__overlay">
                  <span className="focus-card__num">0{i + 1}</span>
                  <p className="focus-card__text">{tr(f)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="section section--soft offer-section">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow={tr("home_offerings")}
              title={tr("nav_catalogue")}
              center
            />
          </Reveal>
          <div className="offer-grid">
            {catalogue?.map((cat, i) => (
              <Reveal as="article" key={cat.id} delay={i * 110} className="offer-card">
                <Link to={`/catalogue#${cat.id}`} className="offer-card__link">
                  <span className="offer-card__num">0{i + 1}</span>
                  <span className="offer-card__icon">
                    <Icon name={OFFER_ICONS[i]} size={32} />
                  </span>
                  <h3 className="offer-card__title">{tr(cat.title)}</h3>
                  <p className="offer-card__tagline">{tr(cat.tagline)}</p>
                  {cat.badge && (
                    <span className="offer-card__badge">{cat.badge}</span>
                  )}
                  <span className="offer-card__cta">
                    {tr("learn_more")} <em>→</em>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners — marquee */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("home_partners")} center />
          </Reveal>
        </div>
        <Reveal>
          <PartnerGrid partners={partners} variant="marquee" />
        </Reveal>
      </section>

      {/* Projects */}
      <section className="section section--soft">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("home_projects")} center />
          </Reveal>
          <Reveal>
            <ProjectGrid projects={projects} />
          </Reveal>
        </div>
      </section>

      {/* Commitment band */}
      <section className="section section--ink commitment">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("home_commitment")} center />
          </Reveal>
          <div className="commitment__row">
            {company?.commitment?.map((c, i) => (
              <Reveal as="div" key={i} delay={i * 70} className="commitment__item">
                <span>✓</span>
                {tr(c)}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
