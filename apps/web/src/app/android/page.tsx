import { Metadata } from 'next';
import { Smartphone, Bell, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Android App | personalai.cloud',
  description: 'Download the PersonalAI Android app with FCM push notifications, native performance, and full AI assistant integration.',
  keywords: ['android app', 'flutter', 'fcm', 'push notifications', 'mobile ai', 'android ai', 'personal ai'],
  openGraph: {
    title: 'Android App | personalai.cloud',
    description: 'Native Android app with FCM push notifications.',
    url: 'https://personalai.cloud/android',
  },
};

const features = [
  { icon: Smartphone, title: 'Native Performance', desc: 'Built with Flutter for smooth 60fps experience on any Android device.' },
  { icon: Bell, title: 'FCM Push Notifications', desc: 'Get instant AI responses via Firebase Cloud Messaging, even when the app is closed.' },
  { icon: Shield, title: 'Offline-First', desc: 'Auth tokens cached securely with SharedPreferences. Works offline and syncs when online.' },
];

export default function AndroidPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">PersonalAI for Android</h1>
            <p className="text-xl text-white/90 mb-8">
              Your AI assistant in your pocket. Native Android app with push notifications, offline support, and seamless WhatsApp sync.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-xl">
                Download APK
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(feature => (
            <div key={feature.title} className="bg-white rounded-xl p-8 border border-slate-200">
              <feature.icon className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
