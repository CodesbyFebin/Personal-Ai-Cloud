import Link from 'next/link';
import { Plus, MessageSquare, Activity, Brain } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard | personalai.cloud',
  description: 'Manage your PersonalAI dashboard. View agents, memory, and analytics.',
  keywords: ['dashboard', 'personal ai', 'manage agents', 'analytics'],
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const agents = await prisma.aIAgent.findMany({ where: { isTemplate: false }, take: 10 });
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-slate-600">Manage your personal AI assistants</p>
        </div>
        <Link href="/agents" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
          <Plus className="w-5 h-5" /> New Agent
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Agents" value={agents.length.toString()} icon={<MessageSquare className="w-6 h-6" />} />
        <StatCard label="Messages Today" value="1,234" icon={<Activity className="w-6 h-6" />} />
        <StatCard label="Memory Items" value="5,678" icon={<Brain className="w-6 h-6" />} />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Agents</h2>
        <div className="space-y-4">
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm text-slate-600">{agent.totalChats} chats</p>
              </div>
              <Link href={`/agents/${agent.id}`} className="text-indigo-600 font-medium hover:underline">Configure →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <div className="text-indigo-600">{icon}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
