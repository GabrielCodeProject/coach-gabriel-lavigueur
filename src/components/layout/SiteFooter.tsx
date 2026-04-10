import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business-data";
import { ROUTES } from "@/lib/routes";
import { Separator } from "@/components/ui/separator";

const SECONDARY_NAV = [
  { label: "Accueil", href: ROUTES.HOME },
  { label: "À propos", href: ROUTES.ABOUT },
  { label: "Ma méthode", href: ROUTES.METHOD },
  { label: "Mes services", href: ROUTES.SERVICES },
  { label: "Transformations", href: ROUTES.TRANSFORMATIONS },
  { label: "FAQ", href: ROUTES.FAQ },
  { label: "Contact", href: ROUTES.CONTACT },
] as const;

const LEGAL_NAV = [
  { label: "Mentions légales", href: ROUTES.LEGAL },
  { label: "Politique de confidentialité", href: ROUTES.PRIVACY },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col leading-none">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Coach
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {BUSINESS.coach.fullName}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {BUSINESS.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {SECONDARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Me rejoindre
            </h2>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {BUSINESS.location.storeName}
                  <br />
                  {BUSINESS.location.city}, {BUSINESS.location.provinceFull}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${BUSINESS.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {BUSINESS.contact.email}
                </a>
              </li>
              {BUSINESS.contact.phone !== "TODO" ? (
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${BUSINESS.contact.phone}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {BUSINESS.contact.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {BUSINESS.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-4">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
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
