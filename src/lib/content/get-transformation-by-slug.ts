import { readMarkdown } from "./read-markdown";
import type {
  Transformation,
  TransformationFrontmatter,
} from "@/types/transformation.types";

const TRANSFORMATIONS_DIR = "content/transformations";

export function getTransformationBySlug(slug: string): Transformation | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const { frontmatter, body } = readMarkdown<TransformationFrontmatter>(
      `${TRANSFORMATIONS_DIR}/${slug}.md`,
    );
    return { ...frontmatter, slug, body };
  } catch {
    return null;
  }
}
