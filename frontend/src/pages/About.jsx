import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import PartnerGrid from "../components/PartnerGrid.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";

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
          <SectionTitle eyebrow="HGP" title={tr("about_activities")} />
          <div className="grid grid-3">
            {about?.business_activities?.map((a, i) => (
              <div className="card activity" key={i}>
                <h3>{tr(a.title)}</h3>
                <p>{tr(a.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="section section--soft">
        <div className="container grid grid-2 vm">
          <div className="card vm__card">
            <div className="eyebrow">{tr("about_vision")}</div>
            <p className="vm__text">{tr(about?.vision)}</p>
          </div>
          <div className="card vm__card">
            <div className="eyebrow">{tr("about_mission")}</div>
            <ul className="vm__list">
              {about?.mission?.map((m, i) => (
                <li key={i}>{tr(m)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="HGP" title={tr("about_values")} center />
          <div className="grid grid-2 values">
            {about?.core_values?.map((v) => (
              <div className="value" key={v.key}>
                <h3>{v.key}</h3>
                <p>{tr(v.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section section--soft">
        <div className="container">
          <SectionTitle eyebrow="HGP" title={tr("home_partners")} center />
          <PartnerGrid partners={partners} />
        </div>
      </section>

      {/* Projects */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="HGP" title={tr("home_projects")} center />
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section--ink contact">
        <div className="container">
          <SectionTitle eyebrow="HGP INDUSTRIAL" title={tr("contact_title")} />
          {c && (
            <div className="contact__grid">
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
            </div>
          )}
          <p className="contact__thanks">{tr(about?.thank_you)}</p>
        </div>
      </section>
    </>
  );
}
