import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import WaterServiceLineCostCalculator from "@/components/WaterServiceLineCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/water-service-line-cost-calculator";
const TITLE = "Water Service Line Replacement Cost Calculator (Plus Who Pays)";
const DESCRIPTION =
  "Free calculator: enter the distance from your street or meter to your house to see a real 2026 cost range for replacing your water service line - plus who's actually responsible for it, you or the city.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "How much does it cost to replace a water service line in DFW?",
    answer:
      "This calculator's estimates are modeled from HomeAdvisor's 2026 national data - typically $50-$250 per linear foot for an open-trench replacement or $75-$150 per linear foot trenchless, so a typical 50-foot run lands somewhere in the $2,500-$12,500 range depending on method and site conditions. These are national figures, not a DFW-specific average - soil type, depth, and whether a driveway or sidewalk has to be crossed all move the real number, so treat this as a planning estimate rather than a quote."
  },
  {
    question: "Who is responsible for a water line repair - the homeowner or the city?",
    answer:
      "In Texas, it's split at the meter. Texas Administrative Code Title 16, Section 24.163(a)(2) says the utility installs and owns the line only up to the meter - from the meter to your house is the customer's property and the customer's responsibility to repair and maintain. Dallas Water Utilities' own published guidance confirms the same split. If the problem is between the street and your meter, it's usually the city's; if it's between the meter and your house, it's yours."
  }
];

export default function WaterServiceLineCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Water Service Line Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Water Service Line Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            Your water service line is the pipe running from the street or meter to your house - a different job
            from an interior whole-house repipe. Enter the distance and pick a method to see a modeled cost range,
            built from HomeAdvisor&apos;s published 2026 cost data, plus a clear answer on who&apos;s actually
            responsible for paying for it.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage(undefined, 1)}
              alt="Underground water service line being inspected before replacement at a DFW home"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <WaterServiceLineCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Who actually pays - you or the city?</h2>
            <p className="text-slate-300 mb-4">
              Under Texas Administrative Code Title 16, Section 24.163(a)(2), the utility installs and owns the
              service pipe only from its main up to the meter. From the discharge side of the meter onward - the
              run to your house - is the customer&apos;s property and the customer&apos;s responsibility to
              install, repair, and keep &quot;in good repair.&quot; Dallas Water Utilities&apos; own published
              guidance confirms the same split: the city maintains the public side and the meter, while the
              property owner maintains the private portion from the meter onward. This pattern holds across Texas
              municipal utilities generally, though the exact property-line or easement boundary is worth confirming
              with your own city before assuming where your responsibility starts.
            </p>
            <p className="text-slate-300">
              If you&apos;re also dealing with a sudden pressure change rather than a known line failure, our{" "}
              <Link href="/blog/sudden-low-water-pressure-in-dallas-home-what-it-means" className="text-[#F0B429] underline">
                sudden low water pressure guide
              </Link>{" "}
              and{" "}
              <Link href="/blog/high-water-pressure-in-dallas-home-hidden-pipe-damage-risk" className="text-[#F0B429] underline">
                high water pressure guide
              </Link>{" "}
              cover the signs worth checking before assuming the service line itself is the problem.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Permits in your DFW city</h2>
            <p className="text-slate-300">
              Most DFW cities require a permit for water service line work, typically in the $100-$500 range, though
              the exact fee and process differ by city. Our{" "}
              <Link href="/blog/dfw-plumbing-permit-requirements-and-fees-by-city" className="text-[#F0B429] underline">
                DFW plumbing permit requirements and fees by city guide
              </Link>{" "}
              covers Dallas, Fort Worth, Arlington, and Plano&apos;s own published fee schedules in detail.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.homeadvisor.com/cost/plumbing/install-a-water-main/" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Does Main Water Line Replacement Cost?
                </a>{" "}
                (updated June 19, 2026 - per-linear-foot installed cost by method, material cost by pipe type, spot-repair and permit ranges)
              </li>
              <li>
                <a href="https://regulations.justia.com/states/texas/title-16/part-2/chapter-24/subchapter-f/section-24-163" className="underline" target="_blank" rel="noopener noreferrer">
                  Texas Administrative Code, Title 16, Section 24.163
                </a>{" "}
                (statewide utility-vs-customer service line responsibility rule)
              </li>
              <li>
                <a href="https://dallas.gov/departments/waterutilities/Pages/Lead-and-Copper-.aspx" className="underline" target="_blank" rel="noopener noreferrer">
                  Dallas Water Utilities: Lead and Copper service line guidance
                </a>{" "}
                (confirms the same utility/customer responsibility split at the meter)
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
                { label: "Sudden Low Water Pressure: What It Means", href: "/blog/sudden-low-water-pressure-in-dallas-home-what-it-means" },
                { label: "High Water Pressure: Hidden Pipe Damage Risk", href: "/blog/high-water-pressure-in-dallas-home-hidden-pipe-damage-risk" },
                { label: "DFW Plumbing Permit Requirements & Fees by City", href: "/blog/dfw-plumbing-permit-requirements-and-fees-by-city" },
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
