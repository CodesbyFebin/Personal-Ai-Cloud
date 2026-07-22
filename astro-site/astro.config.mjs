import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
export default defineConfig({
  site: 'https://personalai.cloud',
  integrations: [sitemap(), tailwind()]
});
