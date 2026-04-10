import { Scale, Activity, Ruler, CalendarDays } from "lucide-react";
import type { Transformation } from "@/types/transformation.types";

type TransformationMetricsListProps = {
  transformation: Transformation;
};

function formatNumberDelta(value: number, unit: string): string {
  const rounded = Math.round(value * 10) / 10;
  const sign = rounded > 0 ? "+" : "";
  return `${sign}${rounded} ${unit}`;
}

export function TransformationMetricsList({
  transformation,
}: TransformationMetricsListProps) {
  const weightDeltaKg =
    transformation.starting_weight_kg && transformation.ending_weight_kg
      ? transformation.ending_weight_kg - transformation.starting_weight_kg
      : null;

  const metrics: { icon: typeof Scale; label: string; value: string }[] = [
    {
      icon: CalendarDays,
      label: "Durée",
      value: `${transformation.duration_months} mois`,
    },
  ];

  if (weightDeltaKg !== null) {
    metrics.push({
      icon: Scale,
      label: "Variation de poids",
      value: formatNumberDelta(weightDeltaKg, "kg"),
    });
  }

  if (typeof transformation.body_fat_delta_pct === "number") {
    metrics.push({
      icon: Activity,
      label: "Masse grasse",
      value: formatNumberDelta(transformation.body_fat_delta_pct, "%"),
    });
  }

  if (typeof transformation.waist_delta_cm === "number") {
    metrics.push({
      icon: Ruler,
      label: "Tour de taille",
      value: formatNumberDelta(transformation.waist_delta_cm, "cm"),
    });
  }

  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="text-lg font-semibold tracking-tight text-foreground">
                {metric.value}
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
