import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PersonalAI - Hindi | personalai.cloud',
  description: 'PersonalAI हिंदी में - आपका व्यक्तिगत AI सहायक, हर जगह। WhatsApp, Android और Web में persistent memory के साथ।',
  keywords: ['personal ai hindi', 'हिंदी ai', 'whatsapp ai hindi', 'android ai hindi', 'persistent memory hindi'],
  openGraph: {
    title: 'PersonalAI - Hindi | personalai.cloud',
    description: 'PersonalAI हिंदी में - आपका व्यक्तिगत AI सहायक।',
    url: 'https://personalai.cloud/hi',
  },
  alternates: {
    canonical: '/hi',
    languages: {
      'en': '/',
      'hi': '/hi',
      'ml': '/ml',
      'ta': '/ta',
    },
  },
};

export default function HindiPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">PersonalAI हिंदी में</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8">
              आपका व्यक्तिगत AI सहायक, हर जगह। WhatsApp, Android और Web में persistent memory के साथ।
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-xl">
                मुफ्त में शुरुआत करें
              </a>
              <a href="/whatsapp" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                WhatsApp सेटअप
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
            <p className="text-slate-600">WhatsApp में आपका AI सहायक। नया app सीखने की जरूरत नहीं।</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">Android App</h3>
            <p className="text-slate-600">नेटिव Android app FCM पुश नोटिफिकेशन के साथ।</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">Persistent Memory</h3>
            <p className="text-slate-600">AI जो आपकी पसंद, तथ्य और संदर्भ याद रखता है।</p>
          </div>
        </div>
      </section>
    </div>
  );
}
