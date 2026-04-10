import { z } from "zod";
import {
  NIVEAU_ACTIVITE,
  OBJECTIF_PRINCIPAL,
  BUDGET_FOURCHETTE,
  SOURCE_PROSPECT,
} from "@/types/questionnaire.types";

export const questionnaireSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Ton nom doit contenir au moins 2 caractères")
    .max(80, "80 caractères maximum"),
  email: z
    .string()
    .trim()
    .email("Adresse courriel invalide"),
  telephone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  age: z
    .number()
    .int("Âge invalide")
    .min(16, "16 ans minimum")
    .max(99, "99 ans maximum"),
  taille_cm: z
    .number()
    .int("Taille invalide")
    .min(100, "100 cm minimum")
    .max(230, "230 cm maximum"),
  poids_kg: z
    .number()
    .min(30, "30 kg minimum")
    .max(300, "300 kg maximum"),
  niveau_activite: z.enum([
    NIVEAU_ACTIVITE.SEDENTAIRE,
    NIVEAU_ACTIVITE.LEGER,
    NIVEAU_ACTIVITE.MODERE,
    NIVEAU_ACTIVITE.ACTIF,
    NIVEAU_ACTIVITE.TRES_ACTIF,
  ]),
  historique_entrainement: z.string().max(2000).optional().or(z.literal("")),
  objectif_principal: z.enum([
    OBJECTIF_PRINCIPAL.PERTE_DE_POIDS,
    OBJECTIF_PRINCIPAL.PRISE_DE_MASSE,
    OBJECTIF_PRINCIPAL.RECOMPOSITION,
    OBJECTIF_PRINCIPAL.PERFORMANCE,
    OBJECTIF_PRINCIPAL.SANTE_BIEN_ETRE,
  ]),
  echeance_mois: z
    .number()
    .int()
    .min(1, "1 mois minimum")
    .max(60, "60 mois maximum"),
  blessures: z.string().max(2000).optional().or(z.literal("")),
  conditions_medicales: z.string().max(2000).optional().or(z.literal("")),
  restrictions_alimentaires: z.string().max(500).optional().or(z.literal("")),
  seances_par_semaine: z
    .number()
    .int()
    .min(1, "1 séance minimum")
    .max(7, "7 séances maximum"),
  budget_fourchette: z.enum([
    BUDGET_FOURCHETTE.MOINS_125,
    BUDGET_FOURCHETTE.DE_125_A_250,
    BUDGET_FOURCHETTE.DE_250_A_500,
    BUDGET_FOURCHETTE.PLUS_500,
  ]),
  pourquoi_maintenant: z
    .string()
    .trim()
    .min(20, "Au moins 20 caractères — c'est souvent ici que je comprends le mieux où tu en es")
    .max(2000),
  source: z.enum([
    SOURCE_PROSPECT.GOOGLE,
    SOURCE_PROSPECT.INSTAGRAM,
    SOURCE_PROSPECT.FACEBOOK,
    SOURCE_PROSPECT.BOUCHE_A_OREILLE,
    SOURCE_PROSPECT.NUTRITION_SUPREME,
    SOURCE_PROSPECT.AUTRE,
  ]),
  consentement_rgpd: z
    .boolean()
    .refine((value) => value === true, {
      message: "Tu dois accepter la politique de confidentialité",
    }),
});

export type QuestionnaireInput = z.infer<typeof questionnaireSchema>;

export const QUESTIONNAIRE_DEFAULT_VALUES: QuestionnaireInput = {
  nom: "",
  email: "",
  telephone: "",
  age: 30,
  taille_cm: 170,
  poids_kg: 70,
  niveau_activite: NIVEAU_ACTIVITE.MODERE,
  historique_entrainement: "",
  objectif_principal: OBJECTIF_PRINCIPAL.PERTE_DE_POIDS,
  echeance_mois: 6,
  blessures: "",
  conditions_medicales: "",
  restrictions_alimentaires: "",
  seances_par_semaine: 3,
  budget_fourchette: BUDGET_FOURCHETTE.DE_125_A_250,
  pourquoi_maintenant: "",
  source: SOURCE_PROSPECT.GOOGLE,
  consentement_rgpd: false,
};
