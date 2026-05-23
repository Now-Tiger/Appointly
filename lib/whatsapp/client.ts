// lib/whatsapp/client.ts

/**
 * Sends a text message via the WhatsApp Business API.
 * 
 * This client includes production-grade error handling, environment variable
 * validation, and response verification to ensure reliable communication.
 *
 * @param {string} to - The recipient's phone number in E.164 format.
 * @param {string} message - The text content to be sent.
 * @throws {Error} If environment variables are missing or the API request fails.
 * @returns {Promise<void>} Resolves when the message is successfully handed off to Meta.
 */
export async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  const { 
    WHATSAPP_ACCESS_TOKEN,
    PHONE_NUMBER_ID,
    FACEBOOK_GRAPH_ENDPOINT,
    FACEBOOK_GRAPH_VERSION,
  } = process.env;

  // 1. Fail-fast if configuration is missing
  if (!WHATSAPP_ACCESS_TOKEN || !PHONE_NUMBER_ID) 
    throw new Error('[WhatsApp Client] Missing API configuration (TOKEN or ID).');

  // 2. Sanitize inputs
  const sanitizedTo = to.replace(/\D/g, ''); // Ensure only digits for the phone number

  // Provide safe defaults (IMPORTANT)
  const BASE_URL = FACEBOOK_GRAPH_ENDPOINT || 'https://graph.facebook.com';
  const VERSION  = FACEBOOK_GRAPH_VERSION  || 'v25.0';

  // https://developers.facebook.com/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api#post-version-phone-number-id-messages
  const url = `${BASE_URL}/${VERSION}/${PHONE_NUMBER_ID}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: sanitizedTo,
        type: 'text',
        text: { body: message.trim() },
      }),
      // Set a reasonable timeout for the API call
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json();

    // 3. Handle Meta API response
    if (!response.ok) {
      console.error('[WhatsApp Client Error] Meta API:', JSON.stringify(data, null, 2));
      throw new Error(`WhatsApp API failed with status ${response.status}`);
    }

    console.log(`[WhatsApp Client] Message sent successfully to ${sanitizedTo}`);
  } catch (e) {
    console.error('[WhatsApp Client Exception]', e);
    throw e;
  }
}
