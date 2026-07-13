import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer, EmergencySteps, EnhancementSections, FAQBlock, InfoListSection, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { problemEnhancements, problemFaqEnhancements } from "@/data/pageEnhancements";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ problemSlug: string }>;
};

export function generateStaticParams() {
  return problems.map((problem) => ({ problemSlug: problem.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { problemSlug } = await params;
  const problem = problems.find((item) => item.slug === problemSlug);
  if (!problem) return {};
  return buildMetadata({
    title: problem.title,
    description: problem.directAnswer,
    path: `/problems/${problem.slug}`
  });
}

export default async function ProblemPage({ params }: Props) {
  const { problemSlug } = await params;
  const problem = problems.find((item) => item.slug === problemSlug);
  if (!problem) notFound();
  const relatedService = services.find((service) => service.slug === problem.relatedServiceSlug);
  const relatedCostGuide = costGuides.find((guide) => guide.slug === problem.relatedCostGuideSlug);
  const path = `/problems/${problem.slug}`;
  const enhancement = problemEnhancements[problem.slug];
  const faqs = [
    ...(enhancement?.extraFaqs || []),
    ...(problemFaqEnhancements[problem.slug] || []),
    {
      question: `What should I do first if I see ${problem.title.toLowerCase()}?`,
      answer: problem.steps[0] || problem.directAnswer
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, problem.title, problem.directAnswer),
          breadcrumbSchema([{ name: "Problems", path }, { name: problem.title, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Problems", href: path }, { label: problem.title, href: path }]} />
      <div className="mt-6 answer-grid">
        <article>
          <p className="section-kicker">Problem page</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">{problem.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">{problem.directAnswer}</p>
          <div className="mt-6">
            <CallButton location={`problem-${problem.slug}-top`} pagePath={path} pageType="problem" service={relatedService?.name || "Emergency plumbing"} problem={problem.title} />
          </div>
        </article>
        <LeadForm pageUrl={path} service={relatedService?.name || "Emergency plumbing"} city="Dallas" />
      </div>

      <DirectAnswer>{problem.directAnswer}</DirectAnswer>
      <section className="content-section">
        <p className="section-kicker">What it means</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">What this problem usually points to</h2>
        <p className="mt-3 leading-7 text-slate-700">{problem.whatItMeans}</p>
      </section>
      <EmergencySteps steps={problem.steps} />
      <EnhancementSections enhancement={enhancement} />
      <section className="content-section">
        <p className="section-kicker">Warning signs</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {problem.warningSigns.map((sign) => (
            <li key={sign} className="rounded-md bg-slate-50 p-3 font-semibold text-slate-800">{sign}</li>
          ))}
        </ul>
      </section>
      <InfoListSection kicker="What not to do" title="Avoid making the problem worse" items={problem.whatNotToDo} />
      <InfoListSection kicker="When urgent" title="When to call immediately" items={problem.urgentWhen} />
      {relatedService ? (
        <section className="content-section rounded-md border border-emerald-200 bg-emerald-50">
          <p className="section-kicker text-emerald-800">Recommended service page</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Call from: {relatedService.name}</h2>
          <p className="mt-3 leading-7 text-slate-700">{relatedService.shortAnswer}</p>
          <div className="mt-5">
            <CallButton location={`problem-${problem.slug}-service-cta`} pagePath={path} pageType="problem" service={relatedService.name} problem={problem.title} />
          </div>
        </section>
      ) : null}
      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          ...(enhancement?.extraLinks || []),
          ...(relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []),
          ...(relatedCostGuide ? [{ label: relatedCostGuide.title, href: `/cost-guides/${relatedCostGuide.slug}` }] : [])
        ]}
      />
    </main>
  );
}
