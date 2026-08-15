import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";

export const metadata = buildMetadata({
  title: "Gas Line Safety in DFW: What to Know",
  description: truncateForMeta(
    "A research-backed guide explaining gas line capacity, safety steps, and what homeowners should know before adding outdoor kitchens or pool heaters in DFW."
  ),
  path: "/guides/dfw-gas-line-safety"
});

export default function GasLineGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-gas-line-safety",
            "Gas Line Safety & Capacity in DFW",
            "A research-backed guide explaining gas line capacity, safety steps, and what homeowners should know before adding outdoor kitchens or pool heaters in DFW."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "Gas Line Safety & Capacity", path: "/guides/dfw-gas-line-safety" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Gas Line Safety &amp; Capacity in DFW<br />
            <span className="text-[#F0B429]">What Homeowners Need to Know</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing, gas, or legal advice. Always consult a licensed professional for your specific situation.</p>
          </div>

          <div className="photo-frame relative mt-2 mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image
              src="/images/photography/plumbing-diagnostic.jpg"
              alt="Plumber inspecting a gas line connection and pressure setup in a DFW home"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: Gas Line Capacity – Why It Matters</h2>
            <p className="text-slate-300 mb-4">
              Gas lines are sized to deliver a specific volume of gas at a specific pressure. When a home’s gas demand exceeds the line’s capacity, appliances may not operate properly – and in extreme cases, the system can become unsafe.
            </p>
            <p className="text-slate-300 mb-4">
              This issue is not hypothetical in DFW. Multiple local plumbing sources report that the outdoor‑kitchen and pool‑heater boom in Keller and Southlake has pushed gas lines close to capacity in thousands of homes. One real example: a Keller home added a 24kW generator, a pool heater, and an outdoor kitchen. The existing 406 CFH line was already nearly maxed out by the generator alone, which required 306 CFH – before the other new appliances were even considered.
            </p>
            <p className="text-slate-300">
              Older homes in Keller and Southlake (pre‑1990) often still have black iron gas pipe with threaded connections – a material that can be more susceptible to corrosion and joint failure over time. For homeowners adding gas appliances, a professional load calculation is not just recommended – it is essential.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: Safety Steps for Homeowners</h2>
            <p className="text-slate-300 mb-4">
              If you suspect a gas leak, the correct response is not to investigate or call a plumber first. The standard, universally recommended sequence is:
            </p>
            <ol className="list-decimal list-inside text-slate-300 space-y-3 mb-4">
              <li><strong>Evacuate immediately.</strong> Leave the home and take all occupants and pets with you. Do not stop to open windows or turn off appliances.</li>
              <li><strong>Do not create ignition sources.</strong> Do not flip light switches, use phones inside the home, operate garage door openers, or do anything that could create a spark.</li>
              <li><strong>Move to a safe distance.</strong> Stay at least 100 feet away from the home (sources recommend up to 350 feet in some cases – further is always safer).</li>
              <li><strong>Call 911 and/or the gas utility’s emergency line from outside</strong> – at a safe distance, using a phone away from the home.</li>
              <li><strong>Do not re‑enter the home</strong> until cleared by emergency responders or the gas utility’s authorized personnel.</li>
              <li><strong>Only after the emergency is fully resolved</strong> should a licensed plumber be contacted – and then only to repair or upgrade the gas system, not to respond to the active leak.</li>
            </ol>
            <p className="text-slate-300">
              This sequence is consistent with guidance from multiple independent sources, including university safety offices and gas utility emergency protocols.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: Licensing and Permits</h2>
            <p className="text-slate-300 mb-4">
              In Texas, the Texas State Board of Plumbing Examiners (TSBPE) holds exclusive statewide authority to license plumbers. Any plumber performing fuel gas piping, line extensions, or appliance connections must hold a current, active Master or Journeyman Plumber license issued by TSBPE – the same license that covers general plumbing work. No separate "gas-work endorsement" is required for standard residential fuel gas installations (such as outdoor kitchens, pool heaters, or appliance connections); the standard plumbing license already covers this work.
            </p>
            <p className="text-slate-300 mb-4">
              Before any work begins, homeowners should confirm two things:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>The plumber’s license is active and current via TSBPE's public license search tool.</li>
              <li>The local building department (Keller, Southlake, or the applicable city) has issued the required permit for the work.</li>
            </ul>
            <p className="text-slate-300">
              Municipalities issue permits, but they cannot license plumbers – only TSBPE can. Permits ensure the installation is inspected for safety and code compliance, and they are particularly important for gas line additions due to the inherent safety risks of improper sizing or connections.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 4: What to Ask Before Adding Gas Appliances</h2>
            <p className="text-slate-300 mb-4">
              Before approving a gas appliance installation, homeowners should ask the following questions – and receive clear, verifiable answers:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Has my gas line been sized correctly for this additional load?</strong> A professional load calculation (not just a visual inspection) is required to ensure the existing line can safely handle the new appliance.</li>
              <li><strong>Does this installation require a permit?</strong> If the answer is “no” for gas work, that is a red flag. Most municipalities require permits for any new or extended gas piping.</li>
              <li><strong>Is the contractor licensed to perform gas work in Texas?</strong> Confirm that the plumber holds a current, active Master or Journeyman license from TSBPE. You can verify this directly through TSBPE's public license search database.</li>
              <li><strong>What are the pressure test and inspection requirements?</strong> After installation, the system must be pressure‑tested to confirm there are no leaks. Ask whether this test is included in the quote, and whether the city inspector will sign off on the completed work.</li>
            </ul>
            <p className="text-slate-300">
              These questions help separate a safe, code‑compliant installation from one that may create long‑term safety or performance issues.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Have a plumbing or gas emergency?</strong> Call PlumbingHands – DFW’s trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks />
          </div>
        </div>
      </div>
    </>
  );
}
