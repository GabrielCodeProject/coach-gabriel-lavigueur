import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import type { Service } from "@/lib/schemas/service.schema";

type ServiceTeaserProps = {
  services: readonly Service[];
};

export function ServiceTeaser({ services }: ServiceTeaserProps) {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="reveal mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--lime-dark)]">
          Ce que je propose
        </p>
        <h2 className="reveal mb-12 text-[clamp(32px,4vw,52px)] font-black uppercase leading-[0.93] tracking-[-0.05em] text-foreground">
          Voici ce que<br />je propose.
        </h2>

        <div className="stagger-grid grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
          {services.map((service, index) => {
            const num = String(index + 1).padStart(2, "0");
            const headingId = `svc-${num}`;
            return (
              <article
                key={service.slug}
                aria-labelledby={headingId}
                className="reveal group relative overflow-hidden bg-background p-8 transition-colors hover:bg-[var(--off-white)]"
              >
                {/* Barre lime gauche au hover */}
                <span
                  className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-primary transition-transform duration-[250ms] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  {num}
                </p>
                <h3
                  id={headingId}
                  className="mb-3 text-[20px] font-extrabold tracking-[-0.02em] text-foreground"
                >
                  {service.name}
                </h3>
                <p className="text-[15px] leading-[1.65] text-foreground/75">
                  {service.short_description}
                </p>
                <Link
                  href={ROUTES.SERVICES}
                  className="mt-5 inline-flex items-center gap-1.5 border-b border-foreground/25 pb-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  <span className="sr-only">{service.name} — </span>
                  Voir les détails
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={ROUTES.SERVICES}
            className="inline-flex h-11 items-center gap-2 rounded-[4px] border-2 border-foreground px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            Voir tous les tarifs et détails
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
