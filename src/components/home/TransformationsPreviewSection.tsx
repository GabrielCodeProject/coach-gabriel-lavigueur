import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { BUSINESS } from "@/lib/business-data";
import {
  TRANSFORMATION_GOAL_LABEL,
  type Transformation,
} from "@/types/transformation.types";

type TransformationsPreviewSectionProps = {
  transformations: readonly Transformation[];
};

export function TransformationsPreviewSection({
  transformations,
}: TransformationsPreviewSectionProps) {
  if (!BUSINESS.transformations.enabled || transformations.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-4 md:max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Transformations
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Des vrais gens, des vrais résultats.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Chaque photo et témoignage est publié avec le consentement écrit du client. Les résultats varient selon la personne, son historique et son engagement — mais la méthode reste la même.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transformations.slice(0, 3).map((transformation) => (
            <Link
              key={transformation.slug}
              href={ROUTES.TRANSFORMATION_DETAIL(transformation.slug)}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/70 transition-all group-hover:border-primary/40 group-hover:shadow-md">
                <div className="grid grid-cols-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={transformation.before_image}
                    alt={`Avant — ${transformation.client_name}`}
                    className="aspect-[4/5] w-full bg-muted object-cover"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={transformation.after_image}
                    alt={`Après — ${transformation.client_name}`}
                    className="aspect-[4/5] w-full bg-muted object-cover"
                  />
                </div>
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {transformation.client_name}
                    </p>
                    <Badge variant="secondary" className="text-[10px]">
                      {TRANSFORMATION_GOAL_LABEL[transformation.goal_tag]}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {transformation.duration_months} mois
                  </p>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    « {transformation.short_testimonial} »
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={ROUTES.TRANSFORMATIONS}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 px-5 text-sm",
            )}
          >
            Voir toutes les transformations
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
