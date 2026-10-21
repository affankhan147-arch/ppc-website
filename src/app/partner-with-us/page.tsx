import Link from "next/link";
import { PartnerApplicationForm } from "@/components/PartnerApplicationForm";
import { DirectAnswer, FAQBlock, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Provider partner inquiries",
  description: truncateForMeta("Partner inquiry page for licensed plumbing providers in Dallas-Fort Worth interested in receiving qualified local emergency plumbing leads."),
  path: "/partner-with-us"
});

const link = "text-[#4FD1C5] underline hover:text-white";

export default function PartnerPage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema("/partner-with-us", "Provider partner inquiries", "Partner inquiry page for plumbing providers and service partners."),
          breadcrumbSchema([{ name: "Partner with us", path: "/partner-with-us" }])
        ]}
      />
      <div className="answer-grid">
        <article>
          <p className="section-kicker">Provider partners</p>
          <h1 className="mt-3 text-4xl font-black text-white">Provider partner inquiries</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            This page is for real plumbing providers and service partners who can respond to urgent plumbing, drain, sewer, pipe, toilet, and water-heater requests.
          </p>
          <DirectAnswer>
            Partners should provide real business details, owner-approved service areas, verified credential claims, clear availability rules, and capacity for urgent work.
          </DirectAnswer>
        </article>
        <PartnerApplicationForm pageUrl="/partner-with-us" />
      </div>

      <section className="content-section">
        <p className="section-kicker">Partner quality rules</p>
        <h2 className="mt-2 text-2xl font-black text-white">What we ask from plumbing provider partners</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {["Service area match", "Real business information", "Clear availability", "Urgent request capacity", "Verified credential claims only", "Owner-approved compliance claims"].map((rule) => (
            <li key={rule} className="rounded-md bg-slate-50 p-3 font-semibold text-slate-800">{rule}</li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <p className="section-kicker">How it works</p>
        <h2 className="mt-2 text-2xl font-black text-white">How provider partnerships work</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-slate-300">
          <li>You send your business name, Texas license number, the cities you cover and the services you handle.</li>
          <li>We check the license on the TSBPE license search and confirm your service area and hours.</li>
          <li>Calls and requests from homeowners in your area, for the services you handle, are routed to you during the hours you set.</li>
          <li>You quote and do the work directly with the homeowner. Pricing, warranties and permits stay with your business.</li>
        </ol>
      </section>

      <section className="content-section">
        <p className="section-kicker">Where calls come from</p>
        <h2 className="mt-2 text-2xl font-black text-white">The homeowners behind each request</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Requests come from Dallas-Fort Worth homeowners who searched for urgent help and read pages such as our{" "}
          <Link href="/services" className={link}>emergency plumbing services</Link>,{" "}
          <Link href="/cities" className={link}>city service area pages</Link> and{" "}
          <Link href="/problems" className={link}>plumbing problem guides</Link>. Many have already read a cost guide or used a
          calculator, so they call with a clearer idea of the problem. How routing and referral fees work is explained on the{" "}
          <Link href="/disclosure" className={link}>provider connection disclosure</Link> page.
        </p>
      </section>

      <section className="content-section">
        <p className="section-kicker">Good fit</p>
        <h2 className="mt-2 text-2xl font-black text-white">Who tends to do well as a partner</h2>
        <p className="mt-3 leading-7 text-slate-300">
          The providers who get the most from urgent calls answer the phone quickly, give a clear arrival window and explain
          the price before they start. Homeowners calling about a burst pipe or a sewer backup are stressed and often have
          water on the floor, so a calm first conversation matters as much as the repair. Shops with a dispatcher or an
          answering plan for evenings and weekends, trucks stocked for common emergency repairs, and a habit of leaving a
          written estimate tend to turn these calls into repeat customers and reviews.
        </p>
      </section>

      <FAQBlock
        title="Provider partner questions"
        faqs={[
          {
            question: "Do I need a Texas plumbing license to partner?",
            answer: "Yes. Every provider partner needs a current Texas plumbing license that homeowners can find on the TSBPE license search, plus the insurance your business normally carries."
          },
          {
            question: "Can I choose my cities, services and hours?",
            answer: "Yes. Tell us which cities you cover, which jobs you take, such as drains, sewer lines, burst pipes or water heaters, and when you can answer calls. Requests are only routed to you inside those limits."
          },
          {
            question: "Who sets the price for the job?",
            answer: "You do. You quote the homeowner directly and do the work under your own terms, warranty and permits. Homeowners are encouraged to ask for a written estimate before work starts."
          },
          {
            question: "What happens if I cannot take a call?",
            answer: "Tell us when your capacity changes so routing can be paused. Missed urgent calls hurt homeowners, so clear availability rules matter more than volume."
          }
        ]}
      />

      <OfficialSources
        title="Official licensing resources for plumbing provider partners"
        intro="Every partner must hold a current Texas plumbing license that homeowners can look up themselves. Many homeowners check the license before the truck arrives, so keep your license number on your estimates, invoices and vehicle, and tell us right away if it lapses or changes."
        links={[sources.tsbpeLookup, sources.tsbpe]}
      />
    </main>
  );
}
