import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQBlock, InternalLinks } from "@/components/PageSections";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { problems } from "@/data/problems";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "DFW Homeowner Plumbing Problem Guides",
  description: truncateForMeta(
    "Plain-language guides for common DFW plumbing emergencies - warning signs, first steps, what not to do, and when it becomes urgent."
  ),
  path: "/problems"
});

const hubFaqs = [
  {
    question: "How do I know if a plumbing problem is a real emergency?",
    answer: "Look for the warning signs and \"urgent when\" section on the matching guide below. In general, dirty or spreading water, gas odor, wet electrical areas, or a shutoff valve that will not close all point toward an urgent situation."
  }
];

export default function ProblemsIndexPage() {
  const path = "/problems";
  const faqs = [...hubFaqs, ...emergencyFaqs.slice(0, 2), ...universalFaqs.slice(0, 1)];

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(
            path,
            "DFW Homeowner Plumbing Problem Guides",
            "Plain-language guides for common DFW plumbing emergencies - warning signs, first steps, what not to do, and when it becomes urgent."
          ),
          breadcrumbSchema([{ name: "Problems", path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Problems", href: path }]} />

      <section className="content-section soft-band">
        <p className="section-kicker">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Homeowner problem guides
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
          DFW Homeowner Plumbing Problem Guides
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Fifteen common plumbing situations, each with warning signs, first steps, what not to
          do, and when it becomes urgent enough to call for help.
        </p>
      </section>

      <section className="content-section">
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((problem) => (
            <Link
              key={problem.slug}
              href={`/problems/${problem.slug}`}
              className="premium-card group min-w-0 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-xl"
            >
              <h2 className="text-xl font-black text-white">{problem.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{problem.directAnswer}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-base font-black text-cyan-700 group-hover:text-cyan-900">
                Read the guide <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "Free Emergency Warning-Sign Checklist Badges", href: "/tools/problem-checklists" },
          { label: "All emergency plumbing services", href: "/services" },
          { label: "Free DFW Plumbing Tools & Widgets", href: "/tools" }
        ]}
      />
    </main>
  );
}
