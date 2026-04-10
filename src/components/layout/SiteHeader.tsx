import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";
import { PRIMARY_NAV_ITEMS } from "./nav-items";
import { MobileNavToggle } from "./MobileNavToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 md:px-6">
        <Link
          href={ROUTES.HOME}
          className="flex flex-col leading-none text-foreground transition-colors hover:text-primary"
          aria-label={`Accueil — ${BUSINESS.name}`}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Coach
          </span>
          <span className="text-base font-semibold tracking-tight">
            Gabriel Lavigueur
          </span>
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
            Questionnaire
          </Link>
          <MobileNavToggle items={PRIMARY_NAV_ITEMS} contactHref={ROUTES.CONTACT} />
        </div>
      </div>
    </header>
  );
}
