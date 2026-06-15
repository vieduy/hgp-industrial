// Partner logos. Until real logo files are dropped into
// `frontend/public/partners/`, the <img> will fail to load and we fall back to
// showing the brand name as a styled wordmark.
export default function PartnerGrid({ partners }) {
  return (
    <div className="partner-grid">
      {(partners ?? []).map((p) => (
        <div className="partner-grid__item" key={p.name} title={p.name}>
          <img
            src={p.logo}
            alt={p.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "block";
            }}
          />
          <span className="partner-grid__name">{p.name}</span>
        </div>
      ))}
    </div>
  );
}
