# TechBlog design direction

## Product world
TechBlog is a local MDX technical notebook. It is a place to open one carefully written implementation note, not a content marketing dashboard.

## Visual direction
- Seed: 1df06217 — assigned PC98 sixteen-colour computer window direction.
- Material: a bounded blue-violet CRT window, scanline grain, phosphor blue and pink accents.
- Typography: serif editorial article titles inside a mono system frame.
- Composition: boot frame first, then one latest document and a visible directory list.

## Interaction
- Article index remains at /blog; the featured MDX article keeps its current slug.
- whoami remains the contact route.
- Cursor blink is restrained and disabled only by the browser's reduced-motion preference through the simple CSS animation.

## Constraints
- Preserve local MDX routes and metadata without inventing article volume.
- Keep the existing ASCII/text-art identity, but give it a deliberate system frame.
- Keep article/detail pages readable under the global dark theme.
- Avoid generic gradients, feature cards, or fake publishing statistics.


---

## Storybook

Storybook 10 (`@storybook/nextjs-vite`) shows this design system with the app's real CSS, tokens and fonts.

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/ (CI: .github/workflows/storybook.yml)
```

- **Foundations/Tokens** reads every CSS custom property the app defines at runtime, so it never drifts from the code.
- **Design/DESIGN.md** renders this file.
- **Components/**, **Sections/** and **Pages/** show the UI with mock data only (no network, analytics off).
- Toolbar: locale, theme (light / dark, when the app has a dark theme), viewports 320 / 375 / 768 / 1440. The a11y panel runs axe (WCAG 2.2 AA).
- Rule: a new shared component or page section ships with a story in `stories/`.
