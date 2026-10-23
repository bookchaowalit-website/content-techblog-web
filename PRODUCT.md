# Product

<!-- impeccable:product-schema 1 -->

> Product truth inferred from the existing README, routes, content, and implementation. Confirm any missing product decisions in a future init pass.

## Platform

web

## Users

Developers and technical readers who want concise, practical notes about modern web development.

## Product Purpose

Tech Blog publishes technical articles from local MDX content. Success means a reader can discover an article, understand its premise quickly, and stay in a readable technical document.

## Positioning

The blog treats terminal/text-art notation as part of the reading experience rather than presenting another generic article grid.

## Capabilities and Constraints

- Next.js App Router with MDX blog content.
- Blog listing and individual article routes.
- Responsive layout and dark-mode support are existing product requirements.
- Content is local and authored; do not invent authors, readership, or performance claims.

## Evidence on Hand

- `content/blog/modern-react-development-best-practices.mdx`
- `src/app/`, `src/components/`, and the existing README.

## Product Principles

- Make the technical question visible before the implementation detail.
- Let the article remain the primary artifact.
- Keep the system honest about locally authored content.

## Current state (2026-10-23)

What it is: a public technical notebook of five MDX articles in `content/blog/` (calendar dates vs instants, fetch
response contracts, array updates that keep previous state, pure timer transitions, storage round-trips), each with a
runnable `~~~js` example that the tests execute. For developers who want small, checkable notes. The author shown is
"Technical Notes"; no readership, performance or customer claims are made.

What works today:

- Home page with the real latest article, article count and reading times (until 2026-10-23 it showed a hard-coded 2024
  article, "1 article" and "14 min read"); article index `/blog`; article pages `/blog/<slug>`, statically generated.
- One loader (`src/lib/posts.ts`) validates frontmatter (title, summary, excerpt, author, real date), rejects duplicate
  or unsafe slugs, normalises tags and reading time; a broken article fails the build.
- Tests: articles compile and their examples run, the loader rules, Sentry scrubbing (`tests/`). CI runs lint,
  typecheck, tests, build and the shared security scan.
- Errors are reported to Sentry (project `content-techblog-web`) when `NEXT_PUBLIC_SENTRY_DSN` is set, errors only and
  with request data, query strings and request paths stripped.

What is not true or not done:

- No syntax highlighting: `rehype-highlight` is installed but not wired into the article renderer.
- No performance evidence (no Lighthouse results are committed); the earlier portfolio claim of perfect scores was
  removed in the card claims review.
- `/contact` is a static profile page with links; there is no contact form.
- Vercel Web Analytics and Speed Insights components are mounted, but no custom events exist and no KPI baseline has
  been captured (see `docs/measurement/KPI-PLAN.md`).

Live and deploy state: https://techblog.bookchaowalit.com (Vercel project `bookchaowalit-techblog-frontend`). The
Next.js security patch build was deployed by CLI on 2026-10-23 (D9a). Pushes to `main` do not deploy (the Vercel
project is linked to the old repository name), so the 375px hero fix, the data-driven home page, the domain fix and
Sentry reach the live site only after the owner reconnects Vercel Git (D9) or approves another CLI deploy.
