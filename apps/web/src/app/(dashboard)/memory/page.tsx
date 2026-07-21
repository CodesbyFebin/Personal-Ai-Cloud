import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Memory | personalai.cloud',
  description: 'View and manage persistent memories for your PersonalAI agents. All memories are stored securely with pgvector embeddings.',
  keywords: ['memory', 'persistent memory', 'ai memory', 'pgvector', 'embeddings', 'rag'],
  robots: { index: false, follow: false },
};

export default async function MemoryPage() {
  const memories = await prisma.memory.findMany({ take: 20, orderBy: { createdAt: 'desc' } });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Memory</h1>
      <p className="text-slate-600 mb-8">View and manage persistent memories</p>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {memories.map(m => (
          <div key={m.id} className="p-6 border-b border-slate-100 last:border-0">
            <p className="text-slate-800">{m.content}</p>
            <span className="text-xs text-slate-500 mt-2 block">{m.category} • {new Date(m.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
