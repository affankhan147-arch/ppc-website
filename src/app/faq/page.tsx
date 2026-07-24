import { CallButton } from "@/components/CallButton";
import { FAQBlock, InternalLinks } from "@/components/PageSections";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Emergency plumbing and drain cleaning FAQ",
  description: truncateForMeta("Answer-ready FAQ hub for urgent plumbing, drain, sewer, cost, and provider connection questions across Dallas-Fort Worth, covering safety steps and what counts as an emergency."),
  path: "/faq"
});

export default function FAQPage() {
  const faqs = [...emergencyFaqs, ...universalFaqs];

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema("/faq", "Emergency plumbing FAQ", "Urgent plumbing answers for Dallas-Fort Worth users."),
          breadcrumbSchema([{ name: "FAQ", path: "/faq" }]),
          faqSchema(faqs)
        ]}
      />
      <p className="section-kicker">Answer engine hub</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">Emergency plumbing and drain cleaning FAQ</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
        Short answers for urgent homeowner decisions, written with transparent service-area language and clear provider-availability reminders.
      </p>
      <div className="mt-6">
        <CallButton location="faq-top" />
      </div>
      <FAQBlock faqs={faqs} />
      <InternalLinks />
    </main>
  );
}
