import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { getFeaturedTransformations } from "@/lib/content/get-transformations";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { HeroSection } from "@/components/home/HeroSection";
import { FitlogHighlightSection } from "@/components/home/FitlogHighlightSection";
import { ServiceTeaser } from "@/components/home/ServiceTeaser";
import { MethodPreviewSection } from "@/components/home/MethodPreviewSection";
import { PhilosophyQuote } from "@/components/home/PhilosophyQuote";
import { TransformationsPreviewSection } from "@/components/home/TransformationsPreviewSection";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";
import type { HomePageFrontmatter } from "@/types/page.types";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage<HomePageFrontmatter>("accueil");
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.HOME,
    seo: frontmatter.seo,
  });
}

export default function HomePage() {
  const { frontmatter } = getPage<HomePageFrontmatter>("accueil");
  const featuredTransformations = getFeaturedTransformations();

  return (
    <>
      <HeroSection
        eyebrow={frontmatter.hero_eyebrow}
        title={frontmatter.hero_title}
        subtitle={frontmatter.hero_subtitle}
        bodyText={frontmatter.hero_body_text}
        ctaLabel={frontmatter.hero_cta_label}
        heroImage={frontmatter.hero_image}
      />
      <FitlogHighlightSection />
      <ServiceTeaser />
      <MethodPreviewSection />
      <PhilosophyQuote />
      <TransformationsPreviewSection
        transformations={featuredTransformations}
      />
      <CtaQuestionnaireBanner />
    </>
  );
}
