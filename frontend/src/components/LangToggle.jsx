import { useI18n } from "../i18n.jsx";

export default function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="langtoggle" role="group" aria-label="Language">
      <button
        className={lang === "vi" ? "on" : ""}
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
      >
        VI
      </button>
      <span>/</span>
      <button
        className={lang === "en" ? "on" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
