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
