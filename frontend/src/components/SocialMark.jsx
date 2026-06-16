// Monochrome brand marks for the header utility bar. They render in
// `currentColor` so the surrounding button controls their colour and hover
// state, keeping the bar cohesive with the brand palette.
const MARKS = {
  zalo: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontFamily="var(--head), Arial, sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Zalo
      </text>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.4 4.5h-2.2c-2 0-3.4 1.3-3.4 3.6v1.9H7.4v2.8h2.4V21h2.9v-8.2h2.3l.4-2.8h-2.7V8.5c0-.8.3-1.3 1.3-1.3h1.4z"
      />
    </svg>
  ),
};

export default function SocialMark({ name }) {
  return MARKS[name] ?? null;
}
