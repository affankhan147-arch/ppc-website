import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Provider connection disclosure",
  description: "Disclosure for the Dallas-Fort Worth emergency plumbing lead generation platform.",
  path: "/disclosure"
});

export default function DisclosurePage() {
  return (
    <main className="page-shell max-w-4xl">
      <p className="section-kicker">Disclosure</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">Provider connection disclosure</h1>
      <div className="content-section space-y-4 leading-7 text-slate-700">
        <p>{siteConfig.disclosure}</p>
        <p>No page on this site should be read as a fake Google Business Profile, fake address, fake local office, fake review, fake license, fake insurance claim, or guaranteed response-time claim.</p>
        <p>The platform is built for organic SEO, local service-area relevance, AEO answers, call capture, lead forms, routing data, and compliance-aware growth.</p>
      </div>
    </main>
  );
}
