import Image from "next/image";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DirectAnswer, InternalLinks } from "@/components/PageSections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { CallButton } from "@/components/CallButton";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";
import { AlertTriangle, Info, Shield, CheckCircle, XCircle } from "lucide-react";

const path = "/blog/how-to-verify-a-texas-plumbers-license";
const title = "How to Verify a Texas Plumber’s License";
const description = "Step-by-step guide to using the Texas State Board of Plumbing Examiners license search tool, plus what results mean and red flags to watch for.";

export const metadata: Metadata = buildMetadata({ title, description, path });

const faqs = [
  {
    question: "Is it illegal to hire an unlicensed plumber in Texas?",
    answer:
      "Yes - with one narrow exception: the Texas Occupations Code allows a homeowner to perform their own plumbing work on their own occupied primary residence (DIY). That exemption does not extend to hiring someone else to do the work for you. If you hire an unlicensed individual to perform plumbing work - even on your own home - you are not covered by the homeowner exemption, and that person is operating illegally. In addition, hiring an unlicensed plumber for any rental property, commercial building, or gas/utility work is explicitly forbidden and can result in fines and liability."
  },
  {
    question: "What happens if a plumber doesn't have insurance?",
    answer:
      "Without liability insurance, you are personally responsible for any property damage, injuries, or code violations that occur during the work. That could cost you far more than the original repair."
  },
  {
    question: "How often do plumber licenses expire?",
    answer:
      "Texas plumber licenses have a fixed expiration date printed on the license and shown in the TSBPE search results. Renewal periods are established by the Texas State Board of Plumbing Examiners. To be certain, always check the license's expiration date directly in the search result - that is the authoritative source."
  },
  {
    question: "Can I verify a plumber's license by phone?",
    answer:
      "Yes. The TSBPE provides a phone number for license verification: (512) 936-5200. However, the online search is faster and gives you immediate access to all details."
  },
  {
    question: "What does \"Apprentice\" mean?",
    answer:
      "An apprentice is a trainee working under a licensed plumber. They may not work independently; a Master or Journeyman plumber must supervise them. If the person arriving at your door is an apprentice, ask who will be supervising them."
  },
  {
    question: "Does the TSBPE search show if a plumber has been sued?",
    answer:
      "It does not show civil lawsuits, but it does list disciplinary actions taken by the board. For legal disputes, you may need to check public court records separately."
  },
  {
    question: "Is a Texas plumber's license verified through TDLR or TSBPE?",
    answer:
      "TSBPE. The Texas Department of Licensing and Regulation (TDLR) oversees many other Texas trades and occupations, but plumbing is regulated separately by the Texas State Board of Plumbing Examiners (TSBPE). If you search \"TDLR plumbing license lookup,\" you won't find plumber records there - use the TSBPE search tool linked above instead."
  },
  {
    question: "How do I look up a Master Plumber or Journeyman plumber's license specifically?",
    answer:
      "Use the same TSBPE Public License Search tool linked above - the rank (Master Plumber, Journeyman Plumber, Tradesman Plumber-Limited, or Apprentice) is shown directly in the search results, so there's no separate search for each rank. If you already have a license number, searching by number is the fastest way to confirm both the rank and current status in a single step."
  },
  {
    question: "I only have a plumber's license number, not their name - can I still search?",
    answer:
      "Yes. Select \"Search by License Number\" instead of \"Search by Name\" on the TSBPE portal - the TSBPE recommends this option because it's more precise and avoids mix-ups when multiple plumbers share a similar name."
  }
];

