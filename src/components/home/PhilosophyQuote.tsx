import { BUSINESS } from "@/lib/business-data";

export function PhilosophyQuote() {
  if (BUSINESS.testimonials.enabled) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--cream)] py-20 md:py-24">
      {/* Guillemet watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[200px] font-black leading-none text-primary opacity-[0.07]"
      >
        &ldquo;
      </span>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center md:px-6">
        <blockquote className="reveal text-[clamp(20px,2.8vw,30px)] font-bold leading-[1.35] tracking-[-0.02em] text-foreground">
          &ldquo;{BUSINESS.testimonials.philosophyQuote}&rdquo;
        </blockquote>

        <div className="reveal mt-5 h-[2px] w-10 bg-primary" />

        <figcaption className="reveal mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
          {BUSINESS.coach.fullName} · Coach certifié · Sainte-Thérèse
        </figcaption>
      </div>
    </section>
  );
}
