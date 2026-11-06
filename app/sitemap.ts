import type { MetadataRoute } from "next";
import { nav, rooms, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...nav.map((item) => item.href), ...rooms.map((room) => `/portfolio/${room.slug}`)];
  return pages.map((path) => ({ url: `${site.url}${path}` }));
}
