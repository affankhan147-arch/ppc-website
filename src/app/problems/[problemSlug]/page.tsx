import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer, EmergencySteps, FAQBlock, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
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
  const path = `/problems/${problem.slug}`;
  const faqs = [
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
            <CallButton location={`problem-${problem.slug}-top`} />
          </div>
        </article>
        <LeadForm pageUrl={path} service={relatedService?.name || "Emergency plumbing"} city="Dallas" />
      </div>

      <DirectAnswer>{problem.directAnswer}</DirectAnswer>
      <EmergencySteps steps={problem.steps} />
      <section className="content-section">
        <p className="section-kicker">Warning signs</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {problem.warningSigns.map((sign) => (
            <li key={sign} className="rounded-md bg-slate-50 p-3 font-semibold text-slate-800">{sign}</li>
          ))}
        </ul>
      </section>
      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks extra={relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []} />
    </main>
  );
}
