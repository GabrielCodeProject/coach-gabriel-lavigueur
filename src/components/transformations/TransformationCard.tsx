import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/routes";
import { env } from "@/lib/env";
import {
  TRANSFORMATION_GOAL_LABEL,
  type Transformation,
} from "@/types/transformation.types";

type TransformationCardProps = {
  transformation: Transformation;
};

export function TransformationCard({ transformation }: TransformationCardProps) {
  return (
    <Link
      href={ROUTES.TRANSFORMATION_DETAIL(transformation.slug)}
      className="group"
      aria-label={`Voir la transformation de ${transformation.client_name} — ${transformation.duration_months} mois`}
    >
      <Card className="h-full overflow-hidden border-border/70 transition-all group-hover:border-primary/40 group-hover:shadow-md">
        <div className="grid grid-cols-2">
          <picture>
            <source
              srcSet={`${env.NEXT_PUBLIC_BASE_PATH}${transformation.before_image.replace(/\.(jpe?g|png)$/i, '.webp')}`}
              type="image/webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${env.NEXT_PUBLIC_BASE_PATH}${transformation.before_image}`}
              alt={`Avant — ${transformation.client_name}`}
              className="aspect-[4/5] w-full bg-muted object-cover"
            />
          </picture>
          <picture>
            <source
              srcSet={`${env.NEXT_PUBLIC_BASE_PATH}${transformation.after_image.replace(/\.(jpe?g|png)$/i, '.webp')}`}
              type="image/webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${env.NEXT_PUBLIC_BASE_PATH}${transformation.after_image}`}
              alt={`Après — ${transformation.client_name}`}
              className="aspect-[4/5] w-full bg-muted object-cover"
            />
          </picture>
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
  );
}
