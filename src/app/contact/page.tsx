import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content/get-page";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { contactPageSchema } from "@/lib/schemas/page.schema";
import { PageHero } from "@/components/shared/PageHero";
import { ContactInfoBlock } from "@/components/contact/ContactInfoBlock";
import { StoreLocationMap } from "@/components/contact/StoreLocationMap";
import { QuestionnaireForm } from "@/components/questionnaire/QuestionnaireForm";

const SLUG = "contact";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage(SLUG, contactPageSchema);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.CONTACT,
    seo: frontmatter.seo,
  });
}

export default function ContactPage() {
  const { frontmatter } = getPage(SLUG, contactPageSchema);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={frontmatter.title}
        subtitle={frontmatter.intro}
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
            <div className="flex flex-col gap-6">
              <ContactInfoBlock />
              <StoreLocationMap />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  Le questionnaire
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {frontmatter.form_intro}
                </p>
              </div>
              <QuestionnaireForm />
              <p className="text-xs text-muted-foreground">
                {frontmatter.response_time_note}
              </p>
              <p className="text-sm text-muted-foreground">
                Une question avant de commencer ?{" "}
                <Link
                  href={ROUTES.FAQ}
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Consulte la FAQ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
