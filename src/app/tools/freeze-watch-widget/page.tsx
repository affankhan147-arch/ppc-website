import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Free DFW Freeze Watch Widget (Live, Embeddable)",
  description: truncateForMeta(
    "A free, live-updating freeze-risk badge for Dallas-Fort Worth, sourced directly from the National Weather Service forecast."
  ),
  path: "/tools/freeze-watch-widget"
});

const embedCode = `<a href="${siteConfig.baseUrl}/guides/dfw-burst-pipes" target="_blank" rel="noopener">
  <img src="${siteConfig.baseUrl}/api/widgets/freeze-watch" alt="DFW Freeze Watch - live pipe freeze risk badge by Plumbing Hands" height="26" />
</a>`;

export default function FreezeWatchWidgetPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/tools/freeze-watch-widget",
            "Free DFW Freeze Watch Widget",
            "A free, live-updating freeze-risk badge for Dallas-Fort Worth, sourced directly from the National Weather Service forecast."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Freeze Watch Widget", path: "/tools/freeze-watch-widget" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tools - Live Data</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Free DFW Freeze Watch Widget
          </h1>
          <p className="text-slate-300 mb-6">
            Unlike our other badges, this one updates automatically. It pulls the current
            overnight low forecast for Dallas-Fort Worth directly from the National Weather
            Service and flips to a freeze-risk warning whenever the forecast low is 32F or
            below - useful for real estate, property-management, HOA, and local-news sites
            that want a live winter-prep reminder without maintaining it themselves.
          </p>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>
              Free to use on any site. The badge refreshes roughly hourly and never shows data
              older than a few hours. Keep it linked to the source page - don&apos;t alter the
              image or strip the link. That&apos;s the only condition.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-4">Live preview</h2>
            <div className="border border-[#1A3A38] rounded-xl p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/widgets/freeze-watch"
                alt="DFW Freeze Watch - live pipe freeze risk badge by Plumbing Hands"
                height={26}
                className="mb-3"
              />
              <p className="text-slate-400 text-xs mb-3">
                Source: National Weather Service forecast for the Dallas-Fort Worth area (FWD
                office). Freeze risk is flagged when the forecast low is 32F or below.
              </p>
              <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
            </div>
          </section>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Burst Pipes in DFW", href: "/guides/dfw-burst-pipes" },
                { label: "Free DFW Data Badges (Embeddable)", href: "/tools/dfw-data-badges" },
                { label: "Free DFW Water Hardness Widget", href: "/tools/water-hardness-widget" },
                { label: "All Free Tools", href: "/tools" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
