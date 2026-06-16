import { useI18n } from "../i18n.jsx";

// Renders a single cell. A cell may be a plain string, a bilingual
// { vi, en } object, or an array of those — arrays stack as lines.
function Cell({ value, tr }) {
  if (Array.isArray(value)) {
    return (
      <div className="spec-cell-list">
        {value.map((v, i) => (
          <span key={i}>{tr(v)}</span>
        ))}
      </div>
    );
  }
  return tr(value);
}

// Renders a spec table from the API shape:
//   { title, columns: [bilingual], rows: [[cell, ...]], image? }
// Cells may be plain strings, bilingual { vi, en } objects, or arrays.
// When `image` is set, the table is narrowed to the left and the
// illustrative image is rendered on the right.
export default function SpecTable({ table }) {
  const { tr } = useI18n();
  if (!table) return null;
  return (
    <div className={`spec-block ${table.image ? "spec-block--with-image" : ""}`}>
      {table.title && <h4 className="spec-block__title">{tr(table.title)}</h4>}
      <div className="spec-block__body">
        <div className="spec-block__table">
          <table className="spec-table">
            <thead>
              <tr>
                {table.columns.map((col, i) => (
                  <th key={i}>{tr(col)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>
                      <Cell value={cell} tr={tr} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {table.image && (
          <div className="spec-block__media">
            <img
              src={table.image}
              alt={tr(table.title)}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.closest(".spec-block__media").style.display =
                  "none";
              }}
            />
          </div>
        )}
      </div>
      {table.gallery?.length > 0 && (
        <div className="spec-gallery">
          {table.gallery.map((g, i) => (
            <div className="spec-gallery__cell" key={i}>
              <div className="spec-gallery__name">{tr(g.label)}</div>
              <div className="spec-gallery__media">
                <img
                  src={g.image}
                  alt={tr(g.label)}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
