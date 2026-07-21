import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const { fcmToken, deviceId, agentId } = await req.json();
  if (!fcmToken || !deviceId || !agentId) {
    return NextResponse.json({ error: 'fcmToken, deviceId, and agentId required' }, { status: 400 });
  }

  const existing = await prisma.channel.findFirst({ where: { identifier: deviceId, type: 'ANDROID' } });
  if (existing) {
    await prisma.channel.update({ where: { id: existing.id }, data: { fcmToken, isActive: true } });
  } else {
    await prisma.channel.create({
      data: {
        agentId,
        type: 'ANDROID',
        identifier: deviceId,
        isActive: true,
        fcmToken,
      },
    });
  }

  return NextResponse.json({ status: 'registered' });
}
