"use client";

import { useState, type ReactNode } from "react";

// A Client Component because the copy button needs state; compileMDX renders the rest of the article on the server.

/** The plain text of a rendered code block. */
export function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

export function Pre({ children }: { children?: ReactNode }) {
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
      <pre tabIndex={0}>{children}</pre>
      <button type="button" className="rs-copy" onClick={copy}>{state === "copied" ? "Copied" : "Copy code"}</button>
      <span className="rs-sr" role="status">{state === "copied" ? "Code copied" : state === "failed" ? "Could not copy the code" : ""}</span>
    </div>
  );
}
