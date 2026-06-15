// Brand mark + wordmark. The eagle mark is the real HGP logo at
// `frontend/public/logo.png`. `light` switches the wordmark colour for use on
// dark backgrounds (e.g. the footer).
export default function Logo({ size = 40, light = false }) {
  const word = light ? "#f7f0dc" : "#2b2622";
  return (
    <span className="logo">
      <img
        className="logo__mark"
        src="/logo.png"
        alt="HGP Industrial"
        width={size}
        height={size}
      />
      <span className="logo__word" style={{ color: word }}>
        HGP
        <small>INDUSTRIAL</small>
      </span>
    </span>
  );
}
