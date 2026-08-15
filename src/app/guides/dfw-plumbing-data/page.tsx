import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { getArticleImage } from "@/lib/articleImages";

export const metadata = buildMetadata({
  title: "DFW Plumbing Emergency Data Report",
  description: truncateForMeta(
    "An original, sourced data report on Dallas-Fort Worth water hardness by city, winter freeze-event frequency, and the population growth driving local plumbing demand."
  ),
  path: "/guides/dfw-plumbing-data"
});

export default function DfwPlumbingDataPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-plumbing-data",
            "DFW Plumbing Emergency Data Report",
            "An original, sourced data report on Dallas-Fort Worth water hardness by city, winter freeze-event frequency, and the population growth driving local plumbing demand."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "DFW Plumbing Emergency Data", path: "/guides/dfw-plumbing-data" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Original Research</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            DFW Plumbing Emergency Data<br />
            <span className="text-[#F0B429]">Water Hardness, Freeze Risk, and Demand Trends</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This report compiles publicly available data from municipal water utilities, the National Weather Service, and the Federal Reserve Bank of Dallas. Figures are cited by source below and reflect the most recent published data at time of writing. It is intended as a reference for homeowners, researchers, and local media - not as a substitute for a property-specific water test or professional plumbing inspection.</p>
          </div>

          <div className="photo-frame relative mt-2 mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image
              src={getArticleImage(undefined, 4)}
              alt="Plumbing service data and research for the Dallas-Fort Worth area"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: How Hard Is DFW's Water? (By City)</h2>
            <p className="text-slate-300 mb-4">
              Hard water is one of the most common - and most overlooked - contributors to plumbing problems in North Texas. Dissolved calcium and magnesium in hard water build up as scale inside water heaters, faucet aerators, and pipe fittings over time, which is a major factor in why water heater lifespan tends to run shorter here than in soft-water regions (see our <a href="/guides/dfw-water-heater-lifespan" className="text-[#F0B429] underline">water heater lifespan guide</a> for the full mechanism). Hardness is measured in grains per gallon (GPG); anything above 7 GPG is generally classified as hard, and above 10 GPG as very hard.
            </p>
            <p className="text-slate-300 mb-4">
              Field testing and municipal water quality reports compiled by regional water-treatment providers show every major DFW-area city in the hard-to-very-hard range, with the northern suburbs generally testing harder than the urban core:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Forney:</strong> 13-17 GPG (Very Hard)</li>
              <li><strong>Rockwall:</strong> 12-16 GPG (Very Hard)</li>
              <li><strong>Frisco:</strong> 10-14 GPG (Very Hard)</li>
              <li><strong>McKinney:</strong> 10-14 GPG (Very Hard)</li>
              <li><strong>Plano:</strong> 9-13 GPG (Hard to Very Hard)</li>
              <li><strong>Allen:</strong> 9-13 GPG (Hard to Very Hard)</li>
              <li><strong>Dallas:</strong> 7-11 GPG (Hard to Very Hard) - the City of Dallas Water Utilities' own water quality reporting places average hardness closer to 8-9 GPG (approximately 140-160 mg/L), illustrating the seasonal and source-water variation homeowners should expect rather than treating any single number as fixed.</li>
              <li><strong>Fort Worth:</strong> 7-10 GPG (Hard)</li>
            </ul>
            <p className="text-slate-300 mb-4">
              Practically, this means the large majority of DFW homes fall well above the 3 GPG threshold where a water softener is generally recommended - and homes without one should expect faster mineral buildup in water heaters, faster loss of fixture flow rate, and more frequent aerator and showerhead cleaning.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: How Often Does North Texas Actually Freeze?</h2>
            <p className="text-slate-300 mb-4">
              DFW homeowners often treat hard freezes as a once-a-decade fluke. The National Weather Service Fort Worth office's own historical record of significant regional snow and ice events, spanning 1841 through 2025, tells a different story: the frequency of documented major winter events has been climbing, not staying flat. Recent decades average roughly two to four major events per decade, and the 21st century alone has already produced at least 18 separately documented significant snow, ice, or freeze events in the DFW area - including three separate events in the year 2000 alone and three more in 2010.
            </p>
            <p className="text-slate-300 mb-4">
              February 2021's Winter Storm Uri remains the clearest single data point on what a severe freeze costs the region - a statewide survey found 16 percent of Texans reported frozen and burst pipes during that event, translating to an estimated 1.2 million affected homes statewide, with individual claims averaging roughly $27,000 in damage. Our <a href="/guides/dfw-burst-pipes" className="text-[#F0B429] underline">burst pipes guide</a> covers that event and its claims data in full. The point for this report is broader: Uri was severe, but it was not an isolated anomaly sitting outside an otherwise freeze-free pattern - it was the most extreme point on a recurring trend line.
            </p>
            <p className="text-slate-300 mb-4">
              For homeowners, the practical takeaway is that freeze-protection habits (insulating exposed pipe, knowing your main shutoff location, disconnecting exterior hose bibs before winter) are not a one-time response to an unusual event - they are ongoing maintenance for a genuinely recurring regional risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: Population Growth Is Adding Pressure to Aging Infrastructure</h2>
            <p className="text-slate-300 mb-4">
              The Federal Reserve Bank of Dallas' regional economic indicators show the Dallas-Fort Worth metro added approximately 180,000 residents in the most recent 12-month reporting period, a 2.2 percent growth rate that exceeds the region's own long-term average of 1.9 percent. Dallas proper grew 2.3 percent and Fort Worth 1.9 percent over the same period, with international migration accounting for the majority (58 percent) of the metro's total growth.
            </p>
            <p className="text-slate-300 mb-4">
              That scale of population growth matters for plumbing infrastructure in two concrete ways: new-construction demand strains municipal water and sewer capacity in fast-growing suburbs, while established neighborhoods in the urban core continue aging in place with original 1960s-1980s-era supply and drain lines (including galvanized steel and, in some subdivisions, polybutylene - see our <a href="/guides/dfw-polybutylene-pipe-replacement" className="text-[#F0B429] underline">polybutylene pipe guide</a>). Both trends point toward rising plumbing service demand across the metro for the foreseeable future, not a temporary spike.
            </p>
            <p className="text-slate-400 text-sm mt-4">
              <strong>Sources:</strong> Water hardness data compiled from municipal water utility reports and regional water-treatment provider field testing (2023-2024); National Weather Service Fort Worth/Dallas office historical winter weather event records; Federal Reserve Bank of Dallas regional economic indicators (2025); Texas Department of Insurance and Groundworks Winter Storm Uri survey data (cited in full in our burst pipes guide).
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Journalists and researchers:</strong> feel free to cite this report with a link back to this page. For an interview or additional local data, reach out through our <a href="/contact" className="text-[#F0B429] underline">contact page</a>.</p>
          </div>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "DFW Water Heater Lifespan Guide", href: "/guides/dfw-water-heater-lifespan" },
                { label: "Burst Pipes in DFW", href: "/guides/dfw-burst-pipes" },
                { label: "Polybutylene Pipe in DFW", href: "/guides/dfw-polybutylene-pipe-replacement" },
                { label: "DFW Service Areas", href: "/cities" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
