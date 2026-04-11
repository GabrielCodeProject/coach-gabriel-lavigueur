import { BUSINESS } from "@/lib/business-data";

export function PhilosophyQuote() {
  if (BUSINESS.testimonials.enabled) return null;

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <figure className="flex flex-col items-center gap-4 text-center">
          <blockquote className="text-xl italic text-foreground">
            &#x201C;{BUSINESS.testimonials.philosophyQuote}&#x201D;
          </blockquote>
          <figcaption className="text-sm text-muted-foreground">
            {BUSINESS.coach.fullName}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
