import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer } from "@/components/PageSections";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Request a plumbing provider connection",
  description: "Contact page for Dallas-Fort Worth emergency plumbing and drain cleaning provider connection requests.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="page-shell">
      <JsonLd data={webPageSchema("/contact", "Request a plumbing provider connection", "Contact and lead request page.")} />
      <div className="answer-grid">
        <article>
          <p className="section-kicker">Contact</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">Request a plumbing provider connection</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Share your city, service need, urgency, and phone number. The platform can log the request for routing without exposing private credentials.
          </p>
          <div className="mt-6">
            <CallButton location="contact-top" />
          </div>
          <DirectAnswer>
            For active water, wastewater, or essential fixture problems, call if safe. Forms are useful when you can briefly describe the issue.
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
