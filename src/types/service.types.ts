export const SERVICE_ID = {
  CONSULTATION_INITIALE: "consultation-initiale",
  PLAN_ENTRAINEMENT: "plan-entrainement",
  PLAN_NUTRITION: "plan-nutrition",
  SUIVI: "suivi",
} as const;

export type ServiceId = (typeof SERVICE_ID)[keyof typeof SERVICE_ID];

export type ServiceFrontmatter = {
  id: ServiceId;
  name: string;
  short_description: string;
  long_description?: string;
  price_cad: number;
  includes: readonly string[];
  is_one_time: boolean;
  sort_order: number;
  featured: boolean;
};

export type Service = ServiceFrontmatter & {
  slug: string;
};
