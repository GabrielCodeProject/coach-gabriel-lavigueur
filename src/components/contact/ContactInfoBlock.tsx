import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/business-data";

export function ContactInfoBlock() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
      <h2 className="text-[11px] font-black uppercase tracking-widest text-[var(--lime-dark)]">
        Où me trouver
      </h2>
      <ul className="flex flex-col gap-4 text-sm">
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-[var(--lime-dark)]">
              Adresse
            </p>
            <p className="text-foreground/75">
              {BUSINESS.location.storeName}
            </p>
            <p className="text-foreground/75">
              {BUSINESS.location.city}, {BUSINESS.location.provinceFull}
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-[var(--lime-dark)]">Courriel</p>
            <a
              href={`mailto:${BUSINESS.contact.email}`}
              className="text-foreground/75 transition-colors hover:text-primary"
            >
              {BUSINESS.contact.email}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-[var(--lime-dark)]">Téléphone</p>
            <a
              href={`tel:${BUSINESS.contact.phone}`}
              className="text-foreground/75 transition-colors hover:text-primary"
            >
              {BUSINESS.contact.phone}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Clock className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-[var(--lime-dark)]">Délai de réponse</p>
            <p className="text-foreground/75">
              Je réponds personnellement à chaque questionnaire sous 48 heures.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
