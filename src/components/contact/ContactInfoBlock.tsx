import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/business-data";

export function ContactInfoBlock() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
        Où me trouver
      </h2>
      <ul className="flex flex-col gap-4 text-sm">
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-foreground">
              {BUSINESS.location.storeName}
            </p>
            <p className="text-muted-foreground">
              {BUSINESS.location.city}, {BUSINESS.location.provinceFull}
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-foreground">Courriel</p>
            <a
              href={`mailto:${BUSINESS.contact.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {BUSINESS.contact.email}
            </a>
          </div>
        </li>
        {BUSINESS.contact.phone !== "TODO" ? (
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 text-primary" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-foreground">Téléphone</p>
              <a
                href={`tel:${BUSINESS.contact.phone}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {BUSINESS.contact.phone}
              </a>
            </div>
          </li>
        ) : null}
        <li className="flex items-start gap-3">
          <Clock className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-foreground">Délai de réponse</p>
            <p className="text-muted-foreground">
              Je réponds personnellement à chaque questionnaire sous 48 heures.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
