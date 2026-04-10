import type { Metadata } from "next";
import { getTransformations } from "@/lib/content/get-transformations";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { TransformationGallery } from "@/components/transformations/TransformationGallery";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageTitle: "Transformations",
    pageDescription:
      "Des vrais gens, des vrais résultats. Chaque transformation est publiée avec le consentement écrit du client.",
    canonicalPath: ROUTES.TRANSFORMATIONS,
  });
}

export default function TransformationsPage() {
  const transformations = getTransformations();
  return (
    <>
      <PageHero
        eyebrow="Transformations"
        title="Des vrais gens, des vrais résultats."
        subtitle="Chaque photo et témoignage est publié avec le consentement écrit du client. Les résultats varient selon la personne, son historique et son engagement — mais la méthode reste la même."
      />
      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <TransformationGallery transformations={transformations} />
        </div>
      </section>
      <CtaQuestionnaireBanner />
    </>
  );
}
