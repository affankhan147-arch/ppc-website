import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import SewerRepairCostCalculator from "@/components/SewerRepairCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/sewer-line-repair-cost-calculator";
const TITLE = "Sewer Line Repair Cost Calculator: Trenchless vs. Traditional Dig";
const DESCRIPTION =
  "Free calculator: enter your sewer line's length and see real 2026 cost ranges for trenchless pipe lining, pipe bursting, and traditional dig-and-replace repair.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "Is trenchless sewer repair always cheaper than digging up the yard?",
    answer:
      "Not always, but usually for longer runs. Trenchless pipe lining runs about $135-$150 per linear foot and pipe bursting about $150-$190, while traditional excavation runs $50-$250 per linear foot depending on depth, access, and yard restoration. Trenchless avoids the yard-restoration and landscaping cost that traditional excavation adds, which is often where the real savings show up."
  },
  {
    question: "Can every sewer line be repaired trenchlessly?",
    answer:
      "No. Trenchless lining or bursting needs a pipe that hasn't fully collapsed and doesn't have significant bellies (sags where the pipe has settled). A sewer camera inspection is what actually confirms whether your line qualifies - if it's already collapsed, traditional excavation is usually the only option for that section."
  },
  {
    question: "Why does DFW's clay soil matter for sewer repairs?",
    answer:
      "DFW's expansive clay soil shifts with moisture swings, which is part of why older cast-iron and clay sewer laterals in the area develop cracks that let tree roots in. Our sewer root intrusion guide covers the local root-intrusion pattern and what triggers it in more detail."
  },
  {
    question: "Are these my exact repair costs?",
    answer:
      "No. These are planning estimates built from Angi's 2026 published national cost data. Your actual quote depends on pipe depth, soil conditions, access, permit requirements in your specific city, and what a camera inspection finds - a licensed plumber's inspection is always the final word."
  }
];

export default function SewerRepairCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Sewer Line Repair Cost Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Sewer Repair Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            A quoted sewer repair can range from a few thousand dollars to well over ten thousand,
            mostly depending on length and method. Enter your line&apos;s length and pick a repair
            method to see a real cost range, built from Angi&apos;s published 2026 national data.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage(undefined, 1)}
              alt="Sewer camera inspection equipment used to diagnose a DFW sewer line before repair"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <SewerRepairCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why DFW homeowners hit this decision often</h2>
            <p className="text-slate-300 mb-4">
              Dallas-Fort Worth&apos;s combination of expansive clay soil and decades-old neighborhoods with
              mature trees means cast-iron and clay sewer laterals crack, and tree roots find their way in
              through those cracks. Once a camera inspection confirms root intrusion or pipe damage, the
              repair-method decision comes down to how bad the damage is and how much yard disruption is
              acceptable. Our{" "}
              <Link href="/guides/dfw-sewer-root-intrusion" className="text-[#F0B429] underline">
                sewer root intrusion guide
              </Link>{" "}
              covers why this happens locally and how it&apos;s diagnosed.
            </p>
            <p className="text-slate-300">
              Older homes carry more of this risk simply because their original pipe materials have had
              more years to develop the small cracks roots exploit. See how your city&apos;s housing stock
              compares in our{" "}
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
                <a href="https://www.angi.com/articles/how-much-does-sewer-line-replacement-or-repair-cost.htm" className="underline" target="_blank" rel="noopener noreferrer">
                  Angi: How Much Does Sewer Line Replacement Cost?
                </a>{" "}
                (2026 data - traditional excavation and total cost figures)
              </li>
              <li>
                <a href="https://www.angi.com/articles/trenchless-sewer-line-replacement-cost.htm" className="underline" target="_blank" rel="noopener noreferrer">
                  Angi: How Much Does Trenchless Sewer Line Piping Cost?
                </a>{" "}
                (2026 data - CIPP lining and pipe bursting figures)
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
                { label: "Sewer line maintenance & root intrusion in DFW", href: "/guides/dfw-sewer-root-intrusion" },
                { label: "DFW housing age by city", href: "/guides/dfw-housing-age-by-city" },
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
