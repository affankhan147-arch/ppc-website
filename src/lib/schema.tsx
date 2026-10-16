import { cities } from "@/data/cities";
import { contentPublished } from "@/data/contentDates";
import { FAQ } from "@/data/faqs";
import { hasConfiguredPhone, siteConfig } from "@/data/site";
import { joinUrl } from "@/lib/format";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.baseUrl,
    description: siteConfig.serviceStatement,
    areaServed: cities.map((city) => ({ "@type": "City", name: city.name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    }
  };

  if (hasConfiguredPhone()) {
    schema.telephone = siteConfig.phoneE164;
  }

  return schema;
}

export function webPageSchema(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: joinUrl(siteConfig.baseUrl, path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.brandName,
      url: siteConfig.baseUrl
    }
  };
}

// Article schema now carries a real first-published date (from git history, see
// scripts/gen-content-dates.mjs), an author, and optional image/citations. Answer engines
// (Google AI Overviews, Bing/Copilot, ChatGPT search, Perplexity) favour dated, attributed sources.
export function articleSchema(
  path: string,
  headline: string,
  description: string,
  opts: { image?: string; citations?: string[] } = {}
) {
  const url = joinUrl(siteConfig.baseUrl, path);
  const org = { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.baseUrl };
  const published = contentPublished[path];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(published ? { datePublished: published, dateModified: published } : {}),
    ...(opts.image ? { image: opts.image.startsWith("http") ? opts.image : joinUrl(siteConfig.baseUrl, opts.image) } : {}),
    author: org,
    publisher: org,
    ...(opts.citations && opts.citations.length ? { citation: opts.citations } : {}),
    inLanguage: "en-US"
  };
}

export function publishedLabel(path: string): string | null {
  const date = contentPublished[path];
  if (!date) return null;
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
}

// Visible byline under an H1. Same date as the schema so the two never disagree.
export function Byline({ path }: { path: string }) {
  const label = publishedLabel(path);
  return (
    <p className="mt-3 text-sm text-slate-400">
      By the {siteConfig.brandName} editorial team{label ? <> · Published {label}</> : null}
    </p>
  );
}

export function serviceSchema(name: string, path: string, description: string, areaServed: string = siteConfig.marketName) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    areaServed,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.baseUrl
    },
    url: joinUrl(siteConfig.baseUrl, path)
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function howToSchema(name: string, description: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step
    }))
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: joinUrl(siteConfig.baseUrl, item.path)
    }))
  };
}
