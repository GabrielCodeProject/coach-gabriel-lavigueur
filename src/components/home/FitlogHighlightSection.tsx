import {
  Smartphone,
  Dumbbell,
  Apple,
  MessageSquareText,
  LineChart,
  Camera,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type FitlogHighlightSectionProps = {
  title: string;
  body: string;
};

const FITLOG_FEATURES = [
  {
    icon: Dumbbell,
    label: "Programme d'entraînement",
    description: "2500+ démonstrations vidéo.",
  },
  {
    icon: Apple,
    label: "Plan nutritionnel",
    description: "Repas, portions, alternatives.",
  },
  {
    icon: MessageSquareText,
    label: "Chat direct avec Gabriel",
    description: "Tes questions, mes réponses.",
  },
  {
    icon: LineChart,
    label: "Suivi de poids et mesures",
    description: "Historique complet, tout au même endroit.",
  },
  {
    icon: Camera,
    label: "Photos de progrès",
    description: "Avant-après bien organisés.",
  },
  {
    icon: Smartphone,
    label: "Sur ton téléphone",
    description: "iOS et Android, inclus avec ton plan.",
  },
] as const;

export function FitlogHighlightSection({
  title,
  body,
}: FitlogHighlightSectionProps) {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-4 md:max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            L'app Fitlog · Incluse avec ton plan
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {body}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FITLOG_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.label} className="border-border/70">
                <CardContent className="flex flex-col gap-2 p-5">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <p className="text-sm font-semibold text-foreground">
                    {feature.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
