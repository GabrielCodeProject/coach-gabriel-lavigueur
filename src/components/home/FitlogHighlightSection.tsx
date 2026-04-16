import { Smartphone, MessageCircle, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: readonly Feature[] = [
  {
    icon: Smartphone,
    title: "Ton plan partout",
    description:
      "Accède à ton plan d'entraînement et nutrition n'importe quand, depuis ton téléphone.",
  },
  {
    icon: MessageCircle,
    title: "Contact direct",
    description:
      "Envoie un message directement dans l'app — pas de SMS perdu, pas d'email ignoré.",
  },
  {
    icon: TrendingUp,
    title: "Tes progrès visibles",
    description: "Vois tes métriques évoluer semaine après semaine.",
  },
];

type FitlogHighlightSectionProps = {
  title?: string;
  body?: string;
};

export function FitlogHighlightSection({ title, body }: FitlogHighlightSectionProps) {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="reveal mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[--lime-dark]">
          Via Fitlog
        </p>
        <h2 className="reveal mb-12 text-[clamp(32px,4vw,52px)] font-black uppercase leading-[0.93] tracking-[-0.05em] text-foreground">
          {title ?? (
            <>
              Ton coaching
              <br />
              dans ta poche.
            </>
          )}
        </h2>
        {body && (
          <p className="reveal -mt-8 mb-12 text-[16px] leading-[1.65] text-foreground/70">
            {body}
          </p>
        )}

        <div className="stagger-grid grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="reveal bg-background p-8 transition-colors hover:bg-[--off-white]"
              >
                <Icon className="mb-4 size-6 text-primary" aria-hidden="true" />
                <h3 className="mb-3 text-[18px] font-extrabold tracking-[-0.02em] text-foreground">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-foreground/75">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[12px] text-foreground/40">
          via l&apos;application Fitlog
        </p>
      </div>
    </section>
  );
}
