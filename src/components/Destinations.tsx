import { content } from "../content";
import { useReveal } from "../useReveal";
import { MapPin } from "lucide-react";

export default function Destinations() {
  const { destinations } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section cosmic" ref={ref} aria-label="Destinations">
      <div className="section-head">
        <span className="eyebrow liquid-glass reveal">{destinations.eyebrow}</span>
        <h2 className="section-title reveal">{destinations.heading}</h2>
      </div>
      <div className="dest-grid">
        {destinations.items.map((d) => (
          <article className="dest-card reveal" key={d.name}>
            <img src={d.image} alt={d.name} loading="lazy" />
            <div className="dest-body">
              <span className="dest-meta">
                <MapPin aria-hidden="true" /> {d.distance}
              </span>
              <h3>{d.name}</h3>
              <p>{d.tagline}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
