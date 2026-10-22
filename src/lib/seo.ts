import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { seoOverrides } from "@/data/seoOverrides";
import { joinUrl } from "@/lib/format";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Skip the layout's "| Plumbing Hands" suffix (for titles that are already near the ~60-char display limit). */
  absoluteTitle?: boolean;
};

// Google shows roughly 60 characters of a title. When the page title plus the
// " | Plumbing Hands" suffix would run past that, the suffix is dropped so the
// words searchers actually read (the topic and city) are not the part cut off.
const MAX_DISPLAY_TITLE = 60;
const BRAND_SUFFIX = ` | ${siteConfig.brandName}`;

export function buildMetadata({ title: rawTitle, description: rawDescription, path, absoluteTitle }: SeoInput): Metadata {
  const override = seoOverrides[path];
  const title = override?.title ?? rawTitle;
  const description = override?.description ? truncateForMeta(override.description) : rawDescription;
  const canonical = joinUrl(siteConfig.baseUrl, path);
  const useAbsolute =
    absoluteTitle || title.includes(siteConfig.brandName) || title.length + BRAND_SUFFIX.length > MAX_DISPLAY_TITLE;
  const fullTitle = useAbsolute ? title : `${title}${BRAND_SUFFIX}`;

  return {
    title: useAbsolute ? { absolute: title } : title,
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

// Keep whole sentences that fit (a clean snippet reads better than one that
// stops mid-word). Only when the first sentence alone is too long is the text
// cut at a word boundary, with a single ellipsis character.
export function truncateForMeta(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (renderedEntityLength(clean) <= max) return clean;

  const sentences = clean.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/);
  let kept = "";
  for (const sentence of sentences) {
    const next = kept ? `${kept} ${sentence}` : sentence;
    if (renderedEntityLength(next) > max) break;
    kept = next;
  }
  if (kept.length >= 90) return kept;

  const ellipsis = "…";
  let candidate = clean;
  while (renderedEntityLength(candidate) + ellipsis.length > max && candidate.length > 0) {
    const lastSpace = candidate.lastIndexOf(" ");
    if (lastSpace <= 0) {
      candidate = candidate.slice(0, -1);
      continue;
    }
    candidate = candidate.slice(0, lastSpace);
  }
  return candidate.replace(/[,;:\-–—]+$/, "").trimEnd() + ellipsis;
}
