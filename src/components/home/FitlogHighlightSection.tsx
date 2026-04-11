import { Smartphone, MessageCircle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const COACHING_APP_FEATURES = [
  {
    icon: Smartphone,
    title: "Ton plan partout",
    description:
      "Accède à ton plan d'entraînement et nutrition n'importe quand, depuis ton téléphone",
  },
  {
    icon: MessageCircle,
    title: "Contact direct",
    description:
      "Envoie un message directement dans l'app — pas de SMS perdu, pas d'email ignoré",
  },
  {
    icon: TrendingUp,
    title: "Tes progrès visibles",
    description: "Vois tes métriques évoluer semaine après semaine",
  },
] as const;

export function FitlogHighlightSection() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="mb-10 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Ton coaching dans ta poche
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COACHING_APP_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-border/70">
                <CardContent className="flex flex-col gap-3 p-5">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <p className="font-semibold text-foreground">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          via l&apos;application Fitlog
        </p>
      </div>
    </section>
  );
}
