import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";
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

      <section className="content-section soft-band">
        <p className="section-kicker">
          <DollarSign className="h-4 w-4" aria-hidden="true" /> Cost guides
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
          DFW Emergency Plumbing Cost Guides
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          No fabricated price tags - each guide below explains what actually drives emergency
          plumbing cost in Dallas-Fort Worth and the questions worth asking before you approve
          any work.
        </p>
      </section>

      <div className="photo-frame relative mt-2 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
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
              className="premium-card group min-w-0 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-xl"
            >
              <h2 className="text-xl font-black text-white">{guide.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{guide.directAnswer}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-base font-black text-cyan-700 group-hover:text-cyan-900">
                Read the guide <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section">
        <p className="section-kicker">How to use these guides</p>
        <h2 className="mt-2 text-2xl font-black text-white">How to read a plumbing cost guide</h2>
        <p className="mt-3 leading-7 text-slate-300">
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
