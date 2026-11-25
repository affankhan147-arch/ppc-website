import Link from "next/link";
import { BookOpen, SearchCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { FAQBlock, InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { getLiveBlogPosts } from "@/data/blogPosts";
import { emergencyFaqs } from "@/data/faqs";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Emergency plumbing guides",
  description: truncateForMeta("Practical emergency plumbing, drain, sewer, cost, and decision guides for Dallas-Fort Worth homeowners, covering symptoms and safe next steps."),
  path: "/blog"
});

const liveBlogPosts = getLiveBlogPosts();
const categories = [...new Set(liveBlogPosts.map((post) => post.category))];

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
          <h1 className="display-title mt-3 text-4xl font-bold leading-tight text-ink">Emergency plumbing guides</h1>
          <p className="lead mt-4 text-ink-2">
            Fast, practical explainers for Dallas-Fort Worth homeowners comparing urgent plumbing symptoms, cost factors,
            service options, and safe next steps before requesting provider help.
          </p>
          <div className="mt-6">
            <CallButton location="blog-hub-top" />
          </div>
        </article>
        <aside className="rounded-card border border-rule bg-paper p-5">
          <SearchCheck className="h-6 w-6 text-accent" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-ink">Start with the symptom</h2>
          <p className="mt-3 leading-7 text-ink-2">
            If water is active, wastewater is present, or several fixtures are affected, stop water use where safe and
            use a service page or contact path instead of only reading.
          </p>
        </aside>
      </section>

      {categories.map((category) => (
        <section key={category} className="content-section">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-ink">{category}</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveBlogPosts
              .filter((post) => post.category === category)
              .map((post) => {
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="premium-card p-5">
                    <h3 className="mt-3 text-lg font-bold leading-6 text-ink">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-2">{post.directAnswer}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                      Read guide
                    </span>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}

      <OfficialSources
        title="Official sources our plumbing guides rely on"
        intro="Our guides cite the agencies and manufacturers below. Use them to check licenses, insurance coverage, freeze records and water heater lifespan for yourself."
        links={[sources.tsbpeLookup, sources.tdiWaterDamage, sources.nwsFreeze]}
      />

      <FAQBlock faqs={faqs} />
      <InternalLinks
        extra={[
          { label: "Emergency service options", href: "/services" },
          { label: "Emergency plumbing cost guide", href: "/guides/dfw-emergency-plumbing-costs" },
          { label: "Dallas service area", href: "/cities/dallas" }
        ]}
      />
    </main>
  );
}
