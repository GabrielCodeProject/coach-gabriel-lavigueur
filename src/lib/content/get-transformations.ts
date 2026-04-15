import { cache } from "react";
import { readMarkdown, listMarkdownSlugs } from "./read-markdown";
import { transformationFrontmatterSchema } from "@/lib/schemas/transformation.schema";
import type { Transformation } from "@/lib/schemas/transformation.schema";

const TRANSFORMATIONS_DIR = "content/transformations";

export const getTransformations = cache((): Transformation[] => {
  const slugs = listMarkdownSlugs(TRANSFORMATIONS_DIR);
  const transformations = slugs.map((slug) => {
    const { frontmatter, body } = readMarkdown(
      `${TRANSFORMATIONS_DIR}/${slug}.md`,
      transformationFrontmatterSchema,
    );
    return { ...frontmatter, slug, body };
  });
  // published_date is validated as a YYYY-MM-DD calendar date by the schema —
  // the regex + refine() in transformation.schema.ts guarantees new Date() is valid.
  return transformations.sort(
    (a, b) =>
      new Date(b.published_date).getTime() -
      new Date(a.published_date).getTime(),
  );
});

export function getFeaturedTransformations(): Transformation[] {
  return getTransformations().filter((t) => t.featured);
}

export function getTransformationSlugs(): string[] {
  return getTransformations().map((t) => t.slug);
}
