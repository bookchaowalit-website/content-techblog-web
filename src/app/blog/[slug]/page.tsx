import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkToc from "remark-toc";
import { ArticleView, SITE } from "@/components/blog-views";
import { neighbours } from "@/components/reader-shell";
import { getAllPosts, getPost, stripLeadingTitle } from "@/lib/posts";
import { useMDXComponents } from "../../../../mdx-components";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return { title: "Article not found" };
  const description = `${post.excerpt} A practical note by Chaowalit Greepoke (Book).`;
  return {
    title: post.title,
    description,
    keywords: [...post.tags, "Chaowalit Greepoke", "Book Chaowalit", "programming", "web development"],
    authors: [{ name: "Chaowalit Greepoke (Book)" }],
    openGraph: { title: `${post.title} | Chaowalit Greepoke (Book) Tech Blog`, description, type: "article", publishedTime: post.date, tags: post.tags },
    twitter: { card: "summary", title: `${post.title} | Chaowalit Greepoke (Book) Tech Blog`, description },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { content } = await compileMDX({
    source: stripLeadingTitle(post.content, post.title),
    options: { mdxOptions: { remarkPlugins: [remarkToc] } },
    // next-mdx-remote's compileMDX() needs the components passed in; useMDXComponents is the MDX naming
    // convention, not a React Hook (it calls no hooks), so calling it here is safe.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    components: useMDXComponents({}),
  });
  const posts = getAllPosts();
  const { previous, next } = neighbours(posts, posts.findIndex((p) => p.slug === slug));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author, url: SITE },
    publisher: { "@type": "Person", name: "Chaowalit Greepoke", url: SITE },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${slug}` },
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ArticleView post={post} previous={previous} next={next}>{content}</ArticleView>
    </>
  );
}
