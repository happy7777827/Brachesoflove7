import { useState } from "react";
import { Menu, X } from "lucide-react";
import { content } from "../content";

export default function Navbar() {
  const { nav } = content;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Primary">
      <a href="/" className="nav-logo liquid-glass" aria-label={content.brandName}>
        {nav.logoLetter}
      </a>

      <div className="nav-pill liquid-glass" role="menubar">
        {nav.links.map((link) => (
          <a key={link.label} href={link.href} role="menuitem">
            {link.label}
          </a>
        ))}
        <a
          href={nav.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          role="menuitem"
        >
          {nav.ctaLabel}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>

      <button
        type="button"
        className="nav-mobile-toggle liquid-glass"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="nav-spacer" aria-hidden="true"></div>

      {menuOpen && (
        <div className="nav-mobile-drawer liquid-glass-strong" role="menu">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta nav-mobile-cta"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            {nav.ctaLabel}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      )}
    </nav>
  );
}
