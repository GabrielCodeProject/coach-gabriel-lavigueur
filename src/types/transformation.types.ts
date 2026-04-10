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

export type TransformationFrontmatter = {
  client_name: string;
  before_image: string;
  after_image: string;
  duration_months: number;
  goal_tag: TransformationGoalTag;
  starting_weight_kg?: number;
  ending_weight_kg?: number;
  body_fat_delta_pct?: number;
  waist_delta_cm?: number;
  short_testimonial: string;
  long_story?: string;
  published_date: string;
  featured: boolean;
};

export type Transformation = TransformationFrontmatter & {
  slug: string;
  body: string;
};
