import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";

const SERVICES = [
  {
    title: "Consultation initiale",
    description: "On établit ton point de départ ensemble",
  },
  {
    title: "Plan d'entraînement",
    description: "Structuré pour ta réalité, pas un template",
  },
  {
    title: "Plan nutrition",
    description: "Une fois, pour toujours",
  },
  {
    title: "Suivi mensuel",
    description: "Tu n'es jamais seul entre les étapes",
  },
] as const;

export function ServiceTeaser() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="mb-8 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Ce que je propose
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SERVICES.map((service) => (
            <Card key={service.title} className="border-border/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href={ROUTES.SERVICES}
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}
          >
            Voir les tarifs et détails
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
