import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/types/service.types";

type ServicesGridProps = {
  services: readonly Service[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
