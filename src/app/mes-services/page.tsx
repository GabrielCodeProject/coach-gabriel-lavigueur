import type { Metadata } from "next";
import { getPage } from "@/lib/content/get-page";
import { getServices } from "@/lib/content/get-services";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { buildOfferCatalogSchema } from "@/lib/schema/service-offer";
import { ROUTES } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { PricingNotice } from "@/components/services/PricingNotice";
import { StructuredData } from "@/components/shared/StructuredData";
import { CtaQuestionnaireBanner } from "@/components/home/CtaQuestionnaireBanner";
import type { ServicesPageFrontmatter } from "@/types/page.types";

const SLUG = "mes-services";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage<ServicesPageFrontmatter>(SLUG);
  return buildMetadata({
    pageTitle: frontmatter.title,
    pageDescription: frontmatter.description,
    canonicalPath: ROUTES.SERVICES,
    seo: frontmatter.seo,
  });
}

export default function ServicesPage() {
  const { frontmatter } = getPage<ServicesPageFrontmatter>(SLUG);
  const services = getServices();

  return (
    <>
      <StructuredData data={buildOfferCatalogSchema(services)} />
      <PageHero
        eyebrow="Mes services"
        title={frontmatter.title}
        subtitle={frontmatter.intro}
      />
      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <ServicesGrid services={services} />
        </div>
      </section>
      <PricingNotice
        title={frontmatter.pricing_notice_title}
        body={frontmatter.pricing_notice_body}
      />
      <CtaQuestionnaireBanner />
    </>
  );
}
