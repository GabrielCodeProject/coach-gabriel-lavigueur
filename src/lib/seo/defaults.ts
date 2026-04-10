import { BUSINESS } from "@/lib/business-data";
import { DEFAULT_SHARE_IMAGE } from "@/lib/constants";

export const SEO_DEFAULTS = {
  siteName: BUSINESS.name,
  titleTemplate: `%s | ${BUSINESS.name}`,
  defaultTitle: `${BUSINESS.name} — ${BUSINESS.tagline}`,
  defaultDescription: BUSINESS.description,
  defaultKeywords: BUSINESS.keywords,
  defaultShareImage: DEFAULT_SHARE_IMAGE,
  locale: "fr_CA",
  twitterHandle: undefined,
} as const;
