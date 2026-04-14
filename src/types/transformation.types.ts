// Re-export only — Zod schema in @/lib/schemas/transformation.schema is the source of truth.
// All existing import paths from @/types/transformation.types remain valid.
export {
  TRANSFORMATION_GOAL_TAG,
  TRANSFORMATION_GOAL_LABEL,
} from "@/lib/schemas/transformation.schema";
export type {
  TransformationGoalTag,
  TransformationFrontmatter,
  Transformation,
} from "@/lib/schemas/transformation.schema";
