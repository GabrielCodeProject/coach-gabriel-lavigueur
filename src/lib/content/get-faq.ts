import { cache } from "react";
import { readMarkdown } from "./read-markdown";
import type { FaqPageFrontmatter } from "@/types/faq.types";

const FAQ_PATH = "content/pages/faq.md";

export const getFaq = cache((): FaqPageFrontmatter => {
  const { frontmatter } = readMarkdown<FaqPageFrontmatter>(FAQ_PATH);
  return frontmatter;
});
