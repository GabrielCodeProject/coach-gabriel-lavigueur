import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { getFeaturedTransformations } from "@/lib/content/get-transformations";
import { getServices } from "@/lib/content/get-services";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { homePageSchema } from "@/lib/schemas/page.schema";
import { HeroSection } from "@/components/home/HeroSection";
import { StatBar } from "@/components/home/StatBar";
import { FitlogHighlightSection } from "@/components/home/FitlogHighlightSection";
import { ServiceTeaser } from "@/components/home/ServiceTeaser";
import { MethodPreviewSection } from "@/components/home/MethodPreviewSection";
import { PhilosophyQuote } from "@/components/home/PhilosophyQuote";
import { TransformationsPreviewSection } from "@/components/home/TransformationsPreviewSection";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";
import { SectionDivider } from "@/components/shared/SectionDivider";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage("accueil", homePageSchema);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.HOME,
    seo: frontmatter.seo,
  });
}

export default function HomePage() {
  const { frontmatter } = getPage("accueil", homePageSchema);
  const featuredTransformations = getFeaturedTransformations();
  const services = getServices();

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
      <StatBar />
      <SectionDivider />
      <ServiceTeaser services={services} />
      <SectionDivider />
      <MethodPreviewSection />
      <SectionDivider />
      <FitlogHighlightSection
        title={frontmatter.fitlog_highlight_title}
        body={frontmatter.fitlog_highlight_body}
      />
      <SectionDivider />
      <PhilosophyQuote />
      <SectionDivider />
      <TransformationsPreviewSection
        transformations={featuredTransformations}
      />
      <CtaQuestionnaireBanner />
    </>
  );
}
