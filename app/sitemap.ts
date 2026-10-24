import type { MetadataRoute } from "next";
import { posts, isoDate } from "@/lib/posts";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: posts.length ? posts.map((p) => isoDate(p)).sort().at(-1) : undefined,
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/historias/${post.slug}`,
      lastModified: isoDate(post),
      images: [absoluteUrl(post.image)],
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
