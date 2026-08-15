import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { costGuides } from "@/data/costGuides";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Free DFW Cost Guide Checklist Badges (Embeddable)",
  description: truncateForMeta(
    "Free, embeddable badges showing how many key questions to ask before you approve emergency plumbing work in DFW, by issue type."
  ),
  path: "/tools/cost-guide-checklists"
});

function embedSnippet(slug: string, alt: string) {
  return `<a href="${siteConfig.baseUrl}/cost-guides/${slug}" target="_blank" rel="noopener">
  <img src="${siteConfig.baseUrl}/api/widgets/cost-checklist/${slug}" alt="${alt}" height="26" />
</a>`;
}

export default function CostGuideChecklistsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/tools/cost-guide-checklists",
            "Free DFW Cost Guide Checklist Badges",
            "Free, embeddable badges showing how many key questions to ask before you approve emergency plumbing work in DFW, by issue type."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Cost Guide Checklists", path: "/tools/cost-guide-checklists" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tools</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Free DFW Cost Guide Checklist Badges
          </h1>
          <p className="text-slate-300 mb-6">
            Six free, embeddable badges - one per emergency plumbing issue - showing how many
            key questions homeowners should ask before approving repair work. Each count is
            pulled directly from our published cost guides, so it stays accurate if a guide is
            ever expanded. Useful for real estate, home-inspection, and consumer-advice sites
            that want a quick, trustworthy contractor-vetting reference.
          </p>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>
              Free to use on any site. Keep each badge linked to its source cost guide so readers
              can see the full list of questions - don&apos;t alter the badge image or strip the
              link. That&apos;s the only condition.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-4">Pick a badge, copy the code</h2>
            <div className="space-y-8">
              {costGuides.map((guide) => {
                const alt = `${guide.title}: ${guide.questionsToAsk.length} key questions to ask - by Plumbing Hands`;
                const code = embedSnippet(guide.slug, alt);
                return (
                  <div key={guide.slug} className="border border-[#1A3A38] rounded-xl p-4">
                    <p className="text-white font-semibold mb-2">{guide.title}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/widgets/cost-checklist/${guide.slug}`}
                      alt={alt}
                      height={26}
                      className="mb-2"
                    />
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
                { label: "All DFW Cost Guides", href: "/cost-guides" },
                { label: "Free DFW Data Badges (Embeddable)", href: "/tools/dfw-data-badges" },
                { label: "Free DFW Freeze Watch Widget", href: "/tools/freeze-watch-widget" },
                { label: "All Free Tools", href: "/tools" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
