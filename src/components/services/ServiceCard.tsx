import { Check, Infinity as InfinityIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="flex h-full flex-col border-border/70 ring-1 ring-border">
      <CardHeader className="gap-2">
        {service.is_one_time ? (
          <Badge
            variant="secondary"
            className="w-fit gap-1 text-[11px] font-medium"
          >
            <InfinityIcon className="size-3" aria-hidden="true" />
            Paiement unique à vie
          </Badge>
        ) : null}
        <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.short_description}
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight text-foreground">
            {formatPrice(service.price_cad)}
          </span>
          <span className="text-sm text-muted-foreground">CAD</span>
        </div>
        {service.includes.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
