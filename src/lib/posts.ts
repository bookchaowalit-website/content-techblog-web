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
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  if (!fs.existsSync(path.join(blogDirectory, `${slug}.mdx`))) return null;
  return readPost(slug);
}
