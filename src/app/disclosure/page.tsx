import Link from "next/link";
import { OfficialSources } from "@/components/PageSections";
import { siteConfig } from "@/data/site";
import { sources } from "@/data/externalSources";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Provider connection disclosure",
  description: truncateForMeta("Disclosure for the Dallas-Fort Worth emergency plumbing service request website, explaining how requests are routed to local, independent plumbing providers."),
  path: "/disclosure"
});

const h2 = "mt-8 text-2xl font-bold text-white";
const link = "text-[#4FD1C5] underline hover:text-white";

export default function DisclosurePage() {
  return (
    <main className="page-shell max-w-4xl">
      <JsonLd
        data={[
          webPageSchema("/disclosure", "Provider connection disclosure", "Honest disclosure for this service request website."),
          breadcrumbSchema([{ name: "Disclosure", path: "/disclosure" }])
        ]}
      />
      <p className="section-kicker">Disclosure</p>
      <h1 className="mt-3 text-4xl font-black text-white">Provider connection disclosure</h1>
      <div className="content-section space-y-4 leading-7 text-slate-300">
        <p>{siteConfig.legalDisclosure}</p>
        <p>No page on this site should be read as a verified Google Business Profile, physical office listing, review, license, insurance statement, or response-time commitment unless verified proof is stated on that page.</p>

        <h2 className={h2}>How Plumbing Hands is paid</h2>
        <p>
          Plumbing Hands is a referral (pay-per-call) website. When you call the number on this site or send a request, it may be
          routed to an independent plumbing provider or a call partner that pays a referral fee for the connection. You do not pay
          Plumbing Hands anything. Any price for plumbing work is set and quoted by the provider who takes the job.
        </p>

        <h2 className={h2}>How calls and requests are routed</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>The phone number shown on the site is a routing line, not the direct line of one plumbing company.</li>
          <li>Your call or request goes to an available provider that serves your city and the kind of problem you describe.</li>
          <li>The provider you reach can change with the time of day, your location and the service you need.</li>
          <li>Ask for the provider&apos;s business name and Texas license number at the start of the call.</li>
        </ul>

        <h2 className={h2}>What to confirm before work begins</h2>
        <p>
          Service availability, pricing, arrival timing, credentials, and scope should be confirmed directly with the provider
          before work begins. Check the license with the TSBPE license search below, ask for a written estimate, and read our{" "}
          <Link href="/terms" className={link}>terms of use</Link> for what the site does and does not promise.
        </p>

        <h2 className={h2}>Why we publish this disclosure</h2>
        <p>
          A plumbing emergency is stressful, and people deserve to know who they are calling before they hand over their
          address and phone number. This page exists so nobody mistakes Plumbing Hands for a single plumbing company, a
          government service or a review site. If any page on the site ever reads that way, tell us and we will fix it.
        </p>

        <h2 className={h2}>Where our numbers come from</h2>
        <p>
          Figures in our guides come from public sources such as the National Weather Service, city water utilities, the
          Texas Department of Insurance and equipment manufacturers, and each guide names its sources. Where a page gives an
          estimate, such as a cost range or a calculator result, it says so. Estimates are a starting point for a
          conversation with a licensed plumber, not a quote.
        </p>

        <h2 className={h2}>Your rights as a caller</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>You can ask the provider for its business name, Texas license number and proof of insurance before work starts.</li>
          <li>You can ask for a written estimate and say no to any work you have not approved.</li>
          <li>You can hang up and call a different plumber at any point. Calling this number does not commit you to anything.</li>
          <li>You can ask us what information we hold about your call, as explained in the privacy policy.</li>
          <li>You can report a licensed plumber&apos;s work or conduct to the Texas State Board of Plumbing Examiners.</li>
        </ul>

        <h2 className={h2}>Sponsored content and endorsements</h2>
        <p>
          Guides, cost ranges and calculators on this site are written to help homeowners decide what to do next. If a page ever
          includes a paid placement or sponsored mention, it will be labeled on that page, in line with the Federal Trade
          Commission&apos;s endorsement guidance listed below. Questions about this disclosure can be sent through the{" "}
          <Link href="/contact" className={link}>contact page</Link>, and the <Link href="/privacy" className={link}>privacy policy</Link>{" "}
          explains how call and request details are handled.
        </p>
      </div>

      <OfficialSources
        title="Official resources behind this disclosure"
        intro="The FTC explains how websites should disclose paid relationships, and the Texas plumbing board lets you check any provider's license yourself."
        links={[sources.ftcEndorsement, sources.tsbpeLookup, sources.tsbpe]}
      />
    </main>
  );
}