export default function LicenseVerificationPage() {
  return (
    <>
      <JsonLd data={[
        webPageSchema(path, title, description),
        articleSchema(path, title, description),
        breadcrumbSchema([
          { name: "Guides", path: "/blog" },
          { name: title, path }
        ]),
        faqSchema(faqs)
      ]} />
      <Breadcrumbs items={[
        { label: "Guides", href: "/blog" },
        { label: "Verify a Texas Plumber's License", href: path }
      ]} />
      <div className="photo-frame relative mt-6 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
        <Image
          src={getArticleImage("24-hour-emergency-plumber", 1)}
          alt="Licensed Texas plumber's badge and paperwork being reviewed before a job"
          fill
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <DirectAnswer>
        <p>
          To verify a Texas plumber's license:
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Go to the TSBPE Public License Search: <a href="https://vo.licensing.hpc.texas.gov/datamart/selSearchType.do" target="_blank" rel="noopener noreferrer">vo.licensing.hpc.texas.gov/datamart/selSearchType.do</a> (or visit <a href="https://tsbpe.texas.gov" target="_blank" rel="noopener noreferrer">tsbpe.texas.gov</a> and click "Find a license/registration").</li>
            <li>Choose <strong>"Search by Name"</strong> or <strong>"Search by License Number"</strong> - License Number is more precise.</li>
            <li>Select <strong>"Texas State Board of Plumbing Examiners"</strong> from the Board dropdown, then <strong>"Plumbing - Licensed or Registered"</strong>.</li>
            <li>Review the results: active status, expiration date, insurance (COI), endorsements, and any disciplinary history.</li>
          </ol>
        </p>
      </DirectAnswer>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Step-by-Step Search Process</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">1. Open the search portal</h3>
            <p>Direct link: <a href="https://vo.licensing.hpc.texas.gov/datamart/selSearchType.do" target="_blank" rel="noopener noreferrer">vo.licensing.hpc.texas.gov/datamart/selSearchType.do</a>. The TSBPE homepage (<a href="https://tsbpe.texas.gov" target="_blank" rel="noopener noreferrer">tsbpe.texas.gov</a>) also has a prominent "Find a license/registration" link.</p>
          </div>
          <div>
            <h3 className="font-semibold">2. Choose your search type</h3>
            <p>You have two options:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Search by Name</strong> - Enter last name and first name (or partial). Useful if you don't have the license number handy.</li>
              <li><strong>Search by License Number</strong> - The TSBPE recommends this for the most precise match.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">3. Select the correct Board and License Type</h3>
            <p>In the "Board" dropdown, choose <strong>"Texas State Board of Plumbing Examiners"</strong>. Then select <strong>"Plumbing - Licensed or Registered"</strong> from the license type dropdown.</p>
          </div>
          <div>
            <h3 className="font-semibold">4. Review the results</h3>
            <p>A table will appear listing all matching records. Click on a name to view the full license details.</p>
          </div>
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">What the Results Mean</h2>
        <div className="mt-4 space-y-3">
          <div>
            <h3 className="font-semibold">License Status</h3>
            <p>Look for <strong>"Active"</strong>. If "Expired", "Inactive", or "Suspended", the plumber is not currently authorized to practice.</p>
          </div>
          <div>
            <h3 className="font-semibold">Expiration Date</h3>
            <p>The date shown is the license's current expiry. <strong>Always check this date</strong> - if it has passed, the license is invalid, regardless of how recently the plumber may claim to have renewed.</p>
          </div>
          <div>
            <h3 className="font-semibold">Certificate of Insurance (COI)</h3>
            <p>Shows whether the plumber carries liability insurance and when it expires. A valid COI is critical for coverage in case of property damage or injury.</p>
          </div>
          <div>
            <h3 className="font-semibold">Rank / License Type</h3>
            <p>Texas plumbing licenses are ranked:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Master Plumber</strong> - Highest level; can perform any plumbing work and supervise others.</li>
              <li><strong>Journeyman Plumber</strong> - Works under a Master Plumber; can perform most plumbing tasks independently.</li>
              <li><strong>Tradesman Plumber-Limited</strong> - Specialized scope (e.g., limited to repair work).</li>
              <li><strong>Apprentice</strong> - Trainee working under a licensed plumber; must be supervised.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Effective Rank Date</h3>
            <p>When the current rank was earned.</p>
          </div>
          <div>
            <h3 className="font-semibold">Endorsements</h3>
            <p>Additional certifications (e.g., medical gas, fire sprinkler).</p>
          </div>
          <div>
            <h3 className="font-semibold">Disciplinary History</h3>
            <p>Any past complaints, fines, or enforcement actions are listed here. You can download the full disciplinary documents if available.</p>
          </div>
          <div>
            <h3 className="font-semibold">Continuing Education (CE) History</h3>
            <p>Shows whether the plumber has met Texas's required CE hours.</p>
          </div>
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Homeowner Exemption (Texas Occupations Code)</h2>
        <p className="mt-2">You may see plumbers advertise that they can do work without a license under a "homeowner exemption". However, the Texas Occupations Code allows <strong>unlicensed DIY work only on your own occupied primary residence</strong>. This exemption does <strong>not</strong> apply to rental properties, commercial buildings, or homes you do not personally occupy. If you hire someone claiming exemption for a non-eligible property, you could be held liable for code violations or unsafe work.</p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Red Flags to Watch For</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">No license or "Inactive"</h3>
                <p className="text-sm text-red-700">Do not hire. Unlicensed work may void insurance claims and lead to fines.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800">No active COI</h3>
                <p className="text-sm text-orange-700">If the plumber can't provide proof of liability insurance, you assume all financial risk.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Disciplinary history</h3>
                <p className="text-sm text-yellow-700">Multiple complaints or unresolved actions are a serious warning.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-800">Unusual payment demands</h3>
                <p className="text-sm text-purple-700">Requests for 100% upfront payment are a common red flag.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold">Is it illegal to hire an unlicensed plumber in Texas?</h3>
            <p className="mt-1">Yes - with one narrow exception: the Texas Occupations Code allows a homeowner to perform their <strong>own</strong> plumbing work on their <strong>own occupied primary residence</strong> (DIY). That exemption <strong>does not</strong> extend to hiring someone else to do the work for you. If you hire an unlicensed individual to perform plumbing work - even on your own home - you are not covered by the homeowner exemption, and that person is operating illegally. In addition, hiring an unlicensed plumber for any rental property, commercial building, or gas/utility work is explicitly forbidden and can result in fines and liability.</p>
          </div>
          <div>
            <h3 className="font-semibold">What happens if a plumber doesn't have insurance?</h3>
            <p className="mt-1">Without liability insurance, you are personally responsible for any property damage, injuries, or code violations that occur during the work. That could cost you far more than the original repair.</p>
          </div>
          <div>
            <h3 className="font-semibold">How often do plumber licenses expire?</h3>
            <p className="mt-1">Texas plumber licenses have a fixed expiration date printed on the license and shown in the TSBPE search results. Renewal periods are established by the Texas State Board of Plumbing Examiners. To be certain, always check the license's expiration date directly in the search result - that is the authoritative source.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I verify a plumber's license by phone?</h3>
            <p className="mt-1">Yes. The TSBPE provides a phone number for license verification: (512) 936-5200. However, the online search is faster and gives you immediate access to all details.</p>
          </div>
          <div>
            <h3 className="font-semibold">What does "Apprentice" mean?</h3>
            <p className="mt-1">An apprentice is a trainee working under a licensed plumber. They may not work independently; a Master or Journeyman plumber must supervise them. If the person arriving at your door is an apprentice, ask who will be supervising them.</p>
          </div>
          <div>
            <h3 className="font-semibold">Does the TSBPE search show if a plumber has been sued?</h3>
            <p className="mt-1">It does not show civil lawsuits, but it does list <strong>disciplinary actions</strong> taken by the board. For legal disputes, you may need to check public court records separately.</p>
          </div>
          <div>
            <h3 className="font-semibold">Is a Texas plumber's license verified through TDLR or TSBPE?</h3>
            <p className="mt-1"><strong>TSBPE.</strong> The Texas Department of Licensing and Regulation (TDLR) oversees many other Texas trades and occupations, but plumbing is regulated separately by the Texas State Board of Plumbing Examiners (TSBPE). If you search "TDLR plumbing license lookup," you won't find plumber records there - use the TSBPE search tool linked above instead.</p>
          </div>
          <div>
            <h3 className="font-semibold">How do I look up a Master Plumber or Journeyman plumber's license specifically?</h3>
            <p className="mt-1">Use the same TSBPE Public License Search tool linked above - the rank (<strong>Master Plumber</strong>, <strong>Journeyman Plumber</strong>, <strong>Tradesman Plumber-Limited</strong>, or <strong>Apprentice</strong>) is shown directly in the search results, so there's no separate search for each rank. If you already have a license number, searching by number is the fastest way to confirm both the rank and current status in a single step.</p>
          </div>
          <div>
            <h3 className="font-semibold">I only have a plumber's license number, not their name - can I still search?</h3>
            <p className="mt-1">Yes. Select <strong>"Search by License Number"</strong> instead of "Search by Name" on the TSBPE portal - the TSBPE recommends this option because it's more precise and avoids mix-ups when multiple plumbers share a similar name.</p>
          </div>
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Next Steps for Hiring</h2>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Always verify the plumber's license and COI before signing any contract.</li>
          <li>Get at least two written estimates for major work.</li>
          <li>Ask for references and check online reviews (but keep in mind that the TSBPE record is the authoritative source of professional standing).</li>
        </ul>
        <div className="mt-4">
          <CallButton location="blog-license-verification-bottom" label="Call a Licensed Emergency Plumber" pagePath={path} pageType="blog" service="emergency-plumber" city={siteConfig.marketName} />
        </div>
      </section>

      <InternalLinks extra={[
        { label: "24-Hour Emergency Plumber", href: "/services/24-hour-emergency-plumber" },
        { label: "Emergency Plumber Dallas", href: "/cities/dallas/24-hour-emergency-plumber" },
        { label: "Emergency Plumber Fort Worth", href: "/cities/fort-worth/24-hour-emergency-plumber" },
        { label: "Emergency Plumber Plano", href: "/cities/plano/24-hour-emergency-plumber" },
      ]} />
    </>
  );
}