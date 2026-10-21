import { CallButton } from "@/components/CallButton";
import { FAQBlock, InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Emergency plumbing and drain cleaning FAQ",
  description: truncateForMeta("Answer-ready FAQ hub for urgent plumbing, drain, sewer, and cost questions across Dallas-Fort Worth, covering safety steps and what counts as an emergency."),
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
      <h1 className="mt-3 text-4xl font-black text-white">Emergency plumbing and drain cleaning FAQ</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
        Short answers for urgent homeowner decisions, written with transparent service-area language and clear provider-availability reminders.
      </p>
      <div className="mt-6">
        <CallButton location="faq-top" />
      </div>
      <FAQBlock faqs={emergencyFaqs} title="Emergency plumbing questions" />
      <FAQBlock faqs={universalFaqs} title="Cost, coverage and provider questions" />

      <section className="content-section">
        <p className="section-kicker">Using these answers</p>
        <h2 className="mt-2 text-2xl font-black text-white">When a plumbing problem cannot wait</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Treat it as urgent when water is actively leaking, sewage is coming up through a drain, a toilet will not stop
          running over, or you have no working toilet or no water at all. Shut off the water at the fixture valve or the main
          shutoff if you can do it safely, keep people away from water near electrical outlets, and call. Slow drains, a
          dripping faucet or a toilet that runs now and then can usually wait for a regular appointment.
        </p>
      </section>

      <OfficialSources
        title="Official sources behind these plumbing answers"
        intro="These agencies publish the license records, insurance guidance and leak data our answers are based on."
        links={[sources.tsbpeLookup, sources.tdiWaterDamage, sources.epaLeaks]}
      />

      <InternalLinks />
    </main>
  );
}
