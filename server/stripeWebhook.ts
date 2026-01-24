/**
 * Stripe Webhook Handler
 * Handles payment events from Stripe
 */

import { Request, Response, Express, raw } from "express";
import { stripe, handlePaymentSuccess } from "./checkout";

export function registerStripeWebhook(app: Express) {
  // IMPORTANT: This must be registered BEFORE express.json() middleware
  // The raw body is needed for Stripe signature verification
  app.post(
    "/api/stripe/webhook",
    raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!sig || !webhookSecret) {
        console.error("[Webhook] Missing signature or webhook secret");
        return res.status(400).json({ error: "Missing signature or webhook secret" });
      }

      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error("[Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
      }

      console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          console.log(`[Webhook] Checkout session completed: ${session.id}`);
          
          try {
            await handlePaymentSuccess(session.id);
            console.log(`[Webhook] Order processed successfully for session: ${session.id}`);
          } catch (error) {
            console.error(`[Webhook] Failed to process order:`, error);
            // Don't return error - we've received the webhook, just log the issue
          }
          break;
        }

        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          console.log(`[Webhook] Payment succeeded: ${paymentIntent.id}`);
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object;
          console.log(`[Webhook] Payment failed: ${paymentIntent.id}`);
          break;
        }

        default:
          console.log(`[Webhook] Unhandled event type: ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      res.json({ received: true });
    }
  );
}
