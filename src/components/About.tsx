import { content } from "../content";
import { useReveal } from "../useReveal";

export default function About() {
  const { about, aboutSecondary, scriptureQuote, galleryImages } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section cosmic-alt" ref={ref} aria-label="About">
      <div className="about-band">
        <span className="eyebrow liquid-glass reveal" style={{ marginBottom: "1.5rem" }}>
          {content.pageText.About_1}
        </span>
        <p className="reveal" style={{ marginBottom: "1.25rem" }}>
          {scriptureQuote.hindi}
        </p>
        <p
          className="reveal"
          style={{
            fontSize: "1.25rem",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "0.75rem",
          }}
        >
          {scriptureQuote.english} — {scriptureQuote.reference}
        </p>
        <p className="reveal" style={{ marginTop: "2rem" }}>
          {about}
        </p>
        <p
          className="section-sub reveal"
          style={{ marginTop: "1.25rem", maxWidth: "42rem" }}
        >
          {aboutSecondary}
        </p>
      </div>

      <div
        className="dest-grid"
        style={{ marginTop: "4rem" }}
        aria-label="Ministry in Action Gallery"
      >
        {galleryImages.slice(0, 6).map((img) => (
          <article className="dest-card reveal" key={img.src} style={{ minHeight: "280px" }}>
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="dest-body">
              <span className="dest-meta">Ministry in Action</span>
              <h3 style={{ fontSize: "1.4rem" }}>{img.alt}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
