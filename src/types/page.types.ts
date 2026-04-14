// Re-export only — Zod schemas in @/lib/schemas/page.schema are the source of truth.
// All existing import paths from @/types/page.types remain valid.
export type {
  PageFrontmatter,
  HomePageFrontmatter,
  AboutPageFrontmatter,
  MethodStep,
  MethodPageFrontmatter,
  ServicesPageFrontmatter,
  ContactPageFrontmatter,
  LegalPageFrontmatter,
} from "@/lib/schemas/page.schema";

// Page<T> lives in read-markdown — re-exported here for backward compatibility
export type { Page } from "@/lib/content/read-markdown";
