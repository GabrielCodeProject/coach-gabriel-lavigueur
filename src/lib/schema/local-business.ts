import { BUSINESS } from "@/lib/business-data";
import { absoluteUrl } from "@/lib/seo/build-metadata";

export function buildLocalBusinessSchema() {
  const siteRoot = absoluteUrl("/");
  return {
    "@context": "https://schema.org",
    "@type": [BUSINESS.schemaType.main, BUSINESS.schemaType.subtype],
    "@id": `${siteRoot}#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: siteRoot,
    logo: {
      "@type": "ImageObject",
      url: `${siteRoot}images/default/logo.png`,
      width: 600,
      height: 471,
    },
    // TODO: replace "TODO" values in business-data.ts with real address/phone before going live
    ...(BUSINESS.contact.phone !== "TODO" && { telephone: BUSINESS.contact.phone }),
    email: BUSINESS.contact.email,
    address: {
      "@type": "PostalAddress",
      ...(BUSINESS.location.streetAddress !== "TODO" && { streetAddress: BUSINESS.location.streetAddress }),
      addressLocality: BUSINESS.location.city,
      addressRegion: BUSINESS.location.province,
      ...(BUSINESS.location.postalCode !== "TODO" && { postalCode: BUSINESS.location.postalCode }),
      addressCountry: BUSINESS.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.location.coordinates.latitude,
      longitude: BUSINESS.location.coordinates.longitude,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.location.coordinates.latitude,
        longitude: BUSINESS.location.coordinates.longitude,
      },
      geoRadius: `${BUSINESS.serviceArea.radiusKm * 1000}`,
    },
    additionalType: BUSINESS.schemaType.additionalTypes,
    openingHoursSpecification: BUSINESS.businessHours.schedule.map((slot) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: [...slot.days],
      opens: slot.opens,
      closes: slot.closes,
    })),
  };
}
