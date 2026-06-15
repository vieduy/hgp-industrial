// Lightweight inline line-icon set (stroke = currentColor). Keeps the bundle
// dependency-free and lets icons inherit brand colours via CSS.
const PATHS = {
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 7.9 7.5 9 4.3-1.1 7.5-4.4 7.5-9v-6L12 2.5Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  flame: (
    <>
      <path d="M12 2c2.6 3.2 5 5.6 5 9.2A5 5 0 0 1 7 11.4c0-1.4.5-2.4 1.4-3.3C8.2 9.8 9.3 11 9.3 11S8.7 6.3 12 2Z" />
    </>
  ),
  bolt: (
    <>
      <path d="M8.6 3.5h6.8L19 7.2v9.6l-3.6 3.7H8.6L5 16.8V7.2z" />
      <circle cx="12" cy="12" r="3.1" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6.5L12 3l8 3.5V21" />
      <path d="M4 21h16" />
      <path d="M9 21v-5h6v5" />
      <path d="M9 9h.01M15 9h.01M9 12.5h.01M15 12.5h.01" />
    </>
  ),
  roller: (
    <>
      <rect x="3.5" y="4" width="13" height="5" rx="1.2" />
      <path d="M16.5 6.5H19a1.5 1.5 0 0 1 1.5 1.5v2.5a1.5 1.5 0 0 1-1.5 1.5h-7" />
      <path d="M11 11.5V14H9v6" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5H17l3.5 3.5v2.5h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 2.5 7.8 12 12.6l9.5-4.8L12 3Z" />
      <path d="M2.5 12.4 12 17.2l9.5-4.8" />
    </>
  ),
  tag: (
    <>
      <path d="M13.4 3.5H20.5V10.6l-8.3 8.3a1.6 1.6 0 0 1-2.3 0L3.6 12.6a1.6 1.6 0 0 1 0-2.3z" />
      <circle cx="16.4" cy="7.6" r="1.3" />
    </>
  ),
  headset: (
    <>
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect x="3.3" y="12.5" width="3.6" height="6" rx="1.3" />
      <rect x="17.1" y="12.5" width="3.6" height="6" rx="1.3" />
      <path d="M18.9 18.5v.8a3 3 0 0 1-3 3h-2.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.4" r="2.6" />
      <path d="M3.7 19a5.3 5.3 0 0 1 10.6 0" />
      <path d="M15.5 6.1a2.6 2.6 0 0 1 0 5.1" />
      <path d="M16.2 14.1a5.3 5.3 0 0 1 4.1 4.9" />
    </>
  ),
};

export default function Icon({ name, size = 26, className = "" }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.layers}
    </svg>
  );
}
