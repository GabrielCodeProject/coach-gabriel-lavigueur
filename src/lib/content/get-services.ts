import { cache } from "react";
import { listMarkdownSlugs, readMarkdown } from "./read-markdown";
import { serviceFrontmatterSchema } from "@/lib/schemas/service.schema";
import type { Service, ServiceId } from "@/lib/schemas/service.schema";

const SERVICES_DIR = "content/services";

export const getServices = cache((): Service[] => {
  const slugs = listMarkdownSlugs(SERVICES_DIR);
  const services = slugs.map((slug) => {
    const { frontmatter } = readMarkdown(
      `${SERVICES_DIR}/${slug}.md`,
      serviceFrontmatterSchema,
    );
    return { ...frontmatter, slug };
  });
  return services.sort((a, b) => a.sort_order - b.sort_order);
});

export function getServiceById(id: ServiceId): Service | null {
  return getServices().find((service) => service.id === id) ?? null;
}

export function getFeaturedServices(): Service[] {
  return getServices().filter((service) => service.featured);
}
