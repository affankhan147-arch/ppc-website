import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DirectAnswer, InternalLinks } from "@/components/PageSections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, articleSchema, breadcrumbSchema, webPageSchema, faqSchema } from "@/lib/schema";
import { CallButton } from "@/components/CallButton";
import { siteConfig } from "@/data/site";
import { AlertTriangle, Clock, ShieldAlert, FileWarning } from "lucide-react";

const path = "/blog/drain-backup-in-a-restaurant-what-owners-should-do-first";
const title = "Drain Backup in a Restaurant: What Owners Should Do First";
const description = "A restaurant drain or grease trap backup is a health-code and business-interruption emergency, not just a maintenance issue. Here is what to do in the first 15 minutes, what DFW cities require for grease traps, and how to tell a grease trap problem from a main sewer line problem.";

const faqs = [
  {
    question: "Can a restaurant stay open during a drain backup?",
    answer: "It depends on which fixtures are affected and whether wastewater has reached food prep, storage, or customer-facing areas. If a health inspector or your local health department would consider the area contaminated, close that section (or the kitchen) until it is cleaned and the backup is resolved - continuing to operate through visible sewage or grease overflow is a health code risk, not a judgment call worth gambling on."
  },
  {
    question: "How often does a grease trap need to be cleaned in Dallas-Fort Worth?",
    answer: "Dallas requires grease traps to be fully emptied and cleaned by a licensed hauler at least every 90 days, or sooner if grease and solids reach 25% of the trap's capacity - whichever comes first. Fort Worth follows a similar interval and also requires permits, inspections, and a minimum trap size (roughly 500 to 750 gallons depending on the establishment) at installation. Arlington sizes grease traps based on fixture count rather than a flat minimum. Check with your specific city's water utilities or pretreatment program for the exact current rule, since intervals and paperwork requirements can vary by city and change over time."
  },
  {
    question: "What happens if a restaurant's grease trap backup reaches the sewer system?",
    answer: "Grease that escapes a trap and hardens inside city sewer lines is a leading cause of sanitary sewer overflows (SSOs), and DFW-area cities can issue fines - sometimes into the thousands of dollars - to the business responsible, on top of the cost of cleanup and any repair to your own plumbing. Maintenance records are also typically required to be kept on file (five years in both Dallas and Fort Worth), so a poorly documented trap can turn a single backup into a compliance problem during your next inspection."
  },
  {
    question: "Is a kitchen drain backup a plumber problem or a grease trap service problem?",
    answer: "It can be either, and the fix is different. A grease trap that is simply full needs pumping by a licensed liquid waste hauler, not a plumber. A backup caused by a cracked or misaligned trap, a blocked line between the kitchen and the trap, or a restriction further downstream in your main line is a plumbing problem. If pumping the trap does not resolve a slow or backed-up drain, or if the backup keeps recurring shortly after a routine cleaning, that points toward a line or grade issue that a plumber needs to diagnose, not a grease volume issue."
  },
  {
    question: "Do enzyme or chemical drain treatments work instead of pumping a grease trap?",
    answer: "No - Fort Worth and Dallas both note that enzyme or chemical treatments are not an acceptable substitute for physically pumping and cleaning a grease trap under their code requirements, and relying on them can let a trap go over capacity without an obvious warning sign until a backup happens."
  },
  {
    question: "Will my business insurance cover a restaurant drain backup?",
    answer: "Many commercial property policies cover sudden water or sewage backup damage under a specific backup/overflow endorsement, but this is often an add-on rather than standard coverage, and policies frequently exclude damage caused by a lack of maintenance (like a neglected grease trap). Review your policy's sewer/drain backup endorsement and maintenance-exclusion language directly with your insurance agent before you assume a backup is covered."
  }
];

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function DrainBackupRestaurantPage() {
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
        { label: "Restaurant Drain Backup", href: path }
      ]} />

      <DirectAnswer>
        <p>
          A restaurant drain backup should be treated as urgent given health code, food safety, and service disruption risk. In the first few minutes: stop using any affected fixture (sink, floor drain, dishwasher, or toilet), keep staff and customers away from the area, document what you see with photos, and request a commercial emergency plumbing connection with details about which lines are affected and whether the backup involves the grease trap or a main line.
        </p>
      </DirectAnswer>

      <section className="content-section mt-8">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/blog/restaurant-grease-trap-drain-backup-diagram.svg"
            alt="Diagram of a commercial kitchen grease trap between the kitchen drain line and the sewer cleanout"
            width={640}
            height={360}
            className="w-full"
          />
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">The First 15 Minutes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-slate-700 mt-0.5" />
              <div>
                <h3 className="font-semibold">Stop using affected fixtures</h3>
                <p className="text-sm text-slate-700">Every sink, floor drain, or dishwasher run adds more water to a line that is already backing up, and can push contaminated water further into the kitchen.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-slate-700 mt-0.5" />
              <div>
                <h3 className="font-semibold">Keep the area clear</h3>
                <p className="text-sm text-slate-700">Block off the affected section from staff and customers. Wastewater backup - especially anything touching a floor drain tied to the sewer side - is a contamination risk, not just a mess.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <div className="flex items-start gap-3">
              <FileWarning className="h-5 w-5 text-slate-700 mt-0.5" />
              <div>
                <h3 className="font-semibold">Document before cleanup starts</h3>
                <p className="text-sm text-slate-700">Photos and a short written timeline (when it started, which fixtures, how far it spread) help with insurance, an inspector's questions, and giving a provider accurate information before dispatch.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-slate-700 mt-0.5" />
              <div>
                <h3 className="font-semibold">Decide if you need to close a section</h3>
                <p className="text-sm text-slate-700">If wastewater has reached food prep, storage, or a customer-facing area, that section should close until it is cleaned and the cause is resolved - this is a health code call, not just an operations one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Why Restaurant Drains Back Up Differently Than Home Drains</h2>
        <p className="mt-2">
          A home kitchen sink backup is usually a single clogged trap or branch line. A restaurant kitchen runs through a grease trap (also called a grease interceptor) first - a dedicated container that is supposed to let fats, oils, and grease (often shortened to FOG in city code documents) cool, separate, and stay out of the sewer line, while wastewater continues on to the main sewer connection. When a restaurant backs up, the cause is more often one of three things: the grease trap itself is full or near capacity, grease has hardened somewhere in the line between the kitchen and the trap, or - less commonly but more seriously - the main line past the trap has its own blockage or damage.
        </p>
        <p className="mt-2">
          That distinction matters because the fix is different. A full trap needs pumping by a licensed liquid waste hauler. A blocked line or a trap that is cracked, undersized, or installed at the wrong grade needs a plumber. Treating a recurring backup as "just needs pumping" when the real problem is a line issue means paying for cleanings that never actually fix the problem.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">DFW City Grease Trap Requirements (What We Could Verify)</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">Dallas</h3>
            <p className="mt-1">Any commercial or institutional food service operation is required to have a grease trap. Dallas Water Utilities requires it to be fully emptied and cleaned by a licensed hauler at least every 90 days, or sooner if grease and sediment reach 25% of capacity, whichever comes first. Waste must go to a hauler licensed by both the Texas Commission on Environmental Quality (TCEQ) and Dallas Water Utilities.</p>
          </div>
          <div>
            <h3 className="font-semibold">Fort Worth</h3>
            <p className="mt-1">Follows a similar 90-day (or 25% capacity) cleaning interval, and additionally requires a permit, inspection, and a minimum trap size - roughly 500 to 750 gallons depending on the type of establishment - at installation. Maintenance records must be kept on file for five years.</p>
          </div>
          <div>
            <h3 className="font-semibold">Arlington</h3>
            <p className="mt-1">Sizes grease trap requirements based on the number and type of plumbing fixtures connected, and may require an undersized existing trap to be replaced. Neglected traps that contribute to a sanitary sewer overflow can carry city fines described as reaching into the thousands of dollars, on top of cleanup costs.</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          City ordinances change, and exact intervals, sizing tables, and fine amounts vary by city and over time - confirm current requirements directly with your city's water utilities or pretreatment program before relying on any specific number here.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Grease Trap Backup vs. Main Sewer Line Backup: How to Tell</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
            <h3 className="font-semibold text-orange-800">Points to a grease trap issue</h3>
            <ul className="mt-2 list-disc ml-5 space-y-1 text-sm text-orange-800">
              <li>Backup is limited to kitchen fixtures upstream of the trap</li>
              <li>Slow draining has been getting worse over days or weeks</li>
              <li>It has been longer than 90 days (or your city&apos;s interval) since the trap was last pumped</li>
              <li>Strong grease or sewer-gas odor near the trap access lid</li>
            </ul>
          </div>
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <h3 className="font-semibold text-red-800">Points to a line or main sewer issue</h3>
            <ul className="mt-2 list-disc ml-5 space-y-1 text-sm text-red-800">
              <li>Backup happened suddenly, not gradually</li>
              <li>Non-kitchen fixtures (restroom, floor drains elsewhere) are affected too</li>
              <li>The trap was recently pumped and the backup happened anyway</li>
              <li>Backup recurs again within days or weeks of a cleaning</li>
            </ul>
          </div>
        </div>
        <p className="mt-3">
          When it is unclear which side of the trap the problem is on, that is itself useful information to give a provider when you request emergency service - it helps them bring the right equipment (a camera inspection can usually confirm the cause) instead of guessing on-site.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Plumber, Grease Hauler, or Restoration Company First?</h2>
        <p className="mt-2">
          For a straightforward full trap, call your licensed grease hauler. For anything involving a suspected line blockage, damaged trap, or backup that a routine pumping did not fix, that is a plumbing call. If wastewater has already spread onto flooring, into walls, or under equipment, the plumbing side generally needs to be controlled first - stopping the source and clearing the line - before a water-restoration company can safely dry the space and check for hidden moisture. See our guide on <Link href="/blog/plumber-or-water-restoration-company-first" className="text-teal-700 underline">who to call first after a leak or backup</Link> for more on that sequencing.
        </p>
      </section>

      <section className="content-section mt-8">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
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
        <h2 className="text-2xl font-bold text-white">Requesting Commercial Emergency Plumbing</h2>
        <p className="mt-2">
          When you request help, have the affected fixtures, how long the backup has been happening, and your last known grease trap cleaning date ready - it helps a provider triage whether this looks like a trap, line, or main sewer issue before they arrive.
        </p>
        <div className="mt-4">
          <CallButton location="blog-restaurant-drain-backup-bottom" label="Request Commercial Emergency Plumbing" pagePath={path} pageType="blog" service="commercial-emergency-plumbing" city={siteConfig.marketName} />
        </div>
      </section>

      <InternalLinks extra={[
        { label: "Commercial Emergency Plumbing", href: "/services/commercial-emergency-plumbing" },
        { label: "Emergency Drain Cleaning", href: "/services/emergency-drain-cleaning" },
        { label: "Main Sewer Line Clog", href: "/services/main-sewer-line-clog" },
        { label: "Plumber or Restoration Company First?", href: "/blog/plumber-or-water-restoration-company-first" },
      ]} />
    </>
  );
}
