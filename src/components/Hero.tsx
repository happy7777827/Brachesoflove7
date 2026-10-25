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

    const animated = root.querySelectorAll<HTMLElement>(".fade-rise, .subheadline");
    const blurContainers = root.querySelectorAll<HTMLElement>("[data-blur-text]");

    if (!("IntersectionObserver" in window)) {
      animated.forEach((el) => el.classList.add("in-view"));
      root
        .querySelectorAll<HTMLElement>(".blur-word")
        .forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;

          if (el.classList.contains("fade-rise") || el.classList.contains("subheadline")) {
            const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
            el.style.animationDelay = delay + "ms";
            el.classList.add("in-view");
            io.unobserve(el);
          } else if (el.hasAttribute("data-blur-text")) {
            el.querySelectorAll<HTMLElement>(".blur-word").forEach((w) => {
              w.classList.add("in-view");
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    animated.forEach((el) => io.observe(el));
    blurContainers.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
          <div className="badge liquid-glass fade-rise" data-delay="200">
            <span className="chip">{hero.badgeChip}</span>
            <span className="label">{hero.badgeLabel}</span>
          </div>

          <h1 className="headline" data-blur-text={hero.headline}>
            {words.map((word, i) => (
              <span
                key={(([[word, ""], [i, "-"]] as Array<[unknown, string]>).reduce((weincAcc: string, [weincPart, weincSep]) => (weincPart == null || String(weincPart).trim() === "" ? weincAcc : weincAcc ? weincAcc + weincSep + String(weincPart) : String(weincPart)), ""))}
                className="blur-word"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="subheadline" data-delay="800">
            {hero.subhead}
          </p>

          <div className="cta-row fade-rise" data-delay="1100">
            <a href={hero.ctaPrimaryHref} className="cta-primary liquid-glass-strong">
              {hero.ctaPrimary}
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
            <a href={hero.ctaSecondaryHref} className="cta-secondary">
              {hero.ctaSecondary}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            </a>
          </div>
        </div>

        <Partners />
      </div>
    </section>
  );
}
