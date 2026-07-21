import { Job } from 'bullmq';
export async function whatsappWebhookProcessor(job: Job) {
  const { payload } = job.data;
  console.log('WhatsApp webhook received and queued');
}
