import Link from 'next/link';
import { Check } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans | personalai.cloud',
  description: 'Simple, transparent pricing for PersonalAI. Start free with 1 agent, scale to ₹499 or ₹1,499/month. Self-hosted option available.',
  keywords: ['pricing', 'plans', 'subscription', 'free ai', 'paid ai', 'starter plan', 'pro plan', 'self-hosted', 'inr', 'razorpay'],
  openGraph: {
    title: 'Pricing Plans | personalai.cloud',
    description: 'Simple, transparent pricing. Start free, scale as you grow.',
    url: 'https://personalai.cloud/pricing',
  },
};

const plans = [
  { name: 'Free', price: '₹0', period: '/month', features: ['1 Agent', '500 Memory Items', 'Web & WhatsApp'], cta: 'Start Free', highlighted: false },
  { name: 'Starter', price: '₹499', period: '/month', features: ['3 Agents', '5,000 Memory Items', 'Android App', 'Local Languages'], cta: 'Start Starter', highlighted: true },
  { name: 'Pro', price: '₹1,499', period: '/month', features: ['10 Agents', 'Unlimited Memory', 'All Integrations', 'API Access'], cta: 'Start Pro', highlighted: false },
  { name: 'Self-Hosted', price: 'Free', period: '(Open Source)', features: ['Full Docker Setup', 'Use Your Own LLM', '100% Privacy'], cta: 'View on GitHub', highlighted: false },
];
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16"><h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1><p className="text-xl text-slate-600">Start free, scale as you grow.</p></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map(plan => (
            <div key={plan.name} className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${plan.highlighted ? 'border-indigo-600 shadow-xl' : 'border-slate-200'}`}>
              {plan.highlighted && <div className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">MOST POPULAR</div>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6"><span className="text-4xl font-bold">{plan.price}</span><span className="text-slate-600">{plan.period}</span></div>
              <Link href="/signup" className={`block w-full text-center py-3 rounded-lg font-semibold mb-8 ${plan.highlighted ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>{plan.cta}</Link>
              <ul className="space-y-3">{plan.features.map(f => <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-slate-700">{f}</span></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'PersonalAI',
            description: 'Your Personal AI, Everywhere You Are. Connect AI to WhatsApp, Android, and Web with persistent memory.',
            brand: { '@type': 'Brand', name: 'PersonalAI' },
            offers: [
              { '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free Plan - 1 AI Agent' },
              { '@type': 'Offer', price: '499', priceCurrency: 'INR', description: 'Starter Plan' },
              { '@type': 'Offer', price: '1499', priceCurrency: 'INR', description: 'Pro Plan' },
            ],
            faq: [
              { '@type': 'Question', name: 'What is PersonalAI?', acceptedAnswer: { '@type': 'Answer', text: 'PersonalAI is an AI assistant that lives across WhatsApp, Android, and Web with persistent memory.' } },
              { '@type': 'Question', name: 'How much does it cost?', acceptedAnswer: { '@type': 'Answer', text: 'Start free with 1 agent. Starter plan is ₹499/month. Pro plan is ₹1,499/month. Self-hosted is free and open source.' } },
              { '@type': 'Question', name: 'Can I self-host?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we provide a complete Docker Compose stack for self-hosting with support for local LLMs via Ollama.' } },
            ],
          }),
        }}
      />
    </div>
  );
}
