import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import PressureRegulatorCostCalculator from "@/components/PressureRegulatorCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/water-pressure-regulator-cost-calculator";
const TITLE = "Water Pressure Regulator (PRV) Replacement Cost Calculator";
const DESCRIPTION =
  "Free calculator: pick your line size to see a real 2026 cost range for replacing a failed water pressure regulator (PRV) - plus the signs it has failed open (high pressure) or closed (low pressure).";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "How much does it cost to replace a water pressure regulator (PRV)?",
    answer:
      "Angi's 2026 data (cross-checked against HomeAdvisor's own 2026 figures, which match closely) puts the nationwide average at $400, with a typical range of $200 to $700. By size: a standard 3/4-inch residential installation runs $200-$400, a 1-inch installation for a larger home runs $300-$600, and a commercial or large-capacity unit runs $600-$1,200. These are national planning figures, not a DFW-specific average - treat this calculator as a starting point rather than a quote."
  },
  {
    question: "How do I know if my PRV has failed?",
    answer:
      "A PRV almost always fails open rather than closed, which lets unregulated municipal pressure into the house - banging pipes, a toilet that keeps refilling, fixtures wearing out early, and a water heater failing sooner than expected are the signs, covered in our high water pressure guide. A PRV failing closed (less common) causes a sudden, whole-house pressure drop instead, covered in our sudden low water pressure guide. A simple gauge test at an outdoor hose bib confirms which situation you actually have."
  },
  {
    question: "Should I repair or replace a failing pressure regulator?",
    answer:
      "A repair typically runs $75-$200, which can be worth it on an otherwise new unit. But once a repair quote gets close to half the cost of a new installed regulator for your size category, replacement is usually the better value, since you avoid paying twice for a unit that is already near the end of its service life."
  }
];

export default function PressureRegulatorCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Water Pressure Regulator (PRV) Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Water Pressure Regulator (PRV) Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            A pressure-reducing valve (PRV) regulates the municipal supply pressure coming into your home. When it
            fails - almost always open rather than closed - unregulated pressure can quietly stress pipes, fixtures,
            and your water heater for months before anything obvious breaks. Pick your line size below to see a
            real, sourced 2026 cost range for replacing it.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage(undefined, 4)}
              alt="Plumber inspecting a water pressure regulator valve on a home's main water line in Dallas-Fort Worth"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <PressureRegulatorCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Failed open vs. failed closed</h2>
            <p className="text-slate-300 mb-4">
              A PRV almost always fails toward being wide open, which lets full municipal pressure run unregulated
              into your home&apos;s pipes. Our{" "}
              <Link href="/blog/high-water-pressure-in-dallas-home-hidden-pipe-damage-risk" className="text-[#F0B429] underline">
                high water pressure guide
              </Link>{" "}
              covers the warning signs - banging pipes, a toilet that keeps refilling, fixtures wearing out early,
              and a water heater failing sooner than expected. A PRV failing toward closed is less common and shows
              up as a sudden, whole-house pressure drop instead, covered in our{" "}
              <Link href="/blog/sudden-low-water-pressure-in-dallas-home-what-it-means" className="text-[#F0B429] underline">
                sudden low water pressure guide
              </Link>
              . A simple gauge test at an outdoor hose bib is the fastest way to confirm which one you actually have.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.angi.com/articles/water-pressure-regulator-replacement-cost.htm" className="underline" target="_blank" rel="noopener noreferrer">
                  Angi: How Much Does Water Pressure Regulator Replacement Cost?
                </a>{" "}
                (updated Apr 6, 2026 - installed cost by size, unit cost by type, labor rate, add-ons, repair alternative)
              </li>
              <li>
                <a href="https://www.homeadvisor.com/cost/plumbing/replace-water-pressure-regulator" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Does It Cost to Replace a Water Pressure Regulator?
                </a>{" "}
                (updated Jun 19, 2026 - independent cross-check, confirms the same figures)
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
              Free for home inspectors, real estate agents, insurance agents, and local bloggers. Copy this link:
            </p>
            <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto"><code>{embed}</code></pre>
          </section>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "High Water Pressure: Hidden Pipe Damage Risk", href: "/blog/high-water-pressure-in-dallas-home-hidden-pipe-damage-risk" },
                { label: "Sudden Low Water Pressure: What It Means", href: "/blog/sudden-low-water-pressure-in-dallas-home-what-it-means" },
                { label: "Water Heater Expansion Tank Failure Signs", href: "/blog/water-heater-expansion-tank-failure-signs-dallas" },
                { label: "DFW Water Leak Cost Calculator", href: "/tools/dfw-leak-cost-calculator" },
                { label: "Free DFW plumbing tools", href: "/tools" },
                { label: "Burst Pipe Emergency Service", href: "/services/burst-pipe-emergency" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
