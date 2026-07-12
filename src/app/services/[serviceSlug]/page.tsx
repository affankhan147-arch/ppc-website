import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { CostFactors, DirectAnswer, EmergencySteps, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities, priorityCityServiceCombos } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ serviceSlug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ serviceSlug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { serviceSlug } = await params;
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.name} in Dallas-Fort Worth`,
    description: service.shortAnswer,
    path: `/services/${service.slug}`
  });
}

export default async function ServicePage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const faqs = [
    ...service.faqSeed.map((question) => ({
      question,
      answer: `${service.shortAnswer} The safest next step is to stop water use where possible, describe the affected fixtures, and request a provider connection.`
    })),
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);
  const relatedProblems = problems.filter((problem) => problem.relatedServiceSlug === service.slug).slice(0, 3);
  const relatedCostGuide = costGuides.find((guide) => guide.relatedServiceSlug === service.slug);
  const priorityCityLinks = priorityCityServiceCombos
    .filter((combo) => combo.serviceSlug === service.slug)
    .slice(0, 4)
    .map((combo) => {
      const city = cities.find((item) => item.slug === combo.citySlug);
      return city ? { label: `${service.name} in ${city.name}`, href: `/cities/${city.slug}/${service.slug}` } : null;
    })
    .filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, `${service.name} in Dallas-Fort Worth`, service.shortAnswer),
          serviceSchema(service.name, path, service.shortAnswer),
          breadcrumbSchema([
            { name: "Services", path: "/services/24-hour-emergency-plumber" },
            { name: service.name, path }
          ]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Services", href: "/services/24-hour-emergency-plumber" }, { label: service.name, href: path }]} />
      <div className="mt-6 answer-grid">
        <article>
          <p className="section-kicker">{service.urgency} urgency service page</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">{service.name} in Dallas-Fort Worth</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Clear guidance for urgent homeowner questions and service requests across Dallas-Fort Worth. Availability, credentials, pricing, and arrival details should be confirmed directly with the provider.
          </p>
          <div className="mt-6">
            <CallButton location={`service-${service.slug}-top`} />
          </div>
        </article>
        <LeadForm pageUrl={path} service={service.name} city="Dallas" />
      </div>

      <DirectAnswer>{service.shortAnswer}</DirectAnswer>
      <EmergencySteps steps={service.steps} />
      <InfoListSection
        kicker="Before calling"
        title="What information to prepare"
        intro="The matched provider can usually triage faster when the request includes clear, practical details."
        items={service.callPrep}
      />

      <section className="content-section">
        <p className="section-kicker">When to call</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Signs this service should not wait</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {service.symptoms.map((symptom) => (
            <li key={symptom} className="rounded-md bg-slate-50 p-3 font-semibold text-slate-800">{symptom}</li>
          ))}
        </ul>
      </section>

      <InfoListSection
        kicker="Common causes"
        title={`Why ${service.name} issues happen`}
        intro="The exact cause requires diagnosis, but these are common patterns Dallas-Fort Worth homeowners and managers report."
        items={service.commonCauses}
      />
      <InfoListSection
        kicker="Avoid these mistakes"
        title="What not to do during the emergency"
        items={service.mistakesToAvoid}
      />
      <section className="content-section">
        <p className="section-kicker">Cost discussion</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Cost factors to confirm before work starts</h2>
        <p className="mt-3 leading-7 text-slate-700">{service.costDiscussion}</p>
      </section>
      <CostFactors factors={service.costFactors} />
      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          ...priorityCityLinks,
          ...relatedProblems.map((problem) => ({ label: problem.title, href: `/problems/${problem.slug}` })),
          ...(relatedCostGuide ? [{ label: relatedCostGuide.title, href: `/cost-guides/${relatedCostGuide.slug}` }] : [])
        ]}
      />
    </main>
  );
}
