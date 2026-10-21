import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks, LeadIn, OfficialSources } from "@/components/PageSections";
import { sources, sourcesHeading } from "@/data/externalSources";
import GarbageDisposalCostCalculator from "@/components/GarbageDisposalCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/garbage-disposal-cost-calculator";
const TITLE = "Garbage Disposal Repair or Replace Cost Calculator for DFW";
const DESCRIPTION =
  "Free calculator: tell us what's wrong and your disposal's age to see whether repair or replacement makes more sense, plus a real 2026 HomeAdvisor-sourced cost range sized to your household.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "My disposal just hums but won't spin - do I need a new one?",
    answer:
      "Not usually. A hum without spinning almost always means the motor has power but the blades are jammed or the motor's internal reset has tripped - both are typically repairable on a unit under about 8 years old. Our garbage disposal humming guide walks through safely clearing a jam yourself before calling a plumber."
  },
  {
    question: "How long should a garbage disposal actually last?",
    answer:
      "HomeAdvisor's own published data puts typical disposal lifespan at 5 to 10 years, depending on use and water quality. DFW's hard water (see our water hardness by city data) can accelerate wear on the motor and seals, which is part of why age matters as much as the specific symptom when deciding repair vs. replace."
  },
  {
    question: "What size disposal do I actually need?",
    answer:
      "HomeAdvisor groups sizing by household size and use: 1/3-1/2 HP for 1-2 people with light use, 5/8-3/4 HP for 3-4 people with moderate use, and 1-1 1/4 HP for larger households with heavy use. A bigger motor handles more food waste without jamming as often, but costs more upfront."
  },
  {
    question: "Is this my exact repair or installation cost?",
    answer:
      "No. These are planning estimates from HomeAdvisor's published cost data. Your actual bill depends on what a plumber finds once the unit is open, your sink's mounting hardware, and whether any wiring or plumbing needs updating - an on-site look is the only way to confirm the real number."
  }
];

export default function GarbageDisposalCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Garbage Disposal Repair or Replace Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Garbage Disposal Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            <LeadIn topic={TITLE} />
            A jammed or leaking disposal isn&apos;t always a sign you need a new one. Tell us what&apos;s
            happening and the unit&apos;s age to see whether repair or replacement makes more sense, plus a
            real installed-cost range sized to your household - built from HomeAdvisor&apos;s 2026 published
            cost data.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage("sink-and-shower-drain-backup", 2)}
              alt={`${TITLE} - Plumber inspecting a kitchen sink garbage disposal in a DFW home`}
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <GarbageDisposalCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Humming but not spinning?</h2>
            <p className="text-slate-300 mb-4">
              That specific symptom almost always means a jam or a tripped internal reset, not a dead motor.
              Our{" "}
              <Link href="/blog/garbage-disposal-humming-not-turning-what-it-means" className="text-[#F0B429] underline">
                garbage disposal humming but not turning guide
              </Link>{" "}
              covers the safe way to check for and clear a jam yourself before paying for a service call.
            </p>
            <p className="text-slate-300">
              DFW&apos;s hard water can shorten a disposal&apos;s working life the same way it affects water
              heaters - see our{" "}
              <Link href="/blog/dfw-water-hardness-by-city-what-it-does-to-your-water-heater" className="text-[#F0B429] underline">
                DFW water hardness by city guide
              </Link>{" "}
              for what that means in your specific city.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.homeadvisor.com/cost/appliances/garbage-disposal-replacement-cost" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Does It Cost to Replace a Garbage Disposal?
                </a>{" "}
                (fetched 2026-10-14 - replacement cost by household-size/horsepower tier, overall average, labor rate)
              </li>
              <li>
                <a href="https://www.bobvila.com/articles/garbage-disposal-repair-cost" className="underline" target="_blank" rel="noopener noreferrer">
                  Bob Vila: Garbage Disposal Repair Cost
                </a>{" "}
                (overall repair range/average as attributed to HomeAdvisor; per-problem figures in that article
                are not cited to a source and are not reused here)
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="text-white font-semibold">{f.question}</h3>
                  <p className="text-slate-300">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Share this calculator</h2>
            <p className="text-slate-300 mb-3">
              Free for property managers, real estate agents, home inspectors, and local bloggers. Copy this link:
            </p>
            <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto"><code>{embed}</code></pre>
          </section>

          <OfficialSources
            title={sourcesHeading(TITLE, "Official resources for")}
            intro="Calculators give estimates. These official sources help with the decisions around them: confirming that the plumber who quotes the job holds a current Texas license, and checking what a typical home policy covers before you approve work."
            links={[sources.tsbpeLookup, sources.tdiWaterDamage]}
          />

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Garbage disposal humming but not turning", href: "/blog/garbage-disposal-humming-not-turning-what-it-means" },
                { label: "DFW water hardness by city", href: "/blog/dfw-water-hardness-by-city-what-it-does-to-your-water-heater" },
                { label: "Water heater repair or replace calculator", href: "/tools/water-heater-repair-or-replace-calculator" },
                { label: "Free DFW plumbing tools", href: "/tools" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
