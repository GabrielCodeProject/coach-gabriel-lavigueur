import { BUSINESS } from "@/lib/business-data";
import { absoluteUrl } from "@/lib/seo/build-metadata";

export function buildWebsiteSchema() {
  const siteRoot = absoluteUrl("/");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteRoot}#website`,
    name: BUSINESS.name,
    url: siteRoot,
    description: BUSINESS.description,
    inLanguage: "fr-CA",
    publisher: {
      "@type": "LocalBusiness",
      "@id": `${siteRoot}#business`,
      name: BUSINESS.name,
    },
  };
}
