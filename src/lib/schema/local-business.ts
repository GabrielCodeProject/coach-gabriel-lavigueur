import { BUSINESS } from "@/lib/business-data";

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": [BUSINESS.schemaType.main, BUSINESS.schemaType.subtype],
    "@id": `${BUSINESS.contact.website}#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: BUSINESS.contact.website,
    telephone: BUSINESS.contact.phone,
    email: BUSINESS.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.location.streetAddress,
      addressLocality: BUSINESS.location.city,
      addressRegion: BUSINESS.location.province,
      postalCode: BUSINESS.location.postalCode,
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
