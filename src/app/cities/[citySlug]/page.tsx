import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { DirectAnswer, EnhancementSections, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities, getNearbyCities, getPriorityServiceSlugsForCity } from "@/data/cities";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { cityPageEnhancements } from "@/data/pageEnhancements";
import { services } from "@/data/services";
import { getArticleImage } from "@/lib/articleImages";
import { titleCase } from "@/lib/format";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ citySlug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ citySlug: city.slug }));
}

function buildCityDescription(city: (typeof cities)[number]) {
  const candidates = [
    `Request an emergency plumber serving ${city.name}, TX for plumbing and drain cleaning help, covering ${city.areaHint}. Confirm coverage and pricing with your matched provider.`,
    `Request an emergency plumber serving ${city.name}, TX for plumbing and drain cleaning help, covering ${city.areaHint}.`,
    `Request an emergency plumber serving ${city.name}, TX and nearby ${city.countyHint} areas. Confirm coverage and pricing with the provider.`,
    `Request an emergency plumber serving ${city.name}, TX and nearby ${city.countyHint} areas.`
  ];
  const ideal = candidates.find((c) => c.length >= 120 && c.length <= 158);
  if (ideal) return ideal;
  const fitting = candidates.filter((c) => c.length <= 158).sort((a, b) => b.length - a.length)[0];
  if (fitting) return fitting;
  return candidates[candidates.length - 1].slice(0, 155).trimEnd() + "...";
}

export async function generateMetadata({ params }: Props) {
  const { citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  if (!city) return {};
  return buildMetadata({
    title: `Emergency Plumber in ${city.name}, TX`,
    description: truncateForMeta(buildCityDescription(city)),
    path: `/cities/${city.slug}`
  });
}

export default async function CityPage({ params }: Props) {
  const { citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  if (!city) notFound();

  const pageHeading = `Emergency Plumber in ${city.name}, TX`;
  const path = `/cities/${city.slug}`;
  const priorityServiceSlugs = getPriorityServiceSlugsForCity(city.slug);
  const enhancement = cityPageEnhancements[city.slug];
  const cityServiceLinks = priorityServiceSlugs
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof services)[number] => Boolean(service));
  const nearbyCities = getNearbyCities(city.slug, 4);
  const faqs = [
    ...(enhancement?.extraFaqs || []),
    {
      question: `Can I request emergency plumbing help in ${city.name}?`,
      answer: `Yes. This page helps route urgent plumbing and drain requests in ${city.name} to available plumbing professionals serving the area where coverage is available.`
    },
    {
      question: `Is there a 24-hour plumber near me in ${city.name}?`,
      answer: `Requests for ${city.name} are routed to available providers around the clock, but confirm actual arrival timing directly -- 24-hour coverage means the request can be submitted any time, not that a technician is guaranteed to be on-site instantly.`
    },
    {
      question: `How should I use the ${city.name} service-area page?`,
      answer: "Use it to request help for a local plumbing issue. Service availability depends on provider coverage in your area."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, pageHeading, `Provider connection page for urgent plumbing in ${city.name}.`),
          breadcrumbSchema([{ name: "Cities", path: "/cities" }, { name: city.name, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Cities", href: "/cities" }, { label: city.name, href: path }]} />
      <div className="mt-6">
        <article>
          <p className="section-kicker">Local service-area guidance</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white">{pageHeading}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Looking for a 24-hour plumber near {city.name}? This page routes urgent leaks, drain backups, sewer line symptoms, overflows, and
            water heater problems in {city.name} and nearby {city.countyHint} areas to available providers, day or night.
          </p>
          <div className="mt-6">
            <CallButton location={`city-${city.slug}-top`} pagePath={path} pageType="city" city={city.name} service="Emergency plumbing" />
          </div>
        </article>
        <div className="photo-frame relative mt-6 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
          <Image
            src={getArticleImage(undefined, cities.findIndex((item) => item.slug === city.slug))}
            alt={`Emergency plumbing service in ${city.name}, TX`}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <DirectAnswer>
        If you are in {city.name} and a plumbing issue can damage property, expose people to wastewater, or stop essential fixtures,
        stop water use where safe and request a provider connection.
      </DirectAnswer>
      <LocalGuidance cityName={city.name} />
      <EnhancementSections enhancement={enhancement} />
      <InfoListSection
        kicker="Local relevance"
        title={`Emergency plumbing situations in ${city.name}`}
        intro={`This page is organized around ${city.areaHint}. Confirm pricing, credentials, timing, and scope directly with the provider.`}
        items={[
          "Older fixtures, high-use bathrooms, apartment buildings, restaurants, and slab plumbing can all create urgent calls.",
          "Drain and sewer symptoms should be treated faster when several fixtures react at once.",
          "Active leaks should be shut off at the fixture valve or main valve when safe.",
          "Requests submitted after hours or on weekends are routed the same way as daytime requests -- 24-hour coverage does not mean guaranteed instant arrival, so confirm timing directly.",
          "Pricing, arrival, and licensing should be confirmed directly with the matched provider."
        ]}
      />

      <section className="content-section">
        <p className="section-kicker">Service options</p>
        <h2 className="mt-2 text-2xl font-black text-white">Urgent service options for {city.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} className="rounded-md border border-slate-200 bg-white p-4 font-bold text-slate-900 hover:border-emerald-400" href={`/services/${service.slug}`}>
              {titleCase(service.name)}
            </Link>
          ))}
        </div>
      </section>
      {cityServiceLinks.length ? (
        <section className="content-section">
          <p className="section-kicker">Priority local pages</p>
          <h2 className="mt-2 text-2xl font-black text-white">High-priority {city.name} emergency pages</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {cityServiceLinks.map((service) => (
              <Link key={service.slug} className="rounded-md border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-950 hover:border-emerald-500" href={`/cities/${city.slug}/${service.slug}`}>
                {titleCase(service.name)} in {city.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <section className="content-section">
        <p className="section-kicker">Nearby DFW areas</p>
        <h2 className="mt-2 text-2xl font-black text-white">Nearby DFW locations</h2>
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
          ...(enhancement?.extraLinks || []),
          ...services.slice(0, 4).map((service) => ({ label: titleCase(service.name), href: `/services/${service.slug}` })),
          ...nearbyCities.map((nearby) => ({ label: `Emergency plumbing in ${nearby.name}`, href: `/cities/${nearby.slug}` }))
        ]}
      />
    </main>
  );
}
