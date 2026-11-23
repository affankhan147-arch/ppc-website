import Link from "next/link";
import { CallButton } from "@/components/CallButton";
import { DirectAnswer, FAQBlock, OfficialSources } from "@/components/PageSections";
import { cities } from "@/data/cities";
import { siteConfig } from "@/data/site";
import { sources } from "@/data/externalSources";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "About Plumbing Hands",
  description: truncateForMeta("Plumbing Hands connects Dallas-Fort Worth homeowners with independent emergency plumbers. How the referral works, what it costs, and where we serve."),
  path: "/about"
});

const aboutFaqs = [
  {
    question: "Is Plumbing Hands a plumbing company?",
    answer:
      "No. Plumbing Hands connects Dallas-Fort Worth homeowners with independent plumbing providers. Licensing, pricing, and scheduling are confirmed directly with the matched provider."
  },
  {
    question: "Does it cost anything to call?",
    answer:
      "No. You never pay Plumbing Hands anything. Any price for the visit or the repair is set and quoted by the provider who takes the job."
  },
  {
    question: "Which areas does Plumbing Hands serve?",
    answer: `Coverage spans ${cities.length} Texas cities, centred on Dallas-Fort Worth, with service-area pages for Houston, Austin and San Antonio too. See the full list of service-area cities on the service areas page.`
  },
  {
    question: "Who actually does the work?",
    answer:
      "An independent local plumbing provider. Ask for the business name and Texas license number at the start of the call, and check the license with the Texas State Board of Plumbing Examiners before you approve work."
  },
  {
    question: "How do I contact Plumbing Hands?",
    answer:
      "Call 1 844-397-8298, or use the contact page to send a service request with your city, problem and urgency."
  }
];

const link = "text-[#4FD1C5] underline hover:text-white";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema("/about", "About Plumbing Hands", "About Plumbing Hands and how the referral service works."),
          breadcrumbSchema([{ name: "About", path: "/about" }])
        ]}
      />
      <div className="answer-grid">
        <article>
          <p className="section-kicker">About</p>
          <h1 className="mt-3 text-4xl font-black text-white">About Plumbing Hands</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Plumbing Hands publishes plain-English plumbing guides for Dallas-Fort Worth homeowners and runs a phone
            line that connects callers with independent emergency plumbing providers.
          </p>
          <div className="mt-6">
            <CallButton location="about-top" pagePath="/about" pageType="about" service="Emergency plumbing" city="Dallas-Fort Worth" />
          </div>
          <DirectAnswer>
            Plumbing Hands is a referral service, not a plumbing company. We don&apos;t fix pipes, employ the plumbers
            who respond, or set their prices.
          </DirectAnswer>
        </article>
      </div>

      <section className="content-section">
        <p className="section-kicker">How it works</p>
        <h2 className="mt-2 text-2xl font-black text-white">One call, routed to a provider that covers you</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Call {siteConfig.phoneDisplay}. The number on the site is a routing line, not the direct line of one plumbing
          company. Your call goes to an available independent provider that serves your city and the kind of problem you
          describe &mdash; a burst pipe in a February freeze, a sewer backup on a Sunday night, a water heater that quit
          before work. The provider you reach can change with the time of day, your location and the service you need.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-300">
          <li>Your call is routed to an independent plumbing provider that serves your city.</li>
          <li>Describe what you see &mdash; a leak, a backup, no hot water &mdash; and say whether water is coming inside.</li>
          <li>The provider confirms how the visit works and gives you its own pricing.</li>
          <li>Ask for the company&apos;s legal name, local address and Texas license number at the start of the call.</li>
          <li>Nothing is agreed until you accept the provider&apos;s price in writing.</li>
        </ul>
      </section>

      <section className="content-section">
        <p className="section-kicker">What it costs</p>
        <h2 className="mt-2 text-2xl font-black text-white">You never pay Plumbing Hands anything</h2>
        <p className="mt-3 leading-7 text-slate-300">
          This is a referral (pay-per-call) website: when you call the number on the site, the call may be routed to an
          independent plumber or a call partner that pays us a referral fee for the connection. Any price for the visit
          or the repair is set and quoted by the provider who takes the job. Read the full{" "}
          <Link href="/disclosure" className={link}>
            provider connection disclosure
          </Link>
          .
        </p>
      </section>

      <section className="content-section">
        <p className="section-kicker">Where we serve</p>
        <h2 className="mt-2 text-2xl font-black text-white">{cities.length} Texas cities, centred on Dallas-Fort Worth</h2>
        <p className="mt-3 leading-7 text-slate-300">
          {siteConfig.name} connects homeowners in {cities.length} Texas cities across the {siteConfig.marketName},
          with service-area pages for Houston, Austin and San Antonio as well. See the{" "}
          <Link href="/cities" className={link}>
            full list of service-area cities
          </Link>
          .
        </p>
      </section>

      <section className="content-section">
        <p className="section-kicker">What we publish</p>
        <h2 className="mt-2 text-2xl font-black text-white">Guides, costs and calculators, written for DFW homes</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Alongside the phone line, the site publishes plain-English{" "}
          <Link href="/blog" className={link}>
            emergency plumbing guides
          </Link>
          ,{" "}
          <Link href="/cost-guides" className={link}>
            cost guides
          </Link>
          ,{" "}
          <Link href="/tools" className={link}>
            calculators
          </Link>{" "}
          and{" "}
          <Link href="/problems" className={link}>
            problem guides
          </Link>{" "}
          for the things Dallas-Fort Worth homes actually run into: hard water, slab leaks, burst pipes in a freeze,
          sewer lines choked by roots, and water heaters worn out years early by mineral-heavy water.
        </p>
      </section>

      <section className="content-section">
        <p className="section-kicker">Before you hire</p>
        <h2 className="mt-2 text-2xl font-black text-white">What to check before any provider starts work</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Texas licenses plumbers through the Texas State Board of Plumbing Examiners, so ask for the license number and
          check it before you approve work. Get the price in writing before work starts, ask for proof of insurance, and
          keep the written quote with the invoice. If a provider will not give you a license number or a written price,
          call another one.
        </p>
      </section>

      <FAQBlock faqs={aboutFaqs} title="About Plumbing Hands questions" />

      <OfficialSources
        title="Check before you hire"
        intro="Confirm the provider's Texas license before you approve work."
        links={[sources.tsbpeLookup]}
      />

      <section className="content-section">
        <p className="section-kicker">Service-area note</p>
        <p className="mt-2 leading-7 text-slate-300">{siteConfig.disclosure}</p>
        <p className="mt-3 leading-7 text-slate-300">
          Questions or a service request? See the{" "}
          <Link href="/contact" className={link}>
            contact page
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
