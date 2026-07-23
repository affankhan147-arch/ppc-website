import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { joinUrl } from "@/lib/format";

type SeoInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: SeoInput): Metadata {
  const canonical = joinUrl(siteConfig.baseUrl, path);
  const fullTitle = title.includes(siteConfig.brandName) ? title : `${title} | ${siteConfig.brandName}`;

  return {
    title,
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

export function truncateForMeta(text: string, max = 158): string {
  if (text.length <= max) return text;
  const truncated = text.slice(0, max - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated).trimEnd() + "...";
}
