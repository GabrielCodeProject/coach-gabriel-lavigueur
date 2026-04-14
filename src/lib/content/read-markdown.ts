import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type ParsedMarkdown<T> = {
  frontmatter: T;
  body: string;
};

/** Re-usable page shape — augmented by content loaders with slug/body */
export type Page<TFrontmatter> = {
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
};

// ---------------------------------------------------------------------------
// Error — distinguishes validation failures from file-read failures.
// Callers that want notFound() behaviour must catch file errors separately
// and re-throw ContentValidationError so the build fails loudly.
// ---------------------------------------------------------------------------

export class ContentValidationError extends Error {
  constructor(relativePath: string, zodError: z.ZodError) {
    const issues = zodError.issues
      .map((i) => `  • ${i.path.join(".") || "(root)"} — ${i.message}`)
      .join("\n");
    super(
      `[content] Frontmatter validation failed in "${relativePath}":\n${issues}`,
    );
    this.name = "ContentValidationError";
  }
}

// ---------------------------------------------------------------------------
// Core reader — schema is required; all unsafe casts are eliminated
// ---------------------------------------------------------------------------

export function readMarkdown<TSchema extends z.ZodTypeAny>(
  relativePath: string,
  schema: TSchema,
): ParsedMarkdown<z.infer<TSchema>> {
  const filePath = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    relativePath,
  );
  // Let file-read errors propagate as-is (ENOENT etc.) — callers decide 404 vs throw
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(fileContent);
  try {
    return {
      frontmatter: schema.parse(parsed.data) as z.infer<TSchema>,
      body: parsed.content,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new ContentValidationError(relativePath, err);
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Directory helper — unchanged
// ---------------------------------------------------------------------------

export function listMarkdownSlugs(relativeDir: string): string[] {
  const dirPath = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    relativeDir,
  );
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
