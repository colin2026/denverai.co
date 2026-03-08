// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://denverai.co',
  server: {
    host: true,
    port: 4400
  },
  preview: {
    host: true,
    port: 4400
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
