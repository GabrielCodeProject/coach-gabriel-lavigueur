# UI Refonte — Coach Gabriel Lavigueur

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refonter l'intégralité du design visuel du site sans toucher à la logique, au contenu ou à l'architecture existants.

**Architecture:** Design system basé sur tokens CSS dans `globals.css` (lime électrique `#84cc16` sur dark near-black `#0c1a0c`). Animations scroll-triggered via IntersectionObserver initialisé dans un seul composant client `ScrollRevealInit`. Tous les composants de section restent des Server Components — seul le nav mobile et le toggle thème restent client.

**Tech Stack:** Next.js 16 (App Router, static export), Tailwind v4, shadcn/ui base-nova, Inter (Google Fonts déjà chargé), `tw-animate-css`, IntersectionObserver vanilla.

**Spec de référence:** `docs/superpowers/specs/2026-04-16-ui-refonte-design.md`

---

## Fichiers touchés

| Action | Fichier | Rôle |
|---|---|---|
| Modifier | `src/app/globals.css` | Tokens CSS, animations, dark mode |
| Créer | `src/components/shared/ScrollRevealInit.tsx` | Client component — initialise IntersectionObserver |
| Créer | `src/components/shared/SectionDivider.tsx` | Ligne lime sweep entre sections |
| Modifier | `src/app/layout.tsx` | Ajouter `<ScrollRevealInit />` |
| Modifier | `src/app/page.tsx` | Réordonner sections + ajouter dividers |
| Modifier | `src/components/layout/SiteHeader.tsx` | Nav blanc, CTA dark·lime |
| Modifier | `src/components/layout/SiteFooter.tsx` | Footer dark 3 colonnes |
| Modifier | `src/components/layout/MobileNavToggle.tsx` | Style cohérent avec nouveau nav |
| Modifier | `src/components/home/HeroSection.tsx` | Hero blanc bold, extraire StatBar |
| Modifier | `src/components/home/StatBar.tsx` | Bande dark choc, chiffres lime, count-up |
| Modifier | `src/components/home/ServiceTeaser.tsx` | Cartes light, sans prix |
| Modifier | `src/components/home/MethodPreviewSection.tsx` | Section dark, numéros 01–05 lime |
| Modifier | `src/components/home/FitlogHighlightSection.tsx` | Section light, style cohérent |
| Modifier | `src/components/home/PhilosophyQuote.tsx` | Fond cream, quote centré |
| Modifier | `src/components/home/CtaQuestionnaireBanner.tsx` | Fond lime, bouton dark |
| Modifier | `src/components/home/TransformationsPreviewSection.tsx` | Style cohérent (conditionnel) |
| Modifier | `src/components/shared/PageHero.tsx` | Hero blanc bold pour pages internes |
| Modifier | `src/components/services/ServiceCard.tsx` | Carte dark/light redesign |
| Modifier | `src/components/services/ServicesGrid.tsx` | Grille style cohérent |
| Modifier | `src/components/services/PricingNotice.tsx` | Style cohérent |
| Modifier | `src/components/about/CoachIntroSection.tsx` | Style cohérent |
| Modifier | `src/components/method/MethodSteps.tsx` | Étapes dark, numéros lime |
| Modifier | `src/components/contact/ContactInfoBlock.tsx` | Style cohérent |
| Modifier | `src/components/faq/FaqAccordion.tsx` | Style cohérent |
| Modifier | `src/components/transformations/TransformationCard.tsx` | Style cohérent |

---

## Task 1: Design tokens — globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Remplacer l'intégralité du contenu de `globals.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

