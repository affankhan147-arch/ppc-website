import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { problems } from "@/data/problems";
import { siteConfig } from "@/data/site";

export const metadata = buildMetadata({
  title: "Free DFW Emergency Warning-Sign Checklist Badges",
  description: truncateForMeta(
    "Free, embeddable badges highlighting the warning signs for common DFW plumbing emergencies - burst pipes, sewer backups, water heater leaks, and more."
  ),
  path: "/tools/problem-checklists"
});

// Curated to the highest-severity, highest-search-value situations rather
// than all 15 problems, to keep this hub page scannable. The underlying
// route supports any problem slug in src/data/problems.ts.
const featuredSlugs = [
  "burst-pipe-first-steps",
  "water-heater-leaking-emergency",
  "main-sewer-line-signs",
  "toilet-overflowing-will-not-stop",
  "ceiling-leak-from-plumbing",
  "water-shutoff-valve-will-not-close"
];

function embedSnippet(slug: string, alt: string) {
  return `<a href="${siteConfig.baseUrl}/problems/${slug}" target="_blank" rel="noopener">
  <img src="${siteConfig.baseUrl}/api/widgets/problem-checklist/${slug}" alt="${alt}" height="26" />
</a>`;
}

export default function ProblemChecklistsPage() {
  const featured = featuredSlugs
    .map((slug) => problems.find((problem) => problem.slug === slug))
    .filter((problem): problem is NonNullable<typeof problem> => Boolean(problem));

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/tools/problem-checklists",
            "Free DFW Emergency Warning-Sign Checklist Badges",
            "Free, embeddable badges highlighting the warning signs for common DFW plumbing emergencies - burst pipes, sewer backups, water heater leaks, and more."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Problem Checklists", path: "/tools/problem-checklists" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tools</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Free DFW Emergency Warning-Sign Checklist Badges
          </h1>
          <p className="text-slate-300 mb-6">
            Six free, embeddable badges covering our highest-severity plumbing emergencies, each
            pointing to the full warning-sign list published on the matching guide. Useful for
            real estate, property-management, and home-inspection sites that want a quick safety
            reference. All 15 situations are covered in the{" "}
            <a href="/problems" className="text-[#F0B429] underline">
              full problem guide directory
            </a>
            .
          </p>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>
              Free to use on any site. Keep each badge linked to its source guide so readers can
              see the full warning-sign list - don&apos;t alter the badge image or strip the link.
              That&apos;s the only condition.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-4">Pick a badge, copy the code</h2>
            <div className="space-y-8">
              {featured.map((problem) => {
                const alt = `${problem.title}: ${problem.warningSigns.length} warning signs to know - by Plumbing Hands`;
                const code = embedSnippet(problem.slug, alt);
                return (
                  <div key={problem.slug} className="border border-[#1A3A38] rounded-xl p-4">
                    <p className="text-white font-semibold mb-2">{problem.title}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/widgets/problem-checklist/${problem.slug}`}
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
                { label: "All Homeowner Problem Guides", href: "/problems" },
                { label: "Free DFW Data Badges (Embeddable)", href: "/tools/dfw-data-badges" },
                { label: "Free DFW Cost Guide Checklist Badges", href: "/tools/cost-guide-checklists" },
                { label: "All Free Tools", href: "/tools" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
