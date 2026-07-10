import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer, FAQBlock, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { blogPosts } from "@/data/blogPosts";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ postSlug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ postSlug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { postSlug } = await params;
  const post = blogPosts.find((item) => item.slug === postSlug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.directAnswer,
    path: `/blog/${post.slug}`
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { postSlug } = await params;
  const post = blogPosts.find((item) => item.slug === postSlug);
  if (!post) notFound();
  const relatedService = services.find((service) => service.slug === post.relatedServiceSlug);
  const path = `/blog/${post.slug}`;
  const faqs = [
    {
      question: "What is the quick decision?",
      answer: post.directAnswer
    },
    {
      question: "When should I call instead of waiting?",
      answer: "Call when water damage, wastewater, essential fixture loss, or repeated backup symptoms are present."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, post.title, post.directAnswer),
          breadcrumbSchema([{ name: "Blog", path: "/blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives" }, { name: post.title, path }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives" }, { label: post.title, href: path }]} />
      <article className="mt-6 max-w-4xl">
        <p className="section-kicker">{post.category}</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">{post.directAnswer}</p>
        <div className="mt-6">
          <CallButton location={`blog-${post.slug}-top`} />
        </div>
      </article>
      <div className="mt-8 answer-grid">
        <div>
          <DirectAnswer>{post.directAnswer}</DirectAnswer>
          <section className="content-section">
            <p className="section-kicker">Decision guide</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">How to decide what happens next</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Start by identifying whether the issue is isolated to one fixture or affects several drains. If the problem is spreading,
              includes dirty water, or risks property damage, treat it as urgent and request provider guidance.
            </p>
          </section>
        </div>
        <LeadForm pageUrl={path} service={relatedService?.name || "Emergency plumbing"} city="Dallas" />
      </div>
      <LocalGuidance />
      <FAQBlock faqs={faqs} />
      <InternalLinks extra={relatedService ? [{ label: relatedService.name, href: `/services/${relatedService.slug}` }] : []} />
    </main>
  );
}
