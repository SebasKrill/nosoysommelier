import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/historias/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
