import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { CostFactors, DirectAnswer, EmergencySteps, FAQBlock, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities } from "@/data/cities";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
};

export function generateStaticParams() {
  return cities.flatMap((city) => services.map((service) => ({ citySlug: city.slug, serviceSlug: service.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { citySlug, serviceSlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  if (!city || !service) return {};
  return buildMetadata({
    title: `${service.name} in ${city.name}, TX`,
    description: `${service.shortAnswer} Local service-area guidance for ${city.name}, TX without fake office or license claims.`,
    path: `/cities/${city.slug}/${service.slug}`
  });
}

export default async function CityServicePage({ params }: Props) {
  const { citySlug, serviceSlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  if (!city || !service) notFound();

  const path = `/cities/${city.slug}/${service.slug}`;
  const faqs = [
    {
      question: `When should I call for ${service.name} in ${city.name}?`,
      answer: `Call when the problem risks property damage, wastewater exposure, fixture shutdown, or worsening backup symptoms. ${service.shortAnswer}`
    },
    {
      question: `Is there a claimed office in ${city.name}?`,
      answer: "No. This page is a service-area connection page and does not claim a physical office, fake address, or fake Google Business Profile."
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
            Local answer-ready guidance for {city.name} homeowners and property managers who need {service.name} without fake office claims.
          </p>
          <div className="mt-6">
            <CallButton location={`city-service-${city.slug}-${service.slug}-top`} />
          </div>
        </article>
        <LeadForm pageUrl={path} service={service.name} city={city.name} />
      </div>

      <DirectAnswer>{service.shortAnswer}</DirectAnswer>
      <EmergencySteps steps={service.steps} />
      <CostFactors factors={service.costFactors} />
      <LocalGuidance cityName={city.name} />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: `${city.name} emergency plumbing`, href: `/cities/${city.slug}` },
          { label: `${service.name} service page`, href: `/services/${service.slug}` }
        ]}
      />
    </main>
  );
}
