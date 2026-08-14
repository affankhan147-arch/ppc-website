import { cities } from "@/data/cities";
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
    areaServed: cities
      .filter((city) => city.marketSlug === "dallas-fort-worth")
      .map((city) => ({ "@type": "City", name: city.name })),
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

export function articleSchema(path: string, headline: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: joinUrl(siteConfig.baseUrl, path),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": joinUrl(siteConfig.baseUrl, path)
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.baseUrl
    }
  };
}

export function serviceSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    areaServed: siteConfig.marketName,
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
