// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { ArticleView, HomeView, IndexView } from "@/components/blog-views";
import { Pre, textOf } from "@/components/mdx-pre";
import type { PostMeta } from "@/lib/posts";
import Home from "@/app/page";
import BlogPage from "@/app/blog/page";
import BlogPostPage, { generateMetadata, generateStaticParams } from "@/app/blog/[slug]/page";
import ContactPage from "@/app/contact/page";
import sitemap from "@/app/sitemap";
import nextConfig from "../next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const post = (slug: string, title: string, tags: string[], date = "2026-10-15"): PostMeta => ({
  slug, title, date, tags, summary: `${title} summary`, excerpt: `${title} excerpt`, author: "Technical Notes", sizeBytes: 100, readingMinutes: 3,
});
const posts = [post("fetch", "Fetch contracts", ["fetch", "http", "testing"]), post("timers", "Pure timers", ["timers", "testing"]), post("dates", "Dates", ["dates"]), post("store", "Storage", ["testing"])];
const page = (node: React.ReactNode) => {
  const host = document.createElement("div");
  host.innerHTML = renderToStaticMarkup(<>{node}</>);
  return host;
};
const texts = (host: Element, selector: string) => [...host.querySelectorAll(selector)].map((el) => el.textContent);

describe("home", () => {
  it("shows the three newest notes, every topic with a count, and the shell frame", () => {
    const host = page(<HomeView posts={posts} />);
    expect(host.querySelector("h1")?.textContent).toBe("Notes from the implementation layer.");
    expect(host.querySelector(".rs-head .rs-button")?.textContent).toBe("Browse 4 articles");
    expect(texts(host, "#latest ~ * .rs-entry h3, .rs-entry h3")).toEqual(["Fetch contracts", "Pure timers", "Dates"]);
    expect(texts(host, ".rs-chip")).toEqual(["testing3", "dates1", "fetch1", "http1", "timers1"]);
    expect(host.querySelector('.rs-chip[href="/blog?tag=testing"]')).not.toBeNull();
    expect(host.querySelector('.rs-nav a[aria-current="page"]')).toBeNull();
    expect(host.querySelector('.rs-foot a[href="https://bookchaowalit.com/"]')?.textContent).toBe("More projects");
    expect(host.textContent).not.toMatch(/15:42:08|640K/);
  });

  it("does not crash and says so when there are no articles", () => {
    const host = page(<HomeView posts={[]} />);
    expect(host.querySelector(".rs-empty h2")?.textContent).toBe("No articles yet");
    expect(host.querySelector(".rs-head .rs-button")).toBeNull();
  });

  it("renders the real home page with its Blog schema", () => {
    const host = page(<Home />);
    expect(host.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"@type":"Blog"');
    expect(host.querySelectorAll(".rs-entry").length).toBe(3);
  });
});

describe("article index", () => {
  it("lists every article with search, topic chips and a count", () => {
    const host = page(<IndexView posts={posts} />);
    expect(host.querySelector('.rs-nav a[aria-current="page"]')?.textContent).toBe("Articles");
    expect(host.querySelector(".rs-count")?.textContent).toBe("4 articles");
    expect(host.querySelectorAll(".rs-entry").length).toBe(4);
    expect(host.querySelector('.rs-chip[aria-current="page"]')?.textContent).toBe("All4");
    expect(host.querySelector(".rs-search a.rs-plain")).toBeNull();
  });

  it("narrows by query and tag, keeps the other one in links and the form, and offers Clear", () => {
    const host = page(<IndexView posts={posts} q="fetch" tag="testing" />);
    expect(texts(host, ".rs-entry h2")).toEqual(["Fetch contracts"]);
    expect(host.querySelector(".rs-count")?.textContent).toBe("Showing 1 of 4 articles in “testing” for “fetch”");
    expect(host.querySelector('.rs-chip[aria-current="page"]')?.getAttribute("href")).toBe("/blog?tag=testing&q=fetch");
    expect(host.querySelector('.rs-chip[href="/blog?q=fetch"]')?.textContent).toBe("All4");
    expect(host.querySelector<HTMLInputElement>('input[type="hidden"]')?.value).toBe("testing");
    expect(host.querySelector(".rs-search a.rs-plain")?.getAttribute("href")).toBe("/blog?tag=testing");
  });

  it("shows an empty state with a way back when nothing matches, and another when there are no articles", () => {
    const none = page(<IndexView posts={posts} q="kubernetes" />);
    expect(none.querySelector(".rs-empty h2")?.textContent).toBe("No articles match");
    expect(none.querySelector(".rs-empty a")?.getAttribute("href")).toBe("/blog");
    expect(page(<IndexView posts={[]} />).querySelector(".rs-empty h2")?.textContent).toBe("No articles yet");
  });

  it("reads q and tag from the URL (first value, trimmed)", async () => {
    const host = page(await BlogPage({ searchParams: Promise.resolve({ q: [" dates ", "x"], tag: "dates" }) }));
    expect(texts(host, ".rs-entry h2")).toEqual(["Separate calendar dates from instants"]);
    expect(page(await BlogPage({ searchParams: Promise.resolve({}) })).querySelectorAll(".rs-entry").length).toBeGreaterThanOrEqual(5);
  });
});

describe("article", () => {
  it("renders the head, the body, share links and previous/next", () => {
    const host = page(<ArticleView post={posts[1]} previous={posts[0]} next={posts[2]}><p>Body</p></ArticleView>);
    expect(host.querySelector(".rs-article-head h1")?.textContent).toBe("Pure timers");
    expect(texts(host, ".rs-meta li")).toEqual(["15 Oct 2026", "3 min read", "Technical Notes"]);
    expect(host.querySelector(".rs-prose")?.innerHTML).toBe("<p>Body</p>");
    expect(texts(host, ".rs-pager a")).toEqual(["PreviousFetch contracts", "NextDates"]);
    expect(texts(host, '[aria-label="Share this article"] a')).toEqual(["Share on X", "Share on LinkedIn"]);
  });

  it("renders a real article once, without repeating its title as a second h1", async () => {
    const [{ slug }] = generateStaticParams();
    const host = page(await BlogPostPage({ params: Promise.resolve({ slug }) }));
    expect(host.querySelectorAll("h1").length).toBe(1);
    expect(host.querySelector(".rs-prose pre[tabindex='0']")).not.toBeNull();
    expect(host.querySelector(".rs-copy")?.textContent).toBe("Copy code");
    expect(host.querySelector(".rs-pager")).not.toBeNull();
    expect((await generateMetadata({ params: Promise.resolve({ slug }) })).alternates?.canonical).toBe(`/blog/${slug}`);
  });

  it("returns not found metadata for an unknown slug and throws notFound for the page", async () => {
    expect((await generateMetadata({ params: Promise.resolve({ slug: "nope" }) })).title).toBe("Article not found");
    await expect(BlogPostPage({ params: Promise.resolve({ slug: "nope" }) })).rejects.toThrow();
  });

  it("copies a code block's text and says so", async () => {
    expect(textOf(["a", 1, null, false, <b key="b">c</b>])).toBe("a1c");
    const writeText = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("denied"));
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const host = document.createElement("div");
    const root = createRoot(host);
    await act(async () => root.render(<Pre><code>{"const a = 1;"}</code></Pre>));
    const button = host.querySelector("button")!;
    await act(async () => button.click());
    expect(writeText).toHaveBeenCalledWith("const a = 1;");
    expect(button.textContent).toBe("Copied");
    expect(host.querySelector("[role=status]")?.textContent).toBe("Code copied");
    await act(async () => button.click());
    expect(host.querySelector("[role=status]")?.textContent).toBe("Could not copy the code");
    act(() => root.unmount());
  });
});

describe("site", () => {
  it("renders About on the shell with a working email and no unverifiable claims", () => {
    const host = page(<ContactPage />);
    expect(host.querySelector('.rs-nav a[aria-current="page"]')?.textContent).toBe("About");
    expect(host.querySelector('a[href="mailto:bookchaowalit@gmail.com"]')).not.toBeNull();
    expect(host.innerHTML).not.toMatch(/example\.com|147\+|24 hours/);
  });

  it("lists every page and article in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.slice(0, 3)).toEqual(["https://techblog.bookchaowalit.com/", "https://techblog.bookchaowalit.com/blog", "https://techblog.bookchaowalit.com/contact"]);
    expect(urls.length).toBe(3 + generateStaticParams().length);
  });

  it("redirects /more-projects permanently (308) to the hub", async () => {
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });

  it("ships no Vercel Analytics, placeholder verification or dead search URL", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    expect(layout).not.toMatch(/@vercel\/(analytics|speed-insights)|your-google-verification-code|\/search\?q=/);
    expect(layout).toContain("/blog?q={search_term_string}");
    expect(readFileSync("package.json", "utf8")).not.toContain("@vercel/analytics");
  });
});
