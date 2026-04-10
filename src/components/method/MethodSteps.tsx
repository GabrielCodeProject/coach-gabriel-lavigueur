import {
  ClipboardList,
  MessagesSquare,
  PencilRuler,
  Smartphone,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";
import type { MethodStep } from "@/types/page.types";

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList,
  MessagesSquare,
  PencilRuler,
  Smartphone,
  RefreshCcw,
};

type MethodStepsProps = {
  steps: readonly MethodStep[];
};

export function MethodSteps({ steps }: MethodStepsProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <ol className="flex flex-col gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = ICON_MAP[step.icon_name] ?? ClipboardList;
            const stepNumber = index + 1;
            return (
              <li
                key={step.title}
                className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-8"
              >
                <div className="flex flex-col items-start gap-3 md:items-center">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Étape {stepNumber}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="text-pretty leading-relaxed text-muted-foreground md:text-lg">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
