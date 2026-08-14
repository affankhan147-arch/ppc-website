import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DirectAnswer, InternalLinks } from "@/components/PageSections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, articleSchema, breadcrumbSchema, webPageSchema, faqSchema } from "@/lib/schema";
import { CallButton } from "@/components/CallButton";
import { siteConfig } from "@/data/site";
import { CheckCircle2, XCircle, FileClock, ShieldQuestion } from "lucide-react";

const path = "/blog/does-homeowners-insurance-cover-a-plumbing-leak-in-texas";
const title = "Does Homeowners Insurance Cover a Plumbing Leak in Texas?";
const description = "Texas homeowners insurance generally covers sudden, accidental water damage from a burst pipe, but excludes gradual leaks, the pipe repair itself, and often foundation movement - here is what's typically covered, what isn't, and how to document a claim.";

const faqs = [
  {
    question: "Does homeowners insurance pay to repair the pipe that leaked?",
    answer: "Usually not. Most Texas homeowners policies cover the resulting water damage to your structure and belongings from a sudden, accidental pipe failure, but the cost of repairing or replacing the pipe itself is typically treated as a maintenance expense and excluded - even when the water damage claim is approved."
  },
  {
    question: "Are slab leaks covered in North Texas?",
    answer: "Partially, and this is a real gap worth knowing about before you file. Insurers generally cover slab tear-out and replacement needed to access a leaking pipe, but most North Texas policies specifically exclude damage caused by foundation or soil movement - and DFW's expansive clay soil makes it genuinely hard to prove whether a slab leak was caused by a pipe defect (more likely covered) or soil movement stressing the pipe (more likely excluded). A licensed plumber's diagnostic report documenting the cause strengthens your case either way."
  },
  {
    question: "Is sewer or drain backup covered by standard homeowners insurance?",
    answer: "No, not under a standard policy. Sewer and drain backup coverage is typically a separate, optional endorsement you have to add - if you haven't specifically purchased water/sewer backup coverage, a backup is likely not covered even though it can cause similar damage to a burst pipe."
  },
  {
    question: "Does Texas homeowners insurance cover mold from a plumbing leak?",
    answer: "It depends on the policy, and coverage is often limited even when it exists. Most Texas homeowners carry an HO-A policy that only covers water damage from a leak that was sudden and accidental, not from continuous or repeated leakage - and even policies that do cover mold remediation generally cap that coverage at a set dollar amount rather than paying it in full. Ask your insurer directly what your specific mold sublimit is before assuming it's covered."
  },
  {
    question: "How long does an insurer have to investigate a water damage claim in Texas?",
    answer: "Texas requires insurers to begin investigating a written claim within 15 days of receiving it, and then to accept or reject the claim within another 15 days of getting the information they need to decide. If your insurer is taking longer than that without explanation, that's worth raising directly with them or with the Texas Department of Insurance."
  },
  {
    question: "Can filing a water damage claim make my home harder to insure later?",
    answer: "It can. Water and mold damage claims get recorded in the CLUE (Comprehensive Loss Underwriting Exchange) database, which future insurers - and sometimes buyers - can see. A claims history can affect your future premiums or a buyer's ability to get coverage, which is worth factoring in for smaller leaks where you're weighing whether to file at all versus pay out of pocket."
  }
];

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function InsuranceCoveragePage() {
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
        { label: "Insurance & Plumbing Leaks", href: path }
      ]} />

      <DirectAnswer>
        <p>
          Texas homeowners insurance generally covers water damage from a sudden, accidental plumbing failure like a burst pipe, but typically excludes gradual leaks, wear-and-tear, and standard sewer backups. Even on an approved claim, the policy usually covers the resulting water damage - not the cost to repair the pipe itself. This article is general information, not insurance advice; always confirm your specific policy's language with your insurer or agent before you rely on it.
        </p>
      </DirectAnswer>

      <section className="content-section mt-8">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/blog/texas-homeowners-insurance-plumbing-leak-coverage-diagram.svg"
            alt="Diagram contrasting a covered sudden burst pipe with a typically excluded gradual leak"
            width={640}
            height={360}
            className="w-full"
          />
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">What's Typically Covered vs. Excluded</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Usually covered</h3>
                <ul className="mt-2 list-disc ml-5 space-y-1 text-sm text-green-800">
                  <li>Structural damage from a sudden, accidental burst pipe or overflow</li>
                  <li>Damaged flooring, drywall, cabinetry, and belongings from that sudden event</li>
                  <li>Slab tear-out and replacement needed to access a leaking pipe</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-700 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">Usually excluded</h3>
                <ul className="mt-2 list-disc ml-5 space-y-1 text-sm text-red-800">
                  <li>Repairing or replacing the pipe itself (treated as maintenance)</li>
                  <li>Gradual leaks, seepage, or damage that built up over weeks or months</li>
                  <li>Sewer or drain backup, unless you added that specific endorsement</li>
                  <li>Foundation or soil movement damage (common exclusion in North Texas policies)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">The "Sudden and Accidental" Rule</h2>
        <p className="mt-2">
          Almost every coverage decision comes back to this one distinction. A pipe that bursts and floods a room in minutes is sudden and accidental - that's the scenario homeowners insurance is built for. A pipe that has been weeping slowly behind a wall for months, showing up only as a gradually rising water bill or a faint musty smell, is treated as a maintenance failure the homeowner should have caught, not a covered loss. If you notice a sudden spike in your water bill, that's actually a useful data point for a claim - it helps establish that the leak has a specific, recent onset rather than being long-term.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Slab Leaks and DFW's Clay Soil</h2>
        <p className="mt-2">
          North Texas sits on expansive clay soil that shifts as it absorbs and loses moisture, and that movement is a well-documented contributor to slab leaks in the region. That creates a genuine gray area for insurance purposes: insurers generally exclude damage caused by soil or foundation movement, but they generally do cover a straightforward pipe defect. The trouble is telling the two apart after the fact. A licensed plumber's diagnostic report - ideally including how and where the pipe failed - is the strongest piece of documentation you can bring to that conversation with your insurer. See our guide on <Link href="/blog/slab-leak-warning-signs-dallas-fort-worth-homeowners" className="text-teal-700 underline">slab leak warning signs DFW homeowners should know</Link> for what to watch for before it becomes a claim at all.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Mold Coverage Is Often Capped, Not Excluded Outright</h2>
        <p className="mt-2">
          Most Texas homeowners carry an HO-A policy, which only covers water damage from a leak that was sudden and accidental - the same rule as above applies to any resulting mold. Even when a policy does cover mold remediation, that coverage is typically capped at a set dollar amount rather than paid in full, so a bigger mold problem following a covered leak can still leave you with real out-of-pocket cost. Ask your insurer for your policy's specific mold sublimit rather than assuming a "covered" leak means unlimited mold coverage too.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Duty to Maintain the Property</h2>
        <p className="mt-2">
          Insurers can deny or reduce a claim if the damage resulted from a homeowner ignoring an obvious, ongoing problem - leaving heat off during a hard freeze and letting pipes burst, or continuing to use a fixture after noticing a slow leak or pressure drop, are common examples. Keeping your thermostat at a reasonable minimum during freeze warnings and addressing warning signs (dropping water pressure, an unexplained bill spike, visible moisture) promptly is both good practice and part of what an insurer expects before they'll treat a loss as sudden and accidental rather than neglected.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Claim Timeline and Your Rights in Texas</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <div className="flex items-start gap-3">
              <FileClock className="h-5 w-5 text-slate-700 mt-0.5" />
              <div>
                <h3 className="font-semibold">15 + 15 day rule</h3>
                <p className="text-sm text-slate-700">Texas requires insurers to begin investigating a written claim within 15 days of receiving it, then accept or reject it within another 15 days once they have what they need to decide.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <div className="flex items-start gap-3">
              <ShieldQuestion className="h-5 w-5 text-slate-700 mt-0.5" />
              <div>
                <h3 className="font-semibold">The CLUE database</h3>
                <p className="text-sm text-slate-700">Water and mold claims are recorded in the CLUE database, visible to future insurers (and sometimes buyers), which can affect future premiums - worth weighing for a small leak where paying out of pocket is an option.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Strengthening a Claim</h2>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Act quickly once you notice the leak - delay can itself be used to argue the damage was not sudden</li>
          <li>Photograph the damage, the source if visible, and any water bill spike before cleanup starts</li>
          <li>Get a licensed plumber's diagnostic report identifying the cause and approximate onset of the failure</li>
          <li>Keep receipts for any emergency mitigation steps you take (most policies require you to take reasonable steps to prevent further damage)</li>
        </ul>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section mt-8">
        <p className="text-sm text-slate-600">
          This page provides general information, not insurance or legal advice. Coverage details vary by insurer, policy form, and endorsements - always confirm your specific coverage directly with your insurance agent or company before making decisions based on this guide.
        </p>
        <div className="mt-4">
          <CallButton location="blog-insurance-coverage-bottom" label="Request an Emergency Plumbing Connection" pagePath={path} pageType="blog" service="burst-pipe-emergency" city={siteConfig.marketName} />
        </div>
      </section>

      <InternalLinks extra={[
        { label: "Burst Pipe Emergency", href: "/services/burst-pipe-emergency" },
        { label: "Slab Leak Warning Signs DFW", href: "/blog/slab-leak-warning-signs-dallas-fort-worth-homeowners" },
        { label: "Water Heater Emergency", href: "/services/water-heater-emergency" },
        { label: "Emergency Plumbing Cost Guide DFW", href: "/cost-guides/emergency-plumbing-cost-dfw" },
      ]} />
    </>
  );
}
