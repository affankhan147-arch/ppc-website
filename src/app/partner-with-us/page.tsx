import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer } from "@/components/PageSections";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Partner with the PPC lead generation platform",
  description: "Partner inquiry page for verified plumbing providers and future lead buyers in Dallas-Fort Worth.",
  path: "/partner-with-us"
});

export default function PartnerPage() {
  return (
    <main className="page-shell">
      <JsonLd data={webPageSchema("/partner-with-us", "Partner with the PPC lead generation platform", "Partner inquiry page for verified providers.")} />
      <div className="answer-grid">
        <article>
          <p className="section-kicker">Partner routing</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">Partner with the PPC lead generation platform</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            This platform is designed for verified providers, agencies, aggregators, and service partners who can handle qualified emergency plumbing and drain calls.
          </p>
          <DirectAnswer>
            Buyers should be real businesses with owner-approved service areas, licensing or insurance claims only when verified, clear call acceptance rules, and capacity for urgent work.
          </DirectAnswer>
        </article>
        <LeadForm pageUrl="/partner-with-us" service="Partner inquiry" city="Dallas-Fort Worth" />
      </div>
      <section className="content-section">
        <p className="section-kicker">Buyer quality rules</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {["Market and service match", "Minimum call duration threshold", "Duplicate filtering", "Daily cap", "Fallback routing", "Owner-approved compliance claims"].map((rule) => (
            <li key={rule} className="rounded-md bg-slate-50 p-3 font-semibold text-slate-800">{rule}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
