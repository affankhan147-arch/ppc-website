import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { CostFactors, DirectAnswer, FAQBlock, InfoListSection, InternalLinks, LocalGuidance, OfficialSources } from "@/components/PageSections";
import { getTopicSources, sourcesHeading } from "@/data/externalSources";
import { costGuideEnhancements, costGuideFaqEnhancements } from "@/data/pageEnhancements";
import { getArticleImage } from "@/lib/articleImages";
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
    title: guide.seoTitle ?? guide.title,
    description: truncateForMeta(guide.seoDescription ?? guide.directAnswer),
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
        <h1 className="display-title font-bold">{guide.title}</h1>
        <p className="lead mt-6">{guide.directAnswer}</p>
        <div className="mt-6">
          <CallButton location={`cost-guide-${guide.slug}-top`} />
        </div>
        <div className="photo-frame relative mt-6 h-64 w-full sm:h-80">
          <Image
            src={getArticleImage(guide.relatedServiceSlug, costGuides.findIndex((item) => item.slug === guide.slug))}
            alt={`${guide.title} - Dallas-Fort Worth plumbing cost reference photo`}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </article>
      <div className="mt-8 answer-grid">
        <div>
          <DirectAnswer>{guide.directAnswer}</DirectAnswer>
          <InfoListSection
            title="What affects the range"
            intro={guide.rangeGuidance}
            items={guide.factors}
          />
          <CostFactors factors={guide.factors} />
          <InfoListSection
            title="Questions to ask"
            items={guide.questionsToAsk}
          />
          {enhancement ? (
            <>
              <InfoListSection title={enhancement.decisionTitle} intro={enhancement.decisionIntro} items={enhancement.decisionItems} />
              <InfoListSection title={enhancement.providerTitle} items={enhancement.providerItems} />
              <InfoListSection title={enhancement.safetyTitle} items={enhancement.safetyItems} />
            </>
          ) : relatedService ? (
            <>
              <InfoListSection
                title={`Signs the ${relatedService.name.toLowerCase()} job should not wait`}
                intro="Waiting rarely makes these jobs cheaper. When any of the signs below show up, the repair scope and the cleanup bill both tend to grow."
                items={relatedService.symptoms}
              />
              <InfoListSection
                title="Mistakes that make the bill bigger"
                items={relatedService.mistakesToAvoid}
              />
            </>
          ) : null}
        </div>
      </div>
      <LocalGuidance />
      <InfoListSection
        title="How to compare plumbing quotes fairly"
        intro="Two quotes are only comparable when they price the same job. Use this checklist before you pick a provider."
        items={[
          "Ask each plumber to describe the same scope in writing so the prices line up.",
          "Check whether the call-out or diagnostic fee is credited toward the repair.",
          "Ask what is included: parts, labor, cleanup, permits and haul-away of old equipment.",
          "Get the warranty on parts and on labor in writing, with how long each lasts.",
          "Make sure the license number on the quote matches the TSBPE license search."
        ]}
      />
      {guide.slug === "burst-pipe-emergency-cost-guide" ? (
        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">Burst pipe help by city in Dallas-Fort Worth</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
             {[["dallas", "Dallas"], ["fort-worth", "Fort Worth"], ["arlington", "Arlington"], ["plano", "Plano"], ["irving", "Irving"], ["garland", "Garland"], ["frisco", "Frisco"], ["mckinney", "McKinney"]].map(([slug, name]) => (
               <li key={slug}><Link className="font-bold text-accent underline" href={`/cities/${slug}/burst-pipe-emergency`}>Burst pipe help in {name}</Link></li>
             ))}
          </ul>
        </section>
      ) : null}
      <OfficialSources
        title={sourcesHeading(guide.title)}
        intro="Prices vary by provider, so check the facts that do not vary: the plumber's Texas license and what a typical home policy covers. These official sources help you do both before you approve an estimate."
        links={getTopicSources(`${guide.title} ${guide.slug}`, guide.relatedServiceSlug)}
      />
      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "All cost guides", href: "/cost-guides" },
          { label: "Free Cost Guide Checklist Badges (Embeddable)", href: "/tools/cost-guide-checklists" },
          ...(enhancement?.extraLinks || []),
          ...(relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []),
          ...relatedProblems.map((problem) => ({ label: problem.title, href: `/problems/${problem.slug}` }))
        ]}
      />
    </main>
  );
}
