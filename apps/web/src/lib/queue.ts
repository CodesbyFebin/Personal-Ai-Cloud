import { Queue } from 'bullmq';
const connection = { url: process.env.REDIS_URL };
export const provisionQueue = new Queue('provision', { connection });
export const chatQueue = new Queue('chat', { connection });
