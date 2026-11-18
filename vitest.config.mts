import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Vitest runs the mounted (happy-dom) tests for the Reader shell and the pages; the older node:test files
// (tests/*.test.mjs) still run first in `npm test`. The coverage gate covers what Vitest renders.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/app/**/page.tsx", "src/app/sitemap.ts", "src/components/**/*.tsx", "src/lib/posts.ts", "mdx-components.tsx"],
      thresholds: { lines: 90 },
    },
  },
});
