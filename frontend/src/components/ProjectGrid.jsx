import { useI18n } from "../i18n.jsx";
import { MapPin } from "lucide-react";

// Featured projects as image-overlay gallery cards. Project photos live in
// `frontend/public/projects/`; if one is missing, a branded gradient
// placeholder with the project initial is shown behind the overlay.
export default function ProjectGrid({ projects = [] }) {
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
            <div className="project-card__overlay">
              <h4>{name}</h4>
              <span className="project-card__loc">
                <MapPin size={15} strokeWidth={2} />
                {tr(p.location)}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
