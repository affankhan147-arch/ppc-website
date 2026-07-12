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
      <div className="answer-grid">
        <article>
          <p className="section-kicker">Contact</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">Request urgent plumbing help</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Share your city, service need, urgency, and phone number. Plumbing Hands helps visitors request service from available providers or partners where coverage is available.
          </p>
          <div className="mt-6">
            <CallButton location="contact-top" />
          </div>
          <DirectAnswer>
            For active water, wastewater, or essential fixture problems, call if safe. Forms are useful when you can briefly describe the issue and your location.
          </DirectAnswer>
        </article>
        <LeadForm pageUrl="/contact" service="Emergency plumbing" city="Dallas" />
      </div>
      <section className="content-section">
        <p className="section-kicker">Disclosure</p>
        <p className="mt-2 leading-7 text-slate-700">{siteConfig.disclosure}</p>
      </section>
    </main>
  );
}
