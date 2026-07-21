import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'My AI Agents | personalai.cloud',
  description: 'Manage your PersonalAI agents. Create, configure, and deploy AI assistants with persistent memory across WhatsApp, Android, and Web.',
  keywords: ['ai agents', 'personal ai', 'manage agents', 'ai assistant', 'whatsapp agent', 'android agent'],
  robots: { index: false, follow: false },
};

export default async function AgentsPage() {
  const agents = await prisma.aIAgent.findMany({ where: { isTemplate: false } });
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Agents</h1>
          <p className="text-slate-600">Manage your AI assistants</p>
        </div>
        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
          <Plus className="w-5 h-5" /> Create Agent
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {agents.map(agent => (
          <div key={agent.id} className="flex items-center justify-between p-6 border-b border-slate-100 last:border-0">
            <div>
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{agent.description}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">{agent.model}</span>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">{agent.language}</span>
              </div>
            </div>
            <Link href={`/agents/${agent.id}`} className="text-indigo-600 font-medium hover:underline">Configure →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