:root {
  /* Backgrounds */
  --background:  #ffffff;
  --foreground:  #0c1a0c;
  --card:        #f7faf3;
  --card-foreground: #0c1a0c;
  --popover:     #ffffff;
  --popover-foreground: #0c1a0c;

  /* Brand — Lime électrique */
  --primary:         #84cc16;
  --primary-foreground: #0c1a0c;

  /* Secondary / muted */
  --secondary:        #f0f7e8;
  --secondary-foreground: #0c1a0c;
  --muted:            #f0f7e8;
  --muted-foreground: rgba(12,26,12,0.55);

  /* Accent */
  --accent:           #f0f7e8;
  --accent-foreground: #0c1a0c;

  /* States */
  --destructive: oklch(0.57 0.22 27);
  --border:      rgba(12,26,12,0.09);
  --input:       rgba(12,26,12,0.09);
  --ring:        #84cc16;

  /* Radius */
  --radius: 0.25rem;

  /* Custom design tokens */
  --dark:       #0c1a0c;
  --dark-mid:   #162616;
  --off-white:  #f7faf3;
  --cream:      #f0f7e8;
  --lime:       #84cc16;
  --lime-dark:  #5fa800;
  --ink:        #0c1a0c;
  --ink-75:     rgba(12,26,12,0.75);
  --ink-45:     rgba(12,26,12,0.40);
  --white-65:   rgba(255,255,255,0.65);
  --white-30:   rgba(255,255,255,0.30);
  --white-10:   rgba(255,255,255,0.08);
}

@theme inline {
  --color-background:         var(--background);
  --color-foreground:         var(--foreground);
  --color-card:               var(--card);
  --color-card-foreground:    var(--card-foreground);
  --color-popover:            var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary:            var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary:          var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:              var(--muted);
  --color-muted-foreground:   var(--muted-foreground);
  --color-accent:             var(--accent);
  --color-accent-foreground:  var(--accent-foreground);
  --color-destructive:        var(--destructive);
  --color-border:             var(--border);
  --color-input:              var(--input);
  --color-ring:               var(--ring);
  --radius-sm:  calc(var(--radius) * 0.6);
  --radius-md:  calc(var(--radius) * 0.8);
  --radius-lg:  var(--radius);
  --radius-xl:  calc(var(--radius) * 1.4);
  --font-sans:     var(--font-inter);
  --font-heading:  var(--font-inter);
}

.dark {
  --background:  #0c1a0c;
  --foreground:  #f7faf3;
  --card:        #162616;
  --card-foreground: #f7faf3;
  --popover:     #162616;
  --popover-foreground: #f7faf3;
  --primary:     #84cc16;
  --primary-foreground: #0c1a0c;
  --secondary:   #1e341e;
  --secondary-foreground: #f7faf3;
  --muted:       #1e341e;
  --muted-foreground: rgba(247,250,243,0.55);
  --accent:      #1e341e;
  --accent-foreground: #f7faf3;
  --border:      rgba(255,255,255,0.08);
  --input:       rgba(255,255,255,0.08);
  --ring:        #84cc16;
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  html { @apply font-sans antialiased; }
  h1,h2,h3,h4,h5,h6 { @apply font-heading tracking-tight; }
}

/* ============================================================
   ANIMATION SYSTEM — scroll-triggered via IntersectionObserver
   ============================================================ */

/* Base invisible state */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity   0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Slide depuis la gauche */
.reveal-left {
  opacity: 0;
  transform: translateX(-24px);
  transition:
    opacity   0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-left.visible { opacity: 1; transform: translateX(0); }

/* Ligne lime sweep */
.reveal-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--lime), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-divider.visible { transform: scaleX(1); }

/* Stagger pour grilles (enfants indexés) */
.stagger-grid > *:nth-child(1) { transition-delay: 0.05s; }
.stagger-grid > *:nth-child(2) { transition-delay: 0.15s; }
.stagger-grid > *:nth-child(3) { transition-delay: 0.25s; }
.stagger-grid > *:nth-child(4) { transition-delay: 0.35s; }
.stagger-grid > *:nth-child(5) { transition-delay: 0.45s; }

