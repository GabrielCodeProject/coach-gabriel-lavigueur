import { BUSINESS } from "@/lib/business-data";
import { CURRENCY_CODE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo/build-metadata";
import type { Service } from "@/types/service.types";

export function buildOfferCatalogSchema(services: readonly Service[]) {
  const siteRoot = absoluteUrl("/");
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Services — ${BUSINESS.name}`,
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      name: service.name,
      description: service.short_description,
      price: service.price_cad,
      priceCurrency: CURRENCY_CODE,
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.short_description,
        provider: {
          "@type": "LocalBusiness",
          name: BUSINESS.name,
          "@id": `${siteRoot}#business`,
        },
      },
    })),
  };
}
