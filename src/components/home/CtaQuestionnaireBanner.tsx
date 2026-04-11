import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";

type CtaQuestionnaireBannerProps = {
  title?: string;
  body?: string;
  ctaLabel?: string;
};

export function CtaQuestionnaireBanner({
  title = "Ton point de départ existe déjà",
  body = "Tu n'as pas besoin d'être prêt — juste honnête sur où tu en es.",
  ctaLabel = BUSINESS.cta.primary,
}: CtaQuestionnaireBannerProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-primary/5 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
          <Link
            href={ROUTES.CONTACT}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 shrink-0 px-6 text-base",
            )}
          >
            {ctaLabel}
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
