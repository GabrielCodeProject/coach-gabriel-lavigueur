import { readMarkdown } from "./read-markdown";
import { transformationFrontmatterSchema } from "@/lib/schemas/transformation.schema";
import type { Transformation } from "@/lib/schemas/transformation.schema";

const TRANSFORMATIONS_DIR = "content/transformations";

export function getTransformationBySlug(slug: string): Transformation | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const { frontmatter, body } = readMarkdown(
      `${TRANSFORMATIONS_DIR}/${slug}.md`,
      transformationFrontmatterSchema,
    );
    return { ...frontmatter, slug, body };
  } catch {
    return null;
  }
}
