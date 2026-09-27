import Link from "next/link";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import WaterHeaterReplaceCalculator from "@/components/WaterHeaterReplaceCalculator";
import { unitTypes, repairOptions, FIFTY_PERCENT_RULE_SOURCE } from "@/data/waterHeaterReplaceCosts";
import { siteConfig } from "@/data/site";

const PATH = "/tools/water-heater-repair-or-replace-calculator";
const TITLE = "Water Heater Repair or Replace Calculator (DFW)";
const DESCRIPTION =
  "Free calculator: enter your water heater's age, type, and the repair it needs to see whether repairing or replacing makes more financial sense, using real 2026 cost data and the 50% replacement rule.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "What is the 50% rule for water heater repair vs. replacement?",
    answer:
      "It's a rule of thumb published by water heater manufacturer Rheem: if a repair costs 50% or more of the price of a new unit, replacement is almost always the better investment. This calculator applies that rule using real 2026 average repair and replacement costs."
  },
  {
    question: "How long should a water heater last before I stop repairing it?",
    answer:
      "Manufacturer guidance puts tank (storage) water heaters at 8-12 years and tankless units at 15-20 years. A unit already inside or past that range is a weaker candidate for another repair, even if the specific fix is cheap - see our DFW water heater lifespan guide for why hard water shortens that range further in this area."
  },
  {
    question: "Is a leaking water heater ever worth repairing?",
    answer:
      "Not if the leak is coming from the tank body itself rather than a fitting or connection. A leak from the tank means the tank's steel shell has failed, and that isn't a repairable part - replacement is the only real option."
  },
  {
    question: "Are these repair and replacement costs exact?",
    answer:
      "No. They're 2026 national averages from Angi's cost data, used here as planning estimates. Your actual price depends on unit size, fuel type, access, code-required upgrades, and local labor rates - always get a written quote before approving work."
  }
];

export default function WaterHeaterReplaceCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Water Heater Repair or Replace Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Water Heater Repair or Replace Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            Getting a repair quote on an older water heater and wondering if it&apos;s worth it? Enter your unit&apos;s
            age, type, and the repair it needs. The calculator weighs the repair cost against a typical new unit
            using the same 50% rule water heater manufacturers themselves recommend, plus manufacturer-published
            age thresholds.
          </p>

          <WaterHeaterReplaceCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">How the recommendation is calculated</h2>
            <p className="text-slate-300 mb-4">
              This tool checks three things, in order: first, whether the failure is even repairable (a leak from
              the tank body itself never is). Second, the 50% rule - {FIFTY_PERCENT_RULE_SOURCE} states that once a
              repair costs half or more of a new unit, replacement is almost always the better investment. Third,
              age against the manufacturer-expected lifespan: {unitTypes.map((u) => `${u.label.toLowerCase()} (${u.expectedLifespanLow}-${u.expectedLifespanHigh} years)`).join(" and ")}.
              A unit already inside that window gets a caution even when the specific repair itself is cheap.
            </p>
            <p className="text-slate-300">
              Repair cost ranges for {repairOptions.filter((r) => !r.alwaysReplace && r.id !== "custom").map((r) => r.label.toLowerCase()).join(", ")}{" "}
              and replacement cost ranges for both tank and tankless units come from Angi&apos;s 2026 national cost data. If
              you already have a written quote, enter it directly with the &quot;Other repair&quot; option for a more precise answer.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why DFW&apos;s water shortens this decision window</h2>
            <p className="text-slate-300">
              Water heaters in Dallas-Fort Worth work against harder water than most of the country - see our{" "}
              <Link href="/guides/dfw-water-heater-lifespan" className="text-[#F0B429] underline">
                DFW water heater lifespan guide
              </Link>{" "}
              for the city-by-city hardness data. Sediment and scale buildup from that hard water is exactly what
              drives up repair frequency as a unit ages, which is why the age thresholds above matter as much as
              the cost comparison itself.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.rheem.com/water-heating/articles/water-heater-lifespan-when-to-repair-vs-replace/" className="underline" target="_blank" rel="noopener noreferrer">
                  Rheem Manufacturing: Water Heater Lifespan - When to Repair vs. Replace
                </a>{" "}
                (the 50% rule and age thresholds)
              </li>
              <li>
                <a href="https://www.angi.com/articles/how-much-does-water-heater-installation-cost.htm" className="underline" target="_blank" rel="noopener noreferrer">
                  Angi: How Much Does Water Heater Replacement Cost?
                </a>{" "}
                (2026 replacement cost data)
              </li>
              <li>
                <a href="https://www.angi.com/articles/how-much-does-it-cost-repair-water-heater.htm" className="underline" target="_blank" rel="noopener noreferrer">
                  Angi: Cost to Repair a Hot Water Heater
                </a>{" "}
                (2026 repair cost data)
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
              Free for home inspectors, real estate agents, property managers, and local bloggers. Copy this link:
            </p>
            <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto"><code>{embed}</code></pre>
          </section>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "DFW water heater lifespan guide", href: "/guides/dfw-water-heater-lifespan" },
                { label: "Water heater making a popping noise? Here's why", href: "/blog/water-heater-making-popping-noise-dallas" },
                { label: "Water heater emergency cost guide", href: "/cost-guides/water-heater-emergency-cost-guide" },
                { label: "Free DFW plumbing tools", href: "/tools" },
                { label: "Water heater emergency service", href: "/services/water-heater-emergency" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
