import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import Icon from "./Icon.jsx";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";

export default function Footer() {
  const { tr, lang } = useI18n();
  const { data: company } = useApi(api.company);
  const c = company?.contact;
  const year = new Date().getFullYear();
  const legalName =
    lang === "vi" ? company?.name_vi || company?.name : company?.name;

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__tag">{company?.tagline || "THINK BIG, GO FAR"}</p>
          <p className="footer__muted">{tr(company?.intro)}</p>
          {c?.website && (
            <a
              className="footer__website"
              href={`https://${c.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {c.website}
            </a>
          )}
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">{tr({ vi: "Liên kết", en: "Explore" })}</h4>
          <nav className="footer__links">
            <Link to="/catalogue">{tr("nav_catalogue")}</Link>
            <Link to="/about">{tr("nav_about")}</Link>
            <a href="/about#contact">{tr("nav_contact")}</a>
          </nav>
        </div>

        {c && (
          <div className="footer__col">
            <h4 className="footer__heading">{tr("contact_title")}</h4>
            <ul className="footer__contact">
              <li>
                <span className="footer__contact-icon">
                  <Icon name="phone" size={18} />
                </span>
                <span className="footer__contact-body">
                  <span className="footer__label">{tr("contact_hotline")}</span>
                  <a href={`tel:${c.hotline.replace(/\s/g, "")}`}>{c.hotline}</a>
                </span>
              </li>
              <li>
                <span className="footer__contact-icon">
                  <Icon name="mail" size={18} />
                </span>
                <span className="footer__contact-body">
                  <span className="footer__label">{tr("contact_email")}</span>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </span>
              </li>
              <li>
                <span className="footer__contact-icon">
                  <Icon name="pin" size={18} />
                </span>
                <span className="footer__contact-body">
                  <span className="footer__label">
                    {tr({ vi: "Địa chỉ", en: "Address" })}
                  </span>
                  {c.maps_url ? (
                    <a href={c.maps_url} target="_blank" rel="noreferrer">
                      {tr(c.address)}
                    </a>
                  ) : (
                    <span>{tr(c.address)}</span>
                  )}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>
            © {year} {legalName || "HGP Industrial Co., Ltd."}. {tr("footer_rights")}
          </span>
          {c?.tax_code && (
            <span className="footer__legal">
              {tr({ vi: "Mã số thuế", en: "Tax code" })}: {c.tax_code}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
