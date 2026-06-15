import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";

export default function Footer() {
  const { tr } = useI18n();
  const { data: company } = useApi(api.company);
  const c = company?.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__tag">THINK BIG, GO FAR</p>
          <p className="footer__muted">{tr(company?.subtitle)}</p>
        </div>

        <div>
          <h4>{tr("nav_catalogue")}</h4>
          <Link to="/catalogue">{tr("nav_catalogue")}</Link>
          <Link to="/about">{tr("nav_about")}</Link>
          <a href="/about#contact">{tr("nav_contact")}</a>
        </div>

        {c && (
          <div>
            <h4>{tr("contact_title")}</h4>
            <p className="footer__muted">
              {tr("contact_hotline")}:{" "}
              <a href={`tel:${c.hotline.replace(/\s/g, "")}`}>{c.hotline}</a>
            </p>
            <p className="footer__muted">
              {tr("contact_email")}:{" "}
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </p>
            <p className="footer__muted">{tr(c.address)}</p>
          </div>
        )}
      </div>
      <div className="footer__bar">
        <div className="container">
          © {year} HGP Industrial Co., Ltd. {tr("footer_rights")}
        </div>
      </div>
    </footer>
  );
}
