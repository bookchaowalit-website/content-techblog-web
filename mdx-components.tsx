import type { MDXComponents } from "mdx/types";
import { Pre } from "@/components/mdx-pre";

// Articles render as raw HTML inside the Reader shell's .rs-prose, which styles headings, lists, quotes,
// code, images and tables; only code blocks need a component (the copy button).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { pre: Pre, ...components };
}
