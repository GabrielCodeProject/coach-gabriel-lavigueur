import Link from "next/link";
import { ArrowRight, MapPin, ImageIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";
import { StatBar } from "@/components/home/StatBar";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bodyText?: string;
  ctaLabel: string;
};

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  bodyText,
  ctaLabel,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {eyebrow}
            </span>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {subtitle}
            </p>
            {bodyText ? (
              <p className="hidden max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:block">
                {bodyText}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link
                href={ROUTES.CONTACT}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 px-6 text-base",
                )}
              >
                {ctaLabel}
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
              <Link
                href={ROUTES.METHOD}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 px-6 text-base",
                )}
              >
                Voir ma méthode
              </Link>
            </div>
            <p className="pt-1 text-xs text-muted-foreground">
              Consultation en personne au {BUSINESS.location.storeName},{" "}
              {BUSINESS.location.city}. Réponse personnelle sous 48 heures.
            </p>
          </div>

          {/* Image placeholder — visible on desktop only */}
          <div className="hidden lg:block">
            <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-muted text-muted-foreground">
              <ImageIcon className="size-8" aria-hidden="true" />
              <span className="text-xs">Photo — Portrait bureau</span>
            </div>
          </div>
        </div>
      </div>
      <StatBar />
    </section>
  );
}
