import { content } from "../content";
import { useReveal } from "../useReveal";
import { Rocket, Orbit, Moon, Gauge, Telescope, LifeBuoy } from "lucide-react";

const ICONS = [Rocket, Orbit, Moon, Gauge, Telescope, LifeBuoy];

export default function Experiences() {
  const { experiences, valueProps } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section cosmic" ref={ref} aria-label="Experiences">
      <div className="section-head">
        <span className="eyebrow liquid-glass reveal">{experiences.eyebrow}</span>
        <h2 className="section-title reveal">{experiences.heading}</h2>
        <p className="section-sub reveal">{experiences.subhead}</p>
      </div>
      <div className="exp-grid">
        {valueProps.map((vp, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <article className="exp-card liquid-glass reveal" key={vp.title}>
              <span className="exp-icon liquid-glass-strong">
                <Icon aria-hidden="true" />
              </span>
              <h3>{vp.title}</h3>
              <p>{vp.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
