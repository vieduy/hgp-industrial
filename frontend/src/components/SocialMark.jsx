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
};

export default function SocialMark({ name }) {
  return MARKS[name] ?? null;
}
