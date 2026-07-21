import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PersonalAI - Malayalam | personalai.cloud',
  description: 'PersonalAI Malayalathil - നിങ്ങളുടെ കouchern AI സഹായി, എവിടെയും. WhatsApp, Android എന്നിവയിൽ persistent memory ഉം ചേർത്ത്.',
  keywords: ['personal ai malayalam', 'മലയാളം ai', 'whatsapp ai malayalam', 'android ai malayalam', 'persistent memory malayalam'],
  openGraph: {
    title: 'PersonalAI - Malayalam | personalai.cloud',
    description: 'PersonalAI Malayalathil - നിങ്ങളുടെ കടchner AI സഹായി.',
    url: 'https://personalai.cloud/ml',
  },
  alternates: {
    canonical: '/ml',
    languages: {
      'en': '/',
      'hi': '/hi',
      'ml': '/ml',
      'ta': '/ta',
    },
  },
};

export default function MalayalamPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">PersonalAI Malayalathil</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8">
              നിങ്ങളുടെ കടchner AI സഹായി, എവിടെയും. WhatsApp, Android എന്നിവയിൽ persistent memory ഉം ചേർത്ത്.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-xl">
                ഇന്ന് തുടങ്ങുക
              </a>
              <a href="/whatsapp" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                WhatsApp സെറ്റഅപ്പ്
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
            <p className="text-slate-600">WhatsApp-ല്‍ നിങ്ങളുടെ AI സഹായി. പുതിയ ആപ്പ് പഠിക്കാന്‍ ആവശ്യമില്ല.</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">Android App</h3>
            <p className="text-slate-600">FCM പുഷ് നോട്ടിഫിക്കേഷനുള്ള നാട്ടിവ് Android ആപ്പ്.</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">Persistent Memory</h3>
            <p className="text-slate-600">AI നിങ്ങളുടെ പ്രസംഗങ്ങളും ടികോണങ്ങളും ഓർമ്മകൂട്ടുന്നു.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
