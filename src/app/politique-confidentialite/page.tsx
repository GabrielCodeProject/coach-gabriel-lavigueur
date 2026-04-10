import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { MarkdownBody } from "@/components/shared/MarkdownBody";
import type { LegalPageFrontmatter } from "@/types/page.types";

const SLUG = "politique-confidentialite";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage<LegalPageFrontmatter>(SLUG);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.PRIVACY,
    seo: frontmatter.seo,
  });
}

export default function PrivacyPage() {
  const { frontmatter, body } = getPage<LegalPageFrontmatter>(SLUG);
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
