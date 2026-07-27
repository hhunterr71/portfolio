# Hunter Hamilton — Portfolio

Personal site — a Hub aimed at landing consulting/contract work, backed by a project portfolio and creative (photo/video) content, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages via GitHub Actions.

**Live site**: https://hhunterr71.github.io/portfolio

See [CONTEXT.md](./CONTEXT.md) for the project glossary and [docs/adr](./docs/adr) for the architectural decisions behind this rebuild.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # static build to ./dist
npm run preview  # preview the production build
```

> Astro's dev server runs as a persistent background daemon (`astro dev status` / `astro dev stop`). If content or schema changes don't seem to show up, run `npx astro dev stop` before restarting — a long-running daemon can serve a stale content-collection cache.

## Folder structure

```
src/
├── pages/            routes (file path = URL)
│   ├── index.astro         → / (Hub)
│   ├── creative.astro      → /creative/
│   └── projects/
│       ├── index.astro     → /projects/
│       └── [slug].astro    → /projects/<project-name>/
│
├── components/       shared UI
│   ├── NavBar.astro, Footer.astro   ← résumé link lives in Footer.astro
│   ├── ProjectCard.astro, ProjectFilters.astro
│   ├── CreativePost.astro, Carousel.astro, ScrollCue.astro
│   └── hub/                 Hub-page-only sections (Hero, ConsultedWith, Methodology, SelectedProjects, OutsideBlueprint, FeaturedFilm)
│
├── content/          the actual written content (Markdown)
│   ├── projects/*.md
│   └── creative/*.md
├── content.config.ts schema/validation for the collections above
│
├── assets/hub/       images used only on the Hub (logos/, blueprint/)
├── layouts/BaseLayout.astro   page shell — fonts, `<head>`, shared reveal-animation script
└── styles/global.css design tokens (colors, fonts) + animation CSS
```

The site's deployed URL and base path are set in `astro.config.mjs` (`site` + `base`); every internal link is prefixed via the `withBase()` helper in `src/lib/url.ts` so links resolve correctly under `/portfolio`.

## Adding content

- **Projects**: add a Markdown file to `src/content/projects/` (see existing entries for the frontmatter shape — `title`, `summary`, `tags`, `year`, `order`, `featured`, etc.). `featured: true` puts it in the Hub's Selected Projects (cap at 6); `order` drives sort on the full Projects archive.
- **Creative posts**: add a Markdown file to `src/content/creative/` with a short `summary` (shown in the list), `media` entries (image or video embed), and the full write-up as the Markdown body (revealed via the "Read More" toggle).

## Contact

- Email: hunter.j.hamilton1@gmail.com
- LinkedIn: https://www.linkedin.com/in/hunter-hamilton1234/
- Résumé: https://docs.google.com/document/d/1HSaZ9kOtFD6l0Zl3YZFvRx6VcQVaKKpk/edit?pli=1
