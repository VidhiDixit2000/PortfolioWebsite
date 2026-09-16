# Vidhi Dixit — Portfolio

Personal portfolio built as a bento-grid landing page: eight cards, each a
doorway into a detail page (Experience, Education, Projects, Blogs,
Contacts/Socials, Resume). Click a card and it collapses into a full
detail view with real content; click "Back" to return.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for all animation (hover, card collapse/expand, ink-pour
  heading, staggered content reveal)
- Hand-written SVG illustrations with CSS-only `@keyframes` (no runtime JS)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows note:** this project must be run from `C:\...\portfolio`, not
> a drive-letter junction/symlink to it — Turbopack can't resolve files
> across one. See `CLAUDE.md` for details if you hit a `Symlink ... points
> out of the filesystem root` error.

## Project structure

```
src/
  app/page.tsx          # the whole grid + click/collapse/detail state machine
  app/globals.css        # design tokens, bento grid layout (real CSS, not Tailwind)
  components/
    BentoCard.tsx         # one grid tile: fill, heading, illustration, animation
    DetailView.tsx         # shared detail-page chrome (heading, back button, reveal)
    detail/*.tsx            # per-section body content (Experience, Projects, ...)
  data/*.ts               # all real content — profile, experience, projects, blogs,
                            # education. Components render from here, nothing is
                            # hardcoded in JSX.
public/
  illustrations/*.svg     # the hand-drawn card + social icon SVGs
  resume/*.pdf            # the downloadable resume
```

## Content

Everything under `src/data/` is the actual source of truth (bio, work
history, projects, skills, blog posts). Update the data file, not the
component, when the content itself changes.

## Status

Done: the 8-card grid, hover states, click → collapse → detail-page
sequence, ink-pour heading, and real content on 6 of 8 cards.

Still open:

- **AI agent card** — placeholder tile only, no matching logic/UI yet
- **Blogs** — manually seeded from dev.to; the live API pull described in
  `CLAUDE.md` isn't wired up
- **Not deployed** — no commits yet, nothing pushed

## Deploying

No git remote is configured yet. Once one exists, this deploys cleanly
to [Vercel](https://vercel.com) as a standard Next.js app — no special
build config needed.

---

See `CLAUDE.md` for the full design spec (palette, typography, layout,
interaction detail) this project was built against.
