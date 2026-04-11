import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ParsedMarkdown<TFrontmatter> = {
  frontmatter: TFrontmatter;
  body: string;
};

export function readMarkdown<TFrontmatter>(
  relativePath: string,
): ParsedMarkdown<TFrontmatter> {
  const filePath = path.join(/* turbopackIgnore: true */ process.cwd(), relativePath);
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const parsed = matter(fileContent);
    return {
      frontmatter: parsed.data as TFrontmatter,
      body: parsed.content,
    };
  } catch (err) {
    throw new Error(
      `Failed to read "${relativePath}": ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

export function listMarkdownSlugs(relativeDir: string): string[] {
  const dirPath = path.join(/* turbopackIgnore: true */ process.cwd(), relativeDir);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
