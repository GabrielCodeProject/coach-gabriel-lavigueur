// Re-export only — Zod schema in @/lib/schemas/service.schema is the source of truth.
// All existing import paths from @/types/service.types remain valid.
export { SERVICE_ID } from "@/lib/schemas/service.schema";
export type { ServiceId, ServiceFrontmatter, Service } from "@/lib/schemas/service.schema";
