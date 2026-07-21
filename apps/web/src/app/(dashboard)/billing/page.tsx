import Link from 'next/link';
import { Check } from 'lucide-react';
const plans = [
  { name: 'Free', price: '₹0', period: '/month', features: ['1 Agent', '500 Memories', 'Web & WhatsApp'], cta: 'Current Plan', highlighted: false },
  { name: 'Starter', price: '₹499', period: '/month', features: ['3 Agents', '5,000 Memories', 'Android App', 'Local Languages'], cta: 'Upgrade', highlighted: true },
  { name: 'Pro', price: '₹1,499', period: '/month', features: ['10 Agents', 'Unlimited Memories', 'All Integrations', 'API Access'], cta: 'Upgrade', highlighted: false },
];
export default function BillingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Billing</h1>
      <p className="text-slate-600 mb-8">Manage your subscription</p>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div key={plan.name} className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${plan.highlighted ? 'border-indigo-600' : 'border-slate-200'}`}>
            {plan.highlighted && <div className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">MOST POPULAR</div>}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6"><span className="text-4xl font-bold">{plan.price}</span><span className="text-slate-600">{plan.period}</span></div>
            <ul className="space-y-3 mb-8">{plan.features.map(f => (<li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-slate-700">{f}</span></li>))}</ul>
            <button className={`w-full py-3 rounded-lg font-semibold ${plan.highlighted ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-900'}`}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
