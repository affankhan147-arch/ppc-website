import Link from "next/link";
import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema, Byline, articleSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { CallButton } from "@/components/CallButton";
import { getArticleImage } from "@/lib/articleImages";

export const metadata = buildMetadata({
  title: "DFW Housing Age by City: What It Means for Your Pipes",
  description: truncateForMeta(
    "Real U.S. Census data on the median construction year for 7 DFW cities, and what each city's typical housing age means for galvanized, polybutylene, and copper/PEX pipe risk."
  ),
  path: "/guides/dfw-housing-age-by-city"
});

export default function DfwHousingAgeByCityPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-housing-age-by-city",
            "DFW Housing Age by City: What It Means for Your Pipes",
            "Real U.S. Census data on the median construction year for 7 DFW cities, and what each city's typical housing age means for galvanized, polybutylene, and copper/PEX pipe risk."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "DFW Housing Age by City", path: "/guides/dfw-housing-age-by-city" }
          ])
        ]}
      />
      <JsonLd data={articleSchema("/guides/dfw-housing-age-by-city", "DFW Housing Age by City: What It Means for Your Pipes", "Real U.S. Census data on the median construction year for 7 DFW cities, and what each city's typical housing age means for galvanized, polybutylene, and copper/PEX pipe risk.")} />

      <main className="page-shell">
        <article className="max-w-4xl mx-auto">
          <h1 className="display-title font-bold text-ink">
            DFW Housing Age by City:<br />
            <span className="text-call">What It Means for Your Pipes</span>
          </h1>
          <Byline path="/guides/dfw-housing-age-by-city" />

          <p className="lead mt-6">Housing age by city is one of the best clues to what pipes sit behind DFW walls. This guide lists the median construction year for seven DFW cities, explains why a home&apos;s age predicts its pipe material, and what to do with that if you own or are buying a home.</p>

          <div className="mt-6">
            <CallButton location="guide-dfw-housing-age-by-city-top" />
          </div>

          <div className="photo-frame relative mt-6 h-64 w-full sm:h-80">
            <Image
              src={getArticleImage(undefined, 6)}
              alt="Homeowner reviewing an older DFW home's plumbing with a technician"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <aside role="note" className="bg-paper border-l-4 border-call p-5 text-ink-2 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing, legal, or insurance advice. Figures below are sourced directly from the U.S. Census Bureau&apos;s American Community Survey (see citations at the end of this page).</p>
          </aside>

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-3">Section 1: Median Construction Year, 7 DFW Cities</h2>
            <p className="text-ink-2 mb-4">
              A home&apos;s age is one of the strongest predictors of what kind of supply-pipe material it was built with - and DFW&apos;s rapid, uneven growth means that predictor varies enormously from one city to the next, even between cities that sit a few miles apart. The U.S. Census Bureau&apos;s 2019-2023 American Community Survey (5-year estimates) reports a median construction year for each city&apos;s occupied housing stock:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left text-ink-2 text-sm border-collapse">
                <thead>
                  <tr className="border-b border-rule text-accent">
                    <th className="py-2 pr-4">City</th>
                    <th className="py-2 pr-4">Median Construction Year</th>
                    <th className="py-2">Total Housing Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-rule/60">
                    <td className="py-2 pr-4">Dallas</td>
                    <td className="py-2 pr-4">1981</td>
                    <td className="py-2">590,237</td>
                  </tr>
                  <tr className="border-b border-rule/60">
                    <td className="py-2 pr-4">Arlington</td>
                    <td className="py-2 pr-4">1986</td>
                    <td className="py-2">153,137</td>
                  </tr>
                  <tr className="border-b border-rule/60">
                    <td className="py-2 pr-4">Plano</td>
                    <td className="py-2 pr-4">1993</td>
                    <td className="py-2">117,686</td>
                  </tr>
                  <tr className="border-b border-rule/60">
                    <td className="py-2 pr-4">Fort Worth</td>
                    <td className="py-2 pr-4">1994</td>
                    <td className="py-2">373,948</td>
                  </tr>
                  <tr className="border-b border-rule/60">
                    <td className="py-2 pr-4">Allen</td>
                    <td className="py-2 pr-4">2003</td>
                    <td className="py-2">39,094</td>
                  </tr>
                  <tr className="border-b border-rule/60">
                    <td className="py-2 pr-4">McKinney</td>
                    <td className="py-2 pr-4">2007</td>
                    <td className="py-2">77,617</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Frisco</td>
                    <td className="py-2 pr-4">2009</td>
                    <td className="py-2">80,353</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-ink-2">
              A median construction year is the midpoint of a city&apos;s occupied housing stock - half the homes were built before that year, half after. It is not the &quot;typical&quot; build year of every home, and every city on this list still has a real mix of decades represented. Dallas and Arlington&apos;s older medians reflect large first-ring-suburb development that was substantially complete before 1990; Frisco, McKinney, and Allen&apos;s medians reflect the north-DFW growth boom that has run largely from the late 1990s through today.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-3">Section 2: Why a Home&apos;s Age Predicts Its Pipe Material</h2>
            <p className="text-ink-2 mb-4">
              U.S. residential supply-pipe material has moved through three broad eras, and which era a given DFW home falls into is driven almost entirely by when it was built:
            </p>
            <ul className="list-disc list-inside text-ink-2 space-y-2 mb-4">
              <li><strong>Galvanized steel (roughly pre-1960s-70s):</strong> The oldest surviving supply lines in DFW&apos;s pre-war and early postwar neighborhoods. Galvanized pipe corrodes and narrows from the inside over decades, which shows up as gradually worsening water pressure long before an outright failure.</li>
              <li><strong>Polybutylene, or PB pipe (1978-1995):</strong> As covered in our <Link href="/guides/dfw-polybutylene-pipe-replacement" className="text-accent underline">Polybutylene Pipe in DFW guide</Link>, this gray plastic pipe was standard in a large share of new construction during exactly this 17-year window, largely because it was cheaper and faster to install than copper during DFW&apos;s fastest growth decades.</li>
              <li><strong>Copper and, increasingly since the mid-1990s, PEX:</strong> Modern construction has moved toward copper and cross-linked polyethylene (PEX), both of which handle DFW&apos;s hard water and shifting clay soil far better than galvanized steel or polybutylene.</li>
            </ul>
            <p className="text-ink-2">
              A city&apos;s median construction year is therefore a rough, city-level signal for how much of its housing stock statistically overlaps with the riskiest window - not a guarantee about any single house. A home built in 1985 in a city with a 1986 median is a plausible (though unconfirmed) polybutylene candidate; a home built in 2011 in a city with a 2009 median almost certainly is not, and is far more likely to be copper or PEX.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-3">Section 3: What This Looks Like City by City</h2>
            <p className="text-ink-2 mb-4">
              Dallas (1981) and Arlington (1986) have the oldest housing stock on this list. Their medians sit before and right at the start of the 1978-1995 polybutylene window, meaning both cities carry a meaningful share of homes old enough to have either galvanized steel or polybutylene supply lines - the age alone does not confirm which, or whether a given home was ever repiped since.
            </p>
            <p className="text-ink-2 mb-4">
              Plano (1993) and Fort Worth (1994) sit squarely inside the polybutylene era itself. A city median landing in this exact 17-year window is the single clearest statistical signal on this whole page: a large share of homes built around that median year in these two cities were built while PB pipe was still standard practice for many DFW-area builders.
            </p>
            <p className="text-ink-2">
              Allen (2003), McKinney (2007), and Frisco (2009) have medians well past 1995, when polybutylene production stopped following the <em>Cox v. Shell</em> settlement. Homes built around these medians are far more likely to have copper or PEX supply lines - lower risk from pipe material alone, though DFW&apos;s hard water and expansive clay soil (see our <a href="/guides/dfw-slab-leaks" className="text-accent underline">DFW slab leaks guide</a>) still apply to homes of any age.
            </p>
          </section>

          <section className="content-section">
            <h2 className="text-2xl font-bold text-ink mb-3">Section 4: What to Do With This If You Own (or Are Buying) a DFW Home</h2>
            <p className="text-ink-2 mb-4">
              This data tells you the odds for your city, not the facts for your specific address. If your home falls anywhere near or inside the 1978-1995 window - regardless of which city it&apos;s in - the only way to know for certain what pipe material you have is a visual inspection, which our guide above explains how to do yourself in a few minutes.
            </p>
            <p className="text-ink-2">
              If you&apos;re buying an older DFW home, ask directly whether the property was built between 1978 and 1995 and whether the seller knows the supply-pipe material - Texas has no blanket legal requirement to disclose polybutylene pipe at sale. And regardless of a home&apos;s age, a sudden pipe failure doesn&apos;t wait for a convenient time; our <Link href="/services/burst-pipe-emergency" className="text-accent underline">24/7 burst pipe emergency service</Link> covers the full DFW metro.
            </p>
          </section>

          <p className="text-muted text-sm mt-4">
            <strong>Sources:</strong> U.S. Census Bureau, 2019-2023 American Community Survey (5-year estimates), via Point2Homes city demographic pages: <a href="https://www.point2homes.com/US/Neighborhood/TX/Dallas-Demographics.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">Dallas</a>, <a href="https://www.point2homes.com/US/Neighborhood/TX/Arlington-Demographics.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">Arlington</a>, <a href="https://www.point2homes.com/US/Neighborhood/TX/Plano-Demographics.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">Plano</a>, <a href="https://www.point2homes.com/US/Neighborhood/TX/Fort-Worth-Demographics.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">Fort Worth</a>, <a href="https://www.point2homes.com/US/Neighborhood/TX/Allen-Demographics.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">Allen</a>, <a href="https://www.point2homes.com/US/Neighborhood/TX/McKinney-Demographics.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">McKinney</a>, and <a href="https://www.point2homes.com/US/Neighborhood/TX/Frisco-Demographics.html" target="_blank" rel="noopener noreferrer" className="text-accent underline">Frisco</a>.
          </p>

          <div className="mt-12 pt-6 border-t border-rule text-muted text-sm">
            <p><strong>Worried about old pipe in your DFW home?</strong> Call PlumbingHands - DFW&apos;s trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Polybutylene Pipe in DFW", href: "/guides/dfw-polybutylene-pipe-replacement" },
                { label: "Whole-House Repipe Cost Calculator", href: "/tools/repipe-cost-calculator" },
                { label: "DFW Slab Leaks Guide", href: "/guides/dfw-slab-leaks" },
                { label: "Sewer Line Repair Cost Calculator", href: "/tools/sewer-line-repair-cost-calculator" },
                { label: "DFW Plumbing Emergency Data Report", href: "/guides/dfw-plumbing-data" },
                { label: "Burst Pipe Emergency Service", href: "/services/burst-pipe-emergency" },
                { label: "Burst Pipe Emergency Cost Guide", href: "/cost-guides/burst-pipe-emergency-cost-guide" },
                { label: "DFW Service Areas", href: "/cities" }
              ]}
            />
          </div>
        </article>
      </main>
    </>
  );
}
