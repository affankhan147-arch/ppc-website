import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: truncateForMeta("Privacy policy for the Dallas-Fort Worth emergency plumbing service request website, covering what information is collected and how it is used."),
  path: "/privacy"
});

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
        <p>This site may collect form details such as name, phone, city, service need, urgency, message, page URL, and UTM data for service request handling and reporting.</p>
        <p>Do not submit sensitive account credentials, payment details, medical information, or private documents through the form.</p>
        <p>Analytics and tracking identifiers should be added only through owner-approved environment variables or hosting settings.</p>
        <h2 className="mt-6 text-2xl font-bold text-white">Cookies and analytics</h2>
        <p>When you first visit this site, a banner asks whether you want to allow analytics cookies. If you choose &ldquo;Accept,&rdquo; we load Google Analytics to understand how visitors use the site (pages viewed, general location, device type) so we can improve it. If you choose &ldquo;Decline,&rdquo; Google Analytics is not loaded and no analytics cookies are set.</p>
        <p>You can change your choice at any time using the &ldquo;Cookie preferences&rdquo; link in the footer of any page, which re-opens the banner.</p>
      </div>
    </main>
  );
}
