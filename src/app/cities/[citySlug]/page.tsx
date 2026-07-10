import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer, FAQBlock, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities } from "@/data/cities";
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

      <section className="content-section">
        <p className="section-kicker">City plus service pages</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Urgent service options in {city.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} className="rounded-md border border-slate-200 bg-white p-4 font-bold text-slate-900 hover:border-emerald-400" href={`/cities/${city.slug}/${service.slug}`}>
              {service.name}
            </Link>
          ))}
        </div>
      </section>

      <FAQBlock faqs={faqs} />
      <InternalLinks />
    </main>
  );
}
