import Link from "next/link";
import { ArrowRight, BookOpen, SearchCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { FAQBlock, InternalLinks } from "@/components/PageSections";
import { blogPosts } from "@/data/blogPosts";
import { emergencyFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Emergency plumbing guides",
  description:
    "Practical emergency plumbing, drain, sewer, cost, and decision guides for Dallas-Fort Worth homeowners, covering symptoms and safe next steps.",
  path: "/blog"
});

const categories = [...new Set(blogPosts.map((post) => post.category))];

export default function BlogHubPage() {
  const faqs = emergencyFaqs.slice(0, 5);

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(
            "/blog",
            "Emergency plumbing guides",
            "Practical emergency plumbing, drain, sewer, cost, and decision guides for Dallas-Fort Worth homeowners."
          ),
          breadcrumbSchema([{ name: "Guides", path: "/blog" }]),
          faqSchema(faqs)
        ]}
      />
      <Breadcrumbs items={[{ label: "Guides", href: "/blog" }]} />

      <section className="mt-6 answer-grid">
        <article>
          <p className="section-kicker">Guide hub</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">Emergency plumbing guides</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Fast, practical explainers for Dallas-Fort Worth homeowners comparing urgent plumbing symptoms, cost factors,
            service options, and safe next steps before requesting provider help.
          </p>
          <div className="mt-6">
            <CallButton location="blog-hub-top" />
          </div>
        </article>
        <aside className="rounded-md border border-cyan-200 bg-cyan-50 p-5">
          <SearchCheck className="h-6 w-6 text-cyan-800" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-black text-slate-950">Start with the symptom</h2>
          <p className="mt-3 leading-7 text-slate-700">
            If water is active, wastewater is present, or several fixtures are affected, stop water use where safe and
            use a service page or contact path instead of only reading.
          </p>
        </aside>
      </section>

      {categories.map((category) => (
        <section key={category} className="content-section">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-700" aria-hidden="true" />
            <h2 className="text-2xl font-black text-slate-950">{category}</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts
              .filter((post) => post.category === category)
              .map((post) => {
                const service = services.find((item) => item.slug === post.relatedServiceSlug);
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="premium-card group bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-normal text-cyan-700">
                      {service?.name || "Emergency plumbing"}
                    </p>
                    <h3 className="mt-3 text-lg font-black leading-6 text-slate-950">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.directAnswer}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-700">
                      Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}

      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "Emergency service options", href: "/services/24-hour-emergency-plumber" },
          { label: "Emergency plumbing cost guide", href: "/cost-guides/emergency-plumbing-cost-dfw" },
          { label: "Dallas service area", href: "/cities/dallas" }
        ]}
      />
    </main>
  );
}
