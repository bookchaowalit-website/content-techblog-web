import type { Metadata } from "next";
import { IndexView } from "@/components/blog-views";
import { getAllPosts } from "@/lib/posts";

const description = "Technical notes by Chaowalit Greepoke (Book) on dates and time zones, fetch contracts, immutable updates, timers and browser storage, each with a runnable example.";

export const metadata: Metadata = {
  title: "Articles",
  description,
  keywords: ["Chaowalit Greepoke", "Book Chaowalit", "programming blog", "web development", "JavaScript", "TypeScript", "testing"],
  openGraph: { title: "Articles | Chaowalit Greepoke (Book) Tech Blog", description, type: "website" },
  twitter: { card: "summary", title: "Articles | Chaowalit Greepoke (Book) Tech Blog", description },
  alternates: { canonical: "/blog" },
};

const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value ?? "").trim().slice(0, 100);

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; tag?: string | string[] }> }) {
  const params = await searchParams;
  return <IndexView posts={getAllPosts()} q={one(params.q)} tag={one(params.tag)} />;
}
