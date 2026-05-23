// app/api/webhooks/whatsapp/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

import { handleIncomingMessage } from '@/modules/whatsapp/service';

/**
 * Handles the WhatsApp Webhook verification handshake (GET request).
 * 
 * Meta sends a GET request to this endpoint during the webhook configuration process
 * to verify that the server is authentic and reachable. It expects the server to 
 * echo back the 'hub.challenge' if the 'hub.verify_token' matches the server's secret.
 *
 * @param {Request} req - The standard Web Request object provided by Next.js.
 * @returns {Promise<NextResponse>}
 * - 200: Returns the `hub.challenge` string on successful verification.
 * - 403: If the verification token or mode is invalid.
 * - 500: If the `WHATSAPP_VERIFY_TOKEN` environment variable is missing or a runtime error occurs.
 * 
 * @example
 * // Meta's incoming URL will look like:
 * // /api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=123456
 */
export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  try {
    // 1. Logging incoming request for debugging
    console.log(`[Webhook Verification] Attempt - Mode: ${mode}, Token: ${token ? 'PROVIDED' : 'MISSING'}`);

    // 2. Validate environment config
    if (!VERIFY_TOKEN) {
      console.error('[Webhook Error] WHATSAPP_VERIFY_TOKEN is not defined in environment variables.');
      return new NextResponse('Server configuration error', { status: 500 });
    }

    // 3. Security & Logic Check
    if (mode === 'subscribe' && token === VERIFY_TOKEN && challenge) {
      console.log('[Webhook Verification] Success: Challenge accepted.');
      // Return the challenge as plain text with 200 OK
      return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

    // 4. Log specifically why it failed
    console.warn(`[Webhook Verification] Failed: Invalid mode (${mode}) or mismatched token.`);
    return new NextResponse('Verification failed', { status: 403 });
  } catch (e) {
    // 5. Error handling for unexpected URL parsing or runtime issues
    console.error('[Webhook Exception]', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


/**
 * Handles incoming WhatsApp messages and events (POST request).
 * 
 * This endpoint receives real-time notifications from Meta's servers. 
 * It performs a cryptographic signature verification using the `APP_SECRET`
 * to ensure request authenticity before processing message data.
 *
 * @param {Request} req - The incoming Web Request containing the WhatsApp JSON payload.
 * @returns {Promise<NextResponse>}
 * - 200: Successfully received and signature verified.
 * - 401: Signature verification failed (Unauthorized).
 * - 400: Malformed payload or missing message data.
 * - 500: Internal processing error.
 */
export async function POST(req: Request): Promise<NextResponse> {
  const APP_SECRET = process.env.WHATSAPP_APP_SECRET;
  const signature  = req.headers.get('x-hub-signature-256');

  try {
    // 1. Get/Read RAW BUFFER (not text)
    const rawBuffer = Buffer.from(await req.arrayBuffer());
    // console.log(rawBuffer);

    // 2. Security: Verify HMAC Signature
    if (!signature || !APP_SECRET) {
      console.warn('[Webhook POST] Missing signature or App Secret configuration.');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Extract actual signature
    const incomingSignature = signature.replace('sha256=', '');

    // Compute expected signature
    const expectedSignature = crypto
      .createHmac('sha256', APP_SECRET)
      .update(rawBuffer)
      .digest('hex');

    // console.log('Incoming:', incomingSignature);
    // console.log('Expected:', expectedSignature);

    // Use timingSafeEqual (IMPORTANT)
    const isValid = crypto.timingSafeEqual(
      Buffer.from(incomingSignature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );


    if (!isValid) {
      console.error('[Webhook] Signature mismatch');
      return new NextResponse('Invalid signature', { status: 401 });
    }

    // 3. Parse and extract payload
    const body = JSON.parse(rawBuffer.toString('utf-8'));
    const msg  = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!msg) { 
      return NextResponse.json({ status: 'ignored_event' });
    }

    const from = msg.from;
    const text = msg?.text?.body || 'Non-text message';
    console.log(`[WhatsApp] Received from ${from}: '${text}'`);

    // 4. Trigger AI/Business Logic
    await handleIncomingMessage(from, text);
    return NextResponse.json({ status: 'ok' });

  } catch (e) {
    console.error('[Webhook POST Exception]', e);
    return NextResponse.json({ error: 'Internal processing failed'}, { status: 500 });
  }
}
