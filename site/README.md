# site/

Astro 5 static site that auto-renders all `.md` files in this repo (`reference/`, `research/`, `whitepaper/`) as styled HTML at `fractal.thezao.com`.

## Local dev

```bash
cd site
npm install
npm run dev
```

Opens at `http://localhost:4321`. Hot-reloads when any `.md` in the parent repo changes.

## Build

```bash
cd site
npm run build
```

Outputs static HTML to `site/dist/`. Deploy that folder anywhere static (Vercel, Cloudflare Pages, Netlify, S3).

## How it works

- `src/content.config.ts` defines three content collections: `reference`, `research`, `whitepaper`. Each uses Astro's `glob` loader to read `.md` files from the parent directories (`../reference/`, `../research/`, `../whitepaper/`).
- `src/pages/{reference,research,whitepaper}/[...slug].astro` dynamic routes render each doc through `DocLayout.astro`.
- `src/pages/resources.astro` inline-renders the root `RESOURCES.md` using the `marked` library.
- `src/styles/global.css` is the BCZ-style dark theme (dark `#0a0a1a` bg, orange + cyan + gold accents, Syne 800 headings, Outfit body).

## Adding new content

Just write more `.md` files in `../reference/`, `../research/`, or `../whitepaper/`. The site picks them up automatically on next build. No code changes needed.

## Deployment

Recommended: Vercel.

1. Connect the `ZAODEVZ/ZAOfractal` repo to Vercel.
2. Vercel will pick up the root `vercel.json` which already points the build at `site/`.
3. Set the production domain to `fractal.thezao.com` (or whatever subdomain ZAO assigns).
4. Push to `main` -> auto-deploy.

Alternative: Cloudflare Pages, Netlify, GitHub Pages with a custom action - same `dist/` output.

## Known limitations (v0.1)

- Internal links in `.md` files that reference paths like `../696-respect-fractal-lineage-summary/` will 404 because those docs live in the ZAO OS V1 research library, not in this repo. A future build step could rewrite or annotate these.
- No full-text search yet. Add Pagefind or `@docsearch/react` in a follow-up sprint.
- No print stylesheet for the whitepaper. Add Pandoc-based PDF export in a follow-up.
