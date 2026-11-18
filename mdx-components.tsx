import type { MDXComponents } from "mdx/types";
import { Pre } from "@/components/mdx-pre";
import { TableScroll } from "@/components/reader-shell";

// Articles render as raw HTML inside the Reader shell's .rs-prose, which styles headings, lists, quotes, code,
// images and tables. The page already has its h1 (ArticleHeader), so a "#" heading in the content becomes an h2;
// tables scroll inside their own region; code blocks get the copy button.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h2>{children}</h2>,
    table: ({ children }) => <TableScroll label="Table"><table>{children}</table></TableScroll>,
    pre: Pre,
    ...components,
  };
}
