import { BUSINESS } from "@/lib/business-data";

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS.contact.website}#website`,
    name: BUSINESS.name,
    url: BUSINESS.contact.website,
    description: BUSINESS.description,
    inLanguage: "fr-CA",
    publisher: {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS.contact.website}#business`,
      name: BUSINESS.name,
    },
  };
}
