import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tags: z.array(z.string()),
      repoUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      codeAvailable: z.boolean().default(true),
      order: z.number().optional(),
      images: z.array(z.object({ src: image(), alt: z.string() })).optional(),
    }),
});

const creative = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/creative' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      featured: z.boolean().default(false),
      tags: z.array(z.string()).optional(),
      media: z.array(
        z.discriminatedUnion('type', [
          z.object({ type: z.literal('image'), src: image(), alt: z.string().optional() }),
          z.object({ type: z.literal('video-embed'), src: z.string(), alt: z.string().optional() }),
        ])
      ),
    }),
});

export const collections = { projects, creative };
