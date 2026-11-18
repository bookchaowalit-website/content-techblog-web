# TechBlog design direction

Since 2026-11-19 the blog runs on the shared **Reader shell** (see [READER.md](READER.md)); it is the
pilot and the source of truth for the shell files. The earlier PC98 terminal window direction (seed
1df06217) was retired with the 2026-11-11 UX review: its 8–10px labels, hidden phone navigation,
clipped ASCII banner and fixed clock/memory values did not meet the shared floor.

## Product world
A local MDX technical notebook: open one carefully written implementation note, not a content
marketing dashboard.

## Pages
- `/`: head (one sentence on what the notes cover), the three newest notes, every topic with its count.
- `/blog`: search (`?q=`), topic chips (`?tag=`), a result count, rows, and empty states for "no articles
  yet" and "nothing matches".
- `/blog/<slug>`: back link, tags, title, excerpt as lede, date, reading time and author, the MDX body in
  prose styles with a copy button on code blocks, share links, previous/next in index order.
- `/contact`: the author's profile, skills and experience as prose, with Email, LinkedIn and GitHub.

## Constraints
- Preserve local MDX routes and metadata without inventing article volume, readers or performance.
- Posts on the same date are ordered by title, so "latest" never depends on file names.
- Light and dark follow the system setting; forced colors keep every control visible.
