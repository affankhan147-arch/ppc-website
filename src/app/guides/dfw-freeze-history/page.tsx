import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { getArticleImage } from "@/lib/articleImages";

export const metadata = buildMetadata({
  title: "How Often Does DFW Actually Freeze? NWS Climate Data",
  description: truncateForMeta(
    "Official National Weather Service data on how many days per year Dallas-Fort Worth actually freezes, average first/last freeze dates, and what that means for your pipes."
  ),
  path: "/guides/dfw-freeze-history"
});

export default function DfwFreezeHistoryPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-freeze-history",
            "How Often Does DFW Actually Freeze? NWS Climate Data",
            "Official National Weather Service data on how many days per year Dallas-Fort Worth actually freezes, average first/last freeze dates, and what that means for your pipes."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "DFW Freeze History", path: "/guides/dfw-freeze-history" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide - NWS Data</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How Often Does DFW Actually Freeze?<br />
            <span className="text-[#F0B429]">The Real National Weather Service Numbers</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing or insurance advice. Figures below are sourced directly from the National Weather Service (see citations at the end of this page).</p>
          </div>

          <div className="photo-frame relative mt-2 mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image
              src={getArticleImage("burst-pipe-emergency", 0)}
              alt="Frozen pipe risk during a Dallas-Fort Worth winter freeze"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: DFW's Actual Freeze Numbers, Not the Reputation</h2>
            <p className="text-slate-300 mb-4">
              "DFW barely freezes" is the common assumption, and it's part of why so many local homes are under-protected for winter. The National Weather Service's own climate normals for DFW Airport put the real number at an average of 29.2 days per year with a minimum temperature at or below 32 degrees Fahrenheit - not a once-a-decade event, a near-monthly occurrence across a typical winter.
            </p>
            <p className="text-slate-300 mb-4">
              Those freezing days aren't spread evenly across the year. NWS's monthly breakdown shows January averaging 10.6 freezing days, December averaging 8.1, and February averaging 6.2 - together accounting for the large majority of DFW's annual freeze total, with November and March contributing only a handful of days each and the remaining months essentially none.
            </p>
            <p className="text-slate-300 mb-4">
              A separate NBC 5 meteorologist analysis of the same underlying DFW Airport station data puts the average closer to 33 freezing days in a typical season, with real year-to-year swings: the 2019-2020 winter saw 21 freezing days, while 2016-2017 recorded just 11 - the lowest on record. The exact count varies by source and averaging period, but every credible reading puts DFW's freeze count in the dozens of days per year, not the handful many homeowners assume.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: When DFW's Freeze Season Actually Starts and Ends</h2>
            <p className="text-slate-300 mb-4">
              The average date of DFW's first freeze of the season is November 22, and the average last freeze falls around March 12 - a roughly 3.5-month window most years during which exposed pipe runs are genuinely at risk, not just during a single headline cold snap.
            </p>
            <p className="text-slate-300 mb-4">
              The extremes matter for planning too. DFW's earliest recorded freeze hit October 22, 1898, and the latest recorded freeze reached all the way to April 13 in both 1997 and 1957. On the other end, the record cold temperature ever measured at DFW Airport is -8 degrees Fahrenheit, set in February 1899 - a reminder that the region's coldest extremes, while rare, are on the historical record, not hypothetical.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: Why This Data Matters More Than the "DFW Doesn't Really Freeze" Assumption</h2>
            <p className="text-slate-300 mb-4">
              DFW homes are generally not built to the same freeze-protection standard as homes in consistently cold climates, precisely because sustained hard freezes are the exception rather than the rule here - see our <a href="/guides/dfw-burst-pipes" className="text-[#F0B429] underline">DFW burst pipes guide</a> for the full mechanics of why that gap causes pipes to fail. Almost 30 freezing nights a year, concentrated into a roughly 15-week window, is enough repeated freeze-thaw stress on exposed or poorly insulated pipe runs to matter every single winter - not just during an outlier event like February 2021's Winter Storm Uri.
            </p>
            <p className="text-slate-300 mb-4">
              The practical takeaway: freeze prep in DFW isn't a once-a-decade precaution ahead of a rare severe event. Based on the NWS's own 29.2-day annual average, a typical DFW winter includes freezing conditions on close to one night in every twelve between late November and mid-March.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 4: Track This Winter's Freeze Risk Live</h2>
            <p className="text-slate-300 mb-4">
              The numbers above are historical averages - for the current forecast, our free <a href="/tools/freeze-watch-widget" className="text-[#F0B429] underline">DFW Freeze Watch Widget</a> pulls the live overnight low directly from the National Weather Service and flags freeze risk automatically, updated roughly hourly through the freeze season.
            </p>
          </section>

          <p className="text-slate-400 text-sm mt-4">
            <strong>Sources:</strong> <a href="https://www.weather.gov/fwd/dfw_records_normals" target="_blank" rel="noopener noreferrer" className="text-[#F0B429] underline">National Weather Service - DFW Normals, Means, and Extremes</a>; <a href="https://www.nbcdfw.com/weather/weather-connection/freeze-facts-in-north-texas/2495509/" target="_blank" rel="noopener noreferrer" className="text-[#F0B429] underline">NBC 5 DFW - Freeze Facts for North Texas</a>.
          </p>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Worried about a freeze this week?</strong> Call PlumbingHands - DFW's trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "DFW Burst Pipes: Why They Happen", href: "/guides/dfw-burst-pipes" },
                { label: "Free DFW Freeze Watch Widget (Live)", href: "/tools/freeze-watch-widget" },
                { label: "Burst Pipe Emergency Service", href: "/services/burst-pipe-emergency" },
                { label: "Burst Pipe Emergency Cost Guide", href: "/cost-guides/burst-pipe-emergency-cost-guide" },
                { label: "DFW Plumbing Emergency Data Report", href: "/guides/dfw-plumbing-data" },
                { label: "Free DFW Data Badges (Embeddable)", href: "/tools/dfw-data-badges" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
