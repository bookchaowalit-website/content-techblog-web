// Reads the MDX articles in content/blog. Used by the home page, the article index and article routes.
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  excerpt: string;
  author: string;
  tags: string[];
  sizeBytes: number;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

const blogDirectory = path.join(process.cwd(), "content/blog");
const REQUIRED_TEXT = ["title", "summary", "excerpt", "author"] as const;

export function normalizeTags(raw: unknown): string[] {
  const list = Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split(",") : [];
  return list.filter((tag): tag is string => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean);
}

export function readingMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function isCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/** Problems with one article's frontmatter; empty when it can be published. */
export function validateFrontmatter(slug: string, data: Record<string, unknown>): string[] {
  const problems: string[] = [];
  for (const field of REQUIRED_TEXT) {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") problems.push(`${slug}: ${field} is missing`);
  }
  if (!isCalendarDate(data.date)) problems.push(`${slug}: date "${String(data.date)}" is not a valid YYYY-MM-DD date`);
  return problems;
}

/** Problems across the whole set: slugs must stay unique even on a case-insensitive file system. */
export function checkPosts(posts: { slug: string }[]): string[] {
  const seen = new Set<string>();
  const problems: string[] = [];
  for (const { slug } of posts) {
    const key = slug.toLowerCase();
    if (seen.has(key)) problems.push(`duplicate slug "${key}"`);
    seen.add(key);
  }
  return problems;
}

function readPost(slug: string): Post {
  const fileContents = fs.readFileSync(path.join(blogDirectory, `${slug}.mdx`), "utf8");
  const { data, content } = matter(fileContents);
  const problems = validateFrontmatter(slug, data);
  if (problems.length > 0) throw new Error(`Invalid article frontmatter:\n${problems.join("\n")}`);
  return {
    slug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    excerpt: data.excerpt,
    author: data.author,
    tags: normalizeTags(data.tags),
    sizeBytes: Buffer.byteLength(fileContents, "utf8"),
    readingMinutes: readingMinutes(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
  const posts: PostMeta[] = slugs.map((slug) => {
    const post: Partial<Post> = readPost(slug);
    delete post.content;
    return post as PostMeta;
  });
  const problems = checkPosts(posts);
  if (problems.length > 0) throw new Error(problems.join("\n"));
  return posts.sort(comparePosts);
}

/** Newest first; posts from the same day by title, so "latest" never depends on file names. */
export function comparePosts(a: Pick<PostMeta, "date" | "title" | "slug">, b: Pick<PostMeta, "date" | "title" | "slug">): number {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" }) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0);
}

type Searchable = Pick<PostMeta, "title" | "summary" | "excerpt" | "tags">;

/** The posts that carry the tag (when given) and contain every word of the query in title, summary, excerpt or tags. */
export function filterPosts<T extends Searchable>(posts: T[], { q = "", tag = "" }: { q?: string; tag?: string }): T[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  return posts.filter((post) => {
    if (tag && !post.tags.includes(tag)) return false;
    const haystack = [post.title, post.summary, post.excerpt, ...post.tags].join(" ").toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

/** Every tag once with how many posts use it, most used first, then by name. */
export function tagCounts(posts: Pick<PostMeta, "tags">[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) for (const tag of new Set(post.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** The page renders the title as its h1, so an article that opens with the same "# Title" line drops it. */
export function stripLeadingTitle(content: string, title: string): string {
  // Only the heading line and the blank lines after it go; the next line keeps its indentation.
  const match = /^(?:[ \t]*\r?\n)*[ \t]*#[ \t]+(.+?)[ \t]*\r?\n(?:[ \t]*\r?\n)*/.exec(content);
  return match && match[1] === title ? content.slice(match[0].length) : content;
}

export function getPost(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  if (!fs.existsSync(path.join(blogDirectory, `${slug}.mdx`))) return null;
  return readPost(slug);
}
