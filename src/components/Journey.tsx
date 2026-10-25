import { content } from "../content";
import { useReveal } from "../useReveal";

export default function Journey() {
  const { journey } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section cosmic-alt" ref={ref} aria-label={content.pageText.Journey_1}>
      <div className="section-head">
        <span className="eyebrow liquid-glass reveal">{journey.eyebrow}</span>
        <h2 className="section-title reveal">{journey.heading}</h2>
      </div>
      <div className="journey-grid">
        {journey.steps.map((step, i) => (
          <div className="journey-step liquid-glass reveal" key={step.title}>
            <span className="journey-num">{String(i + 1).padStart(2, "0")}</span>
            <h4>{step.title}</h4>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
