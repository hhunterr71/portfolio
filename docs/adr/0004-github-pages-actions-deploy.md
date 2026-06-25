# Deploy via GitHub Pages + GitHub Actions, defer custom domain

The site stays on free GitHub Pages hosting (repo renamed `Resume` → `portfolio`, base path `/portfolio/`) rather than adding a custom domain now — that's a config-only change to revisit later, not worth blocking on. Since Astro requires a build step (unlike the current "edit `index.html`, push" workflow), a GitHub Actions workflow builds and publishes on every push to `main`, preserving the existing "just push" feel instead of requiring a manual local build-and-commit step.
