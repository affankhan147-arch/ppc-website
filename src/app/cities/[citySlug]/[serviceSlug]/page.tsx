import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { CostFactors, DirectAnswer, EmergencySteps, EnhancementSections, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities, isPriorityCityService, priorityCityServiceCombos } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { cityServiceEnhancements } from "@/data/pageEnhancements";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { getCityServiceImage } from "@/lib/articleImages";
import { titleCase } from "@/lib/format";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
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
  const hasOwnUrgencySignal = service.slug === "24-hour-emergency-plumber" || service.slug === "same-day-plumber-connection";
  const cityHeading = service.cityHeading?.replace("{city}", city.name);
  return buildMetadata({
    title:
      cityHeading ??
      (hasOwnUrgencySignal
        ? `${titleCase(service.name)} in ${city.name}, TX`
        : `24/7 ${titleCase(service.name)} in ${city.name}, TX`),
    description: truncateForMeta(
      cityHeading
        ? `${city.name}, TX: ${service.shortAnswer}`
        : `Need ${titleCase(service.name)} in ${city.name}? ${service.shortAnswer}`
    ),
    path: `/cities/${city.slug}/${service.slug}`
  });
}

export default async function CityServicePage({ params }: Props) {
  const { citySlug, serviceSlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  if (!city || !service || !isPriorityCityService(city.slug, service.slug)) notFound();

  const displayName = titleCase(service.name);
  const pageHeading = service.cityHeading?.replace("{city}", city.name) ?? `${displayName} in ${city.name}, TX`;
  const is24Hour = service.slug === "24-hour-emergency-plumber";
  const path = `/cities/${city.slug}/${service.slug}`;
  const enhancement = cityServiceEnhancements[`${city.slug}/${service.slug}`];
  const relatedProblems = problems.filter((problem) => problem.relatedServiceSlug === service.slug).slice(0, 2);
  const relatedCostGuide = costGuides.find((guide) => guide.relatedServiceSlug === service.slug);
  const faqs = [
    ...(enhancement?.extraFaqs || []),
    {
      question: `When should I call for ${displayName} in ${city.name}?`,
      answer: `Call when the problem risks property damage, wastewater exposure, fixture shutdown, or worsening backup symptoms. ${service.shortAnswer}`
    },
    {
      question: `How should I use this ${city.name} service-area page?`,
      answer: "Use it to describe the service need and request a provider connection. Service availability depends on provider coverage in your area."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, `${displayName} in ${city.name}`, service.shortAnswer),
          serviceSchema(`${displayName} in ${city.name}`, path, service.shortAnswer, city.name),
          breadcrumbSchema([
            { name: city.name, path: `/cities/${city.slug}` },
            { name: displayName, path }
          ]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: city.name, href: `/cities/${city.slug}` }, { label: displayName, href: path }]} />
      <div className="mt-6">
        <article>
          <p className="section-kicker">City plus service page</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white">{pageHeading}</h1>
          {is24Hour ? (
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Need a 24 hour plumber in {city.name} after regular business hours? This page is for the late-night, overnight, weekend, and
              holiday calls -- a leak at 2 a.m., a backed-up toilet on a Sunday. For daytime or general help, start with the{" "}
              <Link className="font-bold text-emerald-300 underline" href={`/cities/${city.slug}`}>
                emergency plumber in {city.name}, TX
              </Link>{" "}
              page. Confirm availability, after-hours pricing, credentials, and arrival time directly with the provider.
            </p>
          ) : (
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Searching for {displayName.toLowerCase()} near {city.name}, available 24 hours a day? Local guidance for {city.name} homeowners and
              property managers who need {displayName.toLowerCase()}. Confirm availability, pricing, credentials, and arrival details directly with the provider.
            </p>
          )}
          <div className="mt-6">
            <CallButton location={`city-service-${city.slug}-${service.slug}-top`} pagePath={path} pageType="city-service" city={city.name} service={displayName} />
          </div>
        </article>
        <div className="photo-frame relative mt-6 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
          <Image
            src={getCityServiceImage(city.slug, service.slug, priorityCityServiceCombos.findIndex((combo) => combo.citySlug === city.slug && combo.serviceSlug === service.slug))}
            alt={`${displayName} in ${city.name}, TX - provider responding to an active service call`}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <DirectAnswer>
        In {city.name}, {service.shortAnswer.charAt(0).toLowerCase() + service.shortAnswer.slice(1)}
      </DirectAnswer>
      <EmergencySteps steps={service.steps} />
      <InfoListSection
        kicker="City relevance"
        title={`${city.name} service-area guidance`}
        intro={`This page is focused on ${city.areaHint}. Confirm pricing, credentials, timing, and scope directly with the provider.`}
        items={[
          `Share that the request is in ${city.name} and mention nearby cross streets when calling.`,
          `Describe whether the issue affects one fixture, several fixtures, or the whole property.`,
          `If water or wastewater is active, stop water use where safe before submitting the request.`,
          `Confirm provider availability, licensing, pricing, and arrival details directly before work begins.`
        ]}
      />
      <EnhancementSections enhancement={enhancement} />
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
          ...(enhancement?.extraLinks || []),
          { label: `${city.name} emergency plumbing`, href: `/cities/${city.slug}` },
          { label: `${displayName} service page`, href: `/services/${service.slug}` },
          ...relatedProblems.map((problem) => ({ label: problem.title, href: `/problems/${problem.slug}` })),
          ...(relatedCostGuide ? [{ label: relatedCostGuide.title, href: `/cost-guides/${relatedCostGuide.slug}` }] : [])
        ]}
      />
    </main>
  );
}
