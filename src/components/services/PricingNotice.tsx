import { Infinity as InfinityIcon, Coins, Smartphone } from "lucide-react";

type PricingNoticeProps = {
  title: string;
  body: string;
};

const PRICING_HIGHLIGHTS = [
  {
    icon: InfinityIcon,
    label: "Nutrition — paiement unique",
    body: "125 $ une seule fois pour la création. Toutes les mises à jour futures sont gratuites de création — tu paies seulement la consultation de suivi (30 $).",
  },
  {
    icon: Coins,
    label: "Prix clairs, rien de caché",
    body: "Consult sans plan 30 $. Consult + plan entraînement 125 $. Consult + plan nutrition 125 $. Les deux ensemble 250 $.",
  },
  {
    icon: Smartphone,
    label: "Accès Fitlog inclus",
    body: "Dès que tu prends un plan, tu as accès à l'app Fitlog sans frais supplémentaires.",
  },
];

export function PricingNotice({ title, body }: PricingNoticeProps) {
  return (
    <section className="bg-[--cream]">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex max-w-2xl flex-col gap-3 border-l-[3px] border-primary pl-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[--lime-dark]">
            À lire avant de prendre un plan
          </span>
          <h2 className="text-balance text-2xl font-black uppercase tracking-[-0.04em] md:text-3xl">
            {title}
          </h2>
          <p className="text-[15px] leading-[1.65] text-foreground/75">
            {body}
          </p>
        </div>
        <div className="stagger-grid mt-8 grid gap-5 md:grid-cols-3">
          {PRICING_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col gap-3 border border-border bg-background p-6 transition-colors hover:bg-[--off-white]"
              >
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <p className="font-bold text-foreground">{item.label}</p>
                <p className="text-[14px] leading-[1.65] text-foreground/75">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
