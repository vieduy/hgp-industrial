// Brand mark + wordmark. The eagle mark is an inline SVG placeholder styled in
// the brand rust colour. To use the real logo, drop `logo.svg`/`logo.png` into
// `frontend/public/` and swap the <svg> below for an <img src="/logo.svg" />.
export default function Logo({ size = 38, light = false }) {
  const word = light ? "#f7f0dc" : "#2b2622";
  return (
    <span className="logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-hidden="true"
        role="img"
      >
        <circle cx="32" cy="32" r="30" fill="#c0411f" />
        <path
          d="M20 22c6-4 14-3 18 2 3 3 4 7 3 11l-5-3c1-3-1-6-4-7-4-2-9-1-12 2l-2-1z"
          fill="#fff"
        />
        <path
          d="M44 26c2 4 1 9-2 12-4 4-10 5-15 3 4 0 8-2 10-5 2-2 3-5 2-8l5-2z"
          fill="#f7f0dc"
        />
        <circle cx="26" cy="27" r="2.2" fill="#2b2622" />
      </svg>
      <span className="logo__word" style={{ color: word }}>
        HGP
        <small>INDUSTRIAL</small>
      </span>
    </span>
  );
}
