import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks, LeadIn, OfficialSources } from "@/components/PageSections";
import { sources, sourcesHeading } from "@/data/externalSources";
import ToiletInstallCostCalculator from "@/components/ToiletInstallCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/toilet-installation-cost-calculator";
const TITLE = "Toilet Installation & Replacement Cost Calculator for DFW";
const DESCRIPTION =
  "Free calculator: pick your toilet type and whether you're replacing an existing one or installing where none existed, to see a real 2026 cost range from two independently checked cost guides.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "Is replacing a toilet a DIY job, or do I need a plumber?",
    answer:
      "Swapping a standard two-piece toilet onto existing plumbing is a common DIY job for a handy homeowner. Where a plumber earns their fee is a cracked or out-of-round flange, a shutoff valve that won't fully close, or a wax-ring seal gone wrong - any of those turn a 1-hour swap into a leak risk if handled wrong, which is part of why both labor estimates below assume a licensed installer."
  },
  {
    question: "Why is a wall-mounted or smart toilet so much more expensive to install?",
    answer:
      "A wall-mounted toilet needs an in-wall carrier system rated to hold the fixture and the user's weight, which is a different job than setting a floor-mounted bowl on an existing flange. Smart toilets add an electrical outlet requirement near the fixture and more parts that can need adjustment during setup - both add real labor hours on top of a higher fixture cost."
  },
  {
    question: "What does 'installing where no toilet existed before' actually involve?",
    answer:
      "It means there's no drain line, vent stack, or water supply already run to that spot - common when adding a half-bath. That's rough-in plumbing work, not just setting a fixture, which is why Fixr prices that scope at $1,000-$3,500 versus a few hundred dollars for a straight swap onto plumbing that's already there."
  },
  {
    question: "Is this my exact cost?",
    answer:
      "No. These are planning estimates from two independently fetched cost guides, and they disagree with each other by a real margin, which is normal for a market this size. Your home's specific flange condition, floor material, and whether the shutoff valve also needs replacing can only be confirmed by a licensed plumber's on-site look."
  }
];

export default function ToiletInstallCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Toilet Installation & Replacement Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Toilet Installation Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            <LeadIn topic={TITLE} />
            Pick the toilet type you want and whether you&apos;re swapping an existing one or installing where
            none existed before, to see a real cost range - pulled from two independently checked 2026 cost
            guides, since they don&apos;t fully agree with each other on price.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage("toilet-overflow-emergency", 1)}
              alt={`${TITLE} - Plumber installing a new toilet in a DFW bathroom`}
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <ToiletInstallCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">A running toilet usually isn&apos;t a sign you need a new one</h2>
            <p className="text-slate-300 mb-4">
              A running toilet is almost always a worn flapper or fill valve, not a reason to replace the whole
              fixture - but left unfixed it can quietly add hundreds of gallons a month to your bill. See our{" "}
              <Link href="/tools/dfw-leak-cost-calculator" className="text-[#F0B429] underline">
                DFW water leak cost calculator
              </Link>{" "}
              to see what a running toilet or a drip is actually costing you before you decide whether to repair
              or replace.
            </p>
            <p className="text-slate-300">
              If the toilet itself is the problem - it won&apos;t stop overflowing, or it&apos;s simply decades
              old - our{" "}
              <Link href="/problems/toilet-overflowing-will-not-stop" className="text-[#F0B429] underline">
                toilet overflowing and will not stop guide
              </Link>{" "}
              covers the first steps to take and when it becomes urgent.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.fixr.com/costs/toilet-installation" className="underline" target="_blank" rel="noopener noreferrer">
                  Fixr: Cost to Install a Toilet
                </a>{" "}
                (fetched 2026-10-21 - national average, typical range, labor rate, removal cost, and by-type
                installed-cost ranges)
              </li>
              <li>
                <a href="https://www.homeadvisor.com/cost/plumbing/install-a-toilet/" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Does It Cost to Install a Toilet?
                </a>{" "}
                (fetched 2026-10-21 - national average, typical range, average labor cost, and by-type average
                cost)
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
                { label: "DFW water leak cost calculator", href: "/tools/dfw-leak-cost-calculator" },
                { label: "Garbage disposal repair or replace calculator", href: "/tools/garbage-disposal-cost-calculator" },
                { label: "Water pressure regulator (PRV) cost calculator", href: "/tools/water-pressure-regulator-cost-calculator" },
                { label: "Free DFW plumbing tools", href: "/tools" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
