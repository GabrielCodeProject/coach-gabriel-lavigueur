import { readMarkdown } from "./read-markdown";
import type { FaqPageFrontmatter } from "@/types/faq.types";

const FAQ_PATH = "content/pages/faq.md";

export function getFaq(): FaqPageFrontmatter {
  const { frontmatter } = readMarkdown<FaqPageFrontmatter>(FAQ_PATH);
  return frontmatter;
}
