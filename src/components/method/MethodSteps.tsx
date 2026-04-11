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
        {/* Mobile timeline */}
        <ol className="relative flex flex-col gap-8 lg:hidden">
          <span
            className="absolute bottom-0 left-4 top-0 w-0.5 bg-primary"
            aria-hidden="true"
          />
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            return (
              <li key={step.title} className="flex items-start gap-4">
                <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {stepNumber}
                </span>
                <div className="flex flex-col gap-2 pt-1">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop layout */}
        <ol className="hidden flex-col gap-12 lg:flex">
          {steps.map((step, index) => {
            const Icon = ICON_MAP[step.icon_name] ?? ClipboardList;
            const stepNumber = index + 1;
            return (
              <li
                key={step.title}
                className="grid gap-8 md:grid-cols-[auto_1fr]"
              >
                <div className="flex flex-col items-center gap-3">
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
