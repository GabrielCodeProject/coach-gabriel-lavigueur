import { listMarkdownSlugs, readMarkdown } from "./read-markdown";
import type {
  Service,
  ServiceFrontmatter,
  ServiceId,
} from "@/types/service.types";

const SERVICES_DIR = "content/services";

export function getServices(): Service[] {
  const slugs = listMarkdownSlugs(SERVICES_DIR);
  const services = slugs.map((slug) => {
    const { frontmatter } = readMarkdown<ServiceFrontmatter>(
      `${SERVICES_DIR}/${slug}.md`,
    );
    return { ...frontmatter, slug };
  });
  return services.sort((a, b) => a.sort_order - b.sort_order);
}

export function getServiceById(id: ServiceId): Service | null {
  return getServices().find((service) => service.id === id) ?? null;
}

export function getFeaturedServices(): Service[] {
  return getServices().filter((service) => service.featured);
}
