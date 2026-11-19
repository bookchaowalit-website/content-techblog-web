import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { remarkRawJsxReaderRules, useMDXComponents } from "../../mdx-components";

/**
 * Compiles an article body the way /blog/[slug] shows it: GitHub-flavoured Markdown (tables, task lists,
 * strikethrough, autolinks), a table of contents when the article asks for one, and the shell components
 * (tables in a scroll region, content h1 as h2, code blocks with a copy button), for Markdown and raw JSX alike.
 */
export async function compileArticle(source: string) {
  const { content } = await compileMDX({
    source,
    options: { mdxOptions: { remarkPlugins: [remarkGfm, remarkToc, remarkRawJsxReaderRules] } },
    // useMDXComponents is the MDX naming convention, not a React Hook (it calls no hooks).
    // eslint-disable-next-line react-hooks/rules-of-hooks
    components: useMDXComponents({}),
  });
  return content;
}
