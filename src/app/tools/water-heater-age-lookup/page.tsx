import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import WaterHeaterAgeLookup from "@/components/WaterHeaterAgeLookup";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";

const PATH = "/tools/water-heater-age-lookup";
const TITLE = "Water Heater Age Lookup: Find Your Water Heater's Age by Serial Number";
const DESCRIPTION =
  "Free tool: enter your water heater's brand and the first 4 digits of its serial number to see its approximate manufacture date and age, using published manufacturer date-code formats.";

export const metadata = buildMetadata({
  title: TITLE,
  description: truncateForMeta(DESCRIPTION),
  path: PATH
});

const faqs = [
  {
    question: "Where do I find my water heater's serial number?",
    answer:
      "It's on the rating plate - a metal or paper label on the side of the tank, usually near the top, listing the model number and serial number together. The serial number (not the model number) is what encodes the manufacture date."
  },
  {
    question: "Why don't manufacturers just print the age directly?",
    answer:
      "Most water heaters don't print an install or manufacture date in plain language - only the serial number, which was originally meant for the factory's own production tracking. Homeowners and even many plumbers have to decode it the same way this tool does."
  },
  {
    question: "How accurate is this estimate?",
    answer:
      "It's built from the two most common, well-documented serial-number date-code formats (Rheem-family month+year, and A.O. Smith-family year+week), which cover the large majority of residential tank water heaters sold in the U.S. It won't be exact to the day, and a handful of older or unusual serial formats (noted in the tool) fall outside these two patterns - the rating plate itself is always the most reliable source if it also prints a date."
  },
  {
    question: "My water heater is close to or past the expected lifespan - now what?",
    answer:
      "Tank units are typically expected to last 8-12 years and tankless units 15-20, per manufacturer guidance. Once you know your unit's age from this tool, our water heater repair-or-replace calculator weighs that age against a specific repair quote using the same 50% rule manufacturers recommend."
  }
];

export default function WaterHeaterAgeLookupPage() {
  const embed = `<a href="${siteConfig.baseUrl}${PATH}" target="_blank" rel="noopener">Water Heater Age Lookup</a> by Plumbing Hands`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PATH, TITLE, DESCRIPTION),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Water Heater Age Lookup", path: PATH }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-slate-300 mb-6">
            Most homeowners have no idea how old their water heater actually is - there&apos;s rarely an install
            date written anywhere. But the serial number on the rating plate already encodes it. Pick your
            brand, enter the first 4 digits of the serial number, and see the approximate manufacture date.
          </p>

          <div className="photo-frame relative mt-2 mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={getArticleImage("water-heater-emergency", 0)}
              alt="Water heater rating plate showing the model and serial number used to determine its age"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <WaterHeaterAgeLookup />

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why the serial number, not the model number</h2>
            <p className="text-slate-300 mb-4">
              A water heater&apos;s model number identifies which product it is - capacity, fuel type, features.
              The serial number is what the factory stamped at the moment of production, and on most major
              brands its first several digits are a date code rather than a random tracking number. Rheem,
              Ruud, Richmond, and Rheem-made GE units encode month-then-year; A.O. Smith and the brands it
              manufactures (State, American, Reliance, and current Whirlpool-branded units) encode
              year-then-week. Once you know which family your brand belongs to, the same 4 digits that look
              like a random string decode into an actual date.
            </p>
            <p className="text-slate-300">
              Already know your unit is getting old and just want the repair-vs-replace math? Our{" "}
              <Link href="/tools/water-heater-repair-or-replace-calculator" className="text-[#F0B429] underline">
                water heater repair-or-replace calculator
              </Link>{" "}
              takes the age this tool gives you and weighs it against a specific repair quote.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why DFW homeowners check this so often</h2>
            <p className="text-slate-300">
              DFW&apos;s hard water shortens water heater lifespan compared to the national average - see our{" "}
              <Link href="/guides/dfw-water-heater-lifespan" className="text-[#F0B429] underline">
                DFW water heater lifespan guide
              </Link>{" "}
              for the city-by-city hardness data behind that. Knowing your unit&apos;s real age (not a guess
              based on when you moved in) is the first input into deciding whether a repair is still worth it.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Sources</h2>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>
                <a href="https://www.waterheaterhub.com/water-heater-age-lookup/" className="underline" target="_blank" rel="noopener noreferrer">
                  Water Heater Hub: Water Heater Age Lookup
                </a>{" "}
                (Rheem-family and A.O. Smith-family serial date-code formats)
              </li>
              <li>
                <a href="https://fastwaterheater.com/blog/find-your-water-tank-age-based-on-the-brand/" className="underline" target="_blank" rel="noopener noreferrer">
                  Fast Water Heater Co.: Find Your Water Tank Age Based on the Brand
                </a>{" "}
                (independent confirmation of the same two date-code formats)
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
              Free for home inspectors, real estate agents, property managers, and local bloggers. Copy this link:
            </p>
            <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto"><code>{embed}</code></pre>
          </section>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Water Heater Repair or Replace Calculator", href: "/tools/water-heater-repair-or-replace-calculator" },
                { label: "DFW water heater lifespan guide", href: "/guides/dfw-water-heater-lifespan" },
                { label: "Water heater making a popping noise? Here's why", href: "/blog/water-heater-making-popping-noise-dallas" },
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
