import Image from "next/image";
import { Metadata } from "next";
import { AlertTriangle, CheckCircle2, XCircle, FileWarning } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { DirectAnswer, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { getArticleImage } from "@/lib/articleImages";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const path = "/blog/can-homeowners-legally-do-their-own-plumbing-in-texas";
const title = "Can Homeowners Legally Do Their Own Plumbing in Texas?";
const description = truncateForMeta(
  "Texas Occupations Code 1301.051 lets homeowners do their own plumbing on a primary residence without a license - but not on rentals. Permits still apply."
);
const directAnswer =
  "Yes, with real limits. Texas Occupations Code Section 1301.051 lets homeowners perform plumbing work on their own occupied primary residence without a plumbing license, but this homestead exemption does not cover rental properties, does not let you hire an unlicensed person to do the work for you, and does not waive the permit and inspection your city still requires for anything beyond simple fixture repair. Gas line work is regulated separately and typically still requires a qualified, licensed installer even in a homeowner's own home.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const faqs = [
  {
    question: "What exactly does Texas Occupations Code Section 1301.051 say?",
    answer:
      "The statute's operative text is short: \"A property owner is not required to be licensed under this chapter to perform plumbing in the property owner's homestead.\" It sits in Subchapter B (Exemptions) of Chapter 1301, the state law that otherwise requires a Texas State Board of Plumbing Examiners (TSBPE) license to perform plumbing work. It exempts the property owner's own labor on their own homestead - it does not create a broader DIY right, and it does not exempt permits, inspections, or gas work."
  },
  {
    question: "Does the exemption cover a rental property I own?",
    answer:
      "No. The homestead exemption applies only to a property you own and occupy as your primary residence. It does not extend to rental properties, investment properties, vacation homes, or commercial buildings - work on those still requires a licensed plumber regardless of who owns the property."
  },
  {
    question: "Can I have a friend or handyman do the work under my homeowner exemption?",
    answer:
      "No. The exemption covers the property owner personally performing the work - it does not transfer to anyone else. If you pay or ask another unlicensed person to do plumbing work on your home, that person is not covered by your exemption and is operating outside the law, and you lose the liability and workmanship protections a licensed plumber's insurance would otherwise provide."
  },
  {
    question: "Do I still need a permit if I'm allowed to skip the license?",
    answer:
      "In most Texas cities, yes. The license exemption and the permit requirement are two separate things. Dallas, for example, generally requires a permit for work that moves, replaces, extends, or adds plumbing lines - not just minor upkeep - and inspections are not waived just because the homeowner is doing the work personally. Check with your specific city's building or permits department before starting; requirements and thresholds vary by city across DFW."
  },
  {
    question: "Can I do my own gas line work under the homeowner exemption?",
    answer:
      "Be cautious here. Gas piping and appliance gas connections are regulated separately from general plumbing, and a licensed or otherwise qualified installer is typically still required even for work on your own home. Gas work also carries real safety risk - a bad connection can cause a leak, fire, or carbon monoxide exposure. This is one of the areas where hiring a licensed professional is the safer call regardless of what's technically permitted."
  },
  {
    question: "What happens if I skip the permit or do work the exemption doesn't cover?",
    answer:
      "Unpermitted or improperly performed work can create problems well beyond the original job: a homeowners insurance claim can be denied if the damage traces back to unpermitted work, the issue can surface as a defect during a home sale inspection and delay or kill the sale, and you may be required to open up finished walls or flooring later to bring the work up to code retroactively."
  },
  {
    question: "What's the penalty for someone practicing plumbing without a license in Texas?",
    answer:
      "Performing plumbing work for compensation without a TSBPE license (i.e., not covered by the homestead exemption) is a regulatory violation that the Texas State Board of Plumbing Examiners can pursue with administrative penalties, cease-and-desist action, and fines. This applies to unlicensed individuals or contractors doing paid plumbing work - it is separate from a homeowner legally exercising their own homestead exemption, which carries no such penalty as long as it's the owner's own labor on their own primary residence."
  },
  {
    question: "Does the homestead exemption apply to a manufactured or mobile home?",
    answer:
      "It applies to the property owner's homestead - the home you own and occupy as your primary residence - which generally includes manufactured and mobile homes on land you own and occupy as your primary residence. Manufactured housing also has its own separate state regulations (through the Texas Department of Housing and Community Affairs) that can affect what modifications are allowed, so confirm your specific situation before starting any plumbing work, especially anything connecting to a public water or sewer system."
  }
];

