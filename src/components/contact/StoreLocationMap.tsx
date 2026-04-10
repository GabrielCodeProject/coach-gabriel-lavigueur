import { BUSINESS } from "@/lib/business-data";

export function StoreLocationMap() {
  if (BUSINESS.location.googleMapsEmbedSrc === "TODO") {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card p-6 text-center">
        <p className="text-sm font-semibold text-foreground">
          Carte à venir
        </p>
        <p className="max-w-xs text-xs text-muted-foreground">
          L'adresse exacte et la carte Google Maps seront publiées prochainement. En attendant, le commerce est situé à {BUSINESS.location.city}, {BUSINESS.location.provinceFull}.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        src={BUSINESS.location.googleMapsEmbedSrc}
        className="aspect-[4/3] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Carte — ${BUSINESS.location.storeName}`}
      />
    </div>
  );
}
