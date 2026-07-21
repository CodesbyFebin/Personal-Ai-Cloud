import { NextRequest, NextResponse } from 'next/server';
import { verifySignature } from '@mcpserver/whatsapp';
import { chatQueue } from '@/lib/queue';
export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get('hub.mode');
  const token = req.nextUrl.searchParams.get('hub.verify_token');
  const challenge = req.nextUrl.searchParams.get('hub.challenge');
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse('Verification failed', { status: 403 });
}
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-hub-signature-256') || '';
  if (!verifySignature(rawBody, signature, process.env.WHATSAPP_APP_SECRET!)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const payload = JSON.parse(rawBody);
  await chatQueue.add('whatsapp-webhook', { payload });
  return new NextResponse('OK', { status: 200 });
}
