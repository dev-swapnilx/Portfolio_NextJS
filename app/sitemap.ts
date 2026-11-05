import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Bump when page content actually changes (build-time `new Date()` makes
// Google ignore lastmod)
const LAST_CONTENT_CHANGE = "2026-11-05";

export default function sitemap(): MetadataRoute.Sitemap {
  // /about excluded: duplicate of / (canonical points there)
  return ["", "/projects"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: LAST_CONTENT_CHANGE,
  }));
}
