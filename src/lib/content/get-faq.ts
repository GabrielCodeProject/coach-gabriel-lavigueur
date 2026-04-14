import { cache } from "react";
import { readMarkdown } from "./read-markdown";
import { faqPageSchema } from "@/lib/schemas/faq.schema";
import type { FaqPageFrontmatter } from "@/lib/schemas/faq.schema";

const FAQ_PATH = "content/pages/faq.md";

export const getFaq = cache((): FaqPageFrontmatter => {
  const { frontmatter } = readMarkdown(FAQ_PATH, faqPageSchema);
  return frontmatter;
});
