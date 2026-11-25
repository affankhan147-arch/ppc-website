import Link from "next/link";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { EmbedHowTo, WidgetHero } from "@/components/WidgetPageExtras";
import { siteConfig } from "@/data/site";
import { waterHardnessData, regionalAverageHardness } from "@/data/waterHardness";
import { CallButton } from "@/components/CallButton";

export const metadata = buildMetadata({
  title: "Free DFW Water Hardness Widget (Embeddable Badge)",
  description: truncateForMeta(
    "A free, embeddable water hardness badge for DFW-area cities, sourced from real municipal water utility data. Copy the code and add it to your site."
  ),
  path: "/tools/water-hardness-widget"
});

function embedSnippet(slug: string, alt: string) {
  return `<a href="${siteConfig.baseUrl}/guides/dfw-plumbing-data" target="_blank" rel="noopener">
  <img src="${siteConfig.baseUrl}/api/widgets/water-hardness/${slug}" alt="${alt}" height="26" />
</a>`;
}

export default function WaterHardnessWidgetPage() {
  const allEntries = [...waterHardnessData, regionalAverageHardness];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/tools/water-hardness-widget",
            "Free DFW Water Hardness Widget",
            "A free, embeddable water hardness badge for DFW-area cities, sourced from real municipal water utility data."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools/water-hardness-widget" },
            { name: "Water Hardness Widget", path: "/tools/water-hardness-widget" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="max-w-4xl mx-auto">
          <h1 className="display-title font-bold">
            Free DFW Water Hardness Widget
          </h1>
          <p className="lead mt-4 mb-6">
            A small, free badge showing real water hardness data (grains per gallon, or GPG) for
            Dallas-Fort Worth area cities. Built for real estate agents, home inspectors, HOA
            newsletters, water treatment companies, and local bloggers who want a quick, accurate
            reference to embed on their own site or in a newsletter.
          </p>

          <div className="mb-6">
            <CallButton location="tool-water-hardness-widget-top" />
          </div>

          <div className="bg-paper border-l-4 border-call p-5 mb-8 text-ink-2 text-sm">
            <p>
              Free to use on any site. Just keep the badge linked back to our{" "}
              <Link href="/guides/dfw-plumbing-data" className="text-accent underline">
                full data report
              </Link>{" "}
              so readers can see the underlying sources - don&apos;t alter the badge image or strip
              the link. That&apos;s the only condition.
            </p>
          </div>

          <WidgetHero alt="Free DFW water hardness widget showing grains-per-gallon data by city" serviceSlug="water-heater-emergency" seed={3} />

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-4">
              Pick your city, copy the water hardness widget code
            </h2>
            <div className="space-y-8">
              {allEntries.map((entry) => {
                const alt = `${entry.name} Water Hardness: ${entry.rangeLabel} GPG (${entry.classification}) - Data by Plumbing Hands`;
                const code = embedSnippet(entry.slug, alt);
                return (
                  <div key={entry.slug} className="border border-rule rounded-card p-4">
                    <p className="text-ink font-semibold mb-2">{entry.name}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/widgets/water-hardness/${entry.slug}`}
                      alt={alt}
                      height={26}
                      className="mb-3"
                    />
                    <pre className="bg-paper text-ink-2 text-xs p-3 overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-3">Where this data comes from</h2>
            <p className="text-ink-2 mb-4">
              Figures are compiled from municipal water utility reports and regional water-treatment
              provider field testing (2023-2024), the same sourcing used in our full{" "}
              <a href="/guides/dfw-plumbing-data" className="text-accent underline">
                DFW Plumbing Emergency Data Report
              </a>
              . Anything above 7 GPG is generally classified as hard, and above 10 GPG as very hard.
              If your city isn&apos;t listed individually, use the DFW Metro regional average badge.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-3">What hard water means for DFW plumbing</h2>
            <p className="text-ink-2 mb-4">
              Hardness is the amount of dissolved calcium and magnesium in the water, measured in grains per gallon. Most of the
              Dallas-Fort Worth area tests hard to very hard, and those minerals do not disappear once the water reaches a home.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-ink-2">
              <li>
                Scale settles in the bottom of tank water heaters, which can cause popping or rumbling noises and lower efficiency
                over time. Our <Link href="/blog/water-heater-making-popping-noise-dallas" className="text-accent underline">water heater popping noise guide</Link> explains what to do.
              </li>
              <li>Faucet aerators and showerheads clog with white mineral deposits and slowly lose flow.</li>
              <li>Glass shower doors, fixtures and dishes show spots and a chalky film.</li>
              <li>
                Softener sizing depends on hardness and household size. The{" "}
                <a href="/tools/water-softener-cost-calculator" className="text-accent underline">water softener calculator</a> does that math for your city.
              </li>
            </ul>
          </section>

          <EmbedHowTo name="water hardness widget" />

          <OfficialSources
            title="Official resources to use with the water hardness widget"
            intro="City water utilities publish water quality information, and water heater makers explain how sediment shortens tank life. These sources go deeper than a badge can."
            links={[sources.dallasWater, sources.fortWorthWater, sources.rheemWaterHeater]}
          />

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "DFW Plumbing Emergency Data Report", href: "/guides/dfw-plumbing-data" },
                { label: "DFW Water Heater Lifespan Guide", href: "/guides/dfw-water-heater-lifespan" },
                { label: "DFW Service Areas", href: "/cities" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
