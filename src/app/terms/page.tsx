import Link from "next/link";
import { OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: truncateForMeta("Terms of use for the Dallas-Fort Worth emergency plumbing service request website, outlining how the provider connection service works."),
  path: "/terms"
});

const h2 = "mt-8 text-2xl font-bold text-white";
const link = "text-[#4FD1C5] underline hover:text-white";

export default function TermsPage() {
  return (
    <main className="page-shell max-w-4xl">
      <JsonLd
        data={[
          webPageSchema("/terms", "Terms of use", "Terms for using this provider connection website."),
          breadcrumbSchema([{ name: "Terms", path: "/terms" }])
        ]}
      />
      <p className="section-kicker">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-white">Terms of use</h1>
      <div className="content-section space-y-4 leading-7 text-slate-300">
        <p>
          These terms apply when you use the Plumbing Hands website, its guides and calculators, its embeddable widgets, or the
          phone number and request forms shown on it. By using the site you agree to them.
        </p>
        <p>This website provides information and service request options. It does not guarantee availability, pricing, arrival time, results, licensing, insurance, or emergency response.</p>

        <h2 className={h2}>What this website is</h2>
        <p>
          Plumbing Hands publishes plumbing information for Dallas-Fort Worth homeowners and offers a phone line and request forms
          that connect callers with independent plumbing providers. Plumbing Hands does not do plumbing work, does not employ the
          plumbers who respond, and does not set their prices. Our{" "}
          <Link href="/disclosure" className={link}>provider connection disclosure</Link> explains how calls are routed and how the
          site is paid.
        </p>

        <h2 className={h2}>Guides, cost ranges and calculators</h2>
        <p>
          Guides, cost guides and calculators give general information and estimates, not quotes. Real prices depend on the home,
          the provider, access, parts and the time of day. Nothing on this site is legal, insurance or engineering advice. For
          coverage questions, read your policy and ask your insurer; the Texas Department of Insurance resource below is a good
          starting point.
        </p>

        <h2 className={h2}>Your responsibilities before approving work</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Users should verify provider details, pricing, credentials, and work scope directly with the provider before authorizing service.</li>
          <li>Check the plumber&apos;s Texas license with the TSBPE license search listed below.</li>
          <li>Ask for the price, the scope and the warranty in writing before work starts.</li>
          <li>Only submit requests for real plumbing problems at addresses you are allowed to arrange work for.</li>
          <li>If there is danger to life, health, fire, gas, electricity, or public safety, contact the proper emergency service or utility immediately.</li>
        </ul>

        <h2 className={h2}>Independent providers</h2>
        <p>
          Providers are independent businesses. Each one is responsible for its own work, pricing, permits, licensing, insurance
          and warranties. Any agreement for plumbing work is between you and the provider, and Plumbing Hands is not a party to it.
          To the extent the law allows, this website is provided &ldquo;as is&rdquo; without promises about results.
          Complaints about a licensed plumber&apos;s work or conduct can be filed with the Texas State Board of Plumbing
          Examiners, which is linked below, and we would also like to hear about them through the contact page.
        </p>

        <h2 className={h2}>Embeddable widgets and tools</h2>
        <p>
          The free widgets and badges on our <Link href="/tools" className={link}>tools page</Link> may be embedded on other sites
          as long as the embed code, including its attribution link, is left unchanged. We may update, change or stop any tool at
          any time.
        </p>

        <h2 className={h2}>Content ownership and fair use</h2>
        <p>
          The guides, cost guides, calculators, data badges and images on this site belong to Plumbing Hands or are used
          with permission. You are welcome to quote short passages or link to any page with credit. Copying whole pages,
          republishing our data tables without attribution, or scraping the site in bulk is not allowed.
        </p>

        <h2 className={h2}>Links to other websites</h2>
        <p>
          Pages link to outside sources such as the Texas State Board of Plumbing Examiners, the Texas Department of
          Insurance, the EPA and city water utilities so you can check facts for yourself. We do not control those sites and
          are not responsible for their content, availability or privacy practices.
        </p>

        <h2 className={h2}>Changes and related pages</h2>
        <p>
          We may update these terms as the site changes. See the <Link href="/privacy" className={link}>privacy policy</Link> for
          how request and call information is handled, or use the <Link href="/contact" className={link}>contact page</Link> with
          questions.
        </p>
      </div>

      <OfficialSources
        title="Official resources to check before you hire a plumber"
        intro="These official sources help you confirm a plumber's Texas license and understand what a typical home policy covers before you approve work."
        links={[sources.tsbpeLookup, sources.tsbpe, sources.tdiWaterDamage]}
      />
    </main>
  );
}
