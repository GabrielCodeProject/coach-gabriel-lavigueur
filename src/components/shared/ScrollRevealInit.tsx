"use client";

import { useEffect } from "react";

export function ScrollRevealInit() {
  useEffect(() => {
    const CLASSES = [".reveal", ".reveal-left", ".reveal-divider"];
    const elements = document.querySelectorAll<HTMLElement>(CLASSES.join(","));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Count-up for [data-count] elements
  useEffect(() => {
    const countEls = document.querySelectorAll<HTMLElement>("[data-count]");

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? "0", 10);
          const suffix = el.dataset.suffix ?? "";
          const duration = 900;
          const start = performance.now();

          function update(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );

    countEls.forEach((el) => countObserver.observe(el));
    return () => countObserver.disconnect();
  }, []);

  return null;
}
