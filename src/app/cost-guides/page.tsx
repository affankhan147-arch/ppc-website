import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQBlock, InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { costGuides } from "@/data/costGuides";
import { getArticleImage } from "@/lib/articleImages";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "DFW Emergency Plumbing Cost Guides",
  description: truncateForMeta(
    "Seven plain-language cost guides covering what affects emergency plumbing pricing in Dallas-Fort Worth and what to ask before you approve work."
  ),
  path: "/cost-guides"
});

const hubFaqs = [
  {
    question: "Why don't these cost guides list exact prices?",
    answer: "Emergency plumbing pricing depends on diagnosis, timing, access, parts, and each provider's own rates, so a single number would be misleading. Each guide instead explains what drives the cost and what to ask before you approve work."
  },
  {
    question: "What is the fastest way to avoid overpaying?",
    answer: "Ask about any dispatch or diagnostic fee up front, get the scope explained before work starts, and confirm whether pricing changes after hours. The questions-to-ask section on each guide below covers this for that specific issue."
  }
];

export default function CostGuidesIndexPage() {
  const path = "/cost-guides";
  const faqs = [...hubFaqs, ...emergencyFaqs.slice(0, 2), ...universalFaqs.slice(0, 1)];

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(
            path,
            "DFW Emergency Plumbing Cost Guides",
            "Seven plain-language cost guides covering what affects emergency plumbing pricing in Dallas-Fort Worth and what to ask before you approve work."
          ),
          breadcrumbSchema([{ name: "Cost guides", path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Cost guides", href: path }]} />

      <section className="content-section">
        <h1 className="display-title font-bold">
          DFW Emergency Plumbing Cost Guides
        </h1>
        <p className="lead mt-4">
          No fabricated price tags - each guide below explains what actually drives emergency
          plumbing cost in Dallas-Fort Worth and the questions worth asking before you approve
          any work.
        </p>
      </section>

      <div className="photo-frame relative mt-2 h-64 w-full sm:h-80">
        <Image
          src={getArticleImage(undefined, 5)}
          alt="Homeowner reviewing an emergency plumbing cost estimate in Dallas-Fort Worth"
          fill
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <section className="content-section">
        <div className="grid gap-4 sm:grid-cols-2">
          {costGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/cost-guides/${guide.slug}`}
              className="premium-card min-w-0 p-5"
            >
              <h2 className="text-xl font-bold text-ink">{guide.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-ink-2">{guide.directAnswer}</p>
              <span className="mt-4 inline-flex text-base font-bold text-accent">
                Read the guide
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">How to read a plumbing cost guide</h2>
        <p className="mt-3 leading-7 text-ink-2">
          Each guide explains what drives the price of one job rather than promising a single number. Look at the factors that
          apply to your home, such as access, pipe material, the time of day and whether a permit is needed, then ask the
          provider to price those items in writing. If a quote is far outside what the guide describes, ask what is different
          about your job before you approve it.
        </p>
      </section>

      <OfficialSources
        title="Official resources to check before you approve a plumbing estimate"
        intro="A fair price starts with a licensed plumber and a clear scope. These official sources help you confirm both, and show when insurance may help with the bill."
        links={[sources.tsbpeLookup, sources.tdiWaterDamage, sources.tdiBurstPipes]}
      />

      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "Free Cost Guide Checklists (Embeddable)", href: "/tools/cost-guide-checklists" },
          { label: "All emergency plumbing services", href: "/services" },
          { label: "Free DFW Plumbing Tools & Widgets", href: "/tools" }
        ]}
      />
    </main>
  );
}
