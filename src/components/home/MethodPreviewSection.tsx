import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";

type MethodPreviewStep = {
  number: number;
  title: string;
  body: string;
};

const METHOD_PREVIEW_STEPS: readonly MethodPreviewStep[] = [
  {
    number: 1,
    title: "Tu remplis le questionnaire",
    body: "Ton contexte, tes objectifs, tes contraintes.",
  },
  {
    number: 2,
    title: "On se rencontre en personne",
    body: "Une heure au Nutrition Suprême de Sainte-Thérèse.",
  },
  {
    number: 3,
    title: "Je construis ton plan",
    body: "Environ une semaine de travail sur mesure.",
  },
  {
    number: 4,
    title: "Livraison via Fitlog",
    body: "Ton programme, ton chat avec moi, ton suivi.",
  },
  {
    number: 5,
    title: "Suivi aux 4 à 8 semaines",
    body: "On ajuste selon tes données et ta progression.",
  },
];

export function MethodPreviewSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-4 md:max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Ma méthode, simplement
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Du premier contact au premier résultat.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Cinq étapes claires, aucune surprise. Chaque client passe par le même processus — c'est ce qui rend mon travail prévisible et le tien efficace.
          </p>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {METHOD_PREVIEW_STEPS.map((step) => (
            <li
              key={step.number}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {step.number}
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link
            href={ROUTES.METHOD}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 px-5 text-sm",
            )}
          >
            Voir les détails de ma méthode
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
