import { COOKIE_NAME } from "@shared/const";
import { notifyOwner } from "./_core/notification";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  syncProductsFromPrintful,
  getAllProducts,
  getProductById,
  getVariantById,
  getCartItems,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  mergeGuestCart,
  updateProductImage,
  updateProductPrice,
  getOnSaleProducts,
  toggleProductSale,
} from "./products";
import {
  createCheckoutSession,
  getOrderBySessionId,
  getUserOrders,
  getPendingManualOrders,
  markOrderAsProcessed,
} from "./checkout";
import {
  subscribeEmail,
  unsubscribeEmail,
  getAllSubscribers,
  addReview,
  getProductReviews,
  getProductRating,
  deleteReview,
} from "./emailReviews";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Product routes
  products: router({
    // Sync products from Printful (temporarily public for initial setup)
    sync: publicProcedure.mutation(async () => {
      const result = await syncProductsFromPrintful();
      return result;
    }),

    // Get all products
    list: publicProcedure.query(async () => {
      const products = await getAllProducts();
      return products;
    }),

    // Get single product
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const product = await getProductById(input.id);
        return product;
      }),

    // Get variant
    getVariant: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const variant = await getVariantById(input.id);
        return variant;
      }),

    // Update product image (admin only)
    updateImage: adminProcedure
      .input(z.object({ productId: z.number(), thumbnailUrl: z.string().url() }))
      .mutation(async ({ input }) => {
        await updateProductImage(input.productId, input.thumbnailUrl);
        return { success: true };
      }),

    // Update product price (admin only) - price in cents
    updatePrice: adminProcedure
      .input(z.object({ productId: z.number(), retailPriceCents: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await updateProductPrice(input.productId, input.retailPriceCents);
        return { success: true };
      }),
  }),

  // HIVES GARAGE - Sale/Clearance routes
  garage: router({
    // Get all on-sale products (public)
    list: publicProcedure.query(async () => {
      const saleProducts = await getOnSaleProducts();
      return saleProducts;
    }),

    // Toggle product sale status (admin only)
    toggleSale: adminProcedure
      .input(z.object({
        productId: z.number(),
        onSale: z.boolean(),
        salePrice: z.number().int().positive().optional(),
        saleLabel: z.string().max(100).optional(),
      }))
      .mutation(async ({ input }) => {
        await toggleProductSale(input.productId, input.onSale, input.salePrice, input.saleLabel);
        return { success: true };
      }),
  }),

  // Cart routes
  cart: router({
    // Get cart items
    get: publicProcedure
      .input(z.object({ sessionId: z.string().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const userId = ctx.user?.id;
        const sessionId = input?.sessionId;
        const items = await getCartItems(userId, sessionId);
        return items;
      }),

    // Add to cart
    add: publicProcedure
      .input(z.object({
        variantId: z.number(),
        quantity: z.number().min(1).default(1),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user?.id;
        const item = await addToCart(input.variantId, input.quantity, userId, input.sessionId);
        return item;
      }),

    // Update quantity
    updateQuantity: publicProcedure
      .input(z.object({
        cartItemId: z.number(),
        quantity: z.number().min(0),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user?.id;
        const item = await updateCartItemQuantity(input.cartItemId, input.quantity, userId, input.sessionId);
        return item;
      }),

    // Remove from cart
    remove: publicProcedure
      .input(z.object({
        cartItemId: z.number(),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user?.id;
        const success = await removeFromCart(input.cartItemId, userId, input.sessionId);
        return { success };
      }),

    // Clear cart
    clear: publicProcedure
      .input(z.object({ sessionId: z.string().optional() }).optional())
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user?.id;
        await clearCart(userId, input?.sessionId);
        return { success: true };
      }),

    // Merge guest cart after login
    merge: protectedProcedure
      .input(z.object({ sessionId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await mergeGuestCart(input.sessionId, ctx.user.id);
        return { success: true };
      }),
  }),

  // Checkout routes
  checkout: router({
    // Create checkout session
    createSession: publicProcedure
      .input(z.object({ sessionId: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user?.id;
        const sessionId = input.sessionId;
        
        // Get cart items
        const cartItems = await getCartItems(userId, sessionId);
        
        if (cartItems.length === 0) {
          throw new Error("Cart is empty");
        }

        // Get origin from request
        const origin = ctx.req.headers.origin || `${ctx.req.protocol}://${ctx.req.get("host")}`;

        const result = await createCheckoutSession(
          cartItems,
          userId,
          ctx.user?.email || undefined,
          ctx.user?.name || undefined,
          origin
        );

        return result;
      }),

    // Get order by session ID
    getOrder: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        const order = await getOrderBySessionId(input.sessionId);
        return order;
      }),
  }),

  // Order routes
  orders: router({
    // Get user's orders
    list: protectedProcedure.query(async ({ ctx }) => {
      const orders = await getUserOrders(ctx.user.id);
      return orders;
    }),

    // Get all orders requiring manual processing (admin only)
    pendingManual: adminProcedure.query(async () => {
      const pendingOrders = await getPendingManualOrders();
      return pendingOrders;
    }),

    // Mark order as manually processed (admin only)
    markProcessed: adminProcedure
      .input(z.object({ orderId: z.number(), printfulOrderId: z.number().optional() }))
      .mutation(async ({ input }) => {
        const result = await markOrderAsProcessed(input.orderId, input.printfulOrderId);
        return result;
      }),
  }),

  // Email subscription routes
  email: router({
    // Subscribe to launch notifications
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        interest: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await subscribeEmail(input.email, input.interest);
        return result;
      }),

    // Unsubscribe
    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const result = await unsubscribeEmail(input.email);
        return result;
      }),

    // Get all subscribers (admin only)
    list: adminProcedure.query(async () => {
      const subscribers = await getAllSubscribers();
      return subscribers;
    }),
  }),

  // Reviews routes
  reviews: router({
    // Get reviews for a product
    list: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        const reviews = await getProductReviews(input.productId);
        return reviews;
      }),

    // Get average rating for a product
    rating: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        const rating = await getProductRating(input.productId);
        return rating;
      }),

    // Add a review
    add: publicProcedure
      .input(z.object({
        productId: z.number(),
        reviewerName: z.string().min(1).max(100),
        rating: z.number().min(1).max(5),
        title: z.string().max(255).optional(),
        content: z.string().max(2000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await addReview({
          productId: input.productId,
          userId: ctx.user?.id,
          reviewerName: input.reviewerName,
          rating: input.rating,
          title: input.title,
          content: input.content,
        });
        return result;
      }),

    // Delete a review
    delete: protectedProcedure
      .input(z.object({ reviewId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const isAdmin = ctx.user.role === 'admin';
        const result = await deleteReview(input.reviewId, ctx.user.id, isAdmin);
        return result;
      }),
  }),

  // Contact form route
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        message: z.string().min(1).max(2000),
      }))
      .mutation(async ({ input }) => {
        await notifyOwner({
          title: `Contact Form: Message from ${input.name}`,
          content: `From: ${input.name} <${input.email}>\n\n${input.message}`,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
