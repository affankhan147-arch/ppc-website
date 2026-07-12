import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: "Privacy policy for the Dallas-Fort Worth emergency plumbing service request website.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <main className="page-shell max-w-4xl">
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
