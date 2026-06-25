# Hunter Hamilton — Portfolio

Personal site unifying my professional resume, project portfolio, and creative (photo/video) content under one design, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages via GitHub Actions.

See [CONTEXT.md](./CONTEXT.md) for the project glossary and [docs/adr](./docs/adr) for the architectural decisions behind this rebuild.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # static build to ./dist
npm run preview  # preview the production build
```

## Adding content

- **Projects**: add a Markdown file to `src/content/projects/` (see existing entries for the frontmatter shape).
- **Creative posts**: add a Markdown file to `src/content/creative/` with `media` entries (images or video embed URLs) and an optional write-up; set `featured: true` to pin it to the showcase row.

## Contact

- Email: hhunterr71@gmail.com
- LinkedIn: https://www.linkedin.com/in/hunter-hamilton1234/
