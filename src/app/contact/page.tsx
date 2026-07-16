import { PhoneCall, ShieldCheck } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer } from "@/components/PageSections";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Request urgent plumbing help",
  description: "Contact page for Dallas-Fort Worth emergency plumbing and drain cleaning service requests.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema("/contact", "Request urgent plumbing help", "Contact and service request page."),
          breadcrumbSchema([{ name: "Contact", path: "/contact" }])
        ]}
      />

      <section className="content-section premium-trust-section overflow-hidden">
        <div className="answer-grid items-start">
          <article>
            <p className="section-kicker">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Emergency request line
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Request urgent plumbing help</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
              Call to explain your city, plumbing problem, and urgency. {siteConfig.serviceStatement}
            </p>
            <div className="mt-6">
              <CallButton
                location="contact-top"
                label={`Call ${siteConfig.phoneDisplay}`}
                pagePath="/contact"
                pageType="contact"
                service="Emergency plumbing"
                city="Dallas-Fort Worth"
                className="min-h-14 px-6 text-lg"
              />
            </div>
            <div className="mt-6">
              <DirectAnswer>
                For active water, wastewater, or essential fixture problems, call when it is safe. Be ready to describe the affected fixture, current water conditions, and your location.
              </DirectAnswer>
            </div>
            <p className="mt-5 flex items-start gap-2 text-sm font-bold leading-6 text-slate-600">
              <PhoneCall className="mt-1 h-4 w-4 flex-none text-orange-700" aria-hidden="true" />
              Availability depends on location, timing, and provider coverage. Confirm pricing, credentials, timing, and repair scope directly before authorizing work.
            </p>
          </article>
          <LeadForm pageUrl="/contact" service="emergency plumbing" city={siteConfig.marketName} />
        </div>
      </section>
    </main>
  );
}
