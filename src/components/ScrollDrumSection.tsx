import { useEffect, useRef, useState } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function clamp01(v: number) {
  return clamp(v, 0, 1);
}

interface Segment {
  text: string;
  highlight: boolean;
}

const RAW_LINES: string[] = [
  "Welcome to [Branches of Love Ministry],",
  "a [Non-Denominational sanctuary] for",
  "seekers of [deeper roots] and [higher wisdom]",
  "who walk in the [Shalom of Messiach].",
  "This is where [ancient Biblical wisdom]",
  "meets [authentic daily devotion],",
  "anchored in the [full authority]",
  "of [Scripture from Genesis to Revelation].",
  "We [gather every Shabbat] to cultivate",
  "a [deeper connection] to the [Divine Word],",
  "[contemplative prayer], and [sacred fellowship]",
  "with the strength of the [Holy Spirit].",
  "Explore [Biblical Hebrew Foundations],",
  "from [Aleph to Tav], [Niqqud], and [Grammar]",
  "taught in [Hindi and Marathi] for all.",
  "",
  "“So every [good tree yields good fruit],",
  "but a rotten tree [yields wicked fruit].”",
  "Rooted like a [tree planted by streams]",
  "of [living water] in [Psalm 1:3] and [Matthew 7:17].",
  "[Reverence for Scripture], [Authentic Community],",
  "and [Biblical Rest on the Sabbath]",
  "form our [Sacred Foundation].",
  "Our [vision is simple]:",
  "[peel back modern distraction],",
  "[empty ourselves before the Divine voice],",
  "and [weave ancient threads of love],",
  "[wisdom, and grace] into [modern life].",
  "In affiliation with [Test The Spirit]",
  "and [Peace Army Foundation],",
  "we bring [biblical discernment] and",
  "[enduring spiritual truth] to the world.",
];

function parseLine(raw: string): Segment[] {
  if (!raw) return [];
  const segments: Segment[] = [];
  const regex = /\[([^\]]+)\]|([^\[\]]+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    if (match[1] !== undefined) {
      segments.push({ text: match[1], highlight: true });
    } else if (match[2] !== undefined) {
      segments.push({ text: match[2], highlight: false });
    }
  }
  return segments;
}

const PARSED_LINES = RAW_LINES.map(parseLine);

const MARQUEE_ITEMS = [
  "BRANCHES OF LOVE MINISTRY",
  "SHALOM IN MESSIACH",
  "TEST THE SPIRIT AFFILIATION",
  "PEACE ARMY FOUNDATION",
  "BIBLICAL HEBREW · ALEPH TO TAV",
  "SHABBAT FELLOWSHIP · SATURDAY 8:00 PM",
  "MATTHEW 7:17 · PSALM 1:3",
  "CHEMBUR MUMBAI 400071",
];

