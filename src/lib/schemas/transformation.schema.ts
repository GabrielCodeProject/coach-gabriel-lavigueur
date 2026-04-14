import { z } from "zod";

// ---------------------------------------------------------------------------
// Const maps — single canonical definitions
// ---------------------------------------------------------------------------

export const TRANSFORMATION_GOAL_TAG = {
  PERTE_DE_POIDS: "perte-de-poids",
  PRISE_DE_MASSE: "prise-de-masse",
  RECOMPOSITION: "recomposition",
  POST_GROSSESSE: "post-grossesse",
  PERFORMANCE: "performance",
} as const;

export type TransformationGoalTag =
  (typeof TRANSFORMATION_GOAL_TAG)[keyof typeof TRANSFORMATION_GOAL_TAG];

export const TRANSFORMATION_GOAL_LABEL: Record<TransformationGoalTag, string> = {
  "perte-de-poids": "Perte de poids",
  "prise-de-masse": "Prise de masse",
  recomposition: "Recomposition",
  "post-grossesse": "Post-grossesse",
  performance: "Performance",
};

// ---------------------------------------------------------------------------
// Schema — enum derived from const map values (no duplication)
// ---------------------------------------------------------------------------

const _goalTagValues = Object.values(TRANSFORMATION_GOAL_TAG) as [
  TransformationGoalTag,
  ...TransformationGoalTag[],
];

export const transformationFrontmatterSchema = z.object({
  client_name: z.string().min(1),
  before_image: z.string().min(1),
  after_image: z.string().min(1),
  duration_months: z.number().int().min(1),
  goal_tag: z.enum(_goalTagValues),
  starting_weight_kg: z.number().optional(),
  ending_weight_kg: z.number().optional(),
  body_fat_delta_pct: z.number().optional(),
  waist_delta_cm: z.number().optional(),
  short_testimonial: z.string().min(1),
  long_story: z.string().optional(),
  // Regex replaces the manual new Date().getTime() check in get-transformations.ts
  published_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format"),
  featured: z.boolean(),
});

// ---------------------------------------------------------------------------
// Derived types
// ---------------------------------------------------------------------------

export type TransformationFrontmatter = z.infer<typeof transformationFrontmatterSchema>;
export type Transformation = TransformationFrontmatter & { slug: string; body: string };
