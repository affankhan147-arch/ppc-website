import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import SlabLeakRepairCostCalculator from "@/components/SlabLeakRepairCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/slab-leak-repair-cost-calculator";
const TITLE = "Slab Leak Repair Cost Calculator: Relining vs. Reroute";
const DESCRIPTION =
  "Free calculator: see real 2026 cost ranges for trenchless pipe relining versus rerouting a damaged slab leak pipe, plus what leak detection costs before repair.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "How much does it cost to fix a slab leak?",
    answer:
      "Most slab leak repairs run $630-$4,400, averaging around $2,280, according to HomeAdvisor's 2026 published data. Where you land in that range depends mostly on the repair method: trenchless pipe relining runs about $80-$250 per linear foot of damaged pipe, while rerouting the line (abandoning the damaged section and running new pipe through the attic or walls) typically runs $600-$4,000 as a flat project cost."
  },
  {
    question: "Is relining or rerouting cheaper?",
    answer:
      "It depends on how much pipe is damaged. A short damaged section (under about 10 feet) is often cheaper to reline, while a longer run or a pipe that has already collapsed usually isn't a candidate for relining at all - rerouting becomes the only option. A professional leak-detection diagnosis is what determines which methods your specific pipe actually qualifies for."
  },
  {
    question: "Do I need leak detection before repair?",
    answer:
      "Yes, in almost every case. Professional slab leak detection (acoustic listening, thermal imaging, or tracer gas) typically runs $150-$400 and is what confirms the leak's exact location and whether the pipe's condition allows trenchless relining or requires a reroute instead. Skipping this step risks paying for the wrong repair."
  },
  {
    question: "Why are slab leaks so common in DFW specifically?",
    answer:
      "Dallas-Fort Worth sits on expansive clay soil that shifts with every wet-dry cycle, stressing the water lines embedded under concrete slab foundations. Our DFW slab leaks guide covers the local soil science and detection methods in more detail."
  },
  {
    question: "Are these my exact repair costs?",
    answer:
      "No. These are planning estimates built from HomeAdvisor's 2026 published national cost data, cross-checked against This Old House's independently stated overall range. Your actual quote depends on pipe depth, access, how much pipe is damaged, and what a leak-detection diagnosis finds - a licensed plumber's inspection is always the final word."
  }
];

export default function SlabLeakRepairCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Slab Leak Repair Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Slab Leak Repair Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            A slab leak repair can run anywhere from a few hundred dollars to several thousand, mostly
            depending on the repair method. Pick a method below and see a real cost range, built from
            HomeAdvisor&apos;s published 2026 national data.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage("burst-pipe-emergency", 2)}
              alt="Plumber diagnosing a slab leak under a Dallas-Fort Worth home's foundation"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <SlabLeakRepairCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why DFW homeowners hit this decision often</h2>
            <p className="text-slate-300 mb-4">
              Dallas-Fort Worth sits on expansive Blackland Prairie clay that expands and contracts with
              every rain-and-drought cycle, putting constant stress on the water lines embedded beneath
              concrete slab foundations. Once a leak-detection diagnosis confirms a slab leak, the
              relining-versus-reroute decision comes down to how much pipe is damaged and whether that
              section has already collapsed. Our{" "}
              <Link href="/guides/dfw-slab-leaks" className="text-[#F0B429] underline">
                DFW slab leaks guide
              </Link>{" "}
              covers why this happens locally and the detection methods plumbers actually use.
            </p>
            <p className="text-slate-300">
              If the leak led to water damage, what your homeowners insurance will and won&apos;t cover is a
              separate question from the repair cost itself - see our{" "}
              <Link href="/guides/texas-insurance-plumbing-claims" className="text-[#F0B429] underline">
                Texas insurance & plumbing claims guide
              </Link>
              .
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.homeadvisor.com/cost/plumbing/slab-leak-repair/" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Does Slab Leak Repair Cost?
                </a>{" "}
                (2026 data - detection, relining, and reroute figures)
              </li>
              <li>
                <a href="https://www.thisoldhouse.com/foundations/slab-leak-repair-cost" className="underline" target="_blank" rel="noopener noreferrer">
                  This Old House: Slab Leak Repair Cost
                </a>{" "}
                (2026 data - independent cross-check of the overall $630-$4,400 range)
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

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Slab leaks in DFW - what homeowners need to know", href: "/guides/dfw-slab-leaks" },
                { label: "Texas insurance & plumbing claims", href: "/guides/texas-insurance-plumbing-claims" },
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
