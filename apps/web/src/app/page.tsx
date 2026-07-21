import Link from 'next/link';
import { MessageSquare, Smartphone, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PersonalAI - Your Personal AI Assistant | personalai.cloud',
  description: 'Your Personal AI, Everywhere You Are. Connect AI to WhatsApp, Android, and Web with persistent memory. Built in India, for India. Start free.',
  keywords: ['personal ai', 'ai assistant', 'whatsapp ai', 'android ai', 'persistent memory', 'rag', 'langchain', 'openai', 'anthropic', 'ollama', 'self-hosted', 'privacy', 'india', 'ai chatbot', 'memory ai', 'assistant'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://personalai.cloud',
    siteName: 'PersonalAI',
    title: 'PersonalAI - Your Personal AI Assistant',
    description: 'Your Personal AI, Everywhere You Are. Connect AI to WhatsApp, Android, and Web with persistent memory.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PersonalAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PersonalAI - Your Personal AI Assistant',
    description: 'Your Personal AI, Everywhere You Are.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const agentCount = await prisma.aIAgent.count({ where: { isTemplate: true } });
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">India's #1 Personal AI Platform</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Personal AI,
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Everywhere You Are
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl">
              One AI assistant that lives inside WhatsApp, on your Android phone, and in your browser. It remembers your life, automates your tasks, and keeps your data 100% private.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-xl">
                Create Your Free AI <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/whatsapp" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                <MessageSquare className="w-5 h-5" /> Setup on WhatsApp
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm">
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-300" /><span>Persistent Memory</span></div>
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-300" /><span>WhatsApp & Android Native</span></div>
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-300" /><span>Self-Hosted Options</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
