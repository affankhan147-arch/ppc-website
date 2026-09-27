import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { joinUrl } from "@/lib/format";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Skip the layout's "| Plumbing Hands" suffix (for titles that are already near the ~60-char display limit). */
  absoluteTitle?: boolean;
};

export function buildMetadata({ title, description, path, absoluteTitle }: SeoInput): Metadata {
  const canonical = joinUrl(siteConfig.baseUrl, path);
  const fullTitle = absoluteTitle || title.includes(siteConfig.brandName) ? title : `${title} | ${siteConfig.brandName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.brandName,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}

function renderedEntityLength(text: string): number {
  return text
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&#x27;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").length;
}

export function truncateForMeta(text: string, max = 158): string {
  if (renderedEntityLength(text) <= max) return text;
  const ellipsis = "...";
  let candidate = text;
  while (renderedEntityLength(candidate) + ellipsis.length > max && candidate.length > 0) {
    const lastSpace = candidate.lastIndexOf(" ");
    if (lastSpace <= 0) {
      candidate = candidate.slice(0, -1);
      continue;
    }
    candidate = candidate.slice(0, lastSpace);
  }
  return candidate.trimEnd() + ellipsis;
}
