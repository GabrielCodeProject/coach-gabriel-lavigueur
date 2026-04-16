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
    <section className="bg-[var(--dark-mid)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Mobile timeline */}
        <ol className="relative flex flex-col gap-8 lg:hidden">
          <span
            className="absolute bottom-0 left-4 top-0 w-0.5 bg-primary"
            aria-hidden="true"
          />
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            return (
              <li
                key={step.title}
                className="reveal flex items-start gap-4"
              >
                <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                  {stepNumber}
                </span>
                <div className="flex flex-col gap-2 pt-1">
                  <h2 className="font-bold text-white">{step.title}</h2>
                  <p className="text-[14px] leading-[1.65] text-white/65">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop layout */}
        <ol className="hidden flex-col gap-10 lg:flex">
          {steps.map((step, index) => {
            const Icon = ICON_MAP[step.icon_name] ?? ClipboardList;
            const stepNumber = index + 1;
            return (
              <li
                key={step.title}
                className="reveal grid gap-8 border border-white/10 p-8 transition-colors hover:bg-[#1e341e] md:grid-cols-[auto_1fr]"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex size-14 shrink-0 items-center justify-center bg-primary/15 text-primary">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <span className="text-[44px] font-black leading-none text-primary">
                    {stepNumber}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-balance text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="text-[14px] leading-[1.65] text-white/65">
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
