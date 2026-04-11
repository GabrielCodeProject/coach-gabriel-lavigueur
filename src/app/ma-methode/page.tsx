import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { MethodSteps } from "@/components/method/MethodSteps";
import { FitlogHighlightSection } from "@/components/home/FitlogHighlightSection";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";
import type { MethodPageFrontmatter } from "@/types/page.types";

const SLUG = "ma-methode";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage<MethodPageFrontmatter>(SLUG);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.METHOD,
    seo: frontmatter.seo,
  });
}

export default function MethodPage() {
  const { frontmatter } = getPage<MethodPageFrontmatter>(SLUG);
  return (
    <>
      <PageHero
        eyebrow="Ma méthode"
        title={frontmatter.title}
        subtitle={frontmatter.intro}
      />
      <MethodSteps steps={frontmatter.steps} />
      <FitlogHighlightSection />
      <CtaQuestionnaireBanner
        title="Tu connais comment je travaille"
        body="La prochaine étape, c'est toi."
      />
    </>
  );
}
