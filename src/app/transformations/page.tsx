import type { Metadata } from "next";
import { getTransformations } from "@/lib/content/get-transformations";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";
import { PageHero } from "@/components/shared/PageHero";
import { TransformationGallery } from "@/components/transformations/TransformationGallery";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageTitle: "Ma vision des résultats",
    pageDescription:
      "Ce qu'une vraie transformation représente — long terme, attentes réalistes, et la méthode qui dure.",
    canonicalPath: ROUTES.TRANSFORMATIONS,
  });
}

export default function TransformationsPage() {
  const transformations = BUSINESS.transformations.enabled
    ? getTransformations()
    : [];

  return (
    <>
      <PageHero
        eyebrow="Transformations"
        title="Ma vision des résultats"
        subtitle="Une transformation réelle, c'est rarement spectaculaire — c'est durable."
      />

      <section className="bg-background">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance text-2xl font-semibold tracking-tight">
                Ce que je veux dire par transformation
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Dans l&apos;industrie du fitness, une transformation, c&apos;est souvent une
                photo avant-après spectaculaire prise en 12 semaines. Ce
                n&apos;est pas ce que je propose. Ce que je construis avec toi,
                c&apos;est une structure qui tient encore dans 2 ans — pas un pic de
                motivation suivi d&apos;un retour à zéro.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-balance text-2xl font-semibold tracking-tight">
                Long terme vs résultats rapides
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Les résultats rapides existent — et ils sont réels. Mais ils ne
                durent que si les habitudes qui les ont produits durent aussi.
                Mon travail commence après que tu as perdu le premier kilo, pas
                avant. C&apos;est là que la plupart des plans s&apos;effondrent : quand
                la nouveauté disparaît et que la vraie vie reprend. C&apos;est là
                que je suis.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-balance text-2xl font-semibold tracking-tight">
                Des attentes réalistes
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Je ne te promets pas de perdre 30 livres en 8 semaines. Je te
                promets un plan honnête, adapté à ta vie réelle, avec un suivi
                régulier qui ajuste quand quelque chose ne fonctionne pas. Les
                résultats varient selon ta situation de départ, ton engagement
                et ton corps — mais la méthode reste la même pour tout le
                monde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {BUSINESS.transformations.enabled && transformations.length > 0 ? (
        <section className="border-t border-border bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <h2 className="mb-10 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Des vrais gens, des vrais résultats.
            </h2>
            <TransformationGallery transformations={transformations} />
          </div>
        </section>
      ) : null}

      <CtaQuestionnaireBanner
        title="Leur point de départ ressemblait peut-être au tien"
        body="La seule différence, c'est qu'ils ont envoyé le premier message."
      />
    </>
  );
}
