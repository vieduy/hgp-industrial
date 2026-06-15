import { useI18n } from "../i18n.jsx";
import CountUp from "./CountUp.jsx";

export default function Stats({ stats }) {
  const { tr } = useI18n();
  if (!stats?.length) return null;
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div className="stats__item" key={i}>
          <div className="stats__num">
            <CountUp end={s.value} suffix={s.suffix || ""} />
          </div>
          <div className="stats__label">{tr(s.label)}</div>
        </div>
      ))}
    </div>
  );
}
