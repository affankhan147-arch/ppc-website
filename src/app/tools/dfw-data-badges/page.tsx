import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { EmbedHowTo } from "@/components/WidgetPageExtras";
import { siteConfig } from "@/data/site";
import { categoryLabels, categoryOrder, getWidgetFactsByCategory } from "@/data/widgetFacts";
import { CallButton } from "@/components/CallButton";

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
        <div className="max-w-4xl mx-auto">
          <h1 className="display-title font-bold">
            Free DFW Plumbing Data Badges
          </h1>
          <p className="lead mt-4 mb-6">
            A small set of free, embeddable badges covering real Dallas-Fort Worth data - winter
            freeze risk, population growth, and water heater lifespan. Useful for home-services
            blogs, insurance and property-management sites, and local news or newsletter writers
            who want a quick, accurate reference. Looking for water hardness by city? See our{" "}
            <a href="/tools/water-hardness-widget" className="text-accent underline">
              water hardness widget
            </a>{" "}
            instead.
          </p>

          <div className="mb-6">
            <CallButton location="tool-dfw-data-badges-top" />
          </div>

          <div className="bg-paper border-l-4 border-call p-5 mb-8 text-ink-2 text-sm">
            <p>
              Free to use on any site. Keep each badge linked to its source page so readers can see
              the underlying data - don&apos;t alter the badge image or strip the link. That&apos;s
              the only condition.
            </p>
          </div>

          <nav className="mb-8 flex flex-wrap gap-2">
            {categoryOrder.map((category) => (
              <a
                key={category}
                href={`#${category}`}
                className="rounded-pill border border-rule px-4 py-1.5 text-sm font-semibold text-ink-2 hover:border-accent hover:text-accent"
              >
                {categoryLabels[category]}
              </a>
            ))}
          </nav>

          {categoryOrder.map((category) => {
            const facts = getWidgetFactsByCategory(category);
            if (facts.length === 0) return null;
            return (
              <section key={category} id={category} className="content-section scroll-mt-24">
                <h2 className="text-2xl font-bold text-ink mb-4">{categoryLabels[category]}</h2>
                <div className="space-y-8">
                  {facts.map((fact) => {
                    const alt = `${fact.label}: ${fact.value} - DFW data badge by Plumbing Hands`;
                    const code = embedSnippet(fact.slug, fact.linkPath, alt);
                    return (
                      <div key={fact.slug} className="border border-rule rounded-card p-4">
                        <p className="text-ink font-semibold mb-2">{fact.label}</p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/api/widgets/facts/${fact.slug}`}
                          alt={alt}
                          height={26}
                          className="mb-2"
                        />
                        <p className="text-muted text-xs mb-3">Source: {fact.sourceNote}</p>
                        <pre className="bg-paper text-ink-2 text-xs p-3 overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <EmbedHowTo name="DFW data badges" />

          <OfficialSources
            title="Official sources behind the DFW data badges"
            intro="Each badge cites its own source next to it. These official pages are the best places to read the full records behind the freeze and water heater numbers."
            links={[sources.nwsFreeze, sources.rheemWaterHeater, sources.tsbpeLookup]}
          />

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
