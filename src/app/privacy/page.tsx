import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: truncateForMeta("Privacy policy for the Dallas-Fort Worth emergency plumbing service request website, covering what information is collected and how it is used when you request help."),
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
      <h1 className="mt-3 text-4xl font-black text-slate-950">Privacy policy</h1>
      <div className="content-section space-y-4 leading-7 text-slate-700">
        <p>This site may collect form details such as name, phone, city, service need, urgency, message, page URL, and UTM data for service request handling and reporting.</p>
        <p>Do not submit sensitive account credentials, payment details, medical information, or private documents through the form.</p>
        <p>Analytics and tracking identifiers should be added only through owner-approved environment variables or hosting settings.</p>
      </div>
    </main>
  );
}
