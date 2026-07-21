// src/app/api/webhooks/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySignature, sendText } from '@/lib/whatsapp';
import { queue } from '@/lib/queue';

// For API route validation
export async function GET(req: NextRequest) {
  const mode = req.headers.get('x-hub-mode') || '';
  const token = req.headers.get('x-hub-verify-token') || '';
  const challenge = req.headers.get('x-hub-challenge') || '';

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-hub-signature-256') || '';
    const body = await req.text();
    
    // Verify signature
    if (!verifySignature(body, signature)) {
      console.error('Invalid WhatsApp webhook signature');
      return new Response('Invalid signature', { status: 403 });
    }

    // Parse webhook payload
    const data = JSON.parse(body);
    const entry = data?.entry?.[0];
    const value = entry?.changes?.[0]?.value;
    if (!value || !value.messages) return new Response('Invalid payload', { status: 400 });

    // Process each message
    for (const message of value.messages) {
      const from = message.from; // WhatsApp number in international format
      const text = message.text?.body || '';
      
      // Save to database
      const chat = await prisma.chatSession.create({
        data: {
          userId: from,
          channel: 'WHATSAPP',
          messages: { role: 'user', content: text },
        }
      });

      // Queue for processing
      queue.enqueue('process-chat', {
        chatId: chat.id,
        message: text,
      });

      // Echo back as verification
      await sendText(from, `Echo: ${text}`);
    }

    return new Response('OK', { status: 200 });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}