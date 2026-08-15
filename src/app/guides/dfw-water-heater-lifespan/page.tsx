import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { getArticleImage } from "@/lib/articleImages";

export const metadata = buildMetadata({
  title: "Water Heater Lifespan & Maintenance in DFW - How Long They Really Last",
  description: truncateForMeta(
    "A research-backed guide to how long tank and tankless water heaters last, why DFW's hard water shortens that lifespan, and the maintenance that actually extends it."
  ),
  path: "/guides/dfw-water-heater-lifespan"
});

export default function WaterHeaterLifespanGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-water-heater-lifespan",
            "Water Heater Lifespan & Maintenance in DFW",
            "A research-backed guide to how long tank and tankless water heaters last, why DFW's hard water shortens that lifespan, and the maintenance that actually extends it."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "Water Heater Lifespan in DFW", path: "/guides/dfw-water-heater-lifespan" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Water Heater Lifespan in DFW:<br />
            <span className="text-[#F0B429]">How Long They Really Last, and How to Extend It</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing advice. Always consult a licensed professional for your specific situation.</p>
          </div>

          <div className="photo-frame relative mt-2 mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image
              src={getArticleImage("water-heater-emergency", 0)}
              alt="Tank water heater installed in a Dallas-Fort Worth home, showing age-related wear"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: How Long Water Heaters Actually Last</h2>
            <p className="text-slate-300 mb-4">
              The lifespan gap between tank and tankless water heaters is larger than most homeowners expect. According to manufacturer guidance from A.O. Smith, traditional tank water heaters typically last 8 to 12 years, while tankless units can operate for 15 to 20 years with proper maintenance - nearly double the service life.
            </p>
            <p className="text-slate-300 mb-4">
              The reason comes down to how each type handles water. A tank water heater stores 40-50 gallons continuously, and sediment settles to the bottom of the tank over time, insulating the heating element from the water above it and forcing it to work harder. A tankless unit heats water on demand as it flows through a heat exchanger, so there is no standing water and no sediment layer to build up - though hard water can still coat the heat exchanger itself with mineral scale.
            </p>
            <p className="text-slate-300 mb-4">
              That scale buildup is the primary threat to tankless longevity in a hard water area. Manufacturer guidance notes that mineral deposits accumulate inside the heat exchanger, and without regular descaling, severe accumulation can force early component replacement. Some manufacturers now build scale-prevention technology into newer tankless models specifically to address this.
            </p>
            <p className="text-slate-400 text-sm mt-4">
              <strong>Sources:</strong> A.O. Smith / Hotwater.com water heater lifespan and maintenance guidance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: Why DFW's Hard Water Cuts That Life Short</h2>
            <p className="text-slate-300 mb-4">
              Water heater lifespan is not the same everywhere - it depends heavily on local water hardness, and Dallas-Fort Worth sits solidly in hard-to-very-hard territory across the metroplex. Water hardness is measured in grains per gallon (GPG), and documented ranges for DFW-area cities include:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Fort Worth:</strong> 7-10 GPG (hard)</li>
              <li><strong>Dallas:</strong> 7-11 GPG (hard to very hard); Dallas Water Utilities classifies the city's own supply as moderately hard, averaging 140-160 mg/L (roughly 8-9 GPG)</li>
              <li><strong>Allen &amp; Plano:</strong> 9-13 GPG (hard to very hard)</li>
              <li><strong>Frisco &amp; McKinney:</strong> 10-14 GPG (very hard)</li>
              <li><strong>Rockwall:</strong> 12-16 GPG (very hard)</li>
              <li><strong>Forney:</strong> 13-17 GPG (very hard)</li>
            </ul>
            <p className="text-slate-300 mb-4">
              At these hardness levels, dissolved calcium and magnesium precipitate out as the water heats, settling as sediment in a tank unit or scaling the heat exchanger in a tankless unit. In a tank heater, that sediment layer acts as an insulating barrier between the burner or heating element and the water above it - the heater has to run longer to reach the same temperature, which increases both energy use and wear on the heating components. Homes in the higher-hardness cities on this list (Frisco, McKinney, Rockwall, Forney) generally need more frequent flushing than the "once a year" baseline manufacturers recommend for moderate water.
            </p>
            <p className="text-slate-400 text-sm mt-4">
              <strong>Sources:</strong> DFW city-by-city water hardness comparison data; Dallas Water Utilities water quality reporting.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: The Maintenance That Actually Extends Lifespan</h2>
            <p className="text-slate-300 mb-4">
              Most of the maintenance that meaningfully extends a water heater's life is simple, inexpensive, and frequently skipped. Manufacturer guidance lays out a clear annual schedule:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Flush the tank at least once a year</strong> - more often in higher-hardness DFW cities - to clear sediment before it builds into an insulating layer.</li>
              <li><strong>Inspect the anode rod once a year</strong> (or have a professional check it every 5 years). The anode rod is a sacrificial metal rod that corrodes in place of the tank itself; a healthy rod is smooth and roughly half an inch in diameter. Once it shows heavy deterioration or exposed core wire, it should be replaced - a $20-$50 part that can meaningfully extend the life of the tank around it.</li>
              <li><strong>Test the temperature and pressure (T&amp;P) relief valve once a year</strong> by lifting the lever briefly to confirm it discharges water freely, with a full professional check every 5 years. A stuck T&amp;P valve is a safety issue, not just a maintenance one.</li>
              <li><strong>Check for leaks, corrosion at fittings, and venting condition</strong> as part of the same annual pass.</li>
            </ul>
            <p className="text-slate-300 mb-4">
              Texas plumbing code also sets baseline installation requirements that affect long-term reliability, not just initial safety. Requirements documented by DFW-area municipalities (using Frisco, TX as a representative example) include: a properly sized T&amp;P discharge line terminating 6 inches above grade outside the building; a drain pan under every water heater with its own drain line; a thermal expansion control device on any closed system; sediment traps on gas connections per IRC/IFGC standards; and correct venting clearance and rise. These aren't optional extras - they're code minimums, and a unit installed without them is both a safety risk and, often, a sign that other maintenance was skipped too.
            </p>
            <p className="text-slate-400 text-sm mt-4">
              <strong>Sources:</strong> A.O. Smith / Hotwater.com maintenance guidance; City of Frisco, TX water heater installation requirements (representative of DFW-area municipal code).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 4: Warning Signs It's Time to Replace, Not Repair</h2>
            <p className="text-slate-300 mb-4">
              Even with good maintenance, every water heater eventually reaches the end of its service life. The following signs suggest replacement is the more sensible option over another repair:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Age near or past the expected range.</strong> A tank unit past 10-12 years or a tankless unit past 15-18 years is a candidate for replacement at the next sign of trouble, rather than another repair.</li>
              <li><strong>Rumbling, popping, or banging noises.</strong> This is a classic symptom of a thick sediment layer hardening at the bottom of the tank - water trapped underneath it boils and forces its way through, creating the noise. See our related guide on <a href="/blog/water-heater-making-popping-noise-dallas" className="text-[#F0B429] underline">what a popping water heater means</a> for the full diagnostic breakdown.</li>
              <li><strong>Rusty or discolored hot water.</strong> This can indicate a failing anode rod or a corroding tank interior - both signs the tank itself, not just a part, is nearing failure.</li>
              <li><strong>Visible moisture or pooling at the base of the tank.</strong> Unlike a loose fitting, a leak from the tank body itself is not repairable - the tank is compromised.</li>
              <li><strong>Declining hot water volume or inconsistent temperature</strong> despite a correctly set thermostat, which often points to sediment reducing usable tank capacity.</li>
            </ul>
            <p className="text-slate-300">
              When any of these signs appear on a unit that is already near the end of its expected lifespan, a same-day inspection is worth the cost - it's the difference between a planned replacement and an unplanned failure that floods a utility closet or garage overnight.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Have a plumbing emergency?</strong> Call PlumbingHands - DFW's trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Water Heater Emergency Service", href: "/services/water-heater-emergency" },
                { label: "Water Heater Emergency Cost Guide", href: "/cost-guides/water-heater-emergency-cost-guide" },
                { label: "Water Heater Making a Popping Noise? Here's Why", href: "/blog/water-heater-making-popping-noise-dallas" },
                { label: "DFW Emergency Plumbing Cost Guide", href: "/guides/dfw-emergency-plumbing-costs" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
