import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";

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

          <div className="bg-[#0F1F1D] p-6 rounded-lg border border-[#1A3A38] text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Ready to Partner?</h3>
            <p className="text-slate-300 mb-4">Call us today or fill out the contact form below to get started.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:18443978298" className="inline-block bg-[#F0B429] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#d49f20] transition">
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
