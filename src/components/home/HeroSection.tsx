import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";
import { env } from "@/lib/env";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bodyText?: string;
  ctaLabel: string;
  heroImage?: string;
};

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  bodyText,
  ctaLabel,
  heroImage,
}: HeroSectionProps) {
  return (
    <section className="grid min-h-[88vh] border-b border-border bg-background lg:grid-cols-[1fr_380px]">
      {/* Colonne texte */}
      <div className="flex flex-col justify-end border-r border-border px-4 py-14 md:px-6 md:py-16 lg:px-14 lg:py-20">
        <p className="hero-anim-1 mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[--lime-dark]">
          {eyebrow}
        </p>

        <h1 className="hero-anim-2 mb-7 text-[clamp(56px,7vw,88px)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-foreground">
          {title}
        </h1>

        <p className="hero-anim-3 mb-3 max-w-[480px] text-[18px] font-medium leading-[1.65] text-foreground">
          {subtitle}
        </p>

        {bodyText ? (
          <p className="hero-anim-3 mb-8 max-w-[480px] text-[15px] leading-[1.7] text-foreground/75">
            {bodyText}
          </p>
        ) : null}

        <div className="hero-anim-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={ROUTES.CONTACT}
            className="inline-flex h-12 items-center gap-2 rounded-[4px] bg-[--dark] px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={ROUTES.METHOD}
            className="text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground/60 underline decoration-foreground/25 underline-offset-4 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            Voir ma méthode
          </Link>
        </div>

        <p className="hero-anim-5 mt-5 text-[12px] font-medium text-foreground/60">
          Consultation en personne · Réponse personnelle sous 48 h
        </p>
      </div>

      {/* Colonne photo */}
      <div className="relative hidden overflow-hidden bg-[--off-white] after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary lg:block">
        <span className="absolute left-4 top-4 z-10 rounded-[4px] bg-[--dark] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
          Certifié AAT
        </span>
        {heroImage ? (
          <Image
            src={`${env.NEXT_PUBLIC_BASE_PATH}${heroImage.replace(/\.(jpe?g|png)$/i, ".webp")}`}
            alt={`Photo du coach ${BUSINESS.coach.fullName}`}
            fill
            sizes="(min-width: 1024px) 380px, 0px"
            className="object-cover object-top"
            priority
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-foreground/30">
            <span className="text-[10px] uppercase tracking-widest">Photo Gabriel</span>
          </div>
        )}
      </div>
    </section>
  );
}
