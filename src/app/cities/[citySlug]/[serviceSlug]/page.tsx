import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { CostFactors, DirectAnswer, EmergencySteps, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities, isPriorityCityService, priorityCityServiceCombos } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return priorityCityServiceCombos.map((combo) => ({ citySlug: combo.citySlug, serviceSlug: combo.serviceSlug }));
}

export async function generateMetadata({ params }: Props) {
  const { citySlug, serviceSlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  if (!city || !service || !isPriorityCityService(city.slug, service.slug)) return {};
  return buildMetadata({
    title: `${service.name} in ${city.name}, TX`,
    description: `${service.shortAnswer} Local service-area guidance for ${city.name}, TX with provider availability reminders.`,
    path: `/cities/${city.slug}/${service.slug}`
  });
}

export default async function CityServicePage({ params }: Props) {
  const { citySlug, serviceSlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  if (!city || !service || !isPriorityCityService(city.slug, service.slug)) notFound();

  const path = `/cities/${city.slug}/${service.slug}`;
  const relatedProblems = problems.filter((problem) => problem.relatedServiceSlug === service.slug).slice(0, 2);
  const relatedCostGuide = costGuides.find((guide) => guide.relatedServiceSlug === service.slug);
  const faqs = [
    {
      question: `When should I call for ${service.name} in ${city.name}?`,
      answer: `Call when the problem risks property damage, wastewater exposure, fixture shutdown, or worsening backup symptoms. ${service.shortAnswer}`
    },
    {
      question: `Is there a claimed office in ${city.name}?`,
      answer: "No. This page is a service-area request page and does not claim a physical office in every city listed."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, `${service.name} in ${city.name}`, service.shortAnswer),
          serviceSchema(`${service.name} in ${city.name}`, path, service.shortAnswer),
          breadcrumbSchema([
            { name: city.name, path: `/cities/${city.slug}` },
            { name: service.name, path }
          ]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: city.name, href: `/cities/${city.slug}` }, { label: service.name, href: path }]} />
      <div className="mt-6 answer-grid">
        <article>
          <p className="section-kicker">City plus service page</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">{service.name} in {city.name}, TX</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Local guidance for {city.name} homeowners and property managers who need {service.name}. Confirm availability, pricing, credentials, and arrival details directly with the provider.
          </p>
          <div className="mt-6">
            <CallButton location={`city-service-${city.slug}-${service.slug}-top`} />
          </div>
        </article>
        <LeadForm pageUrl={path} service={service.name} city={city.name} />
      </div>

      <DirectAnswer>
        In {city.name}, {service.shortAnswer.charAt(0).toLowerCase() + service.shortAnswer.slice(1)}
      </DirectAnswer>
      <EmergencySteps steps={service.steps} />
      <InfoListSection
        kicker="City relevance"
        title={`${city.name} service-area guidance`}
        intro={`This page is focused on ${city.areaHint}. It is a service-area request page, not a claim that Plumbing Hands has a physical office in ${city.name}.`}
        items={[
          `Share that the request is in ${city.name} and mention nearby cross streets when calling.`,
          `Describe whether the issue affects one fixture, several fixtures, or the whole property.`,
          `If water or wastewater is active, stop water use where safe before submitting the request.`,
          `Confirm provider availability, licensing, pricing, and arrival details directly before work begins.`
        ]}
      />
      <InfoListSection
        kicker="Before calling"
        title="What to prepare"
        items={service.callPrep}
      />
      <CostFactors factors={service.costFactors} />
      <LocalGuidance cityName={city.name} />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: `${city.name} emergency plumbing`, href: `/cities/${city.slug}` },
          { label: `${service.name} service page`, href: `/services/${service.slug}` },
          ...relatedProblems.map((problem) => ({ label: problem.title, href: `/problems/${problem.slug}` })),
          ...(relatedCostGuide ? [{ label: relatedCostGuide.title, href: `/cost-guides/${relatedCostGuide.slug}` }] : [])
        ]}
      />
    </main>
  );
}
