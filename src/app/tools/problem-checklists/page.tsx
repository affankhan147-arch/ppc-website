import Link from "next/link";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { EmbedHowTo, WidgetHero } from "@/components/WidgetPageExtras";
import { problems } from "@/data/problems";
import { siteConfig } from "@/data/site";
import { CallButton } from "@/components/CallButton";

export const metadata = buildMetadata({
  title: "Free DFW Plumbing Problem Checklist Badges",
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
            "Free DFW Plumbing Problem Checklist Badges",
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
        <div className="max-w-4xl mx-auto">
          <h1 className="display-title font-bold">
            Free DFW Plumbing Problem Checklist Badges
          </h1>
          <p className="lead mt-4 mb-6">
            Six free, embeddable badges covering our highest-severity plumbing emergencies, each
            pointing to the full warning-sign list published on the matching guide. Useful for
            real estate, property-management, and home-inspection sites that want a quick safety
            reference. All 15 situations are covered in the{" "}
            <Link href="/problems" className="text-accent underline">
              full problem guide directory
            </Link>
            .
          </p>

          <div className="mb-6">
            <CallButton location="tool-problem-checklists-top" />
          </div>

          <div className="bg-paper border-l-4 border-call p-5 mb-8 text-ink-2 text-sm">
            <p>
              Free to use on any site. Keep each badge linked to its source guide so readers can
              see the full warning-sign list - don&apos;t alter the badge image or strip the link.
              That&apos;s the only condition.
            </p>
          </div>

          <WidgetHero alt="Free DFW plumbing problem checklist badges for real estate, property management and home inspection sites" serviceSlug="burst-pipe-emergency" seed={1} />

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-4">Pick a problem checklist badge, copy the code</h2>
            <div className="space-y-8">
              {featured.map((problem) => {
                const alt = `${problem.title}: ${problem.warningSigns.length} warning signs to know - by Plumbing Hands`;
                const code = embedSnippet(problem.slug, alt);
                return (
                  <div key={problem.slug} className="border border-rule rounded-card p-4">
                    <p className="text-ink font-semibold mb-2">{problem.title}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/widgets/problem-checklist/${problem.slug}`}
                      alt={alt}
                      height={26}
                      className="mb-2"
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
            <h2 className="text-2xl font-bold text-ink mb-3">What each problem checklist covers</h2>
            <p className="text-ink-2 mb-4">
              Every badge links to a full Plumbing Hands problem guide with the warning signs, first steps, mistakes to avoid and the
              point where the situation becomes urgent. The badge shows how many warning signs that guide lists, so readers know at a
              glance there is a short, practical checklist behind it.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-ink-2">
              {featured.map((problem) => (
                <li key={`cover-${problem.slug}`}>
                  {problem.title}: {problem.warningSigns.length} warning signs, plus first steps and what not to do.
                </li>
              ))}
            </ul>
          </section>

          <EmbedHowTo name="problem checklist badges" />

          <OfficialSources
            title="Official resources behind the problem checklists"
            intro="The checklists tell readers what to watch for. These official sources cover the next questions: whether the plumber holds a Texas license and what a home policy usually covers after sudden water damage."
            links={[sources.tdiWaterDamage, sources.tsbpeLookup, sources.epaLeaks]}
          />

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
