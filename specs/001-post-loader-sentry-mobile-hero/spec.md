---
title: "SPEC-001 — Tested post loader, truthful home page, Sentry and the 375px hero"
status: implemented
tags: [spec, sdd, tdd, ci, sentry, ui]
created: 2026-10-23
updated: 2026-10-23
description: "One validated post loader for the home page, index and articles; a home page that shows the real articles; Sentry without personal data; and a hero and article index that fit at 375px."
---

# SPEC-001 — Tested post loader, truthful home page, Sentry and the 375px hero

Standard: ADR-0004 (TDD + SDD). Plan: Big Loop, Tier B showcase wave (b-tier-b), roadmap tasks tb-t2, tb-t4 (live
link), tb-t5 (index banners).

## Document control

| Field | Value |
|---|---|
| Spec ID / version | SPEC-001 / 1.0 |
| Status | implemented |
| Repository | bookchaowalit-website/content-techblog-web |
| Maker | Claude Code (b-tier-b session) |
| Approver | Owner (bookchaowalit) |

## 1. Problem and outcome

- **Problem:** the index and article routes each parsed frontmatter their own way with no validation; the home page was
  hard-coded to a 2024 article, "1 article" and "14 min read" although five 2026 articles exist; article routes had no
  `generateStaticParams`; structured data, metadataBase and share links used `tech.bookchaowalit.com`, which does not
  resolve; at 375px the hero headline and intro were clipped on the right and the article index was 515px wide; the
  index ASCII banners lost their line breaks and were read out by screen readers; no error reporting.
- **Outcome:** one tested loader; the home page shows the real latest article, count and reading times; articles are
  statically generated; URLs use `techblog.bookchaowalit.com`; the hero and index fit at 375/768/1440; errors reach
  Sentry without personal data.

## 2. Acceptance criteria and tests

| AC | Given / When / Then | Test |
|---|---|---|
| AC-01 | Tags from a list, a comma-separated string or nothing are normalised; reading time rounds up at 200 words/min, minimum 1 | `tests/posts.test.mjs` |
| AC-02 | Missing title/summary/excerpt/author or a non-calendar date is reported by name and fails the build | `tests/posts.test.mjs` |
| AC-03 | Slugs that collide ignoring case are rejected; `../` and unknown slugs return null | `tests/posts.test.mjs` |
| AC-04 | The five published articles are valid, newest first, readable by slug, compile to HTML and their `~~~js` examples run | `tests/posts.test.mjs`, `tests/content.test.mjs` |
| AC-05 | Sentry: off without `NEXT_PUBLIC_SENTRY_DSN`; errors only; request, user, extra, frame locals, non-platform contexts and URL query strings (transaction, tags, messages, frame paths, debug images) removed | `tests/sentry.test.mjs` |
| AC-06 | Home shows the real latest article and counts; hero and index fit at 375 with no overflow; banners are `aria-hidden` with `sr-only` text and the index has an `h1` | UI review (section 4) |

## 3. Red-first evidence

| Commit | Red run | Green |
|---|---|---|
| fde94d9 | `tests/posts.test.mjs` failed: `src/lib/posts.ts` did not exist | 5/5 posts cases |
| 59e4b79 | `tests/sentry.test.mjs` failed: `src/lib/sentry.ts` did not exist; the URL-query case then failed against the earlier scrubber (5 pass, 1 fail) | 6/6 |

`tests/content.test.mjs` existed before this spec and still passes.
CI: run 39907345541 (09542fb) succeeded — https://github.com/bookchaowalit-website/content-techblog-web/actions/runs/39907345541

## 4. UI review (375 / 768 / 1440)

Local production build (`next build --turbopack && next start`), full-page screenshots of `/`, `/blog` and
`/blog/fetch-response-contracts` at 375, 768 and 1440 (`~/work/b-tier-b/shots/content-techblog-web-l3/`). Looked at
every image:

- Home 375: "Notes from the / implementation / layer." and the intro now sit inside the window (before: clipped at
  "the", "implementatio", "software", "TypeScript ed"). Latest document is "Separate calendar dates from instants"
  (2026-10-15), directory lists "5 articles" and three real files with their reading times. 1440 unchanged in layout.
- `/blog` 375: page width 375 (before 515); file metadata wraps, the `cat <slug>.mdx` button truncates; the footer
  banner keeps its box shape.
- Article page: renders; overflow 0 at all widths.
- Console: two 404s for `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` (Vercel-only); the
  📄 emoji shows as a box in the headless browser (no emoji font), not a page defect.

Sign-off: Claude Code (b-tier-b session), 2026-10-23.

## 5. Out of scope (follow-ups)

- Syntax highlighting (`rehype-highlight` is installed, not wired).
- The article page's top `cat <slug>.mdx` bar crowds the buttons at 375; axe pass for the home ASCII art and contrast.
- `og-blog-<slug>.jpg` and `/og-blog.jpg` images referenced in metadata do not exist in `public/`.

## 6. Deploy state

The live site runs the Next.js patch build deployed by CLI on 2026-10-23 (D9a), so it still shows the clipped hero and
the hard-coded home page. This spec is on `main` but not live: the Vercel project `bookchaowalit-techblog-frontend` is
linked to the old repository name, so pushes do not deploy (owner action D9). No deploy workflow is added on purpose.
