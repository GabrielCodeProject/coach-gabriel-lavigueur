import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { BUSINESS } from "@/lib/business-data";
import { ROUTES } from "@/lib/routes";
import { env } from "@/lib/env";
import { Separator } from "@/components/ui/separator";
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
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <Link
              href={ROUTES.HOME}
              aria-label={`Accueil — ${BUSINESS.name}`}
              className="self-start transition-opacity hover:opacity-80"
            >
              <Image
                src={`${env.NEXT_PUBLIC_BASE_PATH}/images/default/logo.png`}
                alt={BUSINESS.name}
                width={600}
                height={471}
                className="h-16 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {BUSINESS.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {FOOTER_NAV.map((item) => (
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
              {BUSINESS.socials.some((s) => s.enabled) ? (
                <li className="flex items-center gap-3 pt-1">
                  {BUSINESS.socials.map((social) => {
                    if (!social.enabled) return null;
                    const platformName =
                      social.platform === "instagram" ? "Instagram" : "Facebook";
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                        aria-label={`${platformName} de ${BUSINESS.coach.fullName}`}
                      >
                        <ExternalLink className="size-4" aria-hidden="true" />
                        <span className="text-xs">{platformName}</span>
                      </a>
                    );
                  })}
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
