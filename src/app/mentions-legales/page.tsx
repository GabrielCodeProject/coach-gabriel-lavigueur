import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { legalPageSchema } from "@/lib/schemas/page.schema";
import { PageHero } from "@/components/shared/PageHero";
import { MarkdownBody } from "@/components/shared/MarkdownBody";

const SLUG = "mentions-legales";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage(SLUG, legalPageSchema);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.LEGAL,
    seo: frontmatter.seo,
  });
}

export default function LegalPage() {
  const { frontmatter, body } = getPage(SLUG, legalPageSchema);
  return (
    <>
      <PageHero title={frontmatter.title} subtitle={frontmatter.description} />
      <section className="bg-background">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 md:px-6 md:py-20">
          <MarkdownBody>{body}</MarkdownBody>
        </div>
      </section>
    </>
  );
}
