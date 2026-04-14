import { z } from "zod";

// ---------------------------------------------------------------------------
// Const map — single canonical definition of all valid service IDs
// ---------------------------------------------------------------------------

export const SERVICE_ID = {
  CONSULTATION_INITIALE: "consultation-initiale",
  PLAN_ENTRAINEMENT: "plan-entrainement",
  PLAN_NUTRITION: "plan-nutrition",
  SUIVI: "suivi",
} as const;

export type ServiceId = (typeof SERVICE_ID)[keyof typeof SERVICE_ID];

// ---------------------------------------------------------------------------
// Schema — enum derived from const map values (no duplication)
// ---------------------------------------------------------------------------

const _serviceIdValues = Object.values(SERVICE_ID) as [ServiceId, ...ServiceId[]];

export const serviceFrontmatterSchema = z.object({
  id: z.enum(_serviceIdValues),
  name: z.string().min(1),
  short_description: z.string().min(1),
  long_description: z.string().optional(),
  price_cad: z.number().int().min(0),
  includes: z.array(z.string()),
  is_one_time: z.boolean(),
  sort_order: z.number().int().min(0),
  featured: z.boolean(),
});

// ---------------------------------------------------------------------------
// Derived types
// ---------------------------------------------------------------------------

export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;
export type Service = ServiceFrontmatter & { slug: string };
