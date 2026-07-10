import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { CostFactors, DirectAnswer, FAQBlock, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ guideSlug: string }>;
};

export function generateStaticParams() {
  return costGuides.map((guide) => ({ guideSlug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { guideSlug } = await params;
  const guide = costGuides.find((item) => item.slug === guideSlug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.directAnswer,
    path: `/cost-guides/${guide.slug}`
  });
}

export default async function CostGuidePage({ params }: Props) {
  const { guideSlug } = await params;
  const guide = costGuides.find((item) => item.slug === guideSlug);
  if (!guide) notFound();
  const relatedService = services.find((service) => service.slug === guide.relatedServiceSlug);
  const path = `/cost-guides/${guide.slug}`;
  const faqs = [
    {
      question: "Can this page guarantee a price?",
      answer: "No. Cost depends on the provider, timing, access, parts, and severity. Confirm pricing directly before approving work."
    },
    {
      question: "What should I ask before booking?",
      answer: "Ask about dispatch or diagnostic fees, after-hours pricing, what is included, and whether the provider can explain options before work begins."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, guide.title, guide.directAnswer),
          breadcrumbSchema([{ name: "Cost guides", path }, { name: guide.title, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Cost guides", href: path }, { label: guide.title, href: path }]} />
      <div className="mt-6 answer-grid">
        <article>
          <p className="section-kicker">Cost guide</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">{guide.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">Helpful cost-factor guidance for urgent Dallas-Fort Worth plumbing decisions without fake guaranteed pricing.</p>
          <div className="mt-6">
            <CallButton location={`cost-${guide.slug}-top`} />
          </div>
        </article>
        <LeadForm pageUrl={path} service={relatedService?.name || "Emergency plumbing"} city="Dallas" />
      </div>

      <DirectAnswer>{guide.directAnswer}</DirectAnswer>
      <CostFactors factors={guide.factors} />
      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks extra={relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []} />
    </main>
  );
}
