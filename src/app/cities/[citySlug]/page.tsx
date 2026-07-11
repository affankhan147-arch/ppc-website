import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities, getNearbyCities, getPriorityServiceSlugsForCity } from "@/data/cities";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ citySlug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ citySlug: city.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  if (!city) return {};
  return buildMetadata({
    title: `Emergency plumbing help in ${city.name}, TX`,
    description: `Connect with local emergency plumbing and drain cleaning providers serving ${city.name}, TX without fake local office claims.`,
    path: `/cities/${city.slug}`
  });
}

export default async function CityPage({ params }: Props) {
  const { citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  if (!city) notFound();

  const path = `/cities/${city.slug}`;
  const priorityServiceSlugs = getPriorityServiceSlugsForCity(city.slug);
  const cityServiceLinks = priorityServiceSlugs
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof services)[number] => Boolean(service));
  const nearbyCities = getNearbyCities(city.slug, 4);
  const faqs = [
    {
      question: `Can I request emergency plumbing help in ${city.name}?`,
      answer: `Yes. This page helps route urgent plumbing and drain requests in ${city.name} to available local providers where possible.`
    },
    {
      question: `Does this site claim a local office in ${city.name}?`,
      answer: "No. The site uses service-area wording and does not claim a physical office, fake address, fake GBP, or guaranteed response time."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, `Emergency plumbing help in ${city.name}`, `Provider connection page for urgent plumbing in ${city.name}.`),
          breadcrumbSchema([{ name: "Cities", path: "/cities/dallas" }, { name: city.name, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Cities", href: "/cities/dallas" }, { label: city.name, href: path }]} />
      <div className="mt-6 answer-grid">
        <article>
          <p className="section-kicker">Local SEO without fake address claims</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">Emergency plumbing help in {city.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            For urgent leaks, drain backups, sewer line symptoms, overflows, and water heater problems in {city.name} and nearby {city.countyHint} areas.
          </p>
          <div className="mt-6">
            <CallButton location={`city-${city.slug}-top`} />
          </div>
        </article>
        <LeadForm pageUrl={path} service="Emergency plumbing" city={city.name} />
      </div>

      <DirectAnswer>
        If you are in {city.name} and a plumbing issue can damage property, expose people to wastewater, or stop essential fixtures,
        stop water use where safe and request a provider connection.
      </DirectAnswer>
      <LocalGuidance cityName={city.name} />
      <InfoListSection
        kicker="Local relevance"
        title={`Emergency plumbing situations in ${city.name}`}
        intro={`This page uses service-area wording for ${city.areaHint}. It does not claim a Plumbing Hands office, local address, or local license in ${city.name}.`}
        items={[
          "Older fixtures, high-use bathrooms, apartment buildings, restaurants, and slab plumbing can all create urgent calls.",
          "Drain and sewer symptoms should be treated faster when several fixtures react at once.",
          "Active leaks should be shut off at the fixture valve or main valve when safe.",
          "Pricing, arrival, and licensing should be confirmed directly with the matched provider."
        ]}
      />

      <section className="content-section">
        <p className="section-kicker">Service options</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Urgent service options for {city.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} className="rounded-md border border-slate-200 bg-white p-4 font-bold text-slate-900 hover:border-emerald-400" href={`/services/${service.slug}`}>
              {service.name}
            </Link>
          ))}
        </div>
      </section>
      {cityServiceLinks.length ? (
        <section className="content-section">
          <p className="section-kicker">Priority local pages</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">High-priority {city.name} emergency pages</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {cityServiceLinks.map((service) => (
              <Link key={service.slug} className="rounded-md border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-950 hover:border-emerald-500" href={`/cities/${city.slug}/${service.slug}`}>
                {service.name} in {city.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <section className="content-section">
        <p className="section-kicker">Nearby DFW areas</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Nearby city pages</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {nearbyCities.map((nearby) => (
            <Link key={nearby.slug} className="rounded-md border border-slate-200 bg-white p-4 font-bold text-slate-900 hover:border-emerald-400" href={`/cities/${nearby.slug}`}>
              {nearby.name}
            </Link>
          ))}
        </div>
      </section>

      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          ...services.slice(0, 4).map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
          ...nearbyCities.map((nearby) => ({ label: `Emergency plumbing in ${nearby.name}`, href: `/cities/${nearby.slug}` }))
        ]}
      />
    </main>
  );
}
