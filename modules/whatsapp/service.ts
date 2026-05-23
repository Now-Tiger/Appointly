// modules/whatsapp/service.ts
import { sendWhatsAppMessage, sendWhatsAppImageMessage } from "@/lib/whatsapp/client";

/**
 * Orchestrates business logic for incoming WhatsApp messages.
 *
 * This service acts as the middleware between the raw webhook and your 
 * application logic (e.g., AI agents or appointment scheduling). 
 * It handles input normalization and provides a scalable routing structure.
 *
 * @param {string} from - The sender's phone number.
 * @param {string} text - The raw text content received from the user.
 * @returns {Promise<void>}
 */
export async function handleIncomingMessage(from: string, text: string): Promise<void> {
  // 1. Normalize and Sanitize Input
  const sender = from.trim();
  const cleanText = text.trim().toLocaleLowerCase();
  const baner = 'https://res.cloudinary.com/dq53c9400/image/upload/v1773570022/Funny_Pin_frg9g1.jpg';

  try {
    console.log(`[WhatsApp Service] Processing message from ${sender}: "${cleanText}"`);

    const welcomeMsg  = 'Hi 👋 Welcome to Appointly!\n\nHow can we help you today?\n1. Haircut 💇‍♂️\n2. Shave 🪒';
    const fallbackMsg = 'I am not sure how to help with that yet. Would you like to speak with a human?';

    // 2. Scalable Routing Logic
    // In a future phase, replace this with an LLM-based intent classifier
    if (cleanText === 'hi' || cleanText === 'hello') {
      // await sendWhatsAppMessage(sender, welcomeMsg);
      await sendWhatsAppImageMessage(sender, baner, welcomeMsg);
      return;
    }

    // 3. Fallback / AI Handoff
    // This is the ideal spot to trigger your SynapseOps or DevAgents logic
    await sendWhatsAppMessage(sender, fallbackMsg);
  } catch (e) {
    console.error(`[WhatsApp Service Error] Failed to process message from ${sender}:`, e);
  }
}
