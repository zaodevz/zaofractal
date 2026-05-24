// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The repo lives at github.com/ZAODEVZ/ZAOfractal.
// Public site is intended for fractal.thezao.com - update when DNS is configured.
export default defineConfig({
  site: 'https://fractal.thezao.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  build: {
    format: 'directory',
  },
});
