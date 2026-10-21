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

export default function PartnersPage() {
  return (
    <>
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

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Referral Partnership</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Partner with PlumbingHands
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>Work with us to provide reliable emergency plumbing service to homeowners across DFW. We offer mutual visibility and referral exchange for qualified partners.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Who We Partner With</h2>
            <p className="text-slate-300 mb-4">We work with:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li><strong>Restoration companies</strong> – after you've handled the cleanup, send us the plumbing repair.</li>
              <li><strong>Insurance agents & public adjusters</strong> – when your clients need a trusted emergency plumber, we're ready.</li>
              <li><strong>Property managers & HOAs</strong> – we're available 24/7 for your tenants and residents.</li>
              <li><strong>Real estate agents</strong> – a reliable plumbing partner is a great resource to offer your clients.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">How It Works</h2>
            <ol className="list-decimal list-inside text-slate-300 space-y-3">
              <li>You refer a homeowner with an emergency plumbing issue (24‑hour plumber, drain cleaning, sewer backup, etc.).</li>
              <li>We confirm the referral and connect the homeowner with a trusted provider.</li>
              <li>We reciprocate by featuring your business on our partner page and linking to your website.</li>
              <li>We also mention your service in relevant content where appropriate (with your consent).</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Why Partner With Us?</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>We serve all 30 DFW cities – from Dallas to Wylie, we've got coverage.</li>
              <li>We're available 24/7 – your referrals never wait.</li>
              <li>We use verified, licensed providers – your reputation stays safe.</li>
              <li>We're transparent – you get clear reporting on each referral.</li>
            </ul>
          </section>

<section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">What a good referral partnership looks like</h2>
            <p className="text-slate-300 mb-4">
              The best partnerships solve a real problem for the homeowner. A restoration crew dries out a flooded kitchen but
              cannot repair the supply line that failed. An insurance agent gets a call about a ceiling stain and needs a plumber
              to find the leak before a claim can move forward. A property manager has a tenant with a backed-up sewer line on a
              Saturday night. In each case, a fast and clear handoff keeps the homeowner from searching on their own while water
              is still moving.
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Referrals are for real plumbing problems, never bulk lists or cold leads.</li>
              <li>Partner mentions are added only with your consent, and you can ask for changes at any time.</li>
              <li>Homeowners always confirm the provider&apos;s license, price and scope directly before work begins.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Resources you can share with clients</h2>
            <p className="text-slate-300 mb-4">
              Partners often send clients to our free <a href="/tools" className="text-[#F0B429] underline">DFW plumbing calculators and widgets</a>,
              the <a href="/guides/texas-insurance-plumbing-claims" className="text-[#F0B429] underline">Texas plumbing insurance claims guide</a> and
              the <a href="/guides/dfw-burst-pipes" className="text-[#F0B429] underline">burst pipe guide</a>. All of them are free to link to.
            </p>
          </section>

          <OfficialSources
            title="Official resources referral partners can share"
            intro="Point clients to the state license search before any plumber starts work, and to the Texas Department of Insurance for coverage questions."
            links={[sources.tsbpeLookup, sources.tdiWaterDamage]}
          />

          <div className="bg-[#0F1F1D] p-6 rounded-lg border border-[#1A3A38] text-center mt-10">
            <h3 className="text-xl font-semibold text-white mb-2">Ready to Partner?</h3>
            <p className="text-slate-300 mb-4">Call us today or fill out the contact form below to get started.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:17026029015" className="inline-block bg-[#F0B429] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#d49f20] transition">
                Call Now
              </a>
              <a href="/contact" className="inline-block border border-[#F0B429] text-[#F0B429] font-semibold px-6 py-3 rounded-lg hover:bg-[#F0B429] hover:text-black transition">
                Contact Form
              </a>
            </div>
          </div>

          <div className="mt-10">
            <InternalLinks />
          </div>
        </div>
      </div>
    </>
  );
}