function SecondVideoScrubber({ progress }: { progress: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoaded = () => {
        video.pause();
        try {
          video.currentTime = 0.01;
        } catch {
          // ignore
        }
      };
      video.addEventListener("loadedmetadata", handleLoaded);
      if (video.readyState >= 1) handleLoaded();
      return () => video.removeEventListener("loadedmetadata", handleLoaded);
    }
  }, []);

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 1) {
        const duration =
          Number.isFinite(video.duration) && video.duration > 0
            ? video.duration
            : 4.2;
        const target = clamp(progressRef.current * duration, 0, duration);
        currentRef.current += (target - currentRef.current) * 0.15;
        if (
          !video.seeking &&
          Math.abs(video.currentTime - currentRef.current) > 0.01
        ) {
          try {
            video.currentTime = currentRef.current;
          } catch {
            // ignore seek errors
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `translate3d(${-mx * 40}px, ${-my * 40}px, 0) scale(1.05)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#11010a]">
      <div
        ref={wrapRef}
        style={{ transform: "scale(1.05)", transition: "transform 0.5s ease-out" }}
        className="w-full h-full will-change-transform"
      >
        <video
          ref={videoRef}
          src="/assets/teddy-cross.mp4"
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover pointer-events-none opacity-100"
        />
      </div>
    </div>
  );
}

function CylindricalTextDrum({ progress }: { progress: number }) {
  const R = 380;
  const lineHeight = 34;
  const targetIndex = clamp01(progress) * (PARSED_LINES.length - 1);

  return (
    <div
      className="absolute inset-y-0 left-0 w-full sm:w-[65%] md:w-[60%] z-30 flex items-center justify-start pointer-events-none select-none text-left pl-6 sm:pl-12 md:pl-20 py-16"
      style={{
        perspective: "1000px",
        perspectiveOrigin: "25% 50%",
      }}
    >
      <div
        className="relative w-full h-[85vh]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {PARSED_LINES.map((segments, idx) => {
          const indexDiff = idx - targetIndex;
          const translateY = indexDiff * lineHeight;
          const angleRad = translateY / R;
          if (Math.abs(angleRad) > Math.PI / 2) return null;

          const angleDeg = (angleRad * 180) / Math.PI;
          const cosVal = Math.cos(angleRad);
          const translateZ = cosVal * R - R;
          const baseScale = 0.78 + cosVal * 0.22;
          const opacity = Math.max(0, (cosVal - 0.2) / 0.8);
          const depthBlur = Math.min(
            8,
            Math.max(0, (Math.abs(indexDiff) - 1.5) * 0.75)
          );

          if (opacity <= 0.01) return null;

          return (
            <p
              key={idx}
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                color: "#ffffff",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.85)",
                transform: `translate3d(0, calc(-50% + ${translateY.toFixed(
                  1
                )}px), ${translateZ.toFixed(1)}px) rotateX(${(
                  -angleDeg * 0.8
                ).toFixed(1)}deg) scale(${baseScale.toFixed(3)})`,
                transformOrigin: "left center",
                opacity: segments.length === 0 ? opacity * 0.3 : opacity,
                filter:
                  depthBlur > 0.1 ? `blur(${depthBlur.toFixed(2)}px)` : "none",
                letterSpacing: "-0.035em",
              }}
              className="text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[0.95] tracking-tight whitespace-nowrap text-white will-change-transform"
            >
              {segments.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                segments.map((seg, sIdx) => (
                  <span
                    key={sIdx}
                    style={{ color: "#ffffff" }}
                    className={
                      seg.highlight
                        ? "text-white font-extrabold opacity-100"
                        : "text-white font-normal opacity-85"
                    }
                  >
                    {seg.text}
                  </span>
                ))
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default function ScrollDrumSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const lerpedProgressRef = useRef(0);
  const [drumProgress, setDrumProgress] = useState(0);

  useEffect(() => {
    const computeProgress = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const raw = (-rect.top + window.innerHeight * 0.15) / scrollable;
      targetProgressRef.current = clamp01(raw);
    };

    window.addEventListener("scroll", computeProgress, { passive: true });
    window.addEventListener("resize", computeProgress, { passive: true });
    computeProgress();

    let rafId = 0;
    const tick = () => {
      const diff = targetProgressRef.current - lerpedProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        lerpedProgressRef.current += diff * 0.08;
        setDrumProgress(lerpedProgressRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", computeProgress);
      window.removeEventListener("resize", computeProgress);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      aria-label="Sacred Manifesto Drum"
      className="relative w-full -mt-12 z-20 text-white"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 w-full h-screen bg-[#11010a] rounded-t-[48px] overflow-hidden shadow-[0_-24px_80px_rgba(0,0,0,0.9)] border-t border-white/15">
        {/* Grab-handle pill at top center */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-[5px] bg-white rounded-full z-50 pointer-events-none" />

        {/* Scrubbed & Mouse-Parallax Background Video (Full brightness, unobstructed teddy bear) */}
        <SecondVideoScrubber progress={drumProgress} />

        {/* 3D Cylindrical Text Drum in crisp white */}
        <CylindricalTextDrum progress={drumProgress} />

        {/* Bottom Infinite Fade Marquee in white */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-0 w-full sm:w-[65%] md:w-[60%] pl-6 sm:pl-12 md:pl-20 pr-6 sm:pr-12 md:pr-16 z-50 pointer-events-auto">
          <div className="w-full border-t border-white/15 pt-6">
            <div className="marquee-container">
              <div className="marquee-track">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
                  <span
                    key={idx}
                    style={{ color: "#ffffff" }}
                    className="mx-8 text-xs sm:text-sm uppercase tracking-[0.22em] text-white font-semibold whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
