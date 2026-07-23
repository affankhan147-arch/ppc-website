import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { CostFactors, DirectAnswer, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { costGuideEnhancements, costGuideFaqEnhancements } from "@/data/pageEnhancements";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { costGuides } from "@/data/costGuides";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ guideSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return costGuides.map((guide) => ({ guideSlug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { guideSlug } = await params;
  const guide = costGuides.find((item) => item.slug === guideSlug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: truncateForMeta(guide.directAnswer),
    path: `/cost-guides/${guide.slug}`
  });
}

export default async function CostGuidePage({ params }: Props) {
  const { guideSlug } = await params;
  const guide = costGuides.find((item) => item.slug === guideSlug);
  if (!guide) notFound();

  const relatedService = services.find((service) => service.slug === guide.relatedServiceSlug);
  const relatedProblems = problems.filter((problem) => guide.relatedProblemSlugs.includes(problem.slug));
  const path = `/cost-guides/${guide.slug}`;
  const enhancement = costGuideEnhancements[guide.slug];
  const faqs = [
    ...(costGuideFaqEnhancements[guide.slug] || []),
    ...(enhancement?.extraFaqs || []),
    {
      question: "What is the quick decision?",
      answer: guide.directAnswer
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, guide.title, guide.directAnswer),
          breadcrumbSchema([{ name: "Cost guides", path: "/cost-guides" }, { name: guide.title, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Cost guides", href: "/cost-guides" }, { label: guide.title, href: path }]} />
      <article className="mt-6 max-w-4xl">
        <p className="section-kicker">Cost guide</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-white">{guide.title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">{guide.directAnswer}</p>
        <div className="mt-6">
          <CallButton location={`cost-guide-${guide.slug}-top`} />
        </div>
      </article>
      <div className="mt-8 answer-grid">
        <div>
          <DirectAnswer>{guide.directAnswer}</DirectAnswer>
          <InfoListSection
            kicker="Range guidance"
            title="What affects the range"
            intro={guide.rangeGuidance}
            items={guide.factors}
          />
          <CostFactors factors={guide.factors} />
          <InfoListSection
            kicker="Before you approve"
            title="Questions to ask"
            items={guide.questionsToAsk}
          />
          {enhancement ? (
            <>
              <InfoListSection kicker="Decision support" title={enhancement.decisionTitle} intro={enhancement.decisionIntro} items={enhancement.decisionItems} />
              <InfoListSection kicker="Provider diagnosis" title={enhancement.providerTitle} items={enhancement.providerItems} />
              <InfoListSection kicker="Safety boundaries" title={enhancement.safetyTitle} items={enhancement.safetyItems} />
            </>
          ) : null}
        </div>
        <LeadForm pageUrl={path} service={relatedService?.name || "Emergency plumbing"} city="Dallas" />
      </div>
      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "All cost guides", href: "/cost-guides" },
          ...(enhancement?.extraLinks || []),
          ...(relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []),
          ...relatedProblems.map((problem) => ({ label: problem.title, href: `/problems/${problem.slug}` }))
        ]}
      />
    </main>
  );
}