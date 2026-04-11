export const NIVEAU_ACTIVITE = {
  SEDENTAIRE: "sedentaire",
  LEGER: "leger",
  MODERE: "modere",
  ACTIF: "actif",
  TRES_ACTIF: "tres-actif",
} as const;

export type NiveauActivite =
  (typeof NIVEAU_ACTIVITE)[keyof typeof NIVEAU_ACTIVITE];

export const NIVEAU_ACTIVITE_LABEL: Record<NiveauActivite, string> = {
  sedentaire: "Sédentaire (bureau, peu de mouvement)",
  leger: "Léger (marche, activité occasionnelle)",
  modere: "Modéré (2–3 séances par semaine)",
  actif: "Actif (4–5 séances par semaine)",
  "tres-actif": "Très actif (6+ séances par semaine)",
};

export const OBJECTIF_PRINCIPAL = {
  PERTE_DE_POIDS: "perte-de-poids",
  PRISE_DE_MASSE: "prise-de-masse",
  RECOMPOSITION: "recomposition",
  PERFORMANCE: "performance",
  SANTE_BIEN_ETRE: "sante-bien-etre",
} as const;

export type ObjectifPrincipal =
  (typeof OBJECTIF_PRINCIPAL)[keyof typeof OBJECTIF_PRINCIPAL];

export const OBJECTIF_PRINCIPAL_LABEL: Record<ObjectifPrincipal, string> = {
  "perte-de-poids": "Perte de poids",
  "prise-de-masse": "Prise de masse musculaire",
  recomposition: "Recomposition corporelle",
  performance: "Performance sportive",
  "sante-bien-etre": "Santé et bien-être général",
};

export const BUDGET_FOURCHETTE = {
  MOINS_125: "moins-125",
  DE_125_A_250: "125-250",
  DE_250_A_500: "250-500",
  PLUS_500: "plus-500",
} as const;

export type BudgetFourchette =
  (typeof BUDGET_FOURCHETTE)[keyof typeof BUDGET_FOURCHETTE];

export const BUDGET_FOURCHETTE_LABEL: Record<BudgetFourchette, string> = {
  "moins-125": "Moins de 125 $",
  "125-250": "125 $ – 250 $",
  "250-500": "250 $ – 500 $",
  "plus-500": "Plus de 500 $",
};

export const SOURCE_PROSPECT = {
  GOOGLE: "google",
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
  BOUCHE_A_OREILLE: "bouche-a-oreille",
  NUTRITION_SUPREME: "nutrition-supreme",
  AUTRE: "autre",
} as const;

export type SourceProspect =
  (typeof SOURCE_PROSPECT)[keyof typeof SOURCE_PROSPECT];

export const SOURCE_PROSPECT_LABEL: Record<SourceProspect, string> = {
  google: "Google / moteur de recherche",
  instagram: "Instagram",
  facebook: "Facebook",
  "bouche-a-oreille": "Bouche-à-oreille",
  "nutrition-supreme": "Au Nutrition Suprême",
  autre: "Autre",
};

export const PLAGE_HORAIRE = {
  MATIN: "matin",
  APRES_MIDI: "apres-midi",
  SOIR: "soir",
} as const;

export type PlageHoraire = (typeof PLAGE_HORAIRE)[keyof typeof PLAGE_HORAIRE];

export const PLAGE_HORAIRE_LABEL: Record<PlageHoraire, string> = {
  matin: "Matin",
  "apres-midi": "Après-midi",
  soir: "Soir",
};

export const JOUR_SEMAINE = {
  LUNDI: "lundi",
  MARDI: "mardi",
  MERCREDI: "mercredi",
  JEUDI: "jeudi",
  VENDREDI: "vendredi",
  SAMEDI: "samedi",
  DIMANCHE: "dimanche",
} as const;

export type JourSemaine = (typeof JOUR_SEMAINE)[keyof typeof JOUR_SEMAINE];

export const JOUR_SEMAINE_LABEL: Record<JourSemaine, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
  samedi: "Samedi",
  dimanche: "Dimanche",
};
