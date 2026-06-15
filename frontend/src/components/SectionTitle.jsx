export default function SectionTitle({ eyebrow, title, lead, center }) {
  return (
    <div className={`sectiontitle ${center ? "is-center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && <h2 className="section-title">{title}</h2>}
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
