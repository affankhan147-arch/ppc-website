import Link from "next/link";
import { OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: truncateForMeta("Privacy policy for the Dallas-Fort Worth emergency plumbing service request website, covering what information is collected and how it is used."),
  path: "/privacy"
});

const h2 = "mt-8 text-2xl font-bold text-white";
const link = "text-[#4FD1C5] underline hover:text-white";

export default function PrivacyPage() {
  return (
    <main className="page-shell max-w-4xl">
      <JsonLd
        data={[
          webPageSchema("/privacy", "Privacy policy", "How this website handles submitted service request information."),
          breadcrumbSchema([{ name: "Privacy", path: "/privacy" }])
        ]}
      />
      <p className="section-kicker">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-white">Privacy policy</h1>
      <div className="content-section space-y-4 leading-7 text-slate-300">
        <p>
          This privacy policy explains what information Plumbing Hands collects when you use this website or call the phone
          number shown on it, how that information is used, and the choices you have. Plumbing Hands connects Dallas-Fort Worth
          homeowners with independent plumbing providers. How that connection works is explained on our{" "}
          <Link href="/disclosure" className={link}>provider connection disclosure</Link> page.
        </p>

        <h2 className={h2}>Information we collect</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-white">Service request details you type in:</strong> name, phone number, city or ZIP code,
            the service you need, how urgent it is, and any message you add.
          </li>
          <li>
            <strong className="text-white">Page details sent with a request:</strong> the page you were on, the page that sent
            you here, and campaign (UTM) tags, so we know which pages help people find service.
          </li>
          <li>
            <strong className="text-white">Call details:</strong> calls to the number on this site go through a call routing
            service so they can reach an available provider. That service can log your phone number, the time and length of the
            call, and the page that showed the number. Calls may be recorded for quality and billing purposes.
          </li>
          <li>
            <strong className="text-white">Analytics data:</strong> only if you accept analytics cookies (see below).
          </li>
        </ul>
        <p>Do not submit sensitive account credentials, payment details, medical information, or private documents through the form.</p>

        <h2 className={h2}>How we use information</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>To connect your call or request with an independent plumbing provider that serves your area.</li>
          <li>To confirm that calls and requests were delivered, and to settle referral fees with providers and call partners.</li>
          <li>To learn which pages, guides and calculators are useful so we can improve them.</li>
          <li>To block spam, fraud and abuse of the request form and phone line.</li>
        </ul>

        <h2 className={h2}>Who receives your information</h2>
        <p>
          The provider or call partner that handles your request receives the details needed to contact you and discuss the job.
          Companies that host this website, route calls and run analytics process data for us. We may also share information when
          the law requires it. Once a provider has your details, its own privacy practices apply to how it uses them.
        </p>

        <h2 className={h2}>How long we keep information</h2>
        <p>
          Request and call records are kept only as long as they are needed to route requests, confirm delivery, settle
          referral fees, answer questions about a past request and meet legal or tax obligations. After that they are deleted
          or stripped of details that identify you. Analytics data is kept under Google Analytics retention settings.
        </p>

        <h2 className={h2}>Children&apos;s privacy</h2>
        <p>
          This site is meant for adult homeowners, renters and property managers. It is not directed to children under 13,
          and we do not knowingly collect information from them. If you believe a child has sent us details, contact us and
          we will delete them.
        </p>

        <h2 className={h2}>Cookies and analytics</h2>
        <p>When you first visit this site, a banner asks whether you want to allow analytics cookies. If you choose &ldquo;Accept,&rdquo; we load Google Analytics to understand how visitors use the site (pages viewed, general location, device type) so we can improve it. If you choose &ldquo;Decline,&rdquo; Google Analytics is not loaded and no analytics cookies are set.</p>
        <p>You can change your choice at any time using the &ldquo;Cookie preferences&rdquo; link in the footer of any page, which re-opens the banner.</p>

        <h2 className={h2}>Your choices</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Decline analytics cookies, or change your choice later from the footer link.</li>
          <li>Install the Google Analytics opt-out add-on listed below to stop analytics on every site you visit.</li>
          <li>
            Ask what information we hold about your call or request, or ask us to delete it, through the{" "}
            <Link href="/contact" className={link}>contact page</Link>.
          </li>
          <li>
            Read our <Link href="/terms" className={link}>terms of use</Link> for how the site and its tools may be used, and
            the <Link href="/faq" className={link}>plumbing FAQ</Link> for common questions about requesting service.
          </li>
        </ul>
      </div>

      <OfficialSources
        title="Official resources about analytics and your privacy"
        intro="This site uses Google Analytics only after you accept cookies. These pages from Google explain what it collects and how to switch it off everywhere."
        links={[sources.googlePartnerSites, sources.gaOptOut]}
      />
    </main>
  );
}
