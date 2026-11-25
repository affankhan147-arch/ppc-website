import Link from "next/link";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";

export const metadata = buildMetadata({
  title: "Partner with PlumbingHands – Referral Partnership",
  description: truncateForMeta(
    "Become a referral partner with PlumbingHands. We connect DFW homeowners with trusted emergency plumbers. Partners gain visibility and mutual referrals."
  ),
  path: "/partners"
});

const link = "font-bold text-accent underline hover:text-ink";

export default function PartnersPage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(
            "/partners",
            "Partner with PlumbingHands",
            "Become a referral partner with PlumbingHands and gain mutual referrals and visibility."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Partners", path: "/partners" }
          ])
        ]}
      />

      <section className="content-section">
        <h1 className="display-title font-bold text-ink">
          Partner with PlumbingHands
        </h1>

        <div className="mt-5 rounded-card border border-rule border-l-4 border-l-call bg-paper p-5 text-ink-2">
          <p>Work with us to provide reliable emergency plumbing service to homeowners across DFW. We offer mutual visibility and referral exchange for qualified partners.</p>
        </div>
      </section>

      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">Who We Partner With</h2>
        <p className="mt-3 leading-7 text-ink-2">We work with:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink-2">
          <li><strong className="text-ink">Restoration companies</strong>: after you&apos;ve handled the cleanup, send us the plumbing repair.</li>
          <li><strong className="text-ink">Insurance agents &amp; public adjusters</strong>: when your clients need a trusted emergency plumber, we&apos;re ready.</li>
          <li><strong className="text-ink">Property managers &amp; HOAs</strong>: we&apos;re available 24/7 for your tenants and residents.</li>
          <li><strong className="text-ink">Real estate agents</strong>: a reliable plumbing partner is a great resource to offer your clients.</li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">How It Works</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-ink-2">
          <li>You refer a homeowner with an emergency plumbing issue (24‑hour plumber, drain cleaning, sewer backup, etc.).</li>
          <li>We confirm the referral and connect the homeowner with a trusted provider.</li>
          <li>We reciprocate by featuring your business on our partner page and linking to your website.</li>
          <li>We also mention your service in relevant content where appropriate (with your consent).</li>
        </ol>
      </section>

      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">Why Partner With Us?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink-2">
          <li>We serve all 30 DFW cities: from Dallas to Wylie, we&apos;ve got coverage.</li>
          <li>We&apos;re available 24/7: your referrals never wait.</li>
          <li>We use verified, licensed providers: your reputation stays safe.</li>
          <li>We&apos;re transparent: you get clear reporting on each referral.</li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">What a good referral partnership looks like</h2>
        <p className="mt-3 leading-7 text-ink-2">
          The best partnerships solve a real problem for the homeowner. A restoration crew dries out a flooded kitchen but
          cannot repair the supply line that failed. An insurance agent gets a call about a ceiling stain and needs a plumber
          to find the leak before a claim can move forward. A property manager has a tenant with a backed-up sewer line on a
          Saturday night. In each case, a fast and clear handoff keeps the homeowner from searching on their own while water
          is still moving.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink-2">
          <li>Referrals are for real plumbing problems, never bulk lists or cold leads.</li>
          <li>Partner mentions are added only with your consent, and you can ask for changes at any time.</li>
          <li>Homeowners always confirm the provider&apos;s license, price and scope directly before work begins.</li>
        </ul>
      </section>

      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">Resources you can share with clients</h2>
        <p className="mt-3 leading-7 text-ink-2">
          Partners often send clients to our free <Link href="/tools" className={link}>DFW plumbing calculators and widgets</Link>,
          the <Link href="/guides/texas-insurance-plumbing-claims" className={link}>Texas plumbing insurance claims guide</Link> and
          the <Link href="/guides/dfw-burst-pipes" className={link}>burst pipe guide</Link>. All of them are free to link to.
        </p>
      </section>

      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">Referral partner questions</h2>
        <div className="mt-4 space-y-4 text-ink-2">
          <div>
            <h3 className="font-bold text-ink">Does it cost anything to become a referral partner?</h3>
            <p className="mt-1 leading-7">No. There is no fee to refer a homeowner or to be listed. The partnership works because both sides send real customers to each other.</p>
          </div>
          <div>
            <h3 className="font-bold text-ink">What kind of referrals work best?</h3>
            <p className="mt-1 leading-7">Active leaks, sewer backups, burst pipes and failed water heaters, where a homeowner needs a plumber the same day and does not know who to call.</p>
          </div>
          <div>
            <h3 className="font-bold text-ink">Will my business be mentioned on this site?</h3>
            <p className="mt-1 leading-7">Only with your consent. Active partners can be featured on this page with a link to their website, and mentioned in relevant guides where it genuinely helps a homeowner, such as a restoration company in a water damage article.</p>
          </div>
          <div>
            <h3 className="font-bold text-ink">How do I get started?</h3>
            <p className="mt-1 leading-7">Call the number on this page or use the contact form, tell us what your business does and which DFW cities you serve, and we will set up the referral path and your partner mention together.</p>
          </div>
        </div>
      </section>

      <OfficialSources
        title="Official resources referral partners can share"
        intro="Point clients to the state license search before any plumber starts work, and to the Texas Department of Insurance for coverage questions."
        links={[sources.tsbpeLookup, sources.tdiWaterDamage]}
      />

      <section className="content-section">
        <h3 className="font-bold text-ink">Ready to Partner?</h3>
        <p className="mt-2 leading-7 text-ink-2">Call us today or fill out the contact form below to get started.</p>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row">
          <a href="tel:18443978298" className="inline-flex h-12 items-center justify-center rounded-pill bg-call px-6 font-bold text-call-ink">
            Call Now
          </a>
          <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-pill border border-rule px-6 font-bold text-ink hover:border-accent">
            Contact Form
          </Link>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
