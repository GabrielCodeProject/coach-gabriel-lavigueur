import Link from "next/link";
import { BUSINESS } from "@/lib/business-data";
import { ROUTES } from "@/lib/routes";
import { PRIMARY_NAV_ITEMS } from "./nav-items";

const DAY_LABELS_FR: Record<string, string> = {
  Monday: "Lun.",
  Tuesday: "Mar.",
  Wednesday: "Mer.",
  Thursday: "Jeu.",
  Friday: "Ven.",
  Saturday: "Sam.",
  Sunday: "Dim.",
};

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
    <footer className="border-t border-white/8 bg-[--dark] text-white">
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
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Navigation
            </p>
            <nav aria-label="Pied de page">
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
            </nav>
          </div>

          {/* Horaires */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Horaires · Consultation
            </p>
            <div className="text-[13px] leading-[1.9] text-white/65">
              {BUSINESS.businessHours.schedule.map((slot, i) => (
                <p key={`${slot.days[0] ?? i}-${slot.opens}`}>
                  {slot.days.map((d) => DAY_LABELS_FR[d] ?? d).join(" – ")} &nbsp;
                  {slot.opens} – {slot.closes}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2 text-xs text-white/30">
            <span className="inline-block size-[7px] rounded-full bg-primary" />
            © {currentYear} {BUSINESS.legalName}. Tous droits réservés.
          </p>
          <nav aria-label="Mentions légales">
          <ul className="flex gap-4">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-white/30 transition-colors hover:text-white/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
