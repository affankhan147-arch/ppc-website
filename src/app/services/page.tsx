import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { FAQBlock, InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { getArticleImage } from "@/lib/articleImages";
import { titleCase } from "@/lib/format";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "24/7 Emergency Plumbing Services in Dallas-Fort Worth",
  description: truncateForMeta(
    "Browse 24/7 emergency plumbing services across Dallas-Fort Worth: burst pipes, drain cleaning, sewer lines, water heaters, and toilet emergencies."
  ),
  path: "/services"
});

const categoryLabels: Record<string, string> = {
  "emergency-plumbing": "Emergency Plumbing",
  "drain-cleaning": "Drain Cleaning",
  "sewer-help": "Sewer Line Help"
};

const hubBullets = [
  "24/7 emergency request routing",
  "Same-day provider connections",
  "Drain, sewer, pipe, and water-heater coverage",
  "Availability confirmed directly with the provider"
];

const hubFaqs = [
  {
    question: "Are emergency plumbing services really available 24/7?",
    answer: "Yes. Requests submitted through this page are routed for 24/7 emergency plumbing needs, including nights, weekends, and holidays. Actual arrival time depends on provider availability in your specific area."
  },
  {
    question: "How fast can a 24-hour plumber respond in DFW?",
    answer: "Same-day and emergency response is the goal for urgent requests, but exact timing depends on the provider's current schedule, your location within Dallas-Fort Worth, and the severity of the issue. Confirm an arrival window directly with the matched provider."
  },
  {
    question: "What is the difference between the service categories below?",
    answer: "Emergency plumbing covers urgent pipe, fixture, and water-heater issues. Drain cleaning covers slow or blocked individual drains. Sewer line help covers main-line backups that can affect an entire property. If you are unsure which applies, describe the symptoms when you call and the provider can help route it correctly."
  },
  {
    question: "Do you serve my specific DFW city?",
    answer: "Coverage spans Dallas-Fort Worth and surrounding communities. Visit the city service-area pages to confirm coverage and see priority local pages for your area."
  }
];

export default function ServicesHubPage() {
  const path = "/services";
  const faqs = [...hubFaqs, ...emergencyFaqs.slice(0, 2), ...universalFaqs.slice(0, 2)];
  const categorySlugs = Array.from(new Set(services.map((service) => service.categorySlug)));

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(
            path,
            "24/7 Emergency Plumbing Services in Dallas-Fort Worth",
            "Hub page listing every emergency plumbing, drain cleaning, and sewer line service available across Dallas-Fort Worth."
          ),
          breadcrumbSchema([{ name: "Services", path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Services", href: path }]} />

      <section className="content-section">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="min-w-0">
            <h1 className="display-title font-bold text-ink">
              24/7 Emergency Plumbing Services in Dallas-Fort Worth
            </h1>
            <ul className="mt-5 grid gap-3 text-lg font-bold text-ink sm:grid-cols-2">
              {hubBullets.map((item) => (
                <li key={item} className="flex gap-2 rounded-card border border-rule bg-paper p-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-accent" aria-hidden="true" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-card border border-rule bg-paper p-5">
            <p className="text-lg font-bold text-ink">Request path</p>
            <ul className="mt-3 grid gap-2 text-base font-semibold text-ink-2">
              <li>Choose the service that matches your issue</li>
              <li>Describe the symptoms and your city</li>
              <li>Confirm pricing, credentials, and scope directly</li>
            </ul>
            <div className="mt-5">
              <CallButton location="services-hub" pagePath={path} pageType="service" service="Emergency plumbing" />
            </div>
          </div>
        </div>
      </section>

      <div className="photo-frame relative mt-2 h-64 w-full overflow-hidden sm:h-80">
        <Image
          src={getArticleImage(undefined, 3)}
          alt="24/7 emergency plumbing technician responding to a service call in Dallas-Fort Worth"
          fill
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {categorySlugs.map((categorySlug) => {
        const categoryServices = services.filter((service) => service.categorySlug === categorySlug);
        return (
          <section className="content-section" key={categorySlug}>
            <h2 className="text-2xl font-bold text-ink">
              {`${categoryLabels[categorySlug] || titleCase(categorySlug.replace(/-/g, " "))} services`}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="premium-card min-w-0 p-5"
                >
                  <h3 className="font-bold text-ink">{titleCase(service.name)}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink-2">{service.shortAnswer}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-base font-bold text-accent">
                    View details
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <OfficialSources
        title="Official resources for choosing an emergency plumbing service"
        intro="Whichever service you need, check the plumber's Texas license first and know what a typical home policy covers after sudden water damage."
        links={[sources.tsbpeLookup, sources.tdiWaterDamage, sources.epaLeaks]}
      />

      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "All DFW service areas", href: "/cities" },
          { label: "DFW Emergency Plumbing Cost Guide", href: "/guides/dfw-emergency-plumbing-costs" },
          { label: "Water Heater Lifespan & Maintenance in DFW", href: "/guides/dfw-water-heater-lifespan" },
          { label: "Burst Pipes in DFW: Causes, Costs, First Steps", href: "/guides/dfw-burst-pipes" },
          { label: "Slab Leaks in DFW", href: "/guides/dfw-slab-leaks" },
          { label: "Sewer Line Maintenance & Root Intrusion", href: "/guides/dfw-sewer-root-intrusion" },
          { label: "Gas Line Safety & Capacity in DFW", href: "/guides/dfw-gas-line-safety" },
          { label: "Emergency plumbing guides", href: "/blog" }
        ]}
      />
    </main>
  );
}
