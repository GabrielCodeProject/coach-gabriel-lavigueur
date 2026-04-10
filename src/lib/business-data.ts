export const BUSINESS = {
  name: "Coach Gabriel Lavigueur",
  legalName: "Gabriel Lavigueur",
  tagline: "Coach en nutrition et entraînement — Nutrition Suprême Sainte-Thérèse",
  description:
    "Plans d'entraînement et nutritionnels personnalisés, conçus en personne au Nutrition Suprême de Sainte-Thérèse et livrés via l'app Fitlog.",

  coach: {
    firstName: "Gabriel",
    lastName: "Lavigueur",
    fullName: "Gabriel Lavigueur",
    // TODO: ajouter certifications (ex. kinésiologue, entraîneur personnel certifié, etc.)
    certifications: [] as readonly string[],
    // TODO: années d'expérience
    yearsOfExperience: 0,
  },

  location: {
    storeName: "Nutrition Suprême",
    city: "Sainte-Thérèse",
    province: "QC",
    provinceFull: "Québec",
    country: "CA",
    countryFull: "Canada",
    // TODO: adresse exacte de la boutique Nutrition Suprême de Sainte-Thérèse
    streetAddress: "TODO",
    // TODO: code postal exact
    postalCode: "TODO",
    coordinates: {
      // Coordonnées approximatives de Sainte-Thérèse — TODO: affiner avec l'adresse précise du commerce
      latitude: 45.637,
      longitude: -73.8495,
    },
    // TODO: src de l'iframe Google Maps (obtenir via partage → intégrer une carte sur google.com/maps)
    googleMapsEmbedSrc: "TODO",
  },

  contact: {
    // TODO: courriel officiel du coach (servira aussi de destination Web3Forms)
    email: "TODO@coachgabriellavigueur.ca",
    // TODO: numéro de téléphone
    phone: "TODO",
    // TODO: domaine final — placeholder GitHub Pages pour démarrer
    website: "https://gabrielcodeproject.github.io/coach-gabriel-lavigueur/",
  },

  businessHours: {
    timezone: "America/Toronto",
    // TODO: horaires réels des consultations au Nutrition Suprême
    schedule: "TODO",
  },

  tools: {
    fitlog: {
      name: "Fitlog",
      url: "https://fitlog.io/",
      description:
        "Plateforme mobile utilisée pour livrer les plans, suivre les progrès et communiquer avec Gabriel directement.",
    },
  },

  schemaType: {
    main: "LocalBusiness",
    subtype: "HealthClub",
    additionalTypes: ["ProfessionalService", "SportsActivityLocation"],
  },

  serviceArea: {
    primary: "Sainte-Thérèse, QC",
    regions: [
      "Sainte-Thérèse",
      "Blainville",
      "Rosemère",
      "Boisbriand",
      "Bois-des-Filion",
      "Lorraine",
      "Mirabel",
      "Laval",
    ],
    radiusKm: 25,
  },

  keywords: [
    "coach nutrition Sainte-Thérèse",
    "entraîneur personnel Sainte-Thérèse",
    "plan entraînement personnalisé Rive-Nord",
    "coach musculation Québec",
    "Nutrition Suprême coaching",
    "Gabriel Lavigueur coach",
    "plan nutritionnel personnalisé Québec",
    "coaching fitness Basses-Laurentides",
  ],
} as const;

export type BusinessData = typeof BUSINESS;
