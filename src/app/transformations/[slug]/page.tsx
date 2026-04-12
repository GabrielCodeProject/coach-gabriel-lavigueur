import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTransformationSlugs,
  getTransformations,
} from "@/lib/content/get-transformations";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterImages } from "@/components/transformations/BeforeAfterImages";
import { TransformationMetricsList } from "@/components/transformations/TransformationMetricsList";
import { TransformationTestimonial } from "@/components/transformations/TransformationTestimonial";
import { MarkdownBody } from "@/components/shared/MarkdownBody";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";
import { TRANSFORMATION_GOAL_LABEL } from "@/types/transformation.types";

export function generateStaticParams() {
  const slugs = getTransformationSlugs();
  // Next.js bug: output: export fails when generateStaticParams() returns [].
  // Workaround: placeholder slug — page handles it via notFound().
  // Ref: github.com/vercel/next.js/issues/61213
  if (slugs.length === 0) return [{ slug: "_" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/transformations/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const transformation = getTransformations().find((t) => t.slug === slug) ?? null;
  if (!transformation) {
    return buildMetadata({
      pageTitle: "Transformation introuvable",
      pageDescription: "Cette transformation n'existe pas.",
      canonicalPath: ROUTES.TRANSFORMATIONS,
    });
  }
  return buildMetadata({
    pageTitle: `${transformation.client_name} — Transformation en ${transformation.duration_months} mois`,
    pageDescription: transformation.short_testimonial,
    canonicalPath: ROUTES.TRANSFORMATION_DETAIL(slug),
  });
}

export default async function TransformationDetailPage(
  props: PageProps<"/transformations/[slug]">,
) {
  const { slug } = await props.params;
  const allTransformations = getTransformations();
  const transformation = allTransformations.find((t) => t.slug === slug) ?? null;
  if (!transformation) {
    notFound();
  }

  const otherTransformations = allTransformations
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit">
              {TRANSFORMATION_GOAL_LABEL[transformation.goal_tag]}
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {transformation.client_name} —{" "}
              {transformation.duration_months} mois de transformation
            </h1>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              « {transformation.short_testimonial} »
            </p>
          </div>
          <div className="mt-10">
            <BeforeAfterImages
              beforeSrc={transformation.before_image}
              afterSrc={transformation.after_image}
              clientName={transformation.client_name}
            />
          </div>
          <div className="mt-10">
            <TransformationMetricsList transformation={transformation} />
          </div>
        </div>
      </section>

      {transformation.body.trim().length > 0 ? (
        <section className="border-b border-border bg-card">
          <div className="mx-auto w-full max-w-3xl px-4 py-14 md:px-6 md:py-20">
            <MarkdownBody>{transformation.body}</MarkdownBody>
          </div>
        </section>
      ) : null}

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <TransformationTestimonial
            shortTestimonial={transformation.short_testimonial}
            clientName={transformation.client_name}
          />
        </div>
      </section>

      {otherTransformations.length > 0 ? (
        <section className="border-b border-border bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              Autres transformations
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {otherTransformations.map((item) => (
                <a
                  key={item.slug}
                  href={ROUTES.TRANSFORMATION_DETAIL(item.slug)}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/40"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.client_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.duration_months} mois ·{" "}
                    {TRANSFORMATION_GOAL_LABEL[item.goal_tag]}
                  </p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    « {item.short_testimonial} »
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaQuestionnaireBanner />
    </>
  );
}
