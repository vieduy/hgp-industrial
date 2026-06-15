// Partner logos. Until real logo files are dropped into
// `frontend/public/partners/`, the <img> will fail to load and we fall back to
// showing the brand name as a styled wordmark.
//
// variant="marquee" renders an infinite horizontal scrolling strip (the list
// is duplicated so the loop is seamless); the default is a static grid.
function Item({ p }) {
  return (
    <div className="partner-grid__item" title={p.name}>
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
  );
}

export default function PartnerGrid({ partners, variant = "grid" }) {
  const list = partners ?? [];

  if (variant === "marquee") {
    return (
      <div className="partner-marquee">
        <div className="partner-marquee__track">
          {[...list, ...list].map((p, i) => (
            <Item p={p} key={`${p.name}-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="partner-grid">
      {list.map((p) => (
        <Item p={p} key={p.name} />
      ))}
    </div>
  );
}
