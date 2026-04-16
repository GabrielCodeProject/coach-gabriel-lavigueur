import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { aboutPageSchema } from "@/lib/schemas/page.schema";
import { PageHero } from "@/components/shared/PageHero";
import { CoachIntroSection } from "@/components/about/CoachIntroSection";
import { MarkdownBody } from "@/components/shared/MarkdownBody";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";

const SLUG = "a-propos";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage(SLUG, aboutPageSchema);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.ABOUT,
    seo: frontmatter.seo,
  });
}

export default function AboutPage() {
  const { frontmatter, body } = getPage(SLUG, aboutPageSchema);
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={frontmatter.title}
        subtitle={frontmatter.description}
      />
      <CoachIntroSection
        introTitle={frontmatter.intro_title}
        introBody={frontmatter.intro_body}
      />
      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <MarkdownBody>{body}</MarkdownBody>
        </div>
      </section>
      <CtaQuestionnaireBanner title="Tu sais qui je suis" />
    </>
  );
}
