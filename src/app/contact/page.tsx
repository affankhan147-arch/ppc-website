import Link from "next/link";
import { CallButton } from "@/components/CallButton";
import { DirectAnswer, FAQBlock, OfficialSources } from "@/components/PageSections";
import { siteConfig } from "@/data/site";
import { sources } from "@/data/externalSources";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Request urgent plumbing help",
  description: truncateForMeta("Contact Plumbing Hands for a Dallas-Fort Worth emergency plumbing or drain service request. Share your city, problem, and urgency to get connected fast."),
  path: "/contact"
});

const contactFaqs = [
  {
    question: "Does it cost anything to call?",
    answer: "No. Calling the number is free. Any price for plumbing work is quoted by the provider who takes the job, so ask for it in writing before work starts."
  },
  {
    question: "Who will I be talking to?",
    answer: "Your call is routed to an independent plumbing provider that serves your area. Ask for the business name and Texas license number at the start of the call."
  },
  {
    question: "Should I call or use a form?",
    answer: "Call if water is actively leaking, sewage is backing up, or a fixture you need has stopped working. A form is fine for problems that can wait a few hours."
  },
  {
    question: "Can someone come out at night or on a weekend?",
    answer: "Many calls are about after-hours problems. Availability depends on the providers covering your city at that moment, so the provider you reach will confirm whether and when someone can come out, and any after-hours rate, before you agree to anything."
  },
  {
    question: "Which areas do you cover?",
    answer: "Calls are routed to providers serving Dallas, Fort Worth and the surrounding Dallas-Fort Worth cities listed on our service area pages, plus a few other Texas metros. If no provider covers your address, you will be told on the call."
  },
  {
    question: "What if I only need a quote and it is not an emergency?",
    answer: "That is fine. Call or send a request with a short description and your city. A provider can schedule a regular visit, and you can use our cost guides and calculators first to see which factors will drive the price."
  },
  {
    question: "Can I ask about my privacy or a past request here?",
    answer: "Yes. Use this page to ask what information we hold about a call or request, or to ask for it to be deleted. The privacy policy explains what is collected."
  }
];

const link = "text-[#4FD1C5] underline hover:text-white";

export default function ContactPage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema("/contact", "Request urgent plumbing help", "Contact and service request page."),
          breadcrumbSchema([{ name: "Contact", path: "/contact" }])
        ]}
      />
      <div className="answer-grid">
        <article>
          <p className="section-kicker">Contact</p>
          <h1 className="mt-3 text-4xl font-black text-white">Request urgent plumbing help</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Share your city, service need, urgency, and phone number. {siteConfig.serviceStatement}
          </p>
          <div className="mt-6">
            <CallButton location="contact-top" pagePath="/contact" pageType="contact" service="Emergency plumbing" city="Dallas-Fort Worth" />
          </div>
          <DirectAnswer>
            For active water, wastewater, or essential fixture problems, call if safe. Forms are useful when you can briefly describe the issue and your location.
          </DirectAnswer>
        </article>
      </div>

      <section className="content-section">
        <p className="section-kicker">Before you call</p>
        <h2 className="mt-2 text-2xl font-black text-white">What to have ready when you call</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-300">
          <li>Your city or ZIP code, so the call reaches a provider that covers your area.</li>
          <li>Which fixture changed first, and whether other drains or toilets react at the same time.</li>
          <li>Whether the water is clean supply water or dirty wastewater.</li>
          <li>Whether you have found and closed the main water shutoff or the fixture&apos;s own valve.</li>
          <li>When it started, and whether water is reaching floors, ceilings or anything electrical.</li>
        </ul>
      </section>

      <section className="content-section">
        <p className="section-kicker">Safety first</p>
        <h2 className="mt-2 text-2xl font-black text-white">When to call 911 or your utility before a plumber</h2>
        <p className="mt-3 leading-7 text-slate-300">
          If you smell gas, leave the home and call 911 or your gas company from outside. If water is near outlets, a breaker
          panel or appliances, stay out of the water and switch power off at the panel only if you can reach it safely. For a
          broken water main in the street or at the meter, call your city water utility first. Once everyone is safe, a plumber
          can deal with the pipe, drain or fixture.
        </p>
      </section>

      <section className="content-section">
        <p className="section-kicker">Find the right page</p>
        <h2 className="mt-2 text-2xl font-black text-white">Service areas, services and guides</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Browse <Link href="/cities" className={link}>emergency plumbing by city</Link>, compare{" "}
          <Link href="/services" className={link}>24/7 plumbing services</Link>, check{" "}
          <Link href="/cost-guides" className={link}>plumbing cost guides</Link> before you approve work, or match your symptom in
          the <Link href="/problems" className={link}>plumbing problem guides</Link>. Questions about how calls are routed are
          answered in our <Link href="/disclosure" className={link}>provider connection disclosure</Link>.
        </p>
      </section>

      <FAQBlock faqs={contactFaqs} title="Contact and call questions" />

      <OfficialSources
        title="Official resources to check before the plumber arrives"
        intro="Confirm the provider's Texas license and understand what your home policy usually covers after sudden water damage."
        links={[sources.tsbpeLookup, sources.tdiWaterDamage]}
      />

      <section className="content-section">
        <p className="section-kicker">Service-area note</p>
        <p className="mt-2 leading-7 text-slate-300">{siteConfig.disclosure}</p>
      </section>
    </main>
  );
}
