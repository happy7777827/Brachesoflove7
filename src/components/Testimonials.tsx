import { content } from "../content";
import { useReveal } from "../useReveal";

export default function Testimonials() {
  const { testimonials } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section cosmic-alt" ref={ref} aria-label="Leadership">
      <div className="section-head">
        <span className="eyebrow liquid-glass reveal">{testimonials.eyebrow}</span>
        <h2 className="section-title reveal">{testimonials.heading}</h2>
      </div>
      <div className="test-grid">
        {testimonials.quotes.map((q) => (
          <figure className="test-card liquid-glass reveal" key={q.name}>
            <blockquote className="quote">{q.text}</blockquote>
            <figcaption className="test-author">
              <img src={q.photoSrc} alt={q.photoAlt} loading="lazy" />
              <span>
                <span className="name">{q.name}</span>
                <br />
                <span className="role">{q.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
