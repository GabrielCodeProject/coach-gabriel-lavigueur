import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_PATH: z.string().default(""),
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is required for the questionnaire")
    .default("TODO_SET_VIA_GITHUB_SECRET_OR_ENV_LOCAL"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
});

export type AppEnv = typeof env;
