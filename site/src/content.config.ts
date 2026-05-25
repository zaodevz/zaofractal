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
// For Date values, emit YYYY-MM-DD (matching how the source MD frontmatter authored them).
const flexString = z.any()
  .transform((v) => {
    if (v == null) return '';
    if (v instanceof Date) {
      const yyyy = v.getUTCFullYear();
      const mm = String(v.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(v.getUTCDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
    if (Array.isArray(v)) return v.map((x) => x instanceof Date ? x.toISOString().slice(0, 10) : String(x)).join(', ');
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
