import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://personalai.cloud',
  integrations: [tailwind()],
  build: {
    format: 'directory',
  },
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    },
  },
});
