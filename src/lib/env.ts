import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_PATH: z.string().default(""),
  // Empty string default: dev works without the key (form shows error on submit);
  // CI must set this via NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY secret — see deploy.yml.
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: z.string().default(""),
  // Umami Cloud analytics site ID — public value, safe to ship in source
  NEXT_PUBLIC_UMAMI_SITE_ID: z.string().default("4479bc09-0439-43f5-8c09-fd61050abab1"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
  NEXT_PUBLIC_UMAMI_SITE_ID: process.env.NEXT_PUBLIC_UMAMI_SITE_ID,
});

export type AppEnv = typeof env;
