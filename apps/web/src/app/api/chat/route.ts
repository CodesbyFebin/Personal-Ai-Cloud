import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { chatQueue } from '@/lib/queue';
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const { agentId, message, channel } = await req.json();
  if (!agentId || !message) return NextResponse.json({ error: 'agentId and message required' }, { status: 400 });
  await chatQueue.add('process-chat', { agentId, userId: user.id, message, channel: channel || 'WEB' });
  return NextResponse.json({ status: 'queued' });
}
