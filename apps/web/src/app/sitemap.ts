import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://personalai.cloud';
  const now = new Date();

  const staticPages = [
    '', '/pricing', '/self-hosted', '/whatsapp', '/android', '/privacy', '/terms',
    '/templates/student', '/templates/founder', '/templates/malayalam-assistant',
    '/templates/developer', '/templates/entrepreneur', '/templates/researcher',
    '/templates/creative', '/templates/business', '/templates/education',
    '/templates/health', '/templates/finance', '/templates/legal',
    '/templates/sales', '/templates/support', '/templates/content',
    '/templates/data', '/templates/productivity',
    '/hi', '/ml', '/ta',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const templates = await prisma.aIAgent.findMany({
    where: { isTemplate: true },
    select: { slug: true, updatedAt: true },
  });
  const templatePages = templates.map((t) => ({
    url: `${baseUrl}/agents/${t.slug}`,
    lastModified: t.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const docsPages = [
    '/docs/getting-started', '/docs/whatsapp-setup', '/docs/memory-management',
    '/docs/api-reference', '/docs/self-hosting/docker', '/docs/self-hosting/ollama',
    '/docs/self-hosting/aws', '/docs/self-hosting/gcp', '/docs/self-hosting/azure',
    '/docs/agents/create', '/docs/agents/templates', '/docs/agents/memory',
    '/docs/channels/whatsapp', '/docs/channels/android', '/docs/channels/web',
    '/docs/billing/razorpay', '/docs/billing/invoices', '/docs/billing/subscriptions',
    '/docs/security/encryption', '/docs/security/privacy', '/docs/security/compliance',
    '/docs/advanced/prompts', '/docs/advanced/rag', '/docs/advanced/webhooks',
    '/docs/advanced/api', '/docs/troubleshooting', '/docs/faq',
    '/docs/roadmap', '/docs/changelog', '/docs/support',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...templatePages, ...docsPages];
}
