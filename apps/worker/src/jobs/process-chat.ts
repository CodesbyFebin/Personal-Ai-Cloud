import { Job } from 'bullmq';
import { PrismaClient } from '@mcpserver/db';
import { Orchestrator } from '@mcpserver/agent-engine';

const prisma = new PrismaClient();

export async function processChatJob(job: Job) {
  const { agentId, userId, message, channel } = job.data;
  const orchestrator = new Orchestrator();
  const response = await orchestrator.generateResponse(agentId, userId, message);
  await prisma.chatSession.create({
    data: { agentId, userId, channel: channel as any, messages: [{ role: 'user', content: message }, { role: 'assistant', content: response }] as any }
  });
  console.log(`Processed chat for agent ${agentId}`);
}
