import crypto from 'crypto';

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || '';
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || '';

/**
 * Verify the webhook signature from Meta
 * Meta sends X-Hub-Signature-256 header with SHA256 HMAC
 */
export function verifySignature(body: string, signature: string): boolean {
  if (!WHATSAPP_VERIFY_TOKEN || !signature) return false;
  
  const expectedSignature = crypto
    .createHmac('sha256', WHATSAPP_VERIFY_TOKEN)
    .update(body)
    .digest('hex');
  
  const providedSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(providedSignature)
  );
}

/**
 * Send a text message via WhatsApp Business API
 */
export async function sendText(to: string, text: string): Promise<any> {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: {
          body: text,
          preview_url: false,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

/**
 * Send a template message
 */
export async function sendTemplate(
  to: string,
  templateName: string,
  language: string = 'en',
  components?: any[]
): Promise<any> {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: language },
          components,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`WhatsApp template error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

/**
 * Send a media message (image, video, document)
 */
export async function sendMedia(
  to: string,
  mediaId: string,
  type: 'image' | 'video' | 'document',
  caption?: string
): Promise<any> {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type,
        [type]: {
          id: mediaId,
          ...(caption && { caption }),
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`WhatsApp media error: ${JSON.stringify(error)}`);
  }

  return response.json();
}