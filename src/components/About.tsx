import { content } from "../content";
import { useReveal } from "../useReveal";

export default function About() {
  const { about } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section cosmic-alt" ref={ref} aria-label="About">
      <div className="about-band">
        <span className="eyebrow liquid-glass reveal" style={{ marginBottom: "1.5rem" }}>
          {content.pageText.About_1}
        </span>
        <p className="reveal">{about}</p>
      </div>
    </section>
  );
}
