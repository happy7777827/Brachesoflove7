import { content } from "../content";

export default function Navbar() {
  const { nav } = content;

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="nav-logo liquid-glass" aria-label={content.brandName}>
        {nav.logoLetter}
      </div>

      <div className="nav-pill liquid-glass" role="menubar">
        {nav.links.map((link) => (
          <a key={link.label} href={link.href} role="menuitem">
            {link.label}
          </a>
        ))}
        <a href={nav.ctaHref} className="nav-cta" role="menuitem">
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

      <div className="nav-spacer" aria-hidden="true"></div>
    </nav>
  );
}
