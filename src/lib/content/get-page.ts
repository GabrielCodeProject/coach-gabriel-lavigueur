import { cache } from "react";
import { notFound } from "next/navigation";
import { z } from "zod";
import { ContentValidationError, readMarkdown } from "./read-markdown";
import type { Page } from "./read-markdown";

const PAGES_DIR = "content/pages";

// Internal cached reader — deduplicates FS reads within a single render pass.
// Uses Page<unknown> because cache() cannot preserve the schema generic.
// The public getPage() restores the precise type via a justified cast.
const _readPageCached = cache(
  (slug: string, schema: z.ZodTypeAny): Page<unknown> => {
    if (!/^[a-z0-9-]+$/.test(slug)) return notFound();
    try {
      const { frontmatter, body } = readMarkdown(
        `${PAGES_DIR}/${slug}.md`,
        schema,
      );
      return { slug, frontmatter, body };
    } catch (err) {
      // Validation errors must never be swallowed — they fail the build loudly
      if (err instanceof ContentValidationError) throw err;
      // File-not-found or other read errors → 404
      return notFound();
    }
  },
);

/**
 * Load and validate a page by slug.
 *
 * The schema is the single source of truth for the frontmatter shape.
 * TypeScript infers the return type directly from the schema — no type
 * parameter needed at the call site.
 *
 * @example
 * import { homePageSchema } from "@/lib/schemas/page.schema";
 * const { frontmatter } = getPage("accueil", homePageSchema);
 * // frontmatter: HomePageFrontmatter — fully inferred
 */
export function getPage<TSchema extends z.ZodTypeAny>(
  slug: string,
  schema: TSchema,
): Page<z.infer<TSchema>> {
  // Cast is safe: schema.parse() inside readMarkdown guarantees runtime shape.
  return _readPageCached(slug, schema) as Page<z.infer<TSchema>>;
}
