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
    certifications: ["Diplômé de l'Institut AAT"] as readonly string[],
    yearsOfExperience: 13,
  },

  location: {
    storeName: "Nutrition Suprême",
    city: "Sainte-Thérèse",
    province: "QC",
    provinceFull: "Québec",
    country: "CA",
    countryFull: "Canada",
    streetAddress: "204 rue Saint-Charles, Suite 105",
    postalCode: "J7E 2B4",
    coordinates: {
      latitude: 45.6438435,
      longitude: -73.8592858,
    },
    googleMapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.0725595105505!2d-73.86168392344585!3d45.64395322142687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc928653f499d97%3A0x38c7959dd0c245a8!2s204%20Rue%20St-Charles%20App%20105%2C%20Sainte-Th%C3%A9r%C3%A8se%2C%20QC%20J7E%202B4!5e1!3m2!1sfr!2sca!4v1776184643779!5m2!1sfr!2sca",
  },

  contact: {
    email: "gabrielprivermsg@gmail.com",
    phone: "+1-450-434-0882",
    website: "https://coachgab.nutrition-supreme.com",
  },

  businessHours: {
    timezone: "America/Toronto",
    // Horaires de consultation au Nutrition Suprême — SSOT: modifier ici uniquement
    schedule: [
      { days: ["Thursday", "Friday"] as readonly string[], opens: "10:00", closes: "12:00" },
      { days: ["Saturday"] as readonly string[], opens: "08:00", closes: "09:30" },
      { days: ["Saturday"] as readonly string[], opens: "17:00", closes: "19:00" },
    ],
  },

  cta: {
    primary: "Dis-moi où tu en es",
    nav: "Commencer",
  },

  stats: [
    { value: "13 ans", label: "de pratique personnelle" },
    { value: "Certifié", label: "Institut AAT" },
    { value: "3", label: "transformations documentées" },
  ],

  socials: [
    { platform: "instagram" as const, url: "", enabled: false as boolean },
    { platform: "facebook" as const, url: "", enabled: false as boolean },
  ],

  testimonials: {
    enabled: false as boolean,
    philosophyQuote:
      "Je ne vends pas une transformation express. Je construis avec toi les habitudes qui durent.",
    items: [] as readonly { name: string; quote: string; enabled: boolean }[],
  },

  transformations: {
    enabled: false as boolean,
  },

  credentials: {
    formation:
      "Diplômé de l'Institut AAT — formation qui a confirmé 13 ans de pratique personnelle",
    equipe: "Coach au sein de l'équipe Nutrition Suprême, Sainte-Thérèse",
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
