import crypto from 'crypto';
export function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const expectedHash = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const expectedSignature = `sha256=${expectedHash}`;
  if (signature.length !== expectedSignature.length) { return false; }
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
