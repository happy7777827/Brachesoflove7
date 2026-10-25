import { content } from "../content";

export default function Footer() {
  const { brandName, footer } = content;

  return (
    <footer className="site-footer cosmic">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">{brandName}</div>
          <p className="footer-tagline">{footer.tagline}</p>
        </div>
        {footer.columns.map((col) => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">{footer.copyright}</div>
    </footer>
  );
}
