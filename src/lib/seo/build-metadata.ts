import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business-data";
import { env } from "@/lib/env";
import { SEO_DEFAULTS } from "./defaults";
import type { SeoFields } from "@/types/seo.types";

type BuildMetadataInput = {
  pageTitle: string;
  pageDescription: string;
  canonicalPath: string;
  seo?: SeoFields;
};

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const base = BUSINESS.contact.website.replace(/\/$/, "");
  const prefix = env.NEXT_PUBLIC_BASE_PATH;
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${prefix}${normalizedPath}`;
}

export function buildMetadata({
  pageTitle,
  pageDescription,
  canonicalPath,
  seo,
}: BuildMetadataInput): Metadata {
  const title = seo?.title ?? pageTitle;
  const description = seo?.description ?? pageDescription;
  const imagePath = seo?.image ?? SEO_DEFAULTS.defaultShareImage;
  const imageUrl = absoluteUrl(imagePath);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const keywords = seo?.keywords
    ? seo.keywords.split(",").map((keyword) => keyword.trim())
    : [...SEO_DEFAULTS.defaultKeywords];

  return {
    title: {
      default: title,
      template: SEO_DEFAULTS.titleTemplate,
    },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: SEO_DEFAULTS.siteName,
      title,
      description,
      url: canonicalUrl,
      locale: SEO_DEFAULTS.locale,
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildRootMetadata(): Metadata {
  return buildMetadata({
    pageTitle: SEO_DEFAULTS.defaultTitle,
    pageDescription: SEO_DEFAULTS.defaultDescription,
    canonicalPath: "/",
  });
}
