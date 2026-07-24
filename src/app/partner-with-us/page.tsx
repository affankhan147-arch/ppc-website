import { PartnerApplicationForm } from "@/components/PartnerApplicationForm";
import { DirectAnswer } from "@/components/PageSections";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Provider partner inquiries",
  description: truncateForMeta("Partner inquiry page for licensed plumbing providers and service partners in Dallas-Fort Worth interested in receiving qualified local emergency plumbing leads."),
  path: "/partner-with-us"
});

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
          <h1 className="mt-3 text-4xl font-black text-slate-950">Provider partner inquiries</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
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
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {["Service area match", "Real business information", "Clear availability", "Urgent request capacity", "Verified credential claims only", "Owner-approved compliance claims"].map((rule) => (
            <li key={rule} className="rounded-md bg-slate-50 p-3 font-semibold text-slate-800">{rule}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
