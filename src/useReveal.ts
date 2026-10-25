import { useEffect, useRef } from "react";

/** Adds the "visible" class to `.reveal` descendants when they intersect. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (root.classList.contains("reveal")) elements.push(root);
    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
