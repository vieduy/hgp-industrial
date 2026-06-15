import { useI18n } from "../i18n.jsx";

// Featured projects. Project photos can be exported from the company profile
// PDF into `frontend/public/projects/`. Until then a branded gradient
// placeholder with the project initial is shown.
export default function ProjectGrid({ projects }) {
  const { tr } = useI18n();
  return (
    <div className="project-grid">
      {(projects ?? []).map((p) => {
        const name = tr(p.name);
        return (
          <article className="project-card" key={name}>
            <div className="project-card__media">
              <img
                src={p.image}
                alt={name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentNode.classList.add("is-placeholder");
                  e.currentTarget.parentNode.dataset.initial = name
                    .charAt(0)
                    .toUpperCase();
                }}
              />
            </div>
            <div className="project-card__body">
              <h4>{name}</h4>
              <span>{tr(p.location)}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
