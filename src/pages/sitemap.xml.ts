import sitemapData from '../data/sitemap.json';

export async function GET() {
  const siteUrl = 'https://personalai.cloud';
  
  const xmlUrls = sitemapData.map(page => {
    const url = page.url === '/' ? '' : page.url;
    return `
  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.url === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
