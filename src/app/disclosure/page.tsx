import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Provider connection disclosure",
  description: "Disclosure for the Dallas-Fort Worth emergency plumbing service request website, explaining the provider connection model and how service requests are routed to local plumbers.",
  path: "/disclosure"
});

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
      <h1 className="mt-3 text-4xl font-black text-slate-950">Provider connection disclosure</h1>
      <div className="content-section space-y-4 leading-7 text-slate-700">
        <p>{siteConfig.legalDisclosure}</p>
        <p>No page on this site should be read as a verified Google Business Profile, physical office listing, review, license, insurance statement, or response-time commitment unless verified proof is stated on that page.</p>
        <p>Service availability, pricing, arrival timing, credentials, and scope should be confirmed directly with the provider before work begins.</p>
      </div>
    </main>
  );
}
