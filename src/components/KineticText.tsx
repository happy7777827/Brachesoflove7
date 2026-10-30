import React, { useEffect, useRef, useState } from "react";

interface KineticHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  style?: React.CSSProperties;
  staggerMs?: number;
}

/**
 * Character-by-character masked slide-up reveal + interactive chromatic hover
 * inspired by the Coppelia Framer kinetic typography.
 */
export function KineticHeading({
  text,
  as: Tag = "h2",
  className = "",
  style,
  staggerMs = 22,
}: KineticHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ").filter(Boolean);
  let charIndex = 0;

  return (
    <Tag
      ref={ref as React.RefObject<any>}
      className={`kinetic-heading ${inView ? "is-visible" : ""} ${className}`}
      style={style}
      aria-label={text}
    >
      {words.map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="kinetic-word" aria-hidden="true">
          {Array.from(word).map((char, cIdx) => {
            const delay = charIndex * staggerMs;
            charIndex++;
            return (
              <span key={`${char}-${cIdx}`} className="kinetic-char-mask">
                <span
                  className="kinetic-char"
                  style={{ transitionDelay: `${delay}ms` }}
                  data-char={char}
                >
                  {char}
                </span>
              </span>
            );
          })}
          {wIdx < words.length - 1 && <span className="kinetic-space">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

interface ScrollScrubTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
}

/**
 * Scroll-scrubbed word-by-word illumination (0:15 - 0:28 in inspiration video).
 * Words transition from dim translucent to luminous full contrast as the user scrolls.
 */
export function ScrollScrubText({
  text,
  className = "",
  style,
}: ScrollScrubTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;
    const updateScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Start illuminating when top enters 85% of viewport, finish when top reaches 25%
      const start = vh * 0.88;
      const end = vh * 0.22;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = text.split(" ").filter(Boolean);

  return (
    <p ref={containerRef} className={`scroll-scrub-text ${className}`} style={style}>
      {words.map((word, idx) => {
        const wordStart = idx / words.length;
        const wordEnd = (idx + 1) / words.length;
        const localProgress = Math.max(
          0,
          Math.min(1, (progress - wordStart * 0.85) / (wordEnd - wordStart * 0.85 + 0.12))
        );
        const opacity = 0.18 + localProgress * 0.82;
        const isLit = localProgress > 0.65;
        return (
          <span
            key={`${word}-${idx}`}
            className={`scrub-word ${isLit ? "is-lit" : ""}`}
            style={{
              opacity,
              transform: `translateY(${(1 - localProgress) * 4}px)`,
            }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

interface KineticMarqueeProps {
  items?: string[];
}

/**
 * Infinite kinetic ticker marquee (0:43 - 0:48 in inspiration video).
 */
export function KineticMarquee({
  items = [
    "SHALOM IN MESSIACH",
    "BRANCHES OF LOVE MINISTRY",
    "BIBLICAL HEBREW FOUNDATIONS",
    "SHABBAT FELLOWSHIP",
    "THE LIVING WORD",
    "TEST THE SPIRIT",
  ],
}: KineticMarqueeProps) {
  return (
    <div className="kinetic-marquee-wrap" aria-label="Ministry Highlights Ticker">
      <div className="kinetic-marquee-track">
        {[0, 1, 2].map((loopIdx) => (
          <div className="kinetic-marquee-group" key={loopIdx} aria-hidden={loopIdx > 0}>
            {items.map((item, idx) => (
              <span className="kinetic-marquee-item" key={`${loopIdx}-${idx}`}>
                <span className="kinetic-marquee-text">{item}</span>
                <span className="kinetic-marquee-emblem" aria-hidden="true">
                  <svg viewBox="0 0 64 36" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="32" cy="18" rx="28" ry="14" />
                    <ellipse cx="32" cy="18" rx="18" ry="12" />
                    <circle cx="32" cy="18" r="6" fill="currentColor" />
                  </svg>
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
