import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const agent = await prisma.aIAgent.findUnique({ where: { id: params.id } });
  if (!agent) return { title: 'Agent Not Found' };
  return {
    title: `${agent.name} | personalai.cloud`,
    description: agent.description,
    robots: { index: false, follow: false },
  };
}

export default async function AgentConfigPage({ params }: { params: { id: string } }) {
  const agent = await prisma.aIAgent.findUnique({ where: { id: params.id }, include: { channels: true } });
  if (!agent) return <div>Agent not found</div>;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">{agent.name}</h1>
      <p className="text-slate-600 mb-8">{agent.description}</p>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-4">System Prompt</h2>
        <textarea className="w-full p-4 border rounded-lg" rows={6} defaultValue={agent.systemPrompt} />
        <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700">Save Changes</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Channels</h2>
        <div className="space-y-3">
          {agent.channels.map(ch => (
            <div key={ch.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="font-medium">{ch.type}</span>
              <span className={`text-sm ${ch.isActive ? 'text-green-600' : 'text-slate-400'}`}>{ch.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
