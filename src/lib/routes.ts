export const ROUTES = {
  HOME: "/",
  ABOUT: "/a-propos",
  METHOD: "/ma-methode",
  SERVICES: "/mes-services",
  TRANSFORMATIONS: "/transformations",
  TRANSFORMATION_DETAIL: (slug: string) => `/transformations/${slug}`,
  FAQ: "/faq",
  CONTACT: "/contact",
  LEGAL: "/mentions-legales",
  PRIVACY: "/politique-confidentialite",
} as const;

export type StaticRoute = Exclude<
  (typeof ROUTES)[keyof typeof ROUTES],
  (slug: string) => string
>;
