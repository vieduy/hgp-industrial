import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import LangToggle from "./LangToggle.jsx";
import { useI18n } from "../i18n.jsx";

export default function Navbar() {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", key: "nav_home", end: true },
    { to: "/catalogue", key: "nav_catalogue" },
    { to: "/about", key: "nav_about" },
  ];

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <Logo />
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
