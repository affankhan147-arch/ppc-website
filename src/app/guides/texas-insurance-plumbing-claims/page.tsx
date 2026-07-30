import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";

export const metadata = buildMetadata({
  title: "Texas Homeowners Insurance & Plumbing Claims – What’s Covered?",
  description: truncateForMeta(
    "A research-backed guide explaining what Texas homeowners insurance covers (and doesn't cover) when a plumbing leak occurs, with real TDI sources."
  ),
  path: "/guides/texas-insurance-plumbing-claims"
});

export default function InsuranceGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/texas-insurance-plumbing-claims",
            "Texas Homeowners Insurance & Plumbing Claims – What’s Covered?",
            "A research-backed guide explaining what Texas homeowners insurance covers (and doesn't cover) when a plumbing leak occurs."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "Texas Insurance & Plumbing Claims", path: "/guides/texas-insurance-plumbing-claims" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Texas Homeowners Insurance:<br />
            <span className="text-[#F0B429]">What’s Actually Covered in a Plumbing Leak?</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute legal or insurance advice. Always review your specific policy and consult with your insurance provider or a qualified professional.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: The "Sudden and Accidental" Rule</h2>
            <p className="text-slate-300 mb-4">
              In Texas, the vast majority of homeowners insurance policies (HO-B) are standardized by the Texas Department of Insurance. The central test that determines whether a water damage claim is approved or denied is the distinction between <strong>sudden and accidental</strong> damage and <strong>gradual</strong> damage.
            </p>
            <p className="text-slate-300 mb-4">
              According to the Texas Department of Insurance’s own consumer guidance, a standard policy generally covers sudden and accidental water damage, but typically excludes damage caused by gradual leaks, seepage, or long‑term maintenance issues. This distinction is the single most important factor in whether a claim is approved or denied.
            </p>
            <p className="text-sm text-slate-400">
              Source: TDI consumer blog, <a href="https://tdi.texas.gov/blog/water-damage.html" target="_blank" className="text-[#F0B429] hover:underline">tdi.texas.gov/blog/water-damage.html</a>; and TDI report, <a href="https://tdi.texas.gov/reports/documents/texas-homeowners-policies-04122018.pdf" target="_blank" className="text-[#F0B429] hover:underline">tdi.texas.gov/reports/documents/texas-homeowners-policies-04122018.pdf</a>.
            </p>
            <p className="text-slate-300 mt-4">
              <strong>Sudden and accidental</strong> means the leak was abrupt, unexpected, and not the result of long‑term deterioration. Examples include a burst pipe that fails without warning, or a water heater that catastrophically ruptures.
            </p>
            <p className="text-slate-300">
              <strong>Gradual</strong> means the leak developed slowly over time — corrosion, wear and tear, or a small drip that went unnoticed for weeks or months. Gradual leaks are almost always excluded from coverage, because they are considered a maintenance issue rather than an insurable event.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: What Is Actually Covered?</h2>
            <p className="text-slate-300 mb-4">
              If the leak qualifies as "sudden and accidental", what does your policy actually pay for? The short answer is: <strong>the resulting damage to your home, not the repair of the failed pipe itself.</strong>
            </p>
            <p className="text-slate-300 mb-4">
              Water damage to flooring, drywall, cabinets, and personal belongings is generally covered (subject to your policy's limits and deductible). However, the cost to repair or replace the burst pipe, failed water heater, or cracked fitting is typically treated as a maintenance expense and is not covered.
            </p>
            <p className="text-slate-300 mb-4">
              Another common coverage is a freeze‑related burst pipe — but this often comes with a condition: the homeowner must have maintained adequate heat in the home during freezing weather. If the home was unoccupied and the heat was turned off, the claim may be denied.
            </p>
            <p className="text-sm text-slate-400">
              Source: TDI consumer guidance, quoted in industry articles; the exact maintained‑heat condition is still being confirmed directly with TDI.
            </p>
            <p className="text-slate-300 mt-4">
              This distinction is why hiring a licensed plumber to document the exact cause of the failure is so critical. An adjuster will base their decision on the plumber's professional assessment of whether the failure was sudden or gradual.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: Common Exclusions and Myths</h2>
            <p className="text-slate-300 mb-4">
              Even when a water leak is sudden and accidental, several common exclusions can still prevent a claim from being paid. Understanding these before an emergency happens is the best way to avoid surprises.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">1. Sewer and Drain Backups</h3>
            <p className="text-slate-300 mb-4">
              Standard Texas homeowners policies typically exclude sewer and drain backups, regardless of whether the backup is sudden or gradual. Coverage for this is generally available only as a separate endorsement — often called water backup coverage — which must be added to the policy before a loss occurs. This is consistent with the Texas Department of Insurance’s framework for standard policy exclusions and is widely confirmed by industry practice.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">2. Mold Remediation</h3>
            <p className="text-slate-300 mb-4">
              Mold damage resulting from a covered water loss is not automatically covered in full. Texas standard policies often cap mold remediation at a low limit or exclude it entirely unless a specific mold endorsement (HO‑161A) is added. Even with an endorsement, policyholders must report hidden mold within 30 days of detection. The Texas Department of Insurance mandates this endorsement structure, making it a genuine, verifiable feature of Texas homeowners policies.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">3. Polybutylene (PB) Pipe Exclusions</h3>
            <p className="text-slate-300 mb-4">
              Homes built between 1978 and 1995 that still have original polybutylene supply lines face a distinct issue: many insurance carriers will deny coverage entirely, refuse to renew, or charge significantly higher premiums. This is because PB pipe has a documented history of premature failure, and insurers treat it as an unacceptable risk. This pattern is widely reported across the insurance industry nationally, and Texas homeowners with polybutylene plumbing should expect similar scrutiny from carriers.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">4. Slab Leaks: The Texas Gray Area</h3>
            <p className="text-slate-300 mb-4">
              Slab leaks are a particularly difficult issue in Texas because expansive clay soil can shift and stress underground pipes. Adjusters often distinguish between a sudden failure (covered) and a slow, long‑term corrosion leak (excluded). The determining factor is usually the plumber’s diagnosis of the cause, not the symptom. This is consistent with multiple restoration‑industry sources and was confirmed in the earlier Dallas/Austin‑specific research for this guide.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">5. The Maintenance Myth</h3>
            <p className="text-slate-300 mb-4">
              Many homeowners believe that simply having insurance means all plumbing‑related damage is covered. In reality, standard policies explicitly exclude damage caused by poor maintenance, including corroded pipes, aging water heaters, and neglected fixtures. This is really just a restatement of the sudden/gradual distinction already covered in Section 1 — insurers expect homeowners to keep their plumbing in reasonable condition, and damage from deferred maintenance is not insurable.
            </p>
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
