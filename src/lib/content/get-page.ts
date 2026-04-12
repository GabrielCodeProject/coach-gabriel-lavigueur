import { cache } from "react";
import { notFound } from "next/navigation";
import { readMarkdown } from "./read-markdown";
import type { Page, PageFrontmatter } from "@/types/page.types";

const PAGES_DIR = "content/pages";

// Internal cached reader — deduplicates FS reads within a single render pass
const readPageCached = cache((slug: string): Page<PageFrontmatter> => {
  if (!/^[a-z0-9-]+$/.test(slug)) return notFound();
  try {
    const { frontmatter, body } = readMarkdown<PageFrontmatter>(
      `${PAGES_DIR}/${slug}.md`,
    );
    return { slug, frontmatter, body };
  } catch {
    return notFound();
  }
});

export function getPage<TFrontmatter extends PageFrontmatter = PageFrontmatter>(
  slug: string,
): Page<TFrontmatter> {
  return readPageCached(slug) as Page<TFrontmatter>;
}
