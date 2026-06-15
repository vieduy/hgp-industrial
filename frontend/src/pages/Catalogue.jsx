import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import SpecTable from "../components/SpecTable.jsx";

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

function Category({ cat, index }) {
  const { tr } = useI18n();
  return (
    <section
      id={cat.id}
      className={`catcat ${index % 2 ? "section--soft" : ""}`}
    >
      <div className="container">
        <div className="catcat__head">
          <span className="catcat__num">0{index + 1}</span>
          <div>
            <h2 className="section-title">{tr(cat.title)}</h2>
            <p className="catcat__tagline">{tr(cat.tagline)}</p>
          </div>
        </div>

        <p className="lead">{tr(cat.intro)}</p>

        {cat.standard && (
          <div className="standard-badge">
            <span className="standard-badge__label">{tr("cat_standard")}</span>
            <strong>{cat.standard}</strong>
            <span className="standard-badge__note">
              {tr(cat.standard_note)}
            </span>
          </div>
        )}

        {cat.steps && (
          <div className="steps">
            {cat.steps.map((s, i) => (
              <div className="steps__item" key={i}>
                <span className="steps__num">{i + 1}</span>
                {tr(s)}
              </div>
            ))}
          </div>
        )}

        {cat.fire_ratings && (
          <div className="ratings">
            <h4>{tr("cat_fire_ratings")}</h4>
            <div>
              {cat.fire_ratings.map((r) => (
                <span className="chip chip--rust" key={r}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {cat.tables?.map((tbl, i) => (
          <SpecTable key={i} table={tbl} />
        ))}

        {cat.solution && (
          <div className="bullets">
            <h4>{tr("cat_solution")}</h4>
            <ul>
              {cat.solution.map((s, i) => (
                <li key={i}>{tr(s)}</li>
              ))}
            </ul>
          </div>
        )}

        {cat.services && (
          <div className="bullets">
            <h4>{tr("cat_services")}</h4>
            <ul>
              {cat.services.map((s, i) => (
                <li key={i}>{tr(s)}</li>
              ))}
            </ul>
          </div>
        )}

        {cat.brands && (
          <div className="brands">
            <h4>{tr("cat_brands")}</h4>
            <div>
              {cat.brands.map((b) => (
                <span className="chip" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        <WhyHgp items={cat.why_hgp} />

        {cat.slogan && <p className="catcat__slogan">{tr(cat.slogan)}</p>}
      </div>
    </section>
  );
}

export default function Catalogue() {
  const { tr } = useI18n();
  const { data: catalogue, loading } = useApi(api.catalogue);

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <SectionTitle
            eyebrow="HGP INDUSTRIAL"
            title={tr("cat_title")}
            lead={tr("cat_intro")}
          />
          {catalogue && (
            <nav className="cat-jump">
              {catalogue.map((c) => (
                <a key={c.id} href={`#${c.id}`} className="chip">
                  {tr(c.title)}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>

      {loading && (
        <div className="container" style={{ padding: "40px 24px" }}>
          …
        </div>
      )}

      {catalogue?.map((cat, i) => (
        <Category key={cat.id} cat={cat} index={i} />
      ))}
    </>
  );
}
