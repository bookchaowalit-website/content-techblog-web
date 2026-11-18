import type { Metadata } from "next";
import { HomeView, SITE } from "@/components/blog-views";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Home",
  description: "Technical writing on modern web development, React, Next.js, TypeScript, and programming practice by Chaowalit Greepoke.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const posts = getAllPosts();
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Chaowalit Greepoke Tech Blog",
    url: SITE,
    author: { "@type": "Person", name: "Chaowalit Greepoke" },
    blogPost: posts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: `${SITE}/blog/${post.slug}`, datePublished: post.date })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <HomeView posts={posts} />
    </>
  );
}
