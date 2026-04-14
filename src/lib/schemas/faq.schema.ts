import { z } from "zod";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqPageSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  intro: z.string().min(1),
  items: z.array(faqItemSchema),
});

// ---------------------------------------------------------------------------
// Derived types
// ---------------------------------------------------------------------------

export type FaqItem = z.infer<typeof faqItemSchema>;
export type FaqPageFrontmatter = z.infer<typeof faqPageSchema>;
