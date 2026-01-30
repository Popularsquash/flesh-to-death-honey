import { eq, and, desc } from "drizzle-orm";
import { getDb } from "./db";
import { emailSubscribers, reviews, InsertEmailSubscriber, InsertReview } from "../drizzle/schema";

/**
 * Subscribe an email for launch notifications
 */
export async function subscribeEmail(email: string, interest: string = "beeswax_launch"): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Check if already subscribed
    const existing = await db.select().from(emailSubscribers).where(eq(emailSubscribers.email, email)).limit(1);
    
    if (existing.length > 0) {
      // Reactivate if previously unsubscribed
      if (existing[0].isActive === 0) {
        await db.update(emailSubscribers)
          .set({ isActive: 1, interest })
          .where(eq(emailSubscribers.email, email));
        return { success: true, message: "Welcome back to the swarm!" };
      }
      return { success: true, message: "You're already on the list, road warrior." };
    }

    // Add new subscriber
    await db.insert(emailSubscribers).values({
      email,
      interest,
    });

    return { success: true, message: "You're in. We'll buzz you when the goods are ready." };
  } catch (error) {
    console.error("[Email] Failed to subscribe:", error);
    throw new Error("Failed to subscribe. Try again later.");
  }
}

/**
 * Unsubscribe an email
 */
export async function unsubscribeEmail(email: string): Promise<{ success: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(emailSubscribers)
    .set({ isActive: 0 })
    .where(eq(emailSubscribers.email, email));

  return { success: true };
}

/**
 * Get all subscribers (admin only)
 */
export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(emailSubscribers).where(eq(emailSubscribers.isActive, 1));
}

/**
 * Add a product review
 */
export async function addReview(review: {
  productId: number;
  userId?: number;
  reviewerName: string;
  rating: number;
  title?: string;
  content?: string;
}): Promise<{ success: boolean; reviewId: number }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Validate rating
  if (review.rating < 1 || review.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const result = await db.insert(reviews).values({
    productId: review.productId,
    userId: review.userId || null,
    reviewerName: review.reviewerName,
    rating: review.rating,
    title: review.title || null,
    content: review.content || null,
    isApproved: 1, // Auto-approve for now
  });

  return { success: true, reviewId: Number(result[0].insertId) };
}

/**
 * Get reviews for a product
 */
export async function getProductReviews(productId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select()
    .from(reviews)
    .where(and(
      eq(reviews.productId, productId),
      eq(reviews.isApproved, 1)
    ))
    .orderBy(desc(reviews.createdAt));
}

/**
 * Get average rating for a product
 */
export async function getProductRating(productId: number): Promise<{ average: number; count: number }> {
  const db = await getDb();
  if (!db) {
    return { average: 0, count: 0 };
  }

  const productReviews = await db.select()
    .from(reviews)
    .where(and(
      eq(reviews.productId, productId),
      eq(reviews.isApproved, 1)
    ));

  if (productReviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: Math.round((sum / productReviews.length) * 10) / 10,
    count: productReviews.length,
  };
}

/**
 * Delete a review (admin or owner only)
 */
export async function deleteReview(reviewId: number, userId?: number, isAdmin: boolean = false): Promise<{ success: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  if (isAdmin) {
    await db.delete(reviews).where(eq(reviews.id, reviewId));
  } else if (userId) {
    await db.delete(reviews).where(and(
      eq(reviews.id, reviewId),
      eq(reviews.userId, userId)
    ));
  } else {
    throw new Error("Unauthorized");
  }

  return { success: true };
}
