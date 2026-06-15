import { useI18n } from "../i18n.jsx";

// Renders a spec table from the API shape:
//   { title, columns: [bilingual], rows: [[cell, ...]] }
// Cells may be plain strings or bilingual { vi, en } objects.
export default function SpecTable({ table }) {
  const { tr } = useI18n();
  if (!table) return null;
  return (
    <div className="spec-block">
      {table.title && <h4 className="spec-block__title">{tr(table.title)}</h4>}
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
                <td key={ci}>{tr(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
