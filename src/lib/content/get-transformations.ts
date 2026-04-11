import { cache } from "react";
import { listMarkdownSlugs, readMarkdown } from "./read-markdown";
import type {
  Transformation,
  TransformationFrontmatter,
} from "@/types/transformation.types";

const TRANSFORMATIONS_DIR = "content/transformations";

export const getTransformations = cache((): Transformation[] => {
  const slugs = listMarkdownSlugs(TRANSFORMATIONS_DIR);
  const transformations = slugs.map((slug) => {
    const { frontmatter, body } = readMarkdown<TransformationFrontmatter>(
      `${TRANSFORMATIONS_DIR}/${slug}.md`,
    );
    return { ...frontmatter, slug, body };
  });
  return transformations.sort((a, b) => {
    const aTime = new Date(a.published_date).getTime();
    const bTime = new Date(b.published_date).getTime();
    if (isNaN(aTime) || isNaN(bTime)) return 0;
    return bTime - aTime;
  });
});

export function getFeaturedTransformations(): Transformation[] {
  return getTransformations().filter((transformation) => transformation.featured);
}

export function getTransformationSlugs(): string[] {
  return listMarkdownSlugs(TRANSFORMATIONS_DIR);
}
