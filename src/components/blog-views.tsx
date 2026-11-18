import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArticleHeader, EmptyState, EntryList, Pager, Prose, Reader, ReaderFoot, ReaderHead, ReaderTop, ResultCount, SearchForm, TagFilter,
  plural, type Entry, type PagerLink,
} from "@/components/reader-shell";
import { filterPosts, tagCounts, type PostMeta } from "@/lib/posts";

// The tech blog's pages on the Reader shell. The route files stay thin; these views take plain data,
// so the tests can render them with no articles, a query or a tag.

export const SITE = "https://techblog.bookchaowalit.com";
const SOURCE = "https://github.com/bookchaowalit-website/content-techblog-web";

type Section = "home" | "blog" | "about";

export function TechFrame({ current, children }: { current: Section; children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop
        name="Tech Blog"
        tagline="Chaowalit Greepoke"
        links={[{ href: "/blog", label: "Articles", current: current === "blog" }, { href: "/contact", label: "About", current: current === "about" }]}
      />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot
        source={SOURCE}
        links={[{ href: "https://github.com/bookchaowalit", label: "GitHub" }, { href: "mailto:bookchaowalit@gmail.com", label: "Email" }]}
        note="Articles are written locally in MDX, and every code example in them runs in the test suite."
      />
    </Reader>
  );
}

export const postEntry = (post: PostMeta): Entry => ({
  href: `/blog/${post.slug}`,
  title: post.title,
  summary: post.excerpt,
  date: post.date,
  meta: [`${post.readingMinutes} min read`],
  tags: post.tags,
});

const tagHref = (tag: string, q = "") => `/blog?${new URLSearchParams({ ...(tag ? { tag } : {}), ...(q ? { q } : {}) })}`.replace(/\?$/, "");

export function HomeView({ posts }: { posts: PostMeta[] }) {
  return (
    <TechFrame current="home">
      <ReaderHead
        eyebrow="Technical notes"
        title="Notes from the implementation layer."
        lede="Technical writing about the details that make software feel deliberate: React systems, Next.js routes, TypeScript edges, and the practice between them."
      >
        {posts.length > 0 ? <Link className="rs-button" href="/blog">Browse {plural(posts.length, "article")}</Link> : null}
        <Link className="rs-plain" href="/contact">About the author</Link>
      </ReaderHead>
      {posts.length === 0 ? (
        <EmptyState title="No articles yet">New notes appear here as soon as they are published.</EmptyState>
      ) : (
        <>
          <section aria-labelledby="latest">
            <div className="rs-section-head"><h2 id="latest">Latest notes</h2><Link href="/blog">All articles</Link></div>
            <EntryList headingLevel={3} entries={posts.slice(0, 3).map(postEntry)} />
          </section>
          <section aria-labelledby="topics">
            <div className="rs-section-head"><h2 id="topics">Topics</h2></div>
            <TagFilter label="Browse by topic" options={tagCounts(posts).map(({ tag, count }) => ({ label: tag, href: tagHref(tag), count }))} />
          </section>
        </>
      )}
    </TechFrame>
  );
}

export function IndexView({ posts, q = "", tag = "" }: { posts: PostMeta[]; q?: string; tag?: string }) {
  // Chip counts come from the posts that match the search, so each number is what a click on that chip shows.
  const matching = filterPosts(posts, { q });
  const shown = filterPosts(matching, { tag });
  const topics = tagCounts(matching);
  if (tag && !topics.some((t) => t.tag === tag)) topics.push({ tag, count: 0 });
  return (
    <TechFrame current="blog">
      <ReaderHead title="Articles" lede="Short technical notes, each with a runnable example." />
      {posts.length === 0 ? (
        <EmptyState title="No articles yet">New notes appear here as soon as they are published.</EmptyState>
      ) : (
        <>
          <div className="rs-toolbar">
            <SearchForm action="/blog" label="Search articles" placeholder="Title, topic or tag" defaultValue={q} hidden={tag ? { tag } : {}} clearHref={tagHref(tag)} />
            <TagFilter
              label="Filter by topic"
              options={[{ label: "All", href: tagHref("", q), current: !tag, count: matching.length }, ...topics.map(({ tag: t, count }) => ({ label: t, href: tagHref(t, q), current: t === tag, count }))]}
            />
            <ResultCount shown={shown.length} total={posts.length} noun="article" query={q || undefined} filter={tag ? `“${tag}”` : undefined} />
          </div>
          {shown.length > 0 ? (
            <EntryList entries={shown.map(postEntry)} />
          ) : (
            <EmptyState title="No articles match" action={<Link className="rs-plain" href="/blog">Show all articles</Link>}>
              Try fewer or different words, or another topic.
            </EmptyState>
          )}
        </>
      )}
    </TechFrame>
  );
}

export function ArticleView({ post, children, previous, next }: { post: PostMeta; children: ReactNode; previous?: PostMeta; next?: PostMeta }) {
  const url = `${SITE}/blog/${post.slug}`;
  const link = (p?: PostMeta): PagerLink | undefined => (p ? { href: `/blog/${p.slug}`, title: p.title } : undefined);
  return (
    <TechFrame current="blog">
      <article className="rs-article">
        <ArticleHeader back={{ href: "/blog", label: "All articles" }} tags={post.tags} title={post.title} lede={post.excerpt} date={post.date} meta={[`${post.readingMinutes} min read`, post.author]} />
        <Prose>{children}</Prose>
        <div className="rs-actions" aria-label="Share this article" role="group">
          <a className="rs-plain" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`} rel="noopener noreferrer" target="_blank">Share on X</a>
          <a className="rs-plain" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} rel="noopener noreferrer" target="_blank">Share on LinkedIn</a>
        </div>
        <Pager previous={link(previous)} next={link(next)} />
      </article>
    </TechFrame>
  );
}
