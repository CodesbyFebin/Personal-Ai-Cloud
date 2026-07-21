import { MessageSquare, CheckCircle, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp AI Setup | personalai.cloud',
  description: 'Connect your Personal AI to WhatsApp Business API in 4 steps. Chat with your AI inside WhatsApp with persistent memory.',
  keywords: ['whatsapp ai', 'whatsapp bot', 'whatsapp business api', 'ai chat', 'meta api', 'webhook', 'personal ai whatsapp'],
  openGraph: {
    title: 'WhatsApp AI Setup | personalai.cloud',
    description: 'Connect your Personal AI to WhatsApp Business API in 4 steps.',
    url: 'https://personalai.cloud/whatsapp',
  },
};

const steps = [
  {
    title: 'Create Meta App',
    desc: 'Go to developers.facebook.com, create a new app, and add WhatsApp product.',
    link: 'https://developers.facebook.com/apps',
    linkText: 'Open Meta Developer Console'
  },
  {
    title: 'Configure WhatsApp Business',
    desc: 'Add your phone number, generate WhatsApp Business API credentials.',
    link: null,
    linkText: null
  },
  {
    title: 'Set Webhook URL',
      desc: 'Point your Meta webhook to: https://personalai.cloud/api/webhooks/whatsapp',
    link: null,
    linkText: null
  },
  {
    title: 'Start Chatting',
    desc: 'Send a message to your WhatsApp number and your AI will respond instantly.',
    link: null,
    linkText: null
  }
];

export default function WhatsAppPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Setup WhatsApp
          </h1>
          <p className="text-xl text-stone-600">
            Connect your Personal AI to WhatsApp Business in 4 steps
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {step.title}
                  </h3>
                  <p className="text-stone-600 mb-3">{step.desc}</p>
                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      {step.linkText} <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-stone-100 rounded-2xl p-8 border border-stone-200">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Environment Variables
          </h2>
          <p className="text-stone-600 mb-4">
            Add these to your <code className="bg-stone-200 px-2 py-1 rounded text-sm">.env</code> file:
          </p>
          <pre className="bg-stone-900 text-stone-100 p-4 rounded-lg text-sm overflow-x-auto">
{`WHATSAPP_VERIFY_TOKEN=your_verify_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_APP_SECRET=your_app_secret`}
          </pre>
        </div>

        <div className="mt-12 bg-stone-100 rounded-2xl p-8 border border-stone-200">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Environment Variables
          </h2>
          <p className="text-stone-600 mb-4">
            Add these to your <code className="bg-stone-200 px-2 py-1 rounded text-sm">.env</code> file:
          </p>
          <pre className="bg-stone-900 text-stone-100 p-4 rounded-lg text-sm overflow-x-auto">
{`WHATSAPP_VERIFY_TOKEN=your_verify_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_APP_SECRET=your_app_secret`}
          </pre>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to connect PersonalAI to WhatsApp Business API',
              description: '4-step guide to connect your AI assistant to WhatsApp Business API.',
              step: [
                { '@type': 'HowToStep', name: 'Create Meta App', text: 'Go to developers.facebook.com, create a new app, and add WhatsApp product.' },
                { '@type': 'HowToStep', name: 'Configure WhatsApp Business', text: 'Add your phone number, generate WhatsApp Business API credentials.' },
                { '@type': 'HowToStep', name: 'Set Webhook URL', text: 'Point your Meta webhook to: https://personalai.cloud/api/webhooks/whatsapp' },
                { '@type': 'HowToStep', name: 'Start Chatting', text: 'Send a message to your WhatsApp number and your AI will respond instantly.' },
              ],
            }),
          }}
        />

        <div className="mt-12 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-stone-800 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            Get Started with personalai.cloud
          </a>
        </div>
      </div>
    </div>
  );
}
