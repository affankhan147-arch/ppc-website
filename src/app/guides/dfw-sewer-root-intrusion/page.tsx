import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";

export const metadata = buildMetadata({
  title: "Sewer Line Maintenance & Root Intrusion in DFW",
  description: truncateForMeta(
    "A research-backed guide explaining why DFW sewer lines are uniquely prone to root intrusion, how it's diagnosed, and what homeowners can do."
  ),
  path: "/guides/dfw-sewer-root-intrusion"
});

export default function SewerRootGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-sewer-root-intrusion",
            "Sewer Line Maintenance & Root Intrusion in DFW",
            "A research-backed guide explaining why DFW sewer lines are uniquely prone to root intrusion, how it's diagnosed, and what homeowners can do."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "Sewer Root Intrusion", path: "/guides/dfw-sewer-root-intrusion" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sewer Line Maintenance &amp; Root Intrusion in DFW
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing, legal, or insurance advice. Always consult a licensed professional for your specific situation.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: Why DFW?</h2>
            <p className="text-slate-300 mb-4">
              DFW’s expansive clay soil creates an environment where tree roots grow aggressively, and the region’s mature tree canopy means many older neighborhoods have decades‑old root systems seeking moisture. Sewer lines, particularly older cast‑iron or clay pipes, become prime targets – roots enter through tiny cracks, expand, and eventually cause complete blockages.
            </p>
            <p className="text-slate-300 mb-4">
              Local municipalities are clear about responsibility. The City of Dallas’s code states: “the city is responsible for maintenance of a service connection from the main to the property line for wastewater service. The sewer lateral and other private plumbing are the homeowner’s responsibility.” Fort Worth offers a “Priority Repair Program” for income‑eligible homeowners facing emergency sewer repairs, and Arlington Water Utilities covers structural failures specifically within the public right‑of‑way.
            </p>
            <p className="text-slate-300">
              For homeowners, the practical takeaway is that the sewer lateral (the pipe from the property line to the house) is almost always your responsibility – and root intrusion is one of the most common causes of failure in that section.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: Diagnosis &amp; Detection</h2>
            <p className="text-slate-300 mb-4">
              Root intrusion doesn’t happen overnight. The earliest signs are often subtle:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Recurring backups in the same drain, even after snaking.</li>
              <li>Gurgling sounds from toilets or floor drains when water is used elsewhere.</li>
              <li>Multiple fixtures reacting together – for example, when you flush a toilet, water rises in a tub or shower.</li>
              <li>Slow drains that don’t clear with plunging.</li>
            </ul>
            <p className="text-slate-300 mb-4">
              When a homeowner suspects a main sewer line issue, a professional sewer camera inspection is the standard diagnostic tool. A small camera is inserted into the line from a cleanout, allowing the technician to visually identify cracks, root intrusion, and the extent of the blockage.
            </p>
            <p className="text-slate-300">
              Hydro‑jetting is the most common clearing method for root intrusion. It uses high‑pressure water to cut through roots and clean the interior walls of the pipe. However, hydro‑jetting alone is often temporary – if the roots have already caused structural damage, a permanent repair may be needed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: Repair &amp; Prevention</h2>
            <p className="text-slate-300 mb-4">
              When roots have caused significant damage to a sewer line, repair options depend on the severity and location of the damage.
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Trenchless repair (pipe lining)</strong> – A resin‑impregnated liner is inserted into the existing pipe and cured in place, creating a new, seamless pipe inside the old one. This avoids excavation and is ideal for moderate damage.</li>
              <li><strong>Traditional excavation</strong> – For severe damage or when the pipe has collapsed, the section must be dug up and replaced. This is more disruptive but often the only option for major failures.</li>
            </ul>
            <p className="text-slate-300 mb-4">
              Prevention is more cost‑effective than repair. Homeowners can:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Schedule periodic sewer camera inspections, especially for homes with mature trees near the sewer line path or older pipes, to catch root intrusion before it causes a full blockage.</li>
              <li>Avoid planting large trees near the sewer line path.</li>
              <li>Install a backwater valve to protect against sewer backups during heavy rain or municipal line overflows.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 4: Insurance Coverage</h2>
            <p className="text-slate-300 mb-4">
              Root intrusion is classified as “gradual deterioration” – it develops over time and is not a sudden, accidental event. Therefore, standard homeowners policies typically exclude root‑related sewer line damage.
            </p>
            <p className="text-slate-300 mb-4">
              To obtain coverage, homeowners must purchase a separate <strong>Sewer Backup Coverage</strong> or <strong>Service Line Coverage</strong> endorsement. These endorsements are two different products – they are not the same. “Sewer Backup Coverage” typically covers damage caused by backups (e.g., water rising into the house), while “Service Line Coverage” covers the repair or replacement of the pipe itself, including damage caused by roots.
            </p>
            <p className="text-slate-300 mb-4">
              If you have the appropriate endorsement, filing a claim requires:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>A dated, documented diagnosis from a licensed plumber.</li>
              <li>Clear photos of the damage and the roots.</li>
              <li>All correspondence with your insurance company.</li>
            </ul>
            <p className="text-slate-300">
              Homeowners should check their policy and confirm whether they have either endorsement – and understand that standard policies do not cover root intrusion.
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
