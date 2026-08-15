import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { getArticleImage } from "@/lib/articleImages";

export const metadata = buildMetadata({
  title: "Slab Leaks in DFW – What Homeowners Need to Know",
  description: truncateForMeta(
    "A research-backed guide explaining why slab leaks are uniquely common in Dallas-Fort Worth, how they're diagnosed, and what homeowners can do."
  ),
  path: "/guides/dfw-slab-leaks"
});

export default function SlabLeaksGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-slab-leaks",
            "Slab Leaks in DFW – What Homeowners Need to Know",
            "A research-backed guide explaining why slab leaks are uniquely common in Dallas-Fort Worth, how they're diagnosed, and what homeowners can do."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "Slab Leaks in DFW", path: "/guides/dfw-slab-leaks" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Slab Leaks in DFW:<br />
            <span className="text-[#F0B429]">What Homeowners Need to Know</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing, legal, or insurance advice. Always consult a licensed professional for your specific situation.</p>
          </div>

          <div className="photo-frame relative mt-2 mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image
              src={getArticleImage("burst-pipe-emergency", 0)}
              alt="Slab leak repair in progress inside a Dallas-Fort Worth home's foundation area"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          { /* REMOTE SECTION 1 (actual improved text from remote) */ }
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: Why DFW?</h2>
            <p className="text-slate-300 mb-4">
              Slab leaks are not evenly distributed across the country — they are heavily concentrated in regions with expansive clay soils. The Dallas-Fort Worth metroplex sits squarely on the Blackland Prairie, a geological formation known for its highly reactive clay. This clay expands when wet and shrinks when dry, a cycle that repeats with every rain and drought. Over decades, this constant movement puts immense stress on concrete slab foundations and the plumbing lines embedded beneath them.
            </p>
            <p className="text-slate-300 mb-4">
              The impact is well documented. According to research published by the American Society of Civil Engineers (ASCE), expansive soils cause more financial damage to structures in the United States each year than earthquakes, floods, hurricanes, and tornadoes combined. While the exact dollar figure varies by study — estimates range from $2 billion to $15 billion annually — the comparison itself is consistently cited across engineering literature.
            </p>
            <p className="text-slate-300 mb-4">
              DFW’s own history with this problem is not abstract. A survey conducted in Dallas County alone identified 8,470 residential foundation failures in a single year (1974), with 98% of those failures occurring in expansive soils (Wray, 1989). More than fifty years later, the same clay continues to shift under the same neighborhoods, and the same shrink‑swell cycle remains the primary driver of foundation movement across the Metroplex.
            </p>
            <p className="text-slate-300">
              For homeowners, the practical takeaway is clear: a slab leak in DFW is rarely just a pipe that happened to fail. It is the intersection of two realities — aging infrastructure reaching the end of its service life, and decades of soil movement stressing that pipe at exactly the point where it finally gives way.
            </p>
            <p className="text-slate-400 text-sm mt-4">
              <strong>Sources:</strong> ASCE research on expansive soil damage; Wray, 1989, Dallas County foundation failure survey; multiple industry sources.
            </p>
          </section>

          { /* REMOTE SECTION 2 (actual improved text with numbered subsections) */ }
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: Diagnosis & Detection</h2>
            <p className="text-slate-300 mb-4">
              A slab leak does not always announce itself dramatically. In many cases, the signs are subtle enough to be mistaken for normal wear and tear — which is why thousands of gallons of water can be lost under a foundation before a homeowner becomes aware of the problem.
            </p>
            <p className="text-slate-300 mb-4">
              The most common early indicators include unexplained water bill increases, warm spots on floors, foundation cracks, and the sound of running water when all fixtures are turned off. Each of these deserves attention, especially when two or more appear together.
            </p>
            <p className="text-slate-300 mb-4">
              When a slab leak is suspected, professional leak detection is the next step. The following methods are used by plumbers and foundation specialists to locate leaks without unnecessary demolition:
            </p>
            <ol className="list-decimal list-inside text-slate-300 space-y-3">
              <li><strong>Water Meter Self-Test</strong> – Turn off all water-using fixtures and observe the meter. If the meter continues to spin, a hidden leak is likely.</li>
              <li><strong>Acoustic Listening</strong> – A sensitive microphone placed on the slab or near plumbing lines can detect the sound of water escaping through cracks in the pipe. This method is effective for locating leaks that are not visible.</li>
              <li><strong>Thermal Imaging</strong> – A thermal camera identifies temperature differences in the slab. Hot water leaks appear as warm patches, while cold water leaks may show as cooler areas. This non‑invasive technique can quickly narrow down the search area.</li>
              <li><strong>Pressure Testing</strong> – The plumber isolates the suspected line and applies pressure. If the pressure drops over time, a leak is confirmed. This method is often used in conjunction with other diagnostics.</li>
              <li><strong>Video Pipe Inspection</strong> – A small camera is inserted into the plumbing line to visually inspect for cracks, corrosion, or blockages. This provides a direct look at the pipe’s interior condition.</li>
              <li><strong>Tracer Gas & Slab Penetration</strong> – In some cases, a harmless tracer gas is introduced into the pipe, and a detector is used to pinpoint the exact leak location. This method is highly accurate and minimizes the need for exploratory demolition.</li>
            </ol>
            <p className="text-slate-300 mt-4">
              Homeowners should ask any provider they call which methods they use and whether they offer an initial inspection fee that can be credited toward future work. A professional diagnosis before any claim is filed is one of the most important steps a homeowner can take.
            </p>
          </section>

          { /* LOCAL SECTIONS 3 & 4 (unchanged, approved) */ }
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: The Insurance Gray Area</h2>
            <p className="text-slate-300 mb-4">
              When a slab leak is discovered, the first question many homeowners ask is: <em>"Will my insurance cover this?"</em> The answer depends on one critical distinction: <strong>was the leak sudden and accidental, or did it develop gradually over time?</strong>
            </p>
            <p className="text-slate-300 mb-4">
              Multiple industry sources — including restoration companies, public adjusters, and legal guidance — consistently confirm the same pattern:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>A slab leak that results from an abrupt pipe failure — such as a pressure spike, sudden corrosion breakthrough, or physical impact — typically qualifies as sudden and accidental. In such cases, the resulting property damage (flooring, drywall, cabinets) is generally covered under a standard homeowners policy, subject to the policy's limits and deductible.</li>
              <li>The repair or replacement of the pipe itself, however, is almost never covered. This is treated as a maintenance item, consistent with the general insurance principle established in the Texas Department of Insurance's own guidance.</li>
              <li>Insurers investigate physical evidence to determine the timeline of the leak. Extensive mold growth, deep saturation of flooring, and moisture that has penetrated far into subfloor framing all point toward a gradual leak, which is typically excluded from coverage. A claim discovered through a routine inspection or a sudden water bill spike — without those extended‑exposure signs — supports a finding of sudden and accidental damage.</li>
            </ul>
            <p className="text-slate-300">
              While there is no single TDI publication dedicated specifically to slab leaks, the agency's general guidance on water damage claims — which distinguishes sudden and accidental events from gradual seepage and maintenance issues — applies directly to slab leak cases and should be cited alongside industry practice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 4: What Homeowners Can Do</h2>
            <p className="text-slate-300 mb-4">
              If you suspect a slab leak, taking the right steps in the right order can make a significant difference in how your claim is handled and whether coverage is approved. The following guidance is drawn from consistent recommendations across multiple industry sources.
            </p>
            <ol className="list-decimal list-inside text-slate-300 space-y-3 mb-4">
              <li><strong>Get a professional leak‑detection diagnosis <em>before</em> filing a claim.</strong> A documented, dated report from a licensed plumber that identifies the cause and timeline of the leak is the single strongest piece of evidence you can provide to an adjuster.</li>
              <li><strong>Photograph and date everything as you find it.</strong> Take clear photos of the leak location, any visible water damage, and the surrounding area before any cleanup or repair work begins.</li>
              <li><strong>Be careful with recorded statements or examinations under oath.</strong> One source specifically warns that describing "I noticed something a while back" can be used by the insurer to argue the loss was gradual, even if the actual leak was recent.</li>
              <li><strong>Weigh the cost of filing a claim against paying out of pocket.</strong> Multiple sources note that filing a claim can raise your premiums at renewal. For smaller, contained leaks, it may be more cost‑effective to handle the repair and cleanup yourself.</li>
              <li><strong>If you file, document everything.</strong> Keep copies of the plumber's diagnosis, all photos, and any correspondence with your insurance company. A well‑documented claim is much harder to deny than one that relies on verbal descriptions.</li>
            </ol>
            <p className="text-slate-300">
              These steps don't guarantee a claim will be approved — but they significantly improve your chances by presenting a clear, consistent, professionally supported timeline of the event, rather than leaving the adjuster to interpret ambiguous evidence.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Have a plumbing emergency?</strong> Call PlumbingHands – DFW’s trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Polybutylene Pipe Replacement Guide", href: "/guides/dfw-polybutylene-pipe-replacement" },
                { label: "Texas Insurance & Plumbing Claims", href: "/guides/texas-insurance-plumbing-claims" },
                { label: "Free DFW Data Badges (Embeddable)", href: "/tools/dfw-data-badges" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
