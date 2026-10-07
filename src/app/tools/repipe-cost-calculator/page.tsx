import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import RepipeCostCalculator from "@/components/RepipeCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/repipe-cost-calculator";
const TITLE = "Whole-House Repipe Cost Calculator: PEX vs. Copper";
const DESCRIPTION =
  "Free calculator: enter your home's square footage and pick PEX or copper to see a real modeled cost range for a full whole-house repipe, sourced from 2026 HomeAdvisor and Angi data.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "How much does it cost to repipe a house in DFW?",
    answer:
      "Modeled estimates from this calculator typically land between $3,000 and $20,000 depending on home size and pipe material, which lines up with the real-world DFW range of $4,000-$15,000 for a full repipe already documented in our polybutylene pipe guide - smaller or limited-scope jobs tend toward the low end, larger homes or harder attic/crawlspace access toward the high end."
  },
  {
    question: "Is PEX or copper better for a whole-house repipe?",
    answer:
      "PEX is what most DFW plumbers install for a repipe today - it's flexible, freeze-resistant, and runs roughly 3x-4x cheaper per linear foot in materials than copper. Copper is more traditional and has a longer track record, but the material-cost gap is the main reason most homeowners replacing failed polybutylene or galvanized pipe choose PEX instead."
  }
];

export default function RepipeCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Whole-House Repipe Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Repipe Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            A whole-house repipe is one of the biggest plumbing decisions a homeowner makes - often triggered
            by failing polybutylene or galvanized pipe. Enter your home&apos;s square footage and pick a pipe
            material to see a modeled cost range, built from HomeAdvisor&apos;s and Angi&apos;s published 2026
            cost data.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage(undefined, 6)}
              alt="Homeowner discussing a whole-house repipe estimate with a DFW plumber"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <RepipeCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why DFW homeowners hit this decision often</h2>
            <p className="text-slate-300 mb-4">
              DFW has a large stock of homes built during the 1978-1995 window when polybutylene supply pipe was
              standard, plus older neighborhoods still running galvanized steel. Both materials fail with age, and
              unlike a single leak repair, the fix is usually a full repipe rather than a patch. Our{" "}
              <Link href="/guides/dfw-polybutylene-pipe-replacement" className="text-[#F0B429] underline">
                polybutylene pipe guide
              </Link>{" "}
              covers how to identify PB pipe, the insurance implications, and the real-world DFW cost range this
              calculator&apos;s estimates are checked against.
            </p>
            <p className="text-slate-300">
              Whether your home falls in that higher-risk construction window - and what your city&apos;s typical
              housing stock looks like - is covered in our{" "}
              <Link href="/guides/dfw-housing-age-by-city" className="text-[#F0B429] underline">
                DFW housing age by city guide
              </Link>
              .
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.homeadvisor.com/cost/plumbing/install-new-plumbing-pipes" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Does It Cost to Repipe a House?
                </a>{" "}
                (2026 data - per-square-foot baseline and labor-share figure)
              </li>
              <li>
                <a href="https://www.bobvila.com/articles/cost-to-repipe-a-house/" className="underline" target="_blank" rel="noopener noreferrer">
                  Angi / Bob Vila: Cost to Repipe a House
                </a>{" "}
                (2026 data - national cost range and per-linear-foot figures by pipe material)
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              The copper-vs-PEX multiplier above is a modeled estimate derived transparently from these sources&apos;
              per-linear-foot figures and labor-share data, not a directly published total-cost figure - see the
              calculator&apos;s own notes for the exact derivation.
            </p>
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
                { label: "Polybutylene Pipe in DFW: Risks & Replacement", href: "/guides/dfw-polybutylene-pipe-replacement" },
                { label: "DFW Housing Age by City", href: "/guides/dfw-housing-age-by-city" },
                { label: "DFW Slab Leaks Guide", href: "/guides/dfw-slab-leaks" },
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
