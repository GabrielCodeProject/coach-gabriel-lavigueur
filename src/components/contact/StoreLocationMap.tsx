import { BUSINESS } from "@/lib/business-data";

export function StoreLocationMap() {
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
