import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";

type CtaQuestionnaireBannerProps = {
  title?: string;
  ctaLabel?: string;
};

export function CtaQuestionnaireBanner({
  title = "Bâtis quelque chose qui dure.",
  ctaLabel = BUSINESS.cta.primary,
}: CtaQuestionnaireBannerProps) {
  return (
    <section className="bg-primary py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="reveal mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/50">
              Prêt à commencer?
            </p>
            <h2 className="reveal-left text-[clamp(28px,4vw,50px)] font-black uppercase leading-[0.93] tracking-[-0.04em] text-foreground">
              {title}
            </h2>
          </div>

          <Link
            href={ROUTES.CONTACT}
            className="reveal inline-flex h-14 shrink-0 items-center gap-2 rounded-[4px] bg-[var(--dark)] px-8 text-[11px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
