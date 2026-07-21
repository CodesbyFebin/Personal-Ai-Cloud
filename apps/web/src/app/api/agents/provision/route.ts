import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { provisionQueue } from '@/lib/queue';
import { z } from 'zod';
const provisionSchema = z.object({
  name: z.string().min(1).max(100),
  templateId: z.string().cuid().optional(),
  channels: z.array(z.enum(['WHATSAPP', 'ANDROID', 'WEB'])).default(['WEB']),
  language: z.string().default('en'),
});
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const body = await req.json();
  const data = provisionSchema.parse(body);
  const count = await prisma.aIAgent.count({ where: { userId: user.id } });
  if (count >= 3) return NextResponse.json({ error: 'Free tier limit reached.' }, { status: 403 });
  let systemPrompt = "You are a helpful personal AI assistant.";
  if (data.templateId) {
    const template = await prisma.aIAgent.findUnique({ where: { id: data.templateId } });
    if (template) systemPrompt = template.systemPrompt;
  }
  const agent = await prisma.aIAgent.create({
    data: {
      userId: user.id,
      name: data.name,
      slug: `${data.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      description: `Personal AI: ${data.name}`,
      systemPrompt,
      language: data.language,
      channels: { create: data.channels.map(type => ({ type: type as any, identifier: `${type.toLowerCase()}-${Date.now()}`, isActive: true })) }
    },
    include: { channels: true }
  });
  await provisionQueue.add('provision-agent', { agentId: agent.id, userId: user.id, channels: data.channels });
  await prisma.auditLog.create({ data: { userId: user.id, action: 'AGENT_CREATED', resource: 'AIAgent', resourceId: agent.id } });
  return NextResponse.json({ agentId: agent.id, status: 'PROVISIONING' });
}
