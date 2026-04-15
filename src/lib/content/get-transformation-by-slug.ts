import { cache } from "react";
import { readMarkdown, ContentValidationError } from "./read-markdown";
import { transformationFrontmatterSchema } from "@/lib/schemas/transformation.schema";
import type { Transformation } from "@/lib/schemas/transformation.schema";

const TRANSFORMATIONS_DIR = "content/transformations";

export const getTransformationBySlug = cache((slug: string): Transformation | null => {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const { frontmatter, body } = readMarkdown(
      `${TRANSFORMATIONS_DIR}/${slug}.md`,
      transformationFrontmatterSchema,
    );
    return { ...frontmatter, slug, body };
  } catch (err) {
    // Validation errors must never be silenced — they fail the build loudly
    if (err instanceof ContentValidationError) throw err;
    // File-not-found or other read errors → 404
    return null;
  }
});
