import { useEffect, useRef } from "react";
import { content } from "../content";
import Partners from "./Partners";

export default function Hero() {
  const { hero } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const words = hero.headline.split(" ").filter(Boolean);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const revealHero = () => {
      root.querySelectorAll<HTMLElement>(".fade-rise, .subheadline").forEach((el) => {
        const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
        el.style.animationDelay = delay + "ms";
        el.classList.add("in-view");
      });
      root.querySelectorAll<HTMLElement>(".blur-word").forEach((w) => {
        w.classList.add("in-view");
      });
    };

    revealHero();
  }, []);

  return (
    <section className="hero" aria-label="Hero" ref={sectionRef}>
      <video
        className="bg-video-hero"
        src={hero.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      ></video>
      <div className="video-overlay" aria-hidden="true"></div>

      <div className="layer hero-layer">
        <div className="hero-content">
          <span className="hero-kicker fade-rise in-view" data-delay="120">
            {hero.kicker}
          </span>

          <div className="badge liquid-glass fade-rise in-view" data-delay="220">
            <span className="chip">{hero.badgeChip}</span>
            <span className="label">{hero.badgeLabel}</span>
          </div>

          <h1 className="headline" data-blur-text={hero.headline}>
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="blur-word in-view"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="subheadline in-view" data-delay="500">
            {hero.subhead}
          </p>
        </div>

        <Partners />
      </div>
    </section>
  );
}
