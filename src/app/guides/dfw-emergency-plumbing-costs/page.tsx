import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";

export const metadata = buildMetadata({
  title: "DFW Emergency Plumbing Cost Guide – What Homeowners Can Expect to Pay",
  description: truncateForMeta(
    "A research-backed guide explaining how emergency plumbing pricing works in Dallas-Fort Worth, with realistic cost ranges for common services."
  ),
  path: "/guides/dfw-emergency-plumbing-costs"
});

export default function CostGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-emergency-plumbing-costs",
            "DFW Emergency Plumbing Cost Guide",
            "A research-backed guide explaining how emergency plumbing pricing works in Dallas-Fort Worth, with realistic cost ranges for common services."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "DFW Emergency Plumbing Cost Guide", path: "/guides/dfw-emergency-plumbing-costs" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            DFW Emergency Plumbing Cost Guide<br />
            <span className="text-[#F0B429]">What Homeowners Can Actually Expect to Pay</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing, legal, or insurance advice. Prices are estimates based on multiple sources; actual costs vary by provider, time of day, and job complexity.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: How Emergency Plumbing Pricing Works</h2>
            <p className="text-slate-300 mb-4">
              Emergency plumbing pricing is rarely a single, simple number. It is built from several independent charges that a provider typically explains before work begins – and understanding those components is the first step to getting a clear, fair estimate.
            </p>
            <p className="text-slate-300 mb-4">
              The three main components are:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Dispatch fee</strong> – a flat charge (typically $50–$95 in the DFW area) for the provider to come to your property. This fee often covers the travel time and is sometimes applied to the final repair cost if you hire the provider.</li>
              <li><strong>Diagnostic fee</strong> – a charge for the plumber to assess the problem. This may be a separate line item or bundled with the dispatch fee. The key question to ask is: “Is the diagnostic fee applied to the repair cost if I move forward?”</li>
              <li><strong>Labor and parts</strong> – the actual repair work. Labor rates in the DFW area range widely, from about $75 to $175 per hour for standard work, with emergency after‑hours rates typically running 1.5× to 3× that amount. Parts are usually priced at a standard markup, and the total depends on the materials needed.</li>
            </ul>
            <p className="text-slate-300">
              A common pitfall: “free estimates” can sometimes be a red flag – they may be used to attract customers but then result in higher final bills once diagnosis reveals hidden issues. A modest, transparent service call fee (which is credited toward the work if you hire the provider) is often a sign of more honest pricing.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: Cost Ranges for Common Services</h2>
            <p className="text-slate-300 mb-4">
              The following ranges are based on multiple national and regional sources, including HomeAdvisor, Angi, and local DFW plumbing provider listings. Actual costs vary by provider, time of day, and access difficulty – these are realistic benchmarks, not guaranteed quotes.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-[#0F1F1D]">
                  <tr>
                    <th scope="col" className="px-4 py-3">Service</th>
                    <th scope="col" className="px-4 py-3">Realistic DFW Range</th>
                    <th scope="col" className="px-4 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A3A38]">
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Dispatch / diagnostic fee</td>
                    <td className="px-4 py-3">$50–$250</td>
                    <td className="px-4 py-3">Often credited toward repair if hired.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Emergency after‑hours multiplier</td>
                    <td className="px-4 py-3">1.5×–3× standard rate</td>
                    <td className="px-4 py-3">Nights, weekends, and holidays.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Drain cleaning (simple clog)</td>
                    <td className="px-4 py-3">$100–$300</td>
                    <td className="px-4 py-3">Basic snaking, single fixture.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Main sewer line cleaning (snake)</td>
                    <td className="px-4 py-3">$200–$500</td>
                    <td className="px-4 py-3">Non‑hydro‑jet clearing.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Hydro‑jetting</td>
                    <td className="px-4 py-3">$350–$1,500+</td>
                    <td className="px-4 py-3">Branch drain lower end; full main line higher; homes without an outdoor cleanout often cost significantly more.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Sewer camera inspection</td>
                    <td className="px-4 py-3">$125–$350</td>
                    <td className="px-4 py-3">Higher for unusually long or hard‑to‑access lines.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Burst pipe repair (single section)</td>
                    <td className="px-4 py-3">$125–$2,500+</td>
                    <td className="px-4 py-3">Scope‑dependent; broader re‑piping is a separate, larger cost category ($4,000+).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Water heater repair</td>
                    <td className="px-4 py-3">$150–$700</td>
                    <td className="px-4 py-3">Tarrant County average major repair: ~$550.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Water heater replacement (tank)</td>
                    <td className="px-4 py-3">$1,000–$2,500</td>
                    <td className="px-4 py-3">Dallas average ~$1,487.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Water heater replacement (tankless)</td>
                    <td className="px-4 py-3">$2,500–$6,500</td>
                    <td className="px-4 py-3">Higher upfront, longer lifespan.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Slab leak detection</td>
                    <td className="px-4 py-3">$150–$400</td>
                    <td className="px-4 py-3">Non‑invasive (acoustic, thermal, tracer gas).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white">Slab leak repair</td>
                    <td className="px-4 py-3">$1,500–$15,000</td>
                    <td className="px-4 py-3">Typical full‑service range $3,700–$9,000; method (reroute vs. tunnel vs. excavation) is the main driver.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: What Drives Costs Up (and What Doesn't)</h2>
            <p className="text-slate-300 mb-4">
              Not all emergency plumbing jobs are priced the same – even for the same problem. Several factors can push a repair from the lower end of the range to the higher end:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>After‑hours timing.</strong> Nights, weekends, and holidays almost always carry a premium. The standard multiplier is 1.5× to 3× the normal rate, which can add $100–$500 or more to a job depending on the base cost.</li>
              <li><strong>Access difficulty.</strong> If a pipe is buried under a slab, behind a finished wall, or in a tight crawlspace, the labor required to reach it increases significantly. One clear example: hydro‑jetting a main sewer line costs considerably more if the home does not have an accessible outdoor cleanout – the extra access work can add $425–$850 to the total, according to some DFW‑specific sources.</li>
              <li><strong>Parts vs. labor.</strong> In most repairs, the largest cost is labor, not parts. For a water heater replacement, labor typically accounts for 30–50% of the total cost. Parts are marked up at a standard industry rate, but the real cost driver is the time a licensed plumber spends diagnosing and performing the repair.</li>
              <li><strong>Restoration work is separate.</strong> The plumber stops the leak and repairs the pipe. The cost to replace drywall, flooring, or cabinets is almost always a separate charge from a restoration contractor, not part of the plumbing estimate. This is a common point of confusion that leads to unexpectedly high final bills – and it’s one of the most important things to clarify before authorizing work.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 4: How to Get a Clear Quote Before Authorizing Work</h2>
            <p className="text-slate-300 mb-4">
              A transparent, itemized quote is your best defense against surprise costs. Here is what to ask for – and what to watch for – before you approve any emergency plumbing repair.
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Ask for an itemized breakdown.</strong> A reliable provider should be able to separate dispatch, diagnostic, labor, and parts into their own line items. A single bundled number is harder to compare and easier to adjust later.</li>
              <li><strong>Ask what could change after diagnosis.</strong> No plumber can give an exact final price before they see the problem. But a good provider will tell you clearly: “We can diagnose for $X, and the repair typically falls between $Y and $Z – we’ll confirm the exact scope once we open the wall/slab/cleanout.”</li>
              <li><strong>Get it in writing.</strong> A dated, written diagnosis from a licensed plumber is not just useful for your own records – it is the single most important piece of evidence if you need to file an insurance claim later. This is the same principle we covered in the homeowners insurance guide: document the cause and timeline before any repair work begins.</li>
              <li><strong>Be cautious with “free estimates.”</strong> As noted in Section 1, a free estimate is not always a sign of good value. It can sometimes be a lead‑generation tactic that leads to inflated pricing once the technician is on‑site. A modest, transparent service fee ($50–$95, applied toward the repair if you hire them) is often a signal of a provider who is upfront about their pricing from the start.</li>
            </ul>
          </section>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Have a plumbing emergency?</strong> Call PlumbingHands – DFW’s trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks />
          </div>
        </div>
      </div>
    </>
  );
}
