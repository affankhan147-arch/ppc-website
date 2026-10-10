import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import WaterSoftenerCostCalculator from "@/components/WaterSoftenerCostCalculator";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/water-softener-cost-calculator";
const TITLE = "Water Softener Cost & Sizing Calculator for DFW";
const DESCRIPTION =
  "Free calculator: pick your DFW city and household size to see the grain capacity you need and a real 2025/2026 installed cost range, using this site's own cited water hardness data.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "Do I really need a water softener in DFW?",
    answer:
      "It depends on your city. Our own DFW water hardness data shows Forney, Rockwall, Frisco, and McKinney testing 10-17 grains per gallon (classified Very Hard), while Dallas and Fort Worth run lower but still in the Hard range. Anything above 7 GPG is generally considered hard enough to cause scale buildup in water heaters and fixtures over time."
  },
  {
    question: "Why does the calculator let me change the gallons-per-person figure?",
    answer:
      "Softener sizing is based on a water-treatment industry rule of thumb, not a government or manufacturer-mandated number. The default of 70 gallons per person per day is a commonly used planning assumption, but your actual household usage (visible on your water bill) can run higher or lower, which changes the grain capacity you actually need."
  },
  {
    question: "Salt-based or salt-free - which costs less?",
    answer:
      "Salt-free units often cost less upfront than a double-tank salt-based system, but they condition rather than fully remove hardness minerals and tend to cost more to run at DFW's higher hardness levels. A single-tank salt-based unit is usually the lowest-cost option that still fully softens the water."
  },
  {
    question: "Is this my exact installed cost?",
    answer:
      "No. These are planning estimates built from HomeAdvisor's published 2025/2026 cost data. Your actual quote depends on existing plumbing access, electrical needs near the install location, drain-line routing for the brine discharge, and any permit your city requires - a licensed plumber's on-site look is the final word."
  }
];

export default function WaterSoftenerCostCalculatorPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Water Softener Cost & Sizing Calculator</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Water Softener Cost Calculator", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            DFW&apos;s water runs Hard to Very Hard almost everywhere in the metro. Pick your city and
            household size to see the grain capacity you need and a real installed cost range, built
            from this site&apos;s own cited hardness data and HomeAdvisor&apos;s 2025/2026 cost figures.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage(undefined, 3)}
              alt="Water heater inspection in a DFW home with hard water scale buildup"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <WaterSoftenerCostCalculator />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why DFW&apos;s hard water matters</h2>
            <p className="text-slate-300 mb-4">
              Hard water doesn&apos;t just leave spots on glassware - the calcium and magnesium minerals
              it carries build up as scale inside water heater tanks, cutting efficiency and shortening
              the heater&apos;s life. Our{" "}
              <Link href="/blog/dfw-water-hardness-by-city-what-it-does-to-your-water-heater" className="text-[#F0B429] underline">
                DFW water hardness by city guide
              </Link>{" "}
              covers exactly how that scale buildup affects your water heater, city by city.
            </p>
            <p className="text-slate-300">
              If your water heater is already showing scale-related symptoms, our{" "}
              <Link href="/tools/water-heater-repair-or-replace-calculator" className="text-[#F0B429] underline">
                water heater repair-or-replace calculator
              </Link>{" "}
              can help you decide whether to fix it now or replace it - softening the water going forward
              protects whichever heater you end up with.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.homeadvisor.com/cost/kitchens/water-softener-installation-costs" className="underline" target="_blank" rel="noopener noreferrer">
                  HomeAdvisor: How Much Does a Water Softener System Cost to Install?
                </a>{" "}
                (2025/2026 data - installed cost by type, equipment cost by grain capacity)
              </li>
              <li>
                DFW water hardness by city: this site&apos;s own cited municipal water utility data, as published in{" "}
                <Link href="/guides/dfw-plumbing-data" className="underline">
                  our DFW plumbing data report
                </Link>
                .
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
                { label: "DFW water hardness by city", href: "/blog/dfw-water-hardness-by-city-what-it-does-to-your-water-heater" },
                { label: "Water heater repair or replace calculator", href: "/tools/water-heater-repair-or-replace-calculator" },
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
