import { z } from "zod";
import { seoSchema } from "./seo.schema";

// ---------------------------------------------------------------------------
// Base — shared by every page schema
// ---------------------------------------------------------------------------

const basePageSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  seo: seoSchema.optional(),
});

// ---------------------------------------------------------------------------
// Page schemas (extend base)
// ---------------------------------------------------------------------------

export const homePageSchema = basePageSchema.extend({
  hero_eyebrow: z.string().min(1),
  hero_title: z.string().min(1),
  hero_subtitle: z.string().min(1),
  hero_body_text: z.string().optional(),
  hero_cta_label: z.string().min(1),
  hero_image: z.string().optional(),
  fitlog_highlight_title: z.string().optional(),
  fitlog_highlight_body: z.string().optional(),
});

export const aboutPageSchema = basePageSchema.extend({
  intro_title: z.string().min(1),
  intro_body: z.string().min(1),
  credentials: z.array(z.string()).optional(),
});

const methodStepSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  icon_name: z.string().min(1),
});

export const methodPageSchema = basePageSchema.extend({
  intro: z.string().min(1),
  steps: z.array(methodStepSchema),
});

export const servicesPageSchema = basePageSchema.extend({
  intro: z.string().min(1),
  pricing_notice_title: z.string().min(1),
  pricing_notice_body: z.string().min(1),
});

export const contactPageSchema = basePageSchema.extend({
  intro: z.string().min(1),
  form_intro: z.string().min(1),
  response_time_note: z.string().min(1),
});

// YAML auto-coerces bare date literals (2026-04-10) to JS Date objects.
// Accept both: strings pass through, Dates are normalised to YYYY-MM-DD.
const yamlDateString = z.union([
  z.string().min(1),
  z.date().transform((d) => d.toISOString().split("T")[0]),
]);

export const legalPageSchema = basePageSchema.extend({
  updated_at: yamlDateString,
});

// ---------------------------------------------------------------------------
// Derived TypeScript types — Zod is the single source of truth
// ---------------------------------------------------------------------------

export type PageFrontmatter = z.infer<typeof basePageSchema>;
export type HomePageFrontmatter = z.infer<typeof homePageSchema>;
export type AboutPageFrontmatter = z.infer<typeof aboutPageSchema>;
export type MethodStep = z.infer<typeof methodStepSchema>;
export type MethodPageFrontmatter = z.infer<typeof methodPageSchema>;
export type ServicesPageFrontmatter = z.infer<typeof servicesPageSchema>;
export type ContactPageFrontmatter = z.infer<typeof contactPageSchema>;
export type LegalPageFrontmatter = z.infer<typeof legalPageSchema>;
