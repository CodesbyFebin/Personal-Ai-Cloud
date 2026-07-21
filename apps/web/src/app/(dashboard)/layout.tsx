import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Brain, MessageSquare, CreditCard } from 'lucide-react';
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-8">
          <Brain className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold">PersonalAI</span>
        </div>
        <nav className="space-y-2">
          <NavItem href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
          <NavItem href="/agents" icon={<Brain className="w-5 h-5" />} label="Agents" />
          <NavItem href="/memory" icon={<MessageSquare className="w-5 h-5" />} label="Memory" />
          <NavItem href="/billing" icon={<CreditCard className="w-5 h-5" />} label="Billing" />
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
