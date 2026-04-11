import { notFound } from "next/navigation";
import { readMarkdown } from "./read-markdown";
import type { Page, PageFrontmatter } from "@/types/page.types";

const PAGES_DIR = "content/pages";

export function getPage<TFrontmatter extends PageFrontmatter = PageFrontmatter>(
  slug: string,
): Page<TFrontmatter> {
  if (!/^[a-z0-9-]+$/.test(slug)) return notFound();
  try {
    const { frontmatter, body } = readMarkdown<TFrontmatter>(
      `${PAGES_DIR}/${slug}.md`,
    );
    return { slug, frontmatter, body };
  } catch {
    return notFound();
  }
}
