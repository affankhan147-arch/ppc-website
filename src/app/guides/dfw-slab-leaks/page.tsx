import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";

export const metadata = buildMetadata({
  title: "DFW Slab Leaks: Why Dallas-Fort Worth Homes Get Them & How They're Found",
  description: truncateForMeta(
    "Why expansive clay soil makes Dallas-Fort Worth uniquely prone to slab leaks, and the detection methods plumbers use to find them without guesswork."
  ),
  path: "/guides/dfw-slab-leaks"
});

export default function DfwSlabLeaksGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-slab-leaks",
            "DFW Slab Leaks: Why Dallas-Fort Worth Homes Get Them & How They're Found",
            "Why expansive clay soil makes Dallas-Fort Worth uniquely prone to slab leaks, and the detection methods plumbers use to find them without guesswork."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "DFW Slab Leaks", path: "/guides/dfw-slab-leaks" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            DFW Slab Leaks:<br />
            <span className="text-[#F0B429]">Why They Happen Here, and How They're Actually Found</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute engineering, structural, or legal advice. A licensed plumber and, where foundation movement is suspected, a structural engineer should evaluate your specific property.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: Why DFW?</h2>
            <p className="text-slate-300 mb-4">
              Slab leaks are not evenly distributed across the country — Dallas-Fort Worth sees them at a disproportionately high rate, and the reason is underfoot. Much of the Metroplex sits on the <strong>Blackland Prairie</strong>, a band of dark, clay-rich soil that runs from North Texas down through Central Texas. This clay is highly expansive: it swells significantly when it absorbs water and shrinks when it dries out, and DFW's swing between heavy spring rains and prolonged summer drought puts that clay through a punishing annual cycle.
            </p>
            <p className="text-slate-300 mb-4">
              That movement doesn't stay in the yard. As the soil beneath a slab foundation swells and contracts unevenly, it flexes the concrete above it, and the copper or CPVC supply lines running through or under that slab flex with it. Over years of this cycle, joints work loose, pipe walls fatigue, and fittings crack — which is why slab leaks in DFW are so often a foundation-soil problem wearing a plumbing disguise.
            </p>
            <p className="text-slate-300 mb-4">
              This isn't a minor regional nuisance. Expansive soils are widely cited in geotechnical literature as causing more annual damage to structures nationwide than tornadoes, floods, hurricanes, and earthquakes combined — with damage estimates that vary by study and by year, generally falling somewhere in the range of roughly $2 billion to $15 billion annually. Texas, and the Blackland Prairie corridor specifically, is one of the regions most responsible for those figures.
            </p>
            <p className="text-slate-300 mb-4">
              The scale of the problem locally isn't new. A widely cited historical data point comes from Dallas County in 1974, when an estimated 8,470 residential foundation failures were recorded in a single year — with roughly 98% of them occurring on expansive soils. That figure traces back to research by W.K. Wray (1989) and has been referenced in ASCE-affiliated geotechnical engineering literature on expansive soil damage ever since.
            </p>
            <p className="text-sm text-slate-400">
              Sources: expansive soil damage-cost ranges and the Dallas County 1974 failure count are drawn from geotechnical engineering literature on expansive soils, including W.K. Wray (1989), as referenced in ASCE-affiliated publications.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: Diagnosis & Detection</h2>
            <p className="text-slate-300 mb-4">
              Because a slab leak is hidden under concrete, finding it accurately — before any demolition happens — is the difference between a contained repair and an unnecessarily torn-up floor. Plumbers typically work through detection methods in roughly this order, from simplest to most invasive.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">1. Water Meter Self-Test</h3>
            <p className="text-slate-300 mb-4">
              The first and simplest check a homeowner can do themselves: shut off every fixture and water-using appliance in the house, then watch the water meter. If the dial keeps moving with everything off, water is escaping somewhere in the system — this doesn't confirm a slab leak specifically, but it's the trigger that justifies calling a plumber for further diagnosis.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">2. Acoustic Listening Devices</h3>
            <p className="text-slate-300 mb-4">
              Water escaping a pressurized line under a slab creates a faint, distinct sound. Ground microphones and acoustic listening equipment amplify that sound through the concrete and soil, letting a technician narrow the leak's location to a general area before any more precise (or invasive) method is used.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">3. Thermal Imaging</h3>
            <p className="text-slate-300 mb-4">
              Infrared cameras detect temperature differences at the slab surface. This method is especially effective for hot water line leaks, since escaping hot water warms the concrete directly above it in a way that's easy to spot on a thermal scan — often producing a clear, visible "hot spot" without any invasive testing at all.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">4. Pressure Testing</h3>
            <p className="text-slate-300 mb-4">
              Isolating sections of the plumbing system and pressurizing them (often with air or water) lets a technician monitor for pressure drop. A dropping section points directly to which line — hot or cold, and roughly which run — is compromised, helping confirm findings from acoustic or thermal methods.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">5. Video Pipe Inspection</h3>
            <p className="text-slate-300 mb-4">
              A camera fed through accessible plumbing lines can visually confirm cracks, corrosion, or joint failures inside the pipe itself. This is more commonly used on drain and sewer lines than pressurized supply lines, but it remains a useful confirmation tool where access allows it.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">6. Tracer Gas & Slab Penetration</h3>
            <p className="text-slate-300 mb-4">
              When other methods can't pinpoint the leak precisely enough, a non-toxic tracer gas can be introduced into the line and detected as it escapes through the slab — often the most precise non-invasive option available. Only after all of the above has narrowed the location as tightly as possible does a plumber move to slab penetration: opening the concrete at a specific, targeted point rather than guessing.
            </p>

            <p className="text-slate-300 mt-4">
              This is a diagnosis-first sequence deliberately: each step exists to make the next one — and any eventual repair — smaller, more targeted, and less disruptive to the home.
            </p>
          </section>

          <section className="mb-10">
            <p className="text-slate-400 text-sm italic">More sections coming soon.</p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Suspect a slab leak?</strong> Call PlumbingHands — DFW's trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks />
          </div>
        </div>
      </div>
    </>
  );
}
