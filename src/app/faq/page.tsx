import type { Metadata } from "next";
import { getFaq } from "@/lib/content/get-faq";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";

export async function generateMetadata(): Promise<Metadata> {
  const frontmatter = getFaq();
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.FAQ,
  });
}

export default function FaqPage() {
  const frontmatter = getFaq();
  return (
    <>
      <PageHero
        eyebrow="Foire aux questions"
        title={frontmatter.title}
        subtitle={frontmatter.intro}
      />
      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <FaqAccordion items={frontmatter.items} />
        </div>
      </section>
      <CtaQuestionnaireBanner
        title="Tu as encore des questions ?"
        body="Je te réponds personnellement — pas un bot, pas un template."
      />
    </>
  );
}
