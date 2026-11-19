"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

// A Client Component because the copy button needs state; compileMDX renders the rest of the article on the server.

/** The plain text of a rendered code block. */
export function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  // <br /> inside a raw MDX <pre> draws a line break, so the copied text keeps it as one.
  if (typeof node === "object" && "type" in node && node.type === "br") return "\n";
  if (typeof node === "object" && "props" in node) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

/** MDX passes the <pre>'s own attributes (id, lang, aria-label, className…): they stay on the <pre>. */
export function Pre({ children, ...props }: ComponentProps<"pre">) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(textOf(children));
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  };
  return (
    <div className="rs-code">
      {/* tabIndex: a code block that scrolls sideways must be reachable from the keyboard. */}
      <pre {...props} tabIndex={0}>{children}</pre>
      <button type="button" className="rs-copy" data-state={state} onClick={copy}>
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed: select the code" : "Copy code"}
      </button>
      <span className="rs-sr" role="status">{state === "copied" ? "Code copied" : state === "failed" ? "Could not copy the code" : ""}</span>
    </div>
  );
}
