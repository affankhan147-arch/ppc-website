import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer, EmergencySteps, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { problemEnhancements, problemFaqEnhancements } from "@/data/pageEnhancements";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { getArticleImage } from "@/lib/articleImages";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ problemSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return problems.map((problem) => ({ problemSlug: problem.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { problemSlug } = await params;
  const problem = problems.find((item) => item.slug === problemSlug);
  if (!problem) return {};
  return buildMetadata({
    title: problem.title,
    description: truncateForMeta(problem.directAnswer),
    path: `/problems/${problem.slug}`
  });
}

export default async function ProblemPage({ params }: Props) {
  const { problemSlug } = await params;
  const problem = problems.find((item) => item.slug === problemSlug);
  if (!problem) notFound();

  const problemIndex = problems.findIndex((item) => item.slug === problem.slug);
  const heroImage = getArticleImage(problem.relatedServiceSlug, problemIndex);
  const relatedService = services.find((service) => service.slug === problem.relatedServiceSlug);
  const relatedCostGuide = costGuides.find((guide) => guide.slug === problem.relatedCostGuideSlug);
  const path = `/problems/${problem.slug}`;
  const enhancement = problemEnhancements[problem.slug];
  const faqs = [
    ...(problemFaqEnhancements[problem.slug] || []),
    ...(enhancement?.extraFaqs || []),
    {
      question: "What is the quick decision?",
      answer: problem.directAnswer
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, problem.title, problem.directAnswer),
          articleSchema(path, problem.title, problem.directAnswer),
          breadcrumbSchema([{ name: "Problems", path: "/problems" }, { name: problem.title, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Problems", href: "/problems" }, { label: problem.title, href: path }]} />
      <article className="mt-6 max-w-4xl">
        <p className="section-kicker">Homeowner problem guide</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-white">{problem.title}</h1>
        <div className="photo-frame relative mt-6 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
          <Image
            src={heroImage}
            alt={problem.title}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-6 text-lg leading-8 text-slate-300">{problem.directAnswer}</p>
        <div className="mt-6">
          <CallButton location={`problem-${problem.slug}-top`} />
        </div>
      </article>
      <div className="mt-8 answer-grid">
        <div>
          <DirectAnswer>{problem.directAnswer}</DirectAnswer>
          <InfoListSection
            kicker="What it means"
            title="What this usually means"
            intro={problem.whatItMeans}
            items={problem.warningSigns}
          />
          <EmergencySteps steps={problem.steps} />
          <InfoListSection
            kicker="Mistakes to avoid"
            title="What not to do"
            items={problem.whatNotToDo}
          />
          <InfoListSection
            kicker="Urgency"
            title="When this becomes urgent"
            items={problem.urgentWhen}
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
          { label: "All homeowner problems", href: "/problems" },
          ...(enhancement?.extraLinks || []),
          ...(relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []),
          ...(relatedCostGuide ? [{ label: relatedCostGuide.title, href: `/cost-guides/${relatedCostGuide.slug}` }] : [])
        ]}
      />
    </main>
  );
}