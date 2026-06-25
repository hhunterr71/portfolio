---
title: Portfolio Site Rebuild (Astro + Tailwind)
summary: A from-the-ground-up rebuild of this site — same goal as the original, a very different process for getting there.
tags: [coding, personal]
repoUrl: https://github.com/hhunterr71/portfolio
codeAvailable: true
order: 8
---

## Description

This is the site you're looking at right now. The first version was a single hand-written HTML file styled with Bootstrap — my introduction to HTML, CSS, and JavaScript, built one Stack Overflow search at a time over several weeks. It worked, but it showed: three sections (resume, projects, creative content) that felt like three separate sites bolted together, and adding a new project meant copy-pasting ~80 lines of accordion markup and hoping I didn't break the layout.

## What changed this time

Rather than rebuild it the same way, I used Claude (Anthropic's coding agent) as a collaborator for the entire process — starting with a structured interview to actually pin down the design decisions (page structure, content modeling, visual identity, deployment) before any code was written, captured as architecture decision records and a project glossary rather than just "vibes." From there, the build moved fast: Astro for static-site generation with Markdown content collections (so adding a project is now "write a Markdown file," not "copy-paste HTML"), Tailwind for a custom design system instead of generic Bootstrap defaults, and a GitHub Actions workflow so deploying is still just `git push`.

The honest comparison: the first build took weeks of learning HTML/CSS/JS from scratch. This rebuild went from a design conversation to a working, deployed site in a single sitting — not because the work got easier, but because AI-assisted iteration collapsed the distance between "I have an idea" and "it's built and correct."

## Code Sample

Every project and creative post on this site is just a Markdown file — the schema below (in `src/content.config.ts`) is what makes that possible. Adding a project is "write a `.md` file matching this shape," not "copy-paste HTML."

```ts
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    codeAvailable: z.boolean().default(true),
    order: z.number().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).optional(),
  }),
});
```

## Methods and Tools

1. **Astro:** static-site generation with Markdown content collections for Projects and Creative posts.
2. **Tailwind CSS:** custom design tokens (palette, type) instead of a component framework's defaults.
3. **GitHub Pages + GitHub Actions:** free static hosting with an automated build-and-deploy pipeline.
4. **Claude (Anthropic):** design interview, architecture decisions, and implementation, working from an explicit plan rather than ad hoc edits.

## Next Steps

1. Populate the Creative page with real photo and video content.
2. Revisit a custom domain once the GitHub Pages default has had some time to live.
