import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import Icon from "./Icon.jsx";
import SocialMark from "./SocialMark.jsx";
import LangToggle from "./LangToggle.jsx";
import { useI18n } from "../i18n.jsx";
import { useApi } from "../hooks.js";
import { api } from "../api.js";

export default function Navbar() {
  const { tr, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Collapse the topbar and shrink the bar once the user scrolls past the hero edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { data: company } = useApi(api.company);
  const c = company?.contact;
  const legalName =
    lang === "vi" ? company?.name_vi || company?.name : company?.name;

  const links = [
    { to: "/", key: "nav_home", end: true },
    { to: "/catalogue", key: "nav_catalogue" },
    { to: "/about", key: "nav_about" },
  ];

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__topbar">
        <div className="container nav__topbar-inner">
          <span className="nav__company">{legalName}</span>
          {c && (
            <div className="nav__utility">
              <a
                className="nav__hotline"
                href={`tel:${c.hotline.replace(/\s/g, "")}`}
              >
                <Icon name="phone" size={15} />
                <span>
                  <small>{tr("contact_hotline")}</small>
                  {c.hotline}
                </span>
              </a>
              {(c.zalo || c.facebook) && (
                <>
                  <span className="nav__divider" />
                  <span className="nav__follow">
                    {tr({ vi: "Theo dõi", en: "Follow" })}
                  </span>
                  <div className="nav__socials">
                    {c.zalo && (
                      <a
                        href={c.zalo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Zalo"
                        className="nav__social"
                      >
                        <SocialMark name="zalo" />
                      </a>
                    )}
                    {c.facebook && (
                      <a
                        href={c.facebook}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="nav__social"
                      >
                        <SocialMark name="facebook" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <Logo size={56} />
        </Link>

        <button
          className="nav__burger"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {tr(l.key)}
            </NavLink>
          ))}
          <a
            href="/about#contact"
            className="btn btn--primary nav__cta"
            onClick={() => setOpen(false)}
          >
            {tr("nav_contact")}
          </a>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}
