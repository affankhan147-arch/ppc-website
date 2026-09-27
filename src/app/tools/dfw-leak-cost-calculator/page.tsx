import Link from "next/link";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import LeakCostCalculator from "@/components/LeakCostCalculator";
import { leakCostCities } from "@/data/leakCostRates";
import { siteConfig } from "@/data/site";

const PATH = "/tools/dfw-leak-cost-calculator";
const TITLE = "DFW Water Leak Cost Calculator (Dallas & Fort Worth Rates)";
const DESCRIPTION =
  "Free calculator: see what a dripping faucet, running toilet, or hidden leak really adds to your Dallas or Fort Worth water and sewer bill, using each city's own published rates.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "Why does a winter leak cost more in Dallas and Fort Worth?",
    answer:
      "Both cities set your residential sewer volume from your winter water use. Dallas averages December through March (up to 40,000 gallons) and Fort Worth averages December through February. A leak that runs during those months raises the average your sewer charge is measured against, so you keep paying for it after the leak is fixed."
  },
  {
    question: "How much does a leaking faucet add to a Dallas water bill?",
    answer:
      "The EPA says a faucet dripping once per second wastes more than 3,000 gallons a year, about 250 gallons a month. For a Dallas household already using 8,000 gallons a month, that lands in the $4.81 per 1,000 gallons tier, so it adds roughly $1.20 a month in water charges, plus about $1.55 a month in sewer charges if it runs through the winter-average months."
  },
  {
    question: "How do I know if I have a hidden leak?",
    answer:
      "Turn off every fixture and appliance, then watch the leak indicator on your water meter for 15 to 30 minutes. If it moves, water is going somewhere. Our meter-check guide walks through it step by step."
  },
  {
    question: "Are these numbers my exact bill?",
    answer:
      "No. They're estimates built from each city's published volume rates and a 30-day month. Fixed monthly charges, drainage fees, and billing-cycle length vary, and your utility bill is always the final word."
  }
];

export default function LeakCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">DFW Water Leak Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Leak Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            A small leak looks harmless until you price it. Pick your city, enter your normal monthly
            use, and choose a leak. The math uses {leakCostCities.map((c) => c.name).join(" and ")}&apos;s
            own published tiered rates, so the extra gallons are charged at the tier they actually land in.
          </p>

          <LeakCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">The winter-average trap most people miss</h2>
            <p className="text-slate-300 mb-4">
              Dallas and Fort Worth don&apos;t bill your sewer on each month&apos;s water use. They lock it to
              your winter use. Dallas averages the water billed in December through March, capped at 40,000
              gallons, or uses the actual month if that&apos;s lower. Fort Worth averages December through
              February and applies it from the April bill onward. A leak that runs through those months
              doesn&apos;t just cost you water. It raises the sewer volume you&apos;re billed for long after you fix it.
            </p>
            <p className="text-slate-300 mb-4">
              Here&apos;s what that looks like in Dallas for a household using 8,000 gallons a month with a
              50-gallon-a-day leak, the size the EPA says 9% of homes have. The leak adds 1,500 gallons a
              month. At the $4.81 tier that&apos;s about $7.21 in water. At the $6.19 sewer rate, it&apos;s another
              $9.29 a month in sewer if the leak runs through the winter. The sewer side costs more than the water side.
            </p>
            <p className="text-slate-300">
              Bigger leaks climb tiers fast. A running toilet or a slab leak losing 200 gallons a day adds
              6,000 gallons a month, pushing that same Dallas household into the $7.98 tier: about $41.54 in
              added water charges and $37.14 in winter-locked sewer charges every month.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Check for a leak before winter</h2>
            <p className="text-slate-300">
              The cheapest time to find a leak is October or November, before your city starts measuring
              your winter average. Shut off every fixture and watch your meter&apos;s leak indicator. Our{" "}
              <Link href="/blog/how-to-check-your-water-meter-for-a-hidden-leak-dallas" className="text-[#F0B429] underline">
                step-by-step meter check
              </Link>{" "}
              takes about 15 minutes. If your bill already jumped, compare it with your city&apos;s published
              increase in our{" "}
              <Link href="/blog/dfw-water-sewer-rate-increases-by-city-2026" className="text-[#F0B429] underline">
                2026 DFW water and sewer rate guide
              </Link>
              .
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              {leakCostCities.map((c) => (
                <li key={c.slug}>
                  <a href={c.sourceUrl} className="underline" target="_blank" rel="noopener noreferrer">{c.sourceLabel}</a> ({c.effectiveLabel})
                </li>
              ))}
              <li>
                <a href="https://www.epa.gov/watersense/fix-leak-week" className="underline" target="_blank" rel="noopener noreferrer">
                  EPA WaterSense: Fix a Leak Week
                </a>{" "}
                (household leak, faucet, and showerhead figures)
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
              Free for property managers, real estate agents, HOAs, and local bloggers. Copy this link:
            </p>
            <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto"><code>{embed}</code></pre>
          </section>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "How to check your water meter for a hidden leak", href: "/blog/how-to-check-your-water-meter-for-a-hidden-leak-dallas" },
                { label: "DFW water & sewer rate increases by city (2026)", href: "/blog/dfw-water-sewer-rate-increases-by-city-2026" },
                { label: "Free DFW plumbing tools", href: "/tools" },
                { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
