import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import PartnerGrid from "../components/PartnerGrid.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  Telescope,
  Target,
  Award,
  Briefcase,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// Business activities (content order): consulting, building materials, coatings
const ACTIVITY_IMAGES = [
  "/visualization/act-consulting.jpg",
  "/visualization/act-materials.jpg",
  "/visualization/act-coating.jpg",
];
// Core values (content order): QUALITY, PROFESSIONAL, TRUST, DEVELOPMENT
const VALUE_ICONS = [Award, Briefcase, ShieldCheck, TrendingUp];

export default function About() {
  const { tr } = useI18n();
  const { hash } = useLocation();
  const { data: company } = useApi(api.company);
  const { data: about } = useApi(api.about);
  const { data: partners } = useApi(api.partners);
  const { data: projects } = useApi(api.projects);

  // Scroll to #contact (etc.) once content has rendered.
  useEffect(() => {
    if (hash && about) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash, about]);

  const c = company?.contact;

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <SectionTitle
            eyebrow="HGP INDUSTRIAL"
            title={tr("about_title")}
            lead={tr(company?.intro)}
          />
        </div>
      </section>

      {/* Business activities */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("about_activities")} />
          </Reveal>
          <div className="grid grid-3">
            {about?.business_activities?.map((a, i) => (
              <Reveal as="div" key={i} delay={i * 90} className="activity">
                <div className="activity__media">
                  <img src={ACTIVITY_IMAGES[i]} alt="" loading="lazy" />
                </div>
                <div className="activity__body">
                  <h3>{tr(a.title)}</h3>
                  <p>{tr(a.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="section section--soft">
        <div className="container grid grid-2 vm">
          <Reveal as="div" className="vm__card">
            <span className="medallion medallion--lg">
              <Telescope size={28} strokeWidth={1.9} />
            </span>
            <div className="eyebrow">{tr("about_vision")}</div>
            <p className="vm__text">{tr(about?.vision)}</p>
          </Reveal>
          <Reveal as="div" delay={100} className="vm__card">
            <span className="medallion medallion--lg">
              <Target size={28} strokeWidth={1.9} />
            </span>
            <div className="eyebrow">{tr("about_mission")}</div>
            <ul className="vm__list">
              {about?.mission?.map((m, i) => (
                <li key={i}>{tr(m)}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("about_values")} center />
          </Reveal>
          <div className="grid grid-2 values">
            {about?.core_values?.map((v, i) => {
              const ValIcon = VALUE_ICONS[i];
              return (
                <Reveal as="div" key={v.key} delay={i * 80} className="value">
                  <span className="medallion">
                    {ValIcon && <ValIcon size={26} strokeWidth={1.9} />}
                  </span>
                  <div className="value__body">
                    <h3>{v.key}</h3>
                    <p>{tr(v.text)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section section--soft">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("home_partners")} center />
          </Reveal>
          <Reveal>
            <PartnerGrid partners={partners} />
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("home_projects")} center />
          </Reveal>
          <Reveal>
            <ProjectGrid projects={projects} />
          </Reveal>
        </div>
      </section>

      {/* Contact — dark panel on a light section, separate from the footer */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="contact__panel">
            <Reveal>
              <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("contact_title")} />
            </Reveal>
            {c && (
              <Reveal as="div" className="contact__grid">
                <dl className="contact__info">
                <div>
                  <dt>{tr("contact_tax")}</dt>
                  <dd>{c.tax_code}</dd>
                </div>
                <div>
                  <dt>{tr("contact_hotline")}</dt>
                  <dd>
                    <a href={`tel:${c.hotline.replace(/\s/g, "")}`}>
                      {c.hotline}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{tr("contact_email")}</dt>
                  <dd>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>{tr("contact_website")}</dt>
                  <dd>
                    <a
                      href={`https://${c.website}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {c.website}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{tr("contact_address")}</dt>
                  <dd>{tr(c.address)}</dd>
                </div>
              </dl>
              <a
                className="btn btn--primary contact__map"
                href={c.maps_url}
                target="_blank"
                rel="noreferrer"
              >
                📍 {tr("contact_map")}
              </a>
            </Reveal>
            )}
            <p className="contact__thanks">{tr(about?.thank_you)}</p>
          </div>
        </div>
      </section>
    </>
  );
}
