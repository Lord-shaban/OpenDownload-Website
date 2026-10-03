import type { MetadataRoute } from "next";
import { locales, routes, href, SITE_URL } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((path) => ({
      url: `${SITE_URL}${href(locale, path)}`,
      lastModified:
        path === "blog/introducing-0-1" || path === "blog/a-quieter-workspace"
          ? "2026-10-01"
          : "2026-10-03",
      alternates: {
        languages: { en: `${SITE_URL}${href("en", path)}`, ar: `${SITE_URL}${href("ar", path)}` },
      },
    }))
  );
}
