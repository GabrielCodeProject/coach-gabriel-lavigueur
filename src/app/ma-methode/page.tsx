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
      <FitlogHighlightSection
        title="Tout passe par Fitlog — ton app de coaching"
        body="Une fois ton plan livré, l'app Fitlog devient ton hub principal : ton programme d'entraînement, ton plan alimentaire, ton suivi de progrès, et un fil de discussion direct avec moi."
      />
      <CtaQuestionnaireBanner />
    </>
  );
}
