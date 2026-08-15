import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Free DFW Plumbing Tools & Embeddable Widgets",
  description: truncateForMeta(
    "Free tools and embeddable data widgets for Dallas-Fort Worth homeowners, real estate agents, and local site owners."
  ),
  path: "/tools"
});

const tools = [
  {
    title: "Water Hardness Widget",
    href: "/tools/water-hardness-widget",
    description: "Embeddable badges showing real GPG water hardness data by DFW city."
  },
  {
    title: "DFW Data Badges",
    href: "/tools/dfw-data-badges",
    description: "Embeddable badges for winter freeze risk, population growth, and water heater lifespan."
  }
];

export default function ToolsIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/tools",
            "Free DFW Plumbing Tools & Embeddable Widgets",
            "Free tools and embeddable data widgets for Dallas-Fort Worth homeowners, real estate agents, and local site owners."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Free Tools</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Free DFW Plumbing Tools & Embeddable Widgets
          </h1>
          <p className="text-slate-300 mb-8">
            Free, sourced data tools built for DFW homeowners, real estate agents, home inspectors,
            and local site owners. Every widget below is free to embed on your own site.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="premium-card group p-6"
              >
                <h2 className="text-xl font-black leading-tight text-white">{tool.title}</h2>
                <p className="mt-3 leading-7 text-slate-300">{tool.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
