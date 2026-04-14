import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";
import { env } from "@/lib/env";
import { PRIMARY_NAV_ITEMS } from "./nav-items";
import { MobileNavToggle } from "./MobileNavToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 md:px-6">
        <Link
          href={ROUTES.HOME}
          aria-label={`Accueil — ${BUSINESS.name}`}
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Image
            src={`${env.NEXT_PUBLIC_BASE_PATH}/images/default/logo.png`}
            alt={BUSINESS.name}
            width={600}
            height={471}
            className="h-11 w-auto object-contain dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {PRIMARY_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <Link
            href={ROUTES.CONTACT}
            className={cn(
              buttonVariants({ variant: "default" }),
              "hidden h-10 px-4 text-sm md:inline-flex",
            )}
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
