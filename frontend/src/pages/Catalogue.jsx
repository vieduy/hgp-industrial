import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import SpecTable from "../components/SpecTable.jsx";
import Reveal from "../components/Reveal.jsx";
import { PaintRoller, Wrench, FireExtinguisher } from "lucide-react";

// Clean line icons per product line (color follows the tab state via currentColor).
const TAB_ICONS = {
  "protective-coatings": PaintRoller,
  fasteners: Wrench,
  fireproofing: FireExtinguisher,
};

// Map brand name -> logo file (used to render the catalogue "brands table").
const BRAND_LOGOS = {
  JOTUN: "/partners/jotun.png",
  AKZONOBEL: "/partners/akzonobel.png",
  NIPPON: "/partners/nippon.png",
  SEAMASTER: "/partners/seamaster.png",
  SAMHWA: "/partners/samhwa.png",
  DESAM: "/partners/desam.png",
  "KCC PAINT": "/partners/kcc.png",
};

function WhyHgp({ items }) {
  const { tr } = useI18n();
  if (!items?.length) return null;
  return (
    <div className="why-hgp">
      <h4>{tr("why_hgp")}</h4>
      <div className="why-hgp__items">
        {items.map((w, i) => (
          <span className="chip chip--rust" key={i}>
            ✓ {tr(w)}
          </span>
        ))}
      </div>
    </div>
  );
}

function CategoryPanel({ cat }) {
  const { tr } = useI18n();
  return (
    <div className="catpanel" key={cat.id}>
      <Reveal>
        <p className="lead catpanel__lead">{tr(cat.intro)}</p>
      </Reveal>

      {cat.standard && (
        <Reveal as="div" className="standard-badge">
          <span className="standard-badge__label">{tr("cat_standard")}</span>
          <strong>{cat.standard}</strong>
          <span className="standard-badge__note">{tr(cat.standard_note)}</span>
        </Reveal>
      )}

      {cat.steps && (
        <Reveal as="div" className="steps">
          {cat.steps.map((s, i) => (
            <div className="steps__item" key={i}>
              <span className="steps__num">{i + 1}</span>
              {tr(s)}
            </div>
          ))}
        </Reveal>
      )}

      {cat.fire_ratings && (
        <Reveal as="div" className="ratings">
          <h4>{tr("cat_fire_ratings")}</h4>
          <div>
            {cat.fire_ratings.map((r) => (
              <span className="chip chip--rust ratings__chip" key={r}>
                {r}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      {cat.tables?.map((tbl, i) => (
        <Reveal key={i} delay={i * 60}>
          <SpecTable table={tbl} />
        </Reveal>
      ))}

      {cat.solution && (
        <Reveal as="div" className="bullets">
          <h4>{tr("cat_solution")}</h4>
          <ul>
            {cat.solution.map((s, i) => (
              <li key={i}>{tr(s)}</li>
            ))}
          </ul>
        </Reveal>
      )}

      {cat.services && (
        <Reveal as="div" className="bullets">
          <h4>{tr("cat_services")}</h4>
          <ul>
            {cat.services.map((s, i) => (
              <li key={i}>{tr(s)}</li>
            ))}
          </ul>
        </Reveal>
      )}

      {cat.brands && (
        <Reveal as="div" className="brands">
          <h4>{tr("cat_brands")}</h4>
          <div className="brand-grid">
            {cat.brands.map((b) => {
              const logo = BRAND_LOGOS[b.toUpperCase()];
              return (
                <div className="brand-cell" key={b}>
                  <div className="brand-cell__name">{b}</div>
                  <div className="brand-cell__logo">
                    {logo && (
                      <img
                        src={logo}
                        alt={b}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.visibility = "hidden";
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      )}

      <Reveal>
        <WhyHgp items={cat.why_hgp} />
      </Reveal>

      {cat.slogan && (
        <Reveal>
          <p className="catcat__slogan">{tr(cat.slogan)}</p>
        </Reveal>
      )}
    </div>
  );
}

export default function Catalogue() {
  const { tr } = useI18n();
  const { hash } = useLocation();
  const { data: catalogue } = useApi(api.catalogue);
  const [active, setActive] = useState(0);

  // Deep link: /catalogue#fasteners selects that tab.
  useEffect(() => {
    if (!catalogue || !hash) return;
    const idx = catalogue.findIndex((c) => `#${c.id}` === hash);
    if (idx >= 0) setActive(idx);
  }, [catalogue, hash]);

  const cat = catalogue?.[active];

  return (
    <>
      <section className="pagehead pagehead--cat">
        <div className="container">
          <SectionTitle
            eyebrow="HGP INDUSTRIAL"
            title={tr("cat_title")}
            lead={tr("cat_intro")}
          />
        </div>
      </section>

      {/* Sticky tab bar */}
      <div className="cat-tabs">
        <div className="container cat-tabs__inner">
          {catalogue?.map((c, i) => {
            const TabIcon = TAB_ICONS[c.id];
            return (
              <button
                key={c.id}
                className={`cat-tab ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="cat-tab__icon">
                  {TabIcon && <TabIcon size={20} strokeWidth={1.9} />}
                </span>
                <span className="cat-tab__label">{tr(c.title)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {cat && (
        <section className="section catpanel-wrap">
          <div className="container">
            <div className="catpanel__head">
              <span className="catpanel__num">
                0{active + 1}
                <em>/0{catalogue.length}</em>
              </span>
              <div>
                <h2 className="section-title">{tr(cat.title)}</h2>
                <p className="catpanel__tagline">{tr(cat.tagline)}</p>
              </div>
            </div>
            {/* keyed so the panel re-mounts (and re-animates) on tab change */}
            <CategoryPanel cat={cat} key={cat.id} />
          </div>
        </section>
      )}
    </>
  );
}
