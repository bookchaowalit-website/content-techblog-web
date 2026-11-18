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
- All five articles carry the same date (2026-10-15); the index orders them by title within a day.
- No analytics: Vercel Web Analytics and Speed Insights were removed on 2026-11-19 (shared shell rule), so no KPI
  baseline exists (see `docs/measurement/KPI-PLAN.md`).

Live and deploy state: https://techblog.bookchaowalit.com (Vercel project `bookchaowalit-techblog-frontend`;
tech.bookchaowalit.com redirects there). Checked 2026-11-19: the project's Git link is
`bookchaowalit-website/content-techblog-web`, branch `main`, and pushes to `main` deploy production from Git (last
Git production deploy 2026-11-14, commit 65316ad). A second, older Vercel project `tech-blog` (tech.ionomad.net) is
linked to the same repository; its last deploy was 2026-02-28 from the pre-rename repository.

## Reader shell move (2026-11-19)

The site moved onto the shared Reader shell (READER.md): article search (`/blog?q=`) and topic filters
(`/blog?tag=`), empty states, previous/next links, an About page on the shell, a generated sitemap, and
`/more-projects` now redirects (308) to https://bookchaowalit.com/. The placeholder Google verification code,
the SearchAction pointing at a missing `/search` page, the `example.com` email and the unverifiable LinkedIn
count and response-time claims were removed.
