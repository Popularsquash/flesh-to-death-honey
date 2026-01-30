import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Stripe customer ID for payment processing */
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Products synced from Printful
 * We store essential product info locally for fast display
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  /** Printful sync product ID (null for manually created products) */
  printfulSyncProductId: int("printfulSyncProductId").unique(),
  /** Product name */
  name: varchar("name", { length: 255 }).notNull(),
  /** Product description */
  description: text("description"),
  /** Thumbnail image URL */
  thumbnailUrl: varchar("thumbnailUrl", { length: 1024 }),
  /** Whether product is active/visible */
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Product variants (sizes, colors) synced from Printful
 */
export const productVariants = mysqlTable("productVariants", {
  id: int("id").autoincrement().primaryKey(),
  /** Reference to parent product */
  productId: int("productId").notNull(),
  /** Printful sync variant ID (null for manually created variants) */
  printfulSyncVariantId: int("printfulSyncVariantId").unique(),
  /** Printful variant ID (for ordering) */
  printfulVariantId: int("printfulVariantId").notNull(),
  /** Variant name (e.g., "Black / M") */
  name: varchar("name", { length: 255 }).notNull(),
  /** SKU */
  sku: varchar("sku", { length: 100 }),
  /** Retail price in cents */
  retailPrice: int("retailPrice").notNull(),
  /** Currency code */
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  /** Variant image URL */
  imageUrl: varchar("imageUrl", { length: 1024 }),
  /** Size (if applicable) */
  size: varchar("size", { length: 50 }),
  /** Color (if applicable) */
  color: varchar("color", { length: 50 }),
  /** Whether variant is in stock */
  inStock: int("inStock").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = typeof productVariants.$inferInsert;

/**
 * Shopping cart items
 */
export const cartItems = mysqlTable("cartItems", {
  id: int("id").autoincrement().primaryKey(),
  /** User who owns this cart item (null for guest carts) */
  userId: int("userId"),
  /** Session ID for guest carts */
  sessionId: varchar("sessionId", { length: 255 }),
  /** Product variant being purchased */
  variantId: int("variantId").notNull(),
  /** Quantity */
  quantity: int("quantity").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

/**
 * Orders - minimal schema following Stripe best practices
 * Most order details are stored in Stripe, we only keep essential IDs
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  /** User who placed the order */
  userId: int("userId"),
  /** Stripe checkout session ID */
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).notNull().unique(),
  /** Stripe payment intent ID */
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  /** Printful order ID (set after order is submitted to Printful) */
  printfulOrderId: int("printfulOrderId"),
  /** Order status */
  status: mysqlEnum("status", ["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"]).default("pending").notNull(),
  /** Total amount in cents (cached for quick display) */
  totalAmount: int("totalAmount").notNull(),
  /** Currency */
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  /** Shipping address (JSON) */
  shippingAddress: json("shippingAddress"),
  /** Order items snapshot (JSON) - stored for historical reference */
  items: json("items"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;


/**
 * Email subscribers for launch notifications
 */
export const emailSubscribers = mysqlTable("emailSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  /** Subscriber email address */
  email: varchar("email", { length: 320 }).notNull().unique(),
  /** What they're subscribing for */
  interest: varchar("interest", { length: 100 }).default("beeswax_launch").notNull(),
  /** Whether subscription is active */
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = typeof emailSubscribers.$inferInsert;

/**
 * Customer reviews for products
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  /** Product being reviewed */
  productId: int("productId").notNull(),
  /** User who wrote the review (null for anonymous) */
  userId: int("userId"),
  /** Reviewer name (for display) */
  reviewerName: varchar("reviewerName", { length: 100 }).notNull(),
  /** Rating 1-5 stars */
  rating: int("rating").notNull(),
  /** Review title */
  title: varchar("title", { length: 255 }),
  /** Review content */
  content: text("content"),
  /** Whether review is approved/visible */
  isApproved: int("isApproved").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
