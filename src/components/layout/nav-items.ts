import { ROUTES } from "@/lib/routes";

export type NavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV_ITEMS: readonly NavItem[] = [
  { label: "Accueil", href: ROUTES.HOME },
  { label: "À propos", href: ROUTES.ABOUT },
  { label: "Ma méthode", href: ROUTES.METHOD },
  { label: "Mes services", href: ROUTES.SERVICES },
  { label: "Transformations", href: ROUTES.TRANSFORMATIONS },
  { label: "FAQ", href: ROUTES.FAQ },
];
