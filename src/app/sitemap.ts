import type { MetadataRoute } from "next";
import { getAllInventoryPages } from "@/lib/content";
import { siteConfig } from "@/data/site";
import { joinUrl } from "@/lib/format";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...getAllInventoryPages().map((page) => ({
      url: joinUrl(siteConfig.baseUrl, page.path),
      lastModified: now,
      changeFrequency: page.kind === "blog" ? ("weekly" as const) : ("daily" as const),
      priority: page.kind === "home" ? 1 : page.kind === "service" || page.kind === "city-service" ? 0.9 : 0.7
    })),
    {
      url: joinUrl(siteConfig.baseUrl, '/guides/texas-insurance-plumbing-claims'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: joinUrl(siteConfig.baseUrl, '/partners'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ];
}
