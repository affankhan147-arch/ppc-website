import type { MetadataRoute } from "next";
import { getAllInventoryPages } from "@/lib/content";
import { siteConfig } from "@/data/site";
import { joinUrl } from "@/lib/format";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return getAllInventoryPages().map((page) => ({
    url: joinUrl(siteConfig.baseUrl, page.path),
    lastModified: now,
    changeFrequency: page.kind === "blog" ? "weekly" : "daily",
    priority: page.kind === "home" ? 1 : page.kind === "service" || page.kind === "city-service" ? 0.9 : 0.7
  }));
}
