import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: truncateForMeta("Terms of use for the Dallas-Fort Worth emergency plumbing service request website, outlining how the provider connection service works and your responsibilities as a user."),
  path: "/terms"
});

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
      <h1 className="mt-3 text-4xl font-black text-slate-950">Terms of use</h1>
      <div className="content-section space-y-4 leading-7 text-slate-700">
        <p>This website provides information and service request options. It does not guarantee availability, pricing, arrival time, results, licensing, insurance, or emergency response.</p>
        <p>Users should verify provider details, pricing, credentials, and work scope directly with the provider before authorizing service.</p>
        <p>If there is danger to life, health, fire, gas, electricity, or public safety, contact the proper emergency service or utility immediately.</p>
      </div>
    </main>
  );
}
