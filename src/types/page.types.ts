import type { SeoFields } from "./seo.types";

export type PageFrontmatter = {
  title: string;
  description: string;
  seo?: SeoFields;
};

export type HomePageFrontmatter = PageFrontmatter & {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_body_text?: string;
  hero_cta_label: string;
  hero_image: string;
};

export type AboutPageFrontmatter = PageFrontmatter & {
  intro_title: string;
  intro_body: string;
};

export type MethodStep = {
  title: string;
  body: string;
  icon_name: string;
};

export type MethodPageFrontmatter = PageFrontmatter & {
  intro: string;
  steps: readonly MethodStep[];
};

export type ServicesPageFrontmatter = PageFrontmatter & {
  intro: string;
  pricing_notice_title: string;
  pricing_notice_body: string;
};

export type ContactPageFrontmatter = PageFrontmatter & {
  intro: string;
  form_intro: string;
  response_time_note: string;
};

export type LegalPageFrontmatter = PageFrontmatter & {
  updated_at: string;
};

export type Page<TFrontmatter extends PageFrontmatter = PageFrontmatter> = {
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
};
