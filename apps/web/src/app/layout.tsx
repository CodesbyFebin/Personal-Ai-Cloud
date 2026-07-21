import type { Metadata } from 'next';
import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: {
    default: 'PersonalAI - Your Personal AI Assistant | personalai.cloud',
    template: '%s | personalai.cloud',
  },
  description: 'Your Personal AI, Everywhere You Are. Connect AI to WhatsApp, Android, and Web with persistent memory. Built in India, for India.',
  keywords: ['personal ai', 'ai assistant', 'whatsapp ai', 'android ai', 'persistent memory', 'rag', 'langchain', 'openai', 'anthropic', 'ollama', 'self-hosted', 'privacy', 'india', 'ai chatbot', 'memory ai', 'assistant'],
  authors: [{ name: 'PersonalAI' }],
  creator: 'PersonalAI',
  publisher: 'PersonalAI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://personalai.cloud',
    siteName: 'PersonalAI',
    title: 'PersonalAI - Your Personal AI Assistant',
    description: 'Your Personal AI, Everywhere You Are. Connect AI to WhatsApp, Android, and Web with persistent memory.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PersonalAI - Your Personal AI Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PersonalAI - Your Personal AI Assistant',
    description: 'Your Personal AI, Everywhere You Are.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5F0' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href="https://personalai.cloud/" />
        <link rel="alternate" hrefLang="hi" href="https://personalai.cloud/hi" />
        <link rel="alternate" hrefLang="ml" href="https://personalai.cloud/ml" />
        <link rel="alternate" hrefLang="ta" href="https://personalai.cloud/ta" />
        <link rel="alternate" hrefLang="x-default" href="https://personalai.cloud/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'PersonalAI',
              applicationCategory: 'AIApplication',
              operatingSystem: 'Web, Android, WhatsApp',
              description: 'Your Personal AI, Everywhere You Are. Connect AI to WhatsApp, Android, and Web with persistent memory.',
              url: 'https://personalai.cloud',
              author: {
                '@type': 'Organization',
                name: 'PersonalAI',
                url: 'https://personalai.cloud',
              },
              offers: [
                {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'INR',
                  description: 'Free Plan - 1 AI Agent',
                },
                {
                  '@type': 'Offer',
                  price: '499',
                  priceCurrency: 'INR',
                  description: 'Starter Plan',
                },
                {
                  '@type': 'Offer',
                  price: '1499',
                  priceCurrency: 'INR',
                  description: 'Pro Plan',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
