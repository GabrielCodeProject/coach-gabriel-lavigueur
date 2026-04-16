"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document
        .querySelectorAll<HTMLElement>(".reveal,.reveal-left,.reveal-divider")
        .forEach((el) => el.classList.add("visible"));
      return;
    }

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
  }, [pathname]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const t = parseInt(el.dataset.count ?? "", 10);
        if (Number.isFinite(t)) el.textContent = t + (el.dataset.suffix ?? "");
      });
      return;
    }

    const countEls = document.querySelectorAll<HTMLElement>("[data-count]");

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? "", 10);
          if (!Number.isFinite(target)) {
            countObserver.unobserve(el);
            return;
          }
          const suffix = el.dataset.suffix ?? "";
          const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          if (prefersReduced) {
            el.textContent = target + suffix;
            countObserver.unobserve(el);
            return;
          }
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
  }, [pathname]);

  return null;
}
