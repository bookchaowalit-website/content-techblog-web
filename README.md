# Tech Blog

A modern tech blog built with Next.js, featuring a unique Text-Art ASCII design aesthetic.

Live: https://techblog.bookchaowalit.com — five articles. Product truth and limits: [PRODUCT.md](PRODUCT.md).

```
┌┬┐┌─┐┌─┐┬ ┬  ┌┐ ┬  ┌─┐┌─┐
 │ ├┤ │  ├─┤  ├┴┐│  │ ││ ┬
 ┴ └─┘└─┘┴ ┴  └─┘┴─┘└─┘└─┘
```

## Features

- 🚀 **Next.js 16** with App Router
- 🎨 **shadcn/ui** components
- 📝 **MDX** for blog content
- 🎯 **Text-Art ASCII** design theme
- 📱 **Responsive** design
- 🌙 **Dark mode** support
- ⚡ **Vercel** ready deployment

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Content**: MDX
- **Deployment**: Vercel

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home page
│   ├── blog/
│   │   ├── page.tsx       # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx   # Individual blog posts
│   └── globals.css        # Global styles + Text-Art theme
├── components/
│   └── ui/                # shadcn/ui components
└── lib/
    └── utils.ts           # Utility functions

content/
└── blog/
    └── *.mdx              # Blog posts in MDX format
```

## Adding Blog Posts

Create new MDX files in the `content/blog/` directory:

```mdx
---
title: "Your Tech Post Title"
date: "2024-01-15"
summary: "What the reader can reproduce"
excerpt: "What the reader can reproduce"
author: "Technical Notes"
tags: ["react", "javascript", "frontend"]
---

# Your Tech Post Title

Your technical content here...
```

## Text-Art Design System

The blog features a unique ASCII/terminal-inspired design with:

- **ASCII Headers**: Terminal-style typography
- **Monospace Fonts**: Code/terminal aesthetic
- **Terminal Borders**: Box-drawing characters
- **Blinking Cursors**: Animated terminal elements
- **Command-line Navigation**: Unix-style breadcrumbs

**Note on `mdx-components.tsx`:** this file's custom h1–h3/code/pre/
blockquote overrides — the actual implementation of the terminal aesthetic
above, for article body content — were defined but never applied. Next.js's
`useMDXComponents` convention auto-wires for `@next/mdx` file-based `.mdx`
page routes; this blog instead loads posts from `content/blog/*.mdx` at
runtime via `next-mdx-remote/rsc`'s `compileMDX()`, which needs its
`components` passed explicitly and wasn't receiving them. Every blog post
was rendering as unstyled default HTML. Fixed in `src/app/blog/[slug]/page.tsx`.
The `pre` override (a copy-to-clipboard button) also needed splitting into
its own `"use client"` file (`src/components/mdx-pre.tsx`) once wired up —
`compileMDX`'s Server Component render tree can't run `useState` inline.

## Deployment

The live site is the Vercel project `bookchaowalit-techblog-frontend`, deployed with the Vercel CLI (there is no
`vercel.json`). That project is still linked to the repository's old name, so pushes to `main` run CI (lint, typecheck,
tests, build, security scan) but do not deploy. The owner reconnects Vercel Git (D9) or approves a CLI deploy.

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for developers, by developers using Next.js, shadcn/ui, and MDX

## Related

- **Mobile App:** [bookchaowalit-techblog-mobile](https://github.com/bookchaowalit-mobile/bookchaowalit-techblog-mobile)
- **Portfolio:** [bookchaowalit.com](https://bookchaowalit.com)


## Article verification

Five technical articles live under `content/blog/`. Frontmatter includes title,
date, summary, excerpt (the list-page field), author and tags. The four new
articles use synthetic data and link to primary documentation; they do not
claim personal experience, customer outcomes or deployed results.

~~~bash
npm ci
npm test
npm run lint
npm run typecheck
npm run build
~~~

The Node test runner checks every article's metadata, compiles its MDX with the
same compiler used by `/blog/[slug]`, and executes each complete JavaScript
example. Use Node 22+ for the test command. A production preview of each slug
checks the real page and component wiring. Publication remains a separate
owner-reviewed release step.
