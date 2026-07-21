import { Job } from 'bullmq';
import { PrismaClient } from '@mcpserver/db';
import { MemoryManager } from '@mcpserver/agent-engine';

const prisma = new PrismaClient();

export async function provisionAgentJob(job: Job) {
  const { agentId, userId, channels } = job.data;
  const memoryManager = new MemoryManager();
  await memoryManager.createNamespace(`user_${userId}_agent_${agentId}`);
  if (channels.includes('WHATSAPP')) {
    const webhookUrl = `${process.env.NEXTAUTH_URL}/api/webhooks/whatsapp?agentId=${agentId}`;
    await prisma.channel.updateMany({ where: { agentId, type: 'WHATSAPP' }, data: { webhookUrl, isActive: true } });
  }
  console.log(`Agent ${agentId} provisioned.`);
}
