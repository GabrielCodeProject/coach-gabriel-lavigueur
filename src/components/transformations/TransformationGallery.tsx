import { TransformationCard } from "./TransformationCard";
import type { Transformation } from "@/types/transformation.types";

type TransformationGalleryProps = {
  transformations: readonly Transformation[];
};

export function TransformationGallery({
  transformations,
}: TransformationGalleryProps) {
  if (transformations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-sm text-muted-foreground">
          Aucune transformation publiée pour le moment. Reviens bientôt.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {transformations.map((transformation) => (
        <TransformationCard
          key={transformation.slug}
          transformation={transformation}
        />
      ))}
    </div>
  );
}
