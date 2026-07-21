import { Worker } from 'bullmq';
import { provisionAgentJob } from './jobs/provision-agent';
import { processChatJob } from './jobs/process-chat';
import { whatsappWebhookProcessor } from './jobs/whatsapp-webhook-processor';
const connection = { url: process.env.REDIS_URL };
new Worker('provision', provisionAgentJob, { connection });
new Worker('chat', processChatJob, { connection });
new Worker('whatsapp', whatsappWebhookProcessor, { connection });
console.log('Workers started.');
