import { Check, Infinity as InfinityIcon } from "lucide-react";
import { CURRENCY_CODE } from "@/lib/constants";
import type { Service } from "@/types/service.types";

type ServiceCardProps = {
  service: Service;
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden border border-border bg-background p-8 transition-colors hover:bg-[--off-white]">
      <span
        className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-primary transition-transform duration-[250ms] group-hover:scale-y-100"
        aria-hidden="true"
      />
      {service.is_one_time ? (
        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[--lime-dark]">
          <InfinityIcon className="size-3.5" aria-hidden="true" />
          Paiement unique à vie
        </p>
      ) : null}
      <p className="mb-3 text-[40px] font-black leading-none tracking-[-0.04em] text-primary">
        {formatPrice(service.price_cad)}
      </p>
      <h3 className="mb-3 text-[22px] font-extrabold tracking-[-0.02em] text-foreground">
        {service.name}
      </h3>
      <p className="mb-5 text-[15px] leading-[1.65] text-foreground/75">
        {service.short_description}
      </p>
      {service.includes.length > 0 ? (
        <ul className="mt-auto flex flex-col gap-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="text-foreground/75">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
