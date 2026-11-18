import type { MetadataRoute } from "next";
import { SITE } from "@/components/blog-views";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = posts[0]?.date;
  return [
    { url: `${SITE}/`, lastModified: newest },
    { url: `${SITE}/blog`, lastModified: newest },
    { url: `${SITE}/contact` },
    ...posts.map((post) => ({ url: `${SITE}/blog/${post.slug}`, lastModified: post.date })),
  ];
}