export default function DiyPlumbingLegalityPage() {
  const heroImage = getArticleImage("24-hour-emergency-plumber", 3);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, title, description),
          articleSchema(path, title, description),
          breadcrumbSchema([{ name: "Guides", path: "/blog" }, { name: title, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Guides", href: "/blog" }, { label: title, href: path }]} />
      <article className="mt-6 max-w-4xl">
        <p className="section-kicker">Cost and decision guides</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-white">{title}</h1>
        <div className="photo-frame relative mt-6 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
          <Image
            src={heroImage}
            alt="Homeowner reviewing plumbing work in a Dallas-Fort Worth home"
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-6 text-lg leading-8 text-slate-300">{directAnswer}</p>
        <div className="mt-6">
          <CallButton location="blog-diy-legality-top" pagePath={path} pageType="blog" service="24-hour-emergency-plumber" />
        </div>
      </article>

      <div className="mt-8 answer-grid">
        <div>
          <DirectAnswer>{directAnswer}</DirectAnswer>

          <section className="content-section mt-8">
            <p className="section-kicker">The legal basis</p>
            <h2 className="mt-2 text-2xl font-black text-white">Texas Occupations Code Section 1301.051</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Texas requires a Texas State Board of Plumbing Examiners (TSBPE) license to perform plumbing work - with one narrow
              exemption. Section 1301.051, titled &ldquo;Plumbing by Property Owner in Homestead,&rdquo; states:
            </p>
            <blockquote className="mt-4 rounded-md border-l-4 border-[#4FD1C5] bg-[#0F1F1D] p-4 italic leading-7 text-slate-200">
              &ldquo;A property owner is not required to be licensed under this chapter to perform plumbing in the property owner&apos;s
              homestead.&rdquo;
            </blockquote>
            <p className="mt-4 leading-7 text-slate-300">
              That is the entire operative text. It is narrow by design: it exempts the property owner&apos;s own labor, on their own
              homestead, from the state licensing requirement. It does not say anything about permits, inspections, gas work, or work
              performed by anyone other than the owner - those are addressed elsewhere in state and local code.{" "}
              <a
                href="https://texas.public.law/statutes/tex._occ._code_section_1301.051"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#4FD1C5] underline"
              >
                Read the statute text
              </a>
              .
            </p>
          </section>

          <div className="content-section mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-400" aria-hidden="true" />
                <div>
                  <h3 className="font-black text-white">What the exemption covers</h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-300">
                    <li>Plumbing work you personally perform</li>
                    <li>On a home you own and occupy as your primary residence (your homestead)</li>
                    <li>Typical scope: fixture replacement, repairs, running a drain line, swapping a water heater, general repiping</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="rounded-md border border-red-500/30 bg-red-500/10 p-5">
              <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 flex-none text-red-400" aria-hidden="true" />
                <div>
                  <h3 className="font-black text-white">What it does not cover</h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-300">
                    <li>Rental, investment, vacation, or commercial properties</li>
                    <li>Hiring an unlicensed person to do the work for you</li>
                    <li>Gas line work, which is regulated separately</li>
                    <li>The permit and inspection your city requires</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <section className="content-section mt-8">
            <div className="section-kicker"><FileWarning className="h-4 w-4" aria-hidden="true" /> Permits are a separate requirement</div>
            <h2 className="mt-2 text-2xl font-black text-white">A license exemption is not a permit exemption</h2>
            <p className="mt-3 leading-7 text-slate-300">
              This is the most commonly missed detail: not needing a state plumbing license does not mean your work is exempt from
              your city&apos;s permit and inspection process. In Dallas, for example, a permit is generally required for work that
              moves, replaces, extends, or adds plumbing lines - not just routine upkeep - and the homeowner exemption does not waive
              that requirement or the inspection that follows it.{" "}
              <a
                href="https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/building_inspection_faqs.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#4FD1C5] underline"
              >
                See Dallas building inspection FAQs
              </a>
              . Other DFW cities - Fort Worth, Plano, Arlington, Frisco, McKinney, and the rest - each run their own permit process
              with their own thresholds for what needs a permit versus what counts as minor repair. Before starting any project beyond
              a like-for-like fixture swap, check with your specific city&apos;s building or permits department.
            </p>
          </section>

          <section className="content-section mt-8">
            <p className="section-kicker">Quick reference</p>
            <h2 className="mt-2 text-2xl font-black text-white">Permit Offices for Major DFW Cities</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Every DFW city sets its own permit thresholds, so the fastest way to confirm whether your specific project needs one
              is to check directly with your city&apos;s permit office before you start. Here are the official permit pages for the
              largest cities in the metro:
            </p>
            <div className="mt-4 overflow-hidden rounded-md border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0F1F1D] text-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-black">City</th>
                    <th className="px-4 py-3 font-black">Official Permit Page</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { city: "Dallas", href: "https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/building_inspection_faqs.aspx" },
                    { city: "Fort Worth", href: "https://www.fortworthtexas.gov/departments/development-services/permits/residential-building-permit" },
                    { city: "Plano", href: "https://www.plano.gov/273/Permits" },
                    { city: "Arlington", href: "https://www.arlingtontx.gov/City-Services/Permits" },
                    { city: "Frisco", href: "https://www.friscotexas.gov/1696/Residential-Permits" },
                    { city: "McKinney", href: "https://www.mckinneytexas.org/3350/Home-Repairs-Permit-Information" }
                  ].map((row) => (
                    <tr key={row.city} className="text-slate-300">
                      <td className="px-4 py-3 font-semibold text-white">{row.city}</td>
                      <td className="px-4 py-3">
                        <a href={row.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#4FD1C5] underline">
                          {row.city} permit office
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Permit thresholds and self-service categories change from time to time - confirm current requirements directly with
              your city before starting work, especially for anything beyond a like-for-like fixture swap.
            </p>
          </section>

          <InfoListSection
            kicker="Reality check"
            title="What's realistically a DIY job vs. when to call a licensed plumber"
            intro="The exemption tells you what's legal. It doesn't tell you what's a good idea. Scope and risk matter more than the legal floor."
            items={[
              "Usually fine to DIY: replacing a faucet, toilet, or showerhead; clearing a simple drain clog; replacing a wax ring; installing a new sink",
              "Get a permit first: adding or rerouting supply or drain lines; replacing a water heater; relocating a fixture",
              "Hire a licensed plumber: any gas line or gas appliance connection; sewer line work; whole-house repipes; anything touching the public water or sewer tap",
              "Always hire a licensed plumber: rental or investment properties, and any work you won't personally perform"
            ]}
          />

          <section className="content-section mt-8">
            <div className="section-kicker"><AlertTriangle className="h-4 w-4" aria-hidden="true" /> Why this matters beyond the legal question</div>
            <h2 className="mt-2 text-2xl font-black text-white">The real risk isn&apos;t the fine - it&apos;s what happens later</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Homeowners rarely run into trouble at the moment they do unpermitted work. The problems show up later:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="rounded-md border border-white/10 bg-[#0F1F1D] p-4 leading-6 text-slate-200">
                <strong className="text-white">Insurance claims:</strong> if water damage traces back to unpermitted or improperly
                performed plumbing work, an insurer can deny the claim.
              </li>
              <li className="rounded-md border border-white/10 bg-[#0F1F1D] p-4 leading-6 text-slate-200">
                <strong className="text-white">Selling the home:</strong> a buyer&apos;s inspector can flag unpermitted plumbing
                changes, which can stall or reduce the sale price until the work is brought up to code and permitted after the fact.
              </li>
              <li className="rounded-md border border-white/10 bg-[#0F1F1D] p-4 leading-6 text-slate-200">
                <strong className="text-white">Rework:</strong> uninspected work behind a finished wall or floor may need to be
                opened back up later to verify or correct it.
              </li>
            </ul>
          </section>
        </div>
      </div>

      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "How to Verify a Texas Plumber's License", href: "/blog/how-to-verify-a-texas-plumbers-license" },
          { label: "DFW Emergency Water Shutoff Guide", href: "/assets/dfw-water-shutoff-guide.html" },
          { label: "24-Hour Emergency Plumber", href: "/services/24-hour-emergency-plumber" },
          { label: "Emergency Plumber Dallas", href: "/cities/dallas/24-hour-emergency-plumber" },
          { label: "Emergency Plumber Fort Worth", href: "/cities/fort-worth/24-hour-emergency-plumber" },
          { label: "Free DFW Data Badges (Embeddable)", href: "/tools/dfw-data-badges" }
        ]}
      />
    </main>
  );
}
