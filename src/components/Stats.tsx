import { content } from "../content";
import { useReveal } from "../useReveal";

export default function Stats() {
  const { stats } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section cosmic" ref={ref} aria-label={content.pageText.Stats_1}>
      <div className="stats-band liquid-glass reveal">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
