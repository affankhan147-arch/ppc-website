import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import WaterFiltrationSelector from "@/components/WaterFiltrationSelector";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/water-filtration-system-selector";
const TITLE = "Water Filtration System Selector & Cost Calculator for DFW";
const DESCRIPTION =
  "Free tool: pick your DFW city and main water concern (chlorine taste, sediment, drinking-water purity) to see the right filtration system type and a real 2025/2026 installed cost range.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "Do I need a filtration system if I already have a water softener?",
    answer:
      "Yes, likely for a different problem. A softener removes hardness minerals (calcium/magnesium) that cause scale, but it doesn't remove chlorine/chloramine taste, sediment, or contaminants like lead or PFAS. Many DFW homes run a softener and a separate carbon or sediment filter together, each solving its own issue."
  },
  {
    question: "Why does my water taste different every spring?",
    answer:
      "If you're on the North Texas Municipal Water District (Plano, Allen, McKinney, Frisco, Rockwall, Forney), NTMWD switches from chloramine to free chlorine for about a month each year, typically late February through early April, as a required system maintenance flush. It's a normal, temporary change, not a sign of a problem - though a whole-house carbon filter will noticeably reduce the stronger taste during that window."
  },
  {
    question: "Is reverse osmosis overkill for whole-house use?",
    answer:
      "For most DFW homes, yes - RO is usually installed at a single point of use (the kitchen sink) because it's the most relevant tap for drinking and cooking, and a true whole-house RO setup costs more and needs more maintenance (periodic membrane changes, a larger storage tank) for a benefit most people only need at one tap."
  },
  {
    question: "Is this my exact installed cost?",
    answer:
      "No. These are planning estimates built from HomeAdvisor's published 2025/2026 cost data, re-verified against the same source a second time this session. Your actual quote depends on your home's existing plumbing layout, water pressure, and whether any stage needs electrical access - a licensed plumber's on-site look is the final word."
  }
];

export default function WaterFiltrationSelectorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Water Filtration System Selector</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Water Filtration System Selector", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            Chlorine taste, cloudy water, iron staining, or drinking-water purity - each has a different
            fix. Pick your DFW city and your main concern to see the right filtration system type and a
            real installed cost range, built from HomeAdvisor&apos;s 2025/2026 cost data and each city
            water utility&apos;s own published disinfectant information.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage(undefined, 6)}
              alt="Homeowner discussing water filtration options for a DFW home"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <WaterFiltrationSelector />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Filtration vs. softening - not the same job</h2>
            <p className="text-slate-300 mb-4">
              A water softener and a filtration system solve different problems. Our{" "}
              <Link href="/tools/water-softener-cost-calculator" className="text-[#F0B429] underline">
                water softener cost &amp; sizing calculator
              </Link>{" "}
              handles hardness minerals that cause scale; this tool handles taste, sediment, and purity
              concerns a softener doesn&apos;t touch. Many DFW homes, especially in the hardest-water
              cities covered in our{" "}
              <Link href="/blog/dfw-water-hardness-by-city-what-it-does-to-your-water-heater" className="text-[#F0B429] underline">
                DFW water hardness by city guide
              </Link>
              , run both together.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.homeadvisor.com/cost/environmental-safety/install-a-water-treatment-and-purification-system/" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Do Home Water Filtration Systems Cost?
                </a>{" "}
                (2025/2026 data - installed cost by system type and by filtration stage count, fetched and independently re-verified twice)
              </li>
              <li>
                <a href="https://dallascityhall.com/departments/waterutilities/Pages/water_quality_information.aspx" className="underline" target="_blank" rel="noopener noreferrer">
                  Dallas Water Utilities: Water Quality Information
                </a>{" "}
                (confirms chloramine disinfection)
              </li>
              <li>
                <a href="https://www.cor.net/departments/public-services/water/annual-chlorine-maintenance" className="underline" target="_blank" rel="noopener noreferrer">
                  North Texas Municipal Water District: Annual Chlorine Maintenance
                </a>{" "}
                (via a member city&apos;s official page - confirms the seasonal chloramine-to-chlorine switch)
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
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Share this tool</h2>
            <p className="text-slate-300 mb-3">
              Free for property managers, real estate agents, home inspectors, and local bloggers. Copy this link:
            </p>
            <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto"><code>{embed}</code></pre>
          </section>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Water softener cost & sizing calculator", href: "/tools/water-softener-cost-calculator" },
                { label: "DFW water hardness by city", href: "/blog/dfw-water-hardness-by-city-what-it-does-to-your-water-heater" },
                { label: "DFW plumbing data report", href: "/guides/dfw-plumbing-data" },
                { label: "Free DFW plumbing tools", href: "/tools" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
