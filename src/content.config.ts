import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Equipe SolBotz'),
    category: z.string().default('Automação & IA'),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    readTime: z.string().default('5 min de leitura'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
