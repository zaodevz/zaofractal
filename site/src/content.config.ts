import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Source content from the parent repo folders. Paths are relative to the
// site/ directory at build time. Astro's glob loader handles `..` traversal.

const reference = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../reference' }),
  schema: z.object({
    title: z.string().optional(),
  }).passthrough(),
});

// Permissive coercion - YAML auto-parses dates, numbers, booleans, nulls, arrays.
// Accept anything (any) and coerce to a display string downstream.
const flexString = z.any()
  .transform((v) => {
    if (v == null) return '';
    if (Array.isArray(v)) return v.map(String).join(', ');
    return String(v);
  })
  .optional();

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../research' }),
  schema: z.object({
    topic: flexString,
    type: flexString,
    status: flexString,
    'last-validated': flexString,
    tier: flexString,
    'original-query': flexString,
    'related-docs': flexString,
    'parent-doc': flexString,
    'superseded-by': flexString,
  }).passthrough(),
});

const whitepaper = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../whitepaper' }),
  schema: z.object({}).passthrough(),
});

export const collections = { reference, research, whitepaper };
