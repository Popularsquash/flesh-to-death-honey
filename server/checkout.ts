/**
 * Checkout and Order Management
 * Handles Stripe checkout sessions and Printful order submission
 */

import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { orders, cartItems, productVariants, products, InsertOrder } from "../drizzle/schema";
import { createOrder as createPrintfulOrder, confirmOrder as confirmPrintfulOrder, PrintfulOrderRecipient, PrintfulOrderItem } from "./printful";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

interface CartItemWithDetails {
  id: number;
  variantId: number;
  quantity: number;
  variant: {
    id: number;
    printfulSyncVariantId: number | null;
    printfulVariantId: number;
    name: string;
    retailPrice: number;
    currency: string;
    imageUrl: string | null;
    size: string | null;
    color: string | null;
  };
  product: {
    id: number;
    name: string;
    thumbnailUrl: string | null;
  };
}

/**
 * Create a Stripe Checkout Session for the cart
 */
export async function createCheckoutSession(
  cartItems: CartItemWithDetails[],
  userId: number | undefined,
  userEmail: string | undefined,
  userName: string | undefined,
  origin: string
): Promise<{ url: string; sessionId: string }> {
  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // Build line items for Stripe
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item) => ({
    price_data: {
      currency: item.variant.currency.toLowerCase(),
      product_data: {
        name: item.product.name,
        description: `${item.variant.size ? `Size: ${item.variant.size}` : ""} ${item.variant.color ? `Color: ${item.variant.color}` : ""}`.trim() || undefined,
        images: item.variant.imageUrl ? [item.variant.imageUrl] : item.product.thumbnailUrl ? [item.product.thumbnailUrl] : undefined,
      },
      unit_amount: item.variant.retailPrice,
    },
    quantity: item.quantity,
  }));

  // Calculate total for metadata
  const totalAmount = cartItems.reduce((sum, item) => sum + item.variant.retailPrice * item.quantity, 0);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    customer_email: userEmail,
    allow_promotion_codes: true,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "ES", "IT", "NL", "BE", "AT", "CH", "SE", "NO", "DK", "FI", "IE", "PT", "PL", "CZ"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 599, // $5.99 standard shipping
            currency: "usd",
          },
          display_name: "Standard Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 10,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1299, // $12.99 express shipping
            currency: "usd",
          },
          display_name: "Express Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 2,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
    ],
    client_reference_id: userId?.toString(),
    metadata: {
      user_id: userId?.toString() || "",
      customer_email: userEmail || "",
      customer_name: userName || "",
      cart_items: JSON.stringify(cartItems.map(item => ({
        variantId: item.variant.id,
        printfulSyncVariantId: item.variant.printfulSyncVariantId,
        quantity: item.quantity,
        price: item.variant.retailPrice,
        productName: item.product.name,
        variantName: item.variant.name,
      }))),
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return {
    url: session.url,
    sessionId: session.id,
  };
}

/**
 * Handle successful payment - create order and submit to Printful
 */
export async function handlePaymentSuccess(sessionId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Get the checkout session from Stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent", "shipping_details"],
  });

  if (session.payment_status !== "paid") {
    throw new Error("Payment not completed");
  }

  // Check if order already exists
  const [existingOrder] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId))
    .limit(1);

  if (existingOrder) {
    console.log("Order already processed:", existingOrder.id);
    return;
  }

  // Parse cart items from metadata
  const cartItemsData = JSON.parse(session.metadata?.cart_items || "[]");
  const userId = session.metadata?.user_id ? parseInt(session.metadata.user_id) : undefined;

  // Get shipping address
  const shippingDetails = (session as any).shipping_details;
  const shippingAddress = shippingDetails?.address ? {
    name: shippingDetails.name || "",
    address1: shippingDetails.address.line1 || "",
    address2: shippingDetails.address.line2 || undefined,
    city: shippingDetails.address.city || "",
    state_code: shippingDetails.address.state || "",
    country_code: shippingDetails.address.country || "",
    zip: shippingDetails.address.postal_code || "",
    email: session.customer_details?.email || undefined,
    phone: session.customer_details?.phone || undefined,
  } : null;

  // Create order in database
  const orderData: InsertOrder = {
    userId: userId || undefined,
    stripeSessionId: sessionId,
    stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    status: "paid",
    totalAmount: session.amount_total || 0,
    currency: session.currency?.toUpperCase() || "USD",
    shippingAddress: shippingAddress,
    items: cartItemsData,
  };

  const result = await db.insert(orders).values(orderData);
  const orderId = result[0].insertId;

  console.log("Order created in database:", orderId);

  // Submit order to Printful
  if (shippingAddress) {
    try {
      const printfulRecipient: PrintfulOrderRecipient = {
        name: shippingAddress.name,
        address1: shippingAddress.address1,
        address2: shippingAddress.address2,
        city: shippingAddress.city,
        state_code: shippingAddress.state_code,
        country_code: shippingAddress.country_code,
        zip: shippingAddress.zip,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
      };

      const printfulItems: PrintfulOrderItem[] = cartItemsData.map((item: any) => ({
        sync_variant_id: item.printfulSyncVariantId,
        quantity: item.quantity,
      }));

      // Create order in Printful (draft mode)
      const printfulOrder = await createPrintfulOrder(
        printfulRecipient,
        printfulItems,
        `order_${orderId}`
      );

      console.log("Printful order created:", printfulOrder.id);

      // Update order with Printful ID
      await db
        .update(orders)
        .set({ 
          printfulOrderId: printfulOrder.id,
          status: "processing",
        })
        .where(eq(orders.id, orderId));

      // Confirm the order (submit for fulfillment)
      await confirmPrintfulOrder(printfulOrder.id);
      console.log("Printful order confirmed for fulfillment");

    } catch (error) {
      console.error("Failed to submit order to Printful:", error);
      // Order is still saved, can be manually processed
      await db
        .update(orders)
        .set({ status: "paid" }) // Keep as paid, needs manual intervention
        .where(eq(orders.id, orderId));
    }
  }

  // Clear user's cart
  if (userId) {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }
}

/**
 * Get order by Stripe session ID
 */
export async function getOrderBySessionId(sessionId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId))
    .limit(1);

  return order;
}

/**
 * Get user's orders
 */
export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(orders.createdAt);

  return userOrders;
}

export { stripe };
