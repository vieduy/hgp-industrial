import { useEffect, useRef, useState } from "react";

// Counts from 0 → `end` once it scrolls into view. `suffix` (e.g. "+") is
// appended. Respects prefers-reduced-motion (jumps straight to the value).
export default function CountUp({ end, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [val, setVal] = useState(reduced ? end : 0);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * end));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [end, duration, reduced]);

  return (
    <span ref={ref} className="countup">
      {val}
      {suffix}
    </span>
  );
}
