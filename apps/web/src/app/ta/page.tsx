import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PersonalAI - Tamil | personalai.cloud',
  description: 'PersonalAI Tamilil - உங்கள் தனிப்பட்ட AI உதவியாளர், எங்கும். WhatsApp, Android மற்றும் Web-ல் persistent memory உடன்.',
  keywords: ['personal ai tamil', 'தமிழ் ai', 'whatsapp ai tamil', 'android ai tamil', 'persistent memory tamil'],
  openGraph: {
    title: 'PersonalAI - Tamil | personalai.cloud',
    description: 'PersonalAI Tamilil - உங்கள் தனிப்பட்ட AI உதவியாளர்.',
    url: 'https://personalai.cloud/ta',
  },
  alternates: {
    canonical: '/ta',
    languages: {
      'en': '/',
      'hi': '/hi',
      'ml': '/ml',
      'ta': '/ta',
    },
  },
};

export default function TamilPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-red-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">PersonalAI Tamilil</h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8">
              உங்கள் தனிப்பட்ட AI உதவியாளர், எங்கும். WhatsApp, Android மற்றும் Web-ல் persistent memory உடன்.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/pricing" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-xl">
                இன்று தொடங்குங்கள்
              </a>
              <a href="/whatsapp" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                WhatsApp அமைப்பு
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
            <p className="text-slate-600">WhatsApp-ல் మీ AI సహాయకుడు. కొత్త అనుభవించడానికి అవసరం లేదు.</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">Android App</h3>
            <p className="text-slate-600">FCM புஷ் அறிவிப்புகளுடன் ஆதரிக்கப்படும் Android ஆப்.</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">Persistent Memory</h3>
            <p className="text-slate-600">AI உங்கள் விருப்பங்கள், உண்மைகள் மற்றும் சூழலை நினைவில் க Core.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