/* Hero — entrée au load */
@keyframes hero-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-anim-1 { animation: hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.10s both; }
.hero-anim-2 { animation: hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
.hero-anim-3 { animation: hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.40s both; }
.hero-anim-4 { animation: hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
.hero-anim-5 { animation: hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.70s both; }
```

- [ ] **Vérifier le build**

```bash
pnpm build
```
Attendu : aucune erreur TypeScript ni CSS.

- [ ] **Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): update CSS tokens to lime electric dark palette"
```

---

## Task 2: Système d'animation — ScrollRevealInit + SectionDivider

**Files:**
- Create: `src/components/shared/ScrollRevealInit.tsx`
- Create: `src/components/shared/SectionDivider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Créer `src/components/shared/ScrollRevealInit.tsx`**

```tsx
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

  // Count-up pour les éléments [data-count]
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
```

- [ ] **Créer `src/components/shared/SectionDivider.tsx`**

```tsx
export function SectionDivider() {
  return <div className="reveal-divider" aria-hidden="true" />;
}
```

- [ ] **Ajouter `<ScrollRevealInit />` dans le layout**

Dans `src/app/layout.tsx`, ajouter l'import et le composant juste avant `</ThemeProvider>` :

```tsx
import { ScrollRevealInit } from "@/components/shared/ScrollRevealInit";

// Dans le JSX, juste avant </ThemeProvider> :
<ScrollRevealInit />
```

Le layout complet après modification :

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { StructuredData } from "@/components/shared/StructuredData";
import { ScrollRevealInit } from "@/components/shared/ScrollRevealInit";
import { buildRootMetadata } from "@/lib/seo/build-metadata";
import { buildLocalBusinessSchema } from "@/lib/schema/local-business";
import { buildWebsiteSchema } from "@/lib/schema/website";
import { env } from "@/lib/env";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <StructuredData data={buildLocalBusinessSchema()} />
        <StructuredData data={buildWebsiteSchema()} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={env.NEXT_PUBLIC_UMAMI_SITE_ID}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline focus:outline-2 focus:outline-primary"
          >
            Passer au contenu principal
          </a>
          <SiteHeader />
          <main id="main-content" className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
          <ScrollRevealInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Build**

```bash
pnpm build
```
Attendu : aucune erreur.

- [ ] **Commit**

```bash
git add src/components/shared/ScrollRevealInit.tsx src/components/shared/SectionDivider.tsx src/app/layout.tsx
git commit -m "feat(animation): add ScrollRevealInit + SectionDivider"
```

---

## Task 3: SiteHeader redesign

**Files:**
- Modify: `src/components/layout/SiteHeader.tsx`

- [ ] **Remplacer le contenu de `SiteHeader.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";
import { env } from "@/lib/env";
import { PRIMARY_NAV_ITEMS } from "./nav-items";
import { MobileNavToggle } from "./MobileNavToggle";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[62px] w-full max-w-6xl items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          aria-label={`Accueil — ${BUSINESS.name}`}
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Image
            src={`${env.NEXT_PUBLIC_BASE_PATH}/images/default/logo.webp`}
            alt={BUSINESS.name}
            width={600}
            height={471}
            className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        {/* Nav desktop */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {PRIMARY_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-2 text-[11px] font-600 uppercase tracking-[0.05em] text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-4 flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={ROUTES.CONTACT}
            className="hidden h-9 items-center rounded-[4px] bg-foreground px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-90 md:inline-flex"
          >
            {BUSINESS.cta.nav}
          </Link>
          <MobileNavToggle
            items={PRIMARY_NAV_ITEMS}
            contactHref={ROUTES.CONTACT}
            ctaLabel={BUSINESS.cta.nav}
          />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Build + vérification visuelle**

```bash
pnpm build && pnpm dev
```
Vérifier : nav blanc sobre, CTA fond foncé·texte lime, logo visible.

- [ ] **Commit**

```bash
git add src/components/layout/SiteHeader.tsx
git commit -m "feat(header): redesign nav — white, dark CTA with lime text"
```

---

## Task 4: SiteFooter redesign

**Files:**
- Modify: `src/components/layout/SiteFooter.tsx`

- [ ] **Remplacer `SiteFooter.tsx`**

```tsx
import Link from "next/link";
import { BUSINESS } from "@/lib/business-data";
import { ROUTES } from "@/lib/routes";
import { PRIMARY_NAV_ITEMS } from "./nav-items";

const FOOTER_NAV = [
  ...PRIMARY_NAV_ITEMS,
  { label: "Contact", href: ROUTES.CONTACT },
] as const;

const LEGAL_NAV = [
  { label: "Mentions légales", href: ROUTES.LEGAL },
  { label: "Politique de confidentialité", href: ROUTES.PRIVACY },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[#0c1a0c] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Coordonnées */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              {BUSINESS.name}
            </p>
            <address className="not-italic text-[13px] leading-[1.8] text-white/65">
              {BUSINESS.location.storeName}<br />
              {BUSINESS.location.streetAddress}<br />
              {BUSINESS.location.city}, {BUSINESS.location.province}&nbsp;
              {BUSINESS.location.postalCode}<br /><br />
              <a
                href={`mailto:${BUSINESS.contact.email}`}
                className="transition-colors hover:text-white"
              >
                {BUSINESS.contact.email}
              </a><br />
              <a
                href={`tel:${BUSINESS.contact.phone}`}
                className="transition-colors hover:text-white"
              >
                {BUSINESS.contact.phone}
              </a>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
              Horaires · Consultation
            </p>
            <div className="text-[13px] leading-[1.9] text-white/65">
              {BUSINESS.businessHours.schedule.map((slot, i) => (
                <p key={i}>
                  {slot.days.join(" – ")} &nbsp;
                  {slot.opens} – {slot.closes}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2 text-[10px] text-white/30">
            <span className="inline-block size-[7px] rounded-full bg-primary" />
            © {currentYear} {BUSINESS.legalName}. Tous droits réservés.
          </p>
          <ul className="flex gap-4">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[10px] text-white/30 transition-colors hover:text-white/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/layout/SiteFooter.tsx
git commit -m "feat(footer): redesign — dark 3-col, lime accents, horaires"
```

---

## Task 5: HeroSection redesign

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

Note: On retire `<StatBar />` du HeroSection — il sera rendu séparément dans `page.tsx` (Task 7).

- [ ] **Remplacer `HeroSection.tsx`**

```tsx
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
          {title.split(" ").map((word, i, arr) => {
            // Le dernier mot en lime
            if (i === arr.length - 1) {
              return (
                <span key={i} className="text-[--lime-dark]">
                  {word}
                  {i < arr.length - 1 ? " " : ""}
                </span>
              );
            }
            return word + (i < arr.length - 1 ? " " : "");
          })}
        </h1>

        <p className="hero-anim-3 mb-3 max-w-[480px] text-[18px] font-medium leading-[1.65] text-foreground">
          {subtitle}
        </p>

        {bodyText ? (
          <p className="hero-anim-3 mb-8 max-w-[480px] text-[15px] leading-[1.7] text-foreground/75">
            {bodyText}
          </p>
        ) : (
          <div className="mb-8" />
        )}

        <div className="hero-anim-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={ROUTES.CONTACT}
            className="inline-flex h-12 items-center gap-2 rounded-[4px] bg-foreground px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-90"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={ROUTES.METHOD}
            className="text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground/60 underline decoration-foreground/25 underline-offset-4 hover:text-foreground/80"
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
        <span className="absolute left-4 top-4 z-10 rounded-[4px] bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
          Certifié AAT
        </span>
        {heroImage ? (
          <Image
            src={`${env.NEXT_PUBLIC_BASE_PATH}${heroImage.replace(/\.(jpe?g|png)$/i, ".webp")}`}
            alt={`Photo du coach ${BUSINESS.coach.fullName}`}
            fill
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
```

- [ ] **Build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/home/HeroSection.tsx
git commit -m "feat(hero): white bold layout, lime accent, extract StatBar"
```

---

## Task 6: StatBar redesign + extraction

**Files:**
- Modify: `src/components/home/StatBar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Remplacer `StatBar.tsx`**

```tsx
const STATS = [
  {
    count: 13,
    suffix: "",
    display: "13",
    label: "ans de pratique",
    detail: "Pas une certification générique — 13 ans de pratique personnelle confirmée.",
  },
  {
    count: 125,
    suffix: "$",
    display: "125$",
    label: "plan nutritionnel · à vie",
    detail: "Un paiement unique. Toutes les mises à jour futures incluses.",
  },
  {
    count: 5,
    suffix: "",
    display: "5",
    label: "étapes claires",
    detail: "Du premier contact au premier résultat. Aucune surprise.",
  },
] as const;

export function StatBar() {
  return (
    <div className="grid grid-cols-1 divide-y divide-white/8 bg-[#0c1a0c] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="group relative px-6 py-8 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-primary before:opacity-20 before:transition-opacity hover:before:opacity-100 md:px-12 md:py-10"
        >
          <p
            className="reveal text-[52px] font-black leading-none tracking-[-0.04em] text-primary"
            data-count={stat.count}
            data-suffix={stat.suffix}
          >
            {stat.display}
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
            {stat.label}
          </p>
          <p className="mt-2 text-[13px] leading-[1.55] text-white/65">
            {stat.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Mettre à jour `src/app/page.tsx`** — déplacer StatBar hors de HeroSection et ajouter les SectionDivider

```tsx
import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { getFeaturedTransformations } from "@/lib/content/get-transformations";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { homePageSchema } from "@/lib/schemas/page.schema";
import { HeroSection } from "@/components/home/HeroSection";
import { StatBar } from "@/components/home/StatBar";
import { FitlogHighlightSection } from "@/components/home/FitlogHighlightSection";
import { ServiceTeaser } from "@/components/home/ServiceTeaser";
import { MethodPreviewSection } from "@/components/home/MethodPreviewSection";
import { PhilosophyQuote } from "@/components/home/PhilosophyQuote";
import { TransformationsPreviewSection } from "@/components/home/TransformationsPreviewSection";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";
import { SectionDivider } from "@/components/shared/SectionDivider";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage("accueil", homePageSchema);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.HOME,
    seo: frontmatter.seo,
  });
}

export default function HomePage() {
  const { frontmatter } = getPage("accueil", homePageSchema);
  const featuredTransformations = getFeaturedTransformations();

  return (
    <>
      <HeroSection
        eyebrow={frontmatter.hero_eyebrow}
        title={frontmatter.hero_title}
        subtitle={frontmatter.hero_subtitle}
        bodyText={frontmatter.hero_body_text}
        ctaLabel={frontmatter.hero_cta_label}
        heroImage={frontmatter.hero_image}
      />
      <StatBar />
      <SectionDivider />
      <ServiceTeaser />
      <SectionDivider />
      <MethodPreviewSection />
      <SectionDivider />
      <FitlogHighlightSection />
      <SectionDivider />
      <PhilosophyQuote />
      <SectionDivider />
      <TransformationsPreviewSection transformations={featuredTransformations} />
      <CtaQuestionnaireBanner />
    </>
  );
}
```

- [ ] **Build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/home/StatBar.tsx src/app/page.tsx
git commit -m "feat(home): extract StatBar as dark shock band, add SectionDividers"
```

---

## Task 7: ServiceTeaser redesign

**Files:**
- Modify: `src/components/home/ServiceTeaser.tsx`

- [ ] **Remplacer `ServiceTeaser.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const SERVICES = [
  {
    num: "01",
    title: "Consultation initiale",
    description:
      "On établit ton point de départ ensemble. Une heure, en personne, au Nutrition Suprême. Pas un formulaire — une vraie rencontre.",
  },
  {
    num: "02",
    title: "Plan d'entraînement",
    description:
      "Structuré pour ta réalité, pas un template. Livré via Fitlog, ajusté aux 4–8 semaines selon ta progression réelle.",
  },
  {
    num: "03",
    title: "Plan nutritionnel",
    description:
      "Un plan construit une fois, mis à jour gratuitement à vie. Jamais de double facturation pour ce qui a déjà été fait.",
  },
  {
    num: "04",
    title: "Suivi mensuel",
    description:
      "Tu n'es jamais seul entre les étapes. On ajuste ensemble selon tes données et ta progression réelle.",
  },
] as const;

export function ServiceTeaser() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="reveal mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[--lime-dark]">
          Ce que je propose
        </p>
        <h2 className="reveal mb-12 text-[clamp(32px,4vw,52px)] font-black uppercase leading-[0.93] tracking-[-0.05em] text-foreground">
          Voici ce que<br />je propose.
        </h2>

        <div className="stagger-grid grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
          {SERVICES.map((svc) => (
            <article
              key={svc.num}
              className="reveal group relative overflow-hidden bg-background p-8 transition-colors hover:bg-[--off-white]"
            >
              {/* Barre lime gauche au hover */}
              <span className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-primary transition-transform duration-250 group-hover:scale-y-100" />
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                {svc.num}
              </p>
              <h3 className="mb-3 text-[20px] font-extrabold tracking-[-0.02em] text-foreground">
                {svc.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-foreground/75">
                {svc.description}
              </p>
              <Link
                href={ROUTES.SERVICES}
                className="mt-5 inline-flex items-center gap-1.5 border-b border-foreground/25 pb-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                Voir les détails
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={ROUTES.SERVICES}
            className="inline-flex h-11 items-center gap-2 rounded-[4px] border-2 border-foreground px-6 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground hover:text-primary"
          >
            Voir tous les tarifs et détails
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/home/ServiceTeaser.tsx
git commit -m "feat(services-teaser): no prices, lime accent, reveal animations"
```

---

## Task 8: MethodPreviewSection redesign

**Files:**
- Modify: `src/components/home/MethodPreviewSection.tsx`

- [ ] **Remplacer `MethodPreviewSection.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const STEPS = [
  { num: "01", title: "Tu remplis le questionnaire", body: "Ton contexte, tes objectifs, tes contraintes. En ligne, avant la rencontre." },
  { num: "02", title: "On se rencontre en personne", body: "Une heure au Nutrition Suprême. Pas un Zoom — une vraie rencontre." },
  { num: "03", title: "Je construis ton plan", body: "Environ une semaine de travail sur mesure. Pas un copier-coller." },
  { num: "04", title: "Livraison via Fitlog", body: "Ton programme et accès direct à moi par chat. Tout au même endroit." },
  { num: "05", title: "Suivi aux 4–8 semaines", body: "On ajuste selon tes données et ta progression. Le plan évolue avec toi." },
] as const;

export function MethodPreviewSection() {
  return (
    <section className="bg-[--dark-mid] py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="reveal mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          Ma méthode
        </p>
        <h2 className="reveal mb-12 text-[clamp(32px,4vw,52px)] font-black uppercase leading-[0.93] tracking-[-0.05em] text-white">
          Du premier contact<br />au premier résultat.
        </h2>

        <ol className="stagger-grid grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => (
            <li
              key={step.num}
              className="reveal flex flex-col gap-4 bg-[--dark-mid] p-7 transition-colors hover:bg-[#1e341e]"
            >
              <span className="text-[44px] font-black leading-none tracking-[-0.04em] text-primary">
                {step.num}
              </span>
              <h3 className="text-[13px] font-bold leading-[1.4] text-white">
                {step.title}
              </h3>
              <p className="text-[12px] leading-[1.6] text-white/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <Link
            href={ROUTES.METHOD}
            className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-primary px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-80"
          >
            Voir les détails de ma méthode
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Build + Commit**

```bash
pnpm build
git add src/components/home/MethodPreviewSection.tsx
git commit -m "feat(method): dark section, lime 01–05 numbers, stagger reveal"
```

---

## Task 9: FitlogHighlightSection redesign

**Files:**
- Modify: `src/components/home/FitlogHighlightSection.tsx`

- [ ] **Remplacer `FitlogHighlightSection.tsx`**

```tsx
import { Smartphone, MessageCircle, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: readonly Feature[] = [
  {
    icon: Smartphone,
    title: "Ton plan partout",
    description: "Accède à ton plan d'entraînement et nutrition n'importe quand, depuis ton téléphone.",
  },
  {
    icon: MessageCircle,
    title: "Contact direct",
    description: "Envoie un message directement dans l'app — pas de SMS perdu, pas d'email ignoré.",
  },
  {
    icon: TrendingUp,
    title: "Tes progrès visibles",
    description: "Vois tes métriques évoluer semaine après semaine.",
  },
];

export function FitlogHighlightSection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="reveal mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[--lime-dark]">
          Via Fitlog
        </p>
        <h2 className="reveal mb-12 text-[clamp(32px,4vw,52px)] font-black uppercase leading-[0.93] tracking-[-0.05em] text-foreground">
          Ton coaching<br />dans ta poche.
        </h2>

        <div className="stagger-grid grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="reveal bg-background p-8 transition-colors hover:bg-[--off-white]"
              >
                <Icon className="mb-4 size-6 text-primary" aria-hidden="true" />
                <h3 className="mb-3 text-[18px] font-extrabold tracking-[-0.02em] text-foreground">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-foreground/75">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[12px] text-foreground/40">
          via l&apos;application Fitlog
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Build + Commit**

```bash
pnpm build
git add src/components/home/FitlogHighlightSection.tsx
git commit -m "feat(fitlog): light section redesign, reveal animations"
```

---

## Task 10: PhilosophyQuote + CtaQuestionnaireBanner redesign

**Files:**
- Modify: `src/components/home/PhilosophyQuote.tsx`
- Modify: `src/components/home/CtaQuestionnaireBanner.tsx`

- [ ] **Remplacer `PhilosophyQuote.tsx`**

```tsx
import { BUSINESS } from "@/lib/business-data";

export function PhilosophyQuote() {
  if (BUSINESS.testimonials.enabled) return null;

  return (
    <section className="relative overflow-hidden bg-[--cream] py-20 md:py-24">
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
```

- [ ] **Remplacer `CtaQuestionnaireBanner.tsx`**

```tsx
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
            className="reveal inline-flex h-14 shrink-0 items-center gap-2 rounded-[4px] bg-[--dark] px-8 text-[11px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-90"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Build + Commit**

```bash
pnpm build
git add src/components/home/PhilosophyQuote.tsx src/components/home/CtaQuestionnaireBanner.tsx
git commit -m "feat(home): cream quote section + lime CTA banner"
```

---

## Task 11: PageHero redesign (pages internes)

**Files:**
- Modify: `src/components/shared/PageHero.tsx`

- [ ] **Remplacer `PageHero.tsx`**

```tsx
type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-background pb-14 pt-16 md:pb-16 md:pt-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {eyebrow ? (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[--lime-dark]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-foreground/70">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
```

- [ ] **Build + Commit**

```bash
pnpm build
git add src/components/shared/PageHero.tsx
git commit -m "feat(page-hero): bold white uppercase hero for inner pages"
```

---

## Task 12: Composants pages Services + Méthode + About

**Files:**
- Modify: `src/components/services/ServiceCard.tsx`
- Modify: `src/components/services/ServicesGrid.tsx`
- Modify: `src/components/services/PricingNotice.tsx`
- Modify: `src/components/method/MethodSteps.tsx`
- Modify: `src/components/about/CoachIntroSection.tsx`

- [ ] **Remplacer `ServiceCard.tsx`**

```tsx
import type { Service } from "@/types/service.types";

type ServiceCardProps = { service: Service };

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="relative overflow-hidden border border-border bg-background p-8 transition-colors hover:bg-[--off-white]">
      <span className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-primary transition-transform duration-250 hover:scale-y-100" />
      {service.price ? (
        <p className="mb-3 text-[40px] font-black leading-none tracking-[-0.04em] text-primary">
          {service.price}
        </p>
      ) : null}
      <h3 className="mb-3 text-[22px] font-extrabold tracking-[-0.02em] text-foreground">
        {service.title}
      </h3>
      <p className="text-[15px] leading-[1.65] text-foreground/75">
        {service.description}
      </p>
    </article>
  );
}
```

- [ ] **Remplacer `PricingNotice.tsx`**

```tsx
type PricingNoticeProps = { title: string; body: string };

export function PricingNotice({ title, body }: PricingNoticeProps) {
  return (
    <aside className="border-l-[3px] border-primary bg-[--cream] px-6 py-5">
      <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.15em] text-[--lime-dark]">
        {title}
      </p>
      <p className="text-[15px] leading-[1.65] text-foreground/80">{body}</p>
    </aside>
  );
}
```

- [ ] **Remplacer `MethodSteps.tsx`**

Lire le fichier existant d'abord :

```bash
cat src/components/method/MethodSteps.tsx
```

Puis réécrire en conservant la même structure de données mais avec le nouveau style :

```tsx
// Conserver le type MethodStep et les props existants
// Remplacer uniquement les classes CSS :

// Conteneur ol :
// className="grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-1"

// Chaque li :
// className="flex flex-col gap-4 bg-[--dark-mid] p-8 transition-colors hover:bg-[#1e341e]"

// Numéro :
// className="text-[44px] font-black leading-none tracking-tight text-primary"

// Titre :
// className="text-[16px] font-bold leading-snug text-white"

// Corps :
// className="text-[14px] leading-relaxed text-white/65"
```

Note: lire le fichier réel et adapter — ne pas créer depuis zéro pour ne pas perdre la structure Markdown existante.

- [ ] **Remplacer `CoachIntroSection.tsx`**

```bash
cat src/components/about/CoachIntroSection.tsx
```

Appliquer le même système : fond blanc, titres uppercase bold, texte body 16-17px foreground/75, eyebrow lime-dark.

- [ ] **Build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/services/ src/components/method/ src/components/about/
git commit -m "feat(inner-pages): apply design system to services, method, about"
```

---

## Task 13: Pages Contact + FAQ + Transformations

**Files:**
- Modify: `src/components/contact/ContactInfoBlock.tsx`
- Modify: `src/components/faq/FaqAccordion.tsx`
- Modify: `src/components/transformations/TransformationCard.tsx`

- [ ] **Pour chaque composant**, lire le fichier existant puis appliquer le design system :

Règles communes :
- Fond `bg-background` (blanc) pour les sections de contenu
- Titres : `font-black uppercase tracking-[-0.04em] text-foreground`
- Texte body : `text-[15px] leading-[1.65] text-foreground/75`
- Accents : `text-primary` pour les valeurs importantes
- Bordures : `border-border` (token CSS `rgba(12,26,12,0.09)`)
- Hover cards : `hover:bg-[--off-white]`

Pour `FaqAccordion` : le trigger de l'accordion doit avoir `font-semibold text-foreground` et l'indicator `text-primary`.

Pour `TransformationCard` : badges en `bg-primary text-primary-foreground`.

- [ ] **Build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/contact/ src/components/faq/ src/components/transformations/
git commit -m "feat(inner-pages): apply design system to contact, faq, transformations"
```

---

## Task 14: Vérification finale

- [ ] **Build de production complet**

```bash
pnpm build
```
Attendu : 0 erreurs TypeScript, 0 erreurs CSS.

- [ ] **Smoke test visuel**

```bash
pnpm dev
```

Vérifier dans le navigateur :
1. Page d'accueil : scroll lent du haut vers le bas — chaque section s'anime
2. Les chiffres de StatBar (13, 125$, 5) comptent du zéro à leur valeur
3. La ligne lime sweep apparaît entre chaque section
4. Nav sticky visible, CTA fond dark texte lime
5. Footer dark 3 colonnes, horaires corrects
6. Page `/mes-services` : prix affichés, PricingNotice visible
7. Page `/ma-methode` : étapes lisibles sur fond dark
8. Page `/a-propos` : texte lisible, crédentials affichés
9. Page `/contact` : formulaire fonctionnel
10. Page `/faq` : accordion s'ouvre et se ferme
11. Dark mode toggle : couleurs cohérentes avec `.dark` tokens

- [ ] **Tuer le serveur de dev**

```bash
fuser -k 3000/tcp 2>/dev/null; lsof -ti:3000 | xargs -r kill -9 2>/dev/null
```

- [ ] **Commit final**

```bash
git add -A
git commit -m "feat(ui): complete UI/UX refonte — lime electric dark design system"
```
