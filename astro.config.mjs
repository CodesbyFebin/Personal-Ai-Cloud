import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://personalai.cloud',
  integrations: [tailwind()],
  build: {
    format: 'directory',
  },
});
