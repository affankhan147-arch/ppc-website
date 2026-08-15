import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { siteConfig } from "@/data/site";
import { widgetFacts } from "@/data/widgetFacts";

export const metadata = buildMetadata({
  title: "Free DFW Plumbing Data Badges (Embeddable)",
  description: truncateForMeta(
    "Free, embeddable badges for DFW winter freeze risk, population growth, and water heater lifespan - sourced from real, cited data."
  ),
  path: "/tools/dfw-data-badges"
});

function embedSnippet(slug: string, linkPath: string, alt: string) {
  return `<a href="${siteConfig.baseUrl}${linkPath}" target="_blank" rel="noopener">
  <img src="${siteConfig.baseUrl}/api/widgets/facts/${slug}" alt="${alt}" height="26" />
</a>`;
}

export default function DfwDataBadgesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/tools/dfw-data-badges",
            "Free DFW Plumbing Data Badges",
            "Free, embeddable badges for DFW winter freeze risk, population growth, and water heater lifespan - sourced from real, cited data."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "DFW Data Badges", path: "/tools/dfw-data-badges" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tools</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Free DFW Plumbing Data Badges
          </h1>
          <p className="text-slate-300 mb-6">
            A small set of free, embeddable badges covering real Dallas-Fort Worth data - winter
            freeze risk, population growth, and water heater lifespan. Useful for home-services
            blogs, insurance and property-management sites, and local news or newsletter writers
            who want a quick, accurate reference. Looking for water hardness by city? See our{" "}
            <a href="/tools/water-hardness-widget" className="text-[#F0B429] underline">
              water hardness widget
            </a>{" "}
            instead.
          </p>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>
              Free to use on any site. Keep each badge linked to its source page so readers can see
              the underlying data - don&apos;t alter the badge image or strip the link. That&apos;s
              the only condition.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-4">Pick a badge, copy the code</h2>
            <div className="space-y-8">
              {widgetFacts.map((fact) => {
                const alt = `${fact.label}: ${fact.value} - Data by Plumbing Hands`;
                const code = embedSnippet(fact.slug, fact.linkPath, alt);
                return (
                  <div key={fact.slug} className="border border-[#1A3A38] rounded-xl p-4">
                    <p className="text-white font-semibold mb-2">{fact.label}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/widgets/facts/${fact.slug}`}
                      alt={alt}
                      height={26}
                      className="mb-2"
                    />
                    <p className="text-slate-400 text-xs mb-3">Source: {fact.sourceNote}</p>
                    <pre className="bg-[#0B1614] text-slate-300 text-xs p-3 rounded-lg overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Free DFW Water Hardness Widget", href: "/tools/water-hardness-widget" },
                { label: "Free DFW Freeze Watch Widget (Live)", href: "/tools/freeze-watch-widget" },
                { label: "Free DFW Cost Guide Checklist Badges", href: "/tools/cost-guide-checklists" },
                { label: "DFW Plumbing Emergency Data Report", href: "/guides/dfw-plumbing-data" },
                { label: "Burst Pipes in DFW", href: "/guides/dfw-burst-pipes" },
                { label: "DFW Water Heater Lifespan Guide", href: "/guides/dfw-water-heater-lifespan" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
