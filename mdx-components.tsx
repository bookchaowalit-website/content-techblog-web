import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { Pre } from "@/components/mdx-pre";
import { TableScroll } from "@/components/reader-shell";

// Articles render as raw HTML inside the Reader shell's .rs-prose, which styles headings, lists, quotes, code,
// images and tables. The page already has its h1 (ArticleHeader), so a "#" heading in the content becomes an h2;
// tables scroll inside their own region; code blocks get the copy button.
const ContentH1 = (props: ComponentProps<"h1">) => <h2 {...props} />;
const ContentTable = (props: ComponentProps<"table">) => <TableScroll label="Table"><table {...props} /></TableScroll>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ContentH1,
    table: ContentTable,
    // Raw JSX <h1>, <table> and <pre> written in an article are renamed to these by remarkRawJsxReaderRules,
    // so they follow the same rules as their Markdown forms.
    ReaderContentH1: ContentH1,
    ReaderContentTable: ContentTable,
    ReaderContentPre: Pre,
    pre: Pre,
    ...components,
  };
}

type MdxNode = { type: string; name?: string | null; children?: MdxNode[] };
const RAW_JSX_RENAMES: Record<string, string> = { h1: "ReaderContentH1", table: "ReaderContentTable", pre: "ReaderContentPre" };

/**
 * MDX passes lowercase JSX tags such as <h1>, <table> or <pre> straight through, past the components map. This
 * remark plugin renames them to the mapped components above, so raw JSX gets the h1 → h2 demotion, the
 * TableScroll wrapper and the code block (copy button, keyboard-scrollable) too.
 */
export function remarkRawJsxReaderRules() {
  const walk = (node: MdxNode) => {
    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name && RAW_JSX_RENAMES[node.name]) {
      node.name = RAW_JSX_RENAMES[node.name];
    }
    node.children?.forEach(walk);
  };
  return (tree: MdxNode) => walk(tree);
}
