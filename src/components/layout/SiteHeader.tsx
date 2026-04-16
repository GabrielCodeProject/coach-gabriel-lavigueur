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
              className="rounded-sm px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <ThemeToggle />
          <Link
            href={ROUTES.CONTACT}
            className="hidden h-9 items-center rounded-[4px] bg-[var(--dark)] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 md:inline-flex"
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
