import { listMarkdownSlugs, readMarkdown } from "./read-markdown";
import type {
  Transformation,
  TransformationFrontmatter,
} from "@/types/transformation.types";

const TRANSFORMATIONS_DIR = "content/transformations";

export function getTransformations(): Transformation[] {
  const slugs = listMarkdownSlugs(TRANSFORMATIONS_DIR);
  const transformations = slugs.map((slug) => {
    const { frontmatter, body } = readMarkdown<TransformationFrontmatter>(
      `${TRANSFORMATIONS_DIR}/${slug}.md`,
    );
    return { ...frontmatter, slug, body };
  });
  return transformations.sort(
    (a, b) =>
      new Date(b.published_date).getTime() -
      new Date(a.published_date).getTime(),
  );
}

export function getFeaturedTransformations(): Transformation[] {
  return getTransformations().filter((transformation) => transformation.featured);
}

export function getTransformationSlugs(): string[] {
  return listMarkdownSlugs(TRANSFORMATIONS_DIR);
}
