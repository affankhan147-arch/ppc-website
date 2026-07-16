import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { CostFactors, DirectAnswer, EnhancementSections, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { costGuideEnhancements, costGuideFaqEnhancements } from "@/data/pageEnhancements";
import { problems } from "@/data/problems";
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
  const relatedProblems = guide.relatedProblemSlugs
    .map((slug) => problems.find((problem) => problem.slug === slug))
    .filter((problem): problem is (typeof problems)[number] => Boolean(problem));
  const path = `/cost-guides/${guide.slug}`;
  const enhancement = costGuideEnhancements[guide.slug];
  const faqs = [
    ...(enhancement?.extraFaqs || []),
    ...(costGuideFaqEnhancements[guide.slug] || []),
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
          <p className="mt-4 text-lg leading-8 text-slate-700">Helpful cost-factor guidance for urgent Dallas-Fort Worth plumbing decisions before you approve work.</p>
          <div className="mt-6">
            <CallButton location={`cost-${guide.slug}-top`} pagePath={path} pageType="cost-guide" service={relatedService?.name || "Emergency plumbing"} />
          </div>
        </article>
        <LeadForm pageUrl={path} service={relatedService?.name || "Emergency plumbing"} city="Dallas" />
      </div>

      <DirectAnswer>{guide.directAnswer}</DirectAnswer>
      <section className="content-section">
        <p className="section-kicker">General range guidance</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Why exact pricing is not guaranteed here</h2>
        <p className="mt-3 leading-7 text-slate-700">{guide.rangeGuidance}</p>
      </section>
      <CostFactors factors={guide.factors} />
      <InfoListSection kicker="Before booking" title="Questions to ask the provider" items={guide.questionsToAsk} />
      <EnhancementSections enhancement={enhancement} />
      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          ...(enhancement?.extraLinks || []),
          ...(relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []),
          ...relatedProblems.map((problem) => ({ label: problem.title, href: `/problems/${problem.slug}` })),
          { label: "Request provider connection", href: "/contact" }
        ]}
      />
    </main>
  );
}
