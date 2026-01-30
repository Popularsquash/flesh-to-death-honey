import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { emailSubscribers, reviews } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Test email for cleanup
const testEmail = `test-${Date.now()}@example.com`;
const testProductId = 30001; // THE SIGNATURE product

describe('Email Subscription', () => {
  afterAll(async () => {
    // Cleanup test data
    const db = await getDb();
    if (db) {
      await db.delete(emailSubscribers).where(eq(emailSubscribers.email, testEmail));
    }
  });

  it('should subscribe a new email', async () => {
    const db = await getDb();
    expect(db).toBeDefined();
    
    const result = await db!.insert(emailSubscribers).values({
      email: testEmail,
      interest: 'beeswax_launch',
    });
    
    expect(result).toBeDefined();
  });

  it('should find the subscribed email', async () => {
    const db = await getDb();
    expect(db).toBeDefined();
    
    const [subscriber] = await db!
      .select()
      .from(emailSubscribers)
      .where(eq(emailSubscribers.email, testEmail));
    
    expect(subscriber).toBeDefined();
    expect(subscriber.email).toBe(testEmail);
    expect(subscriber.interest).toBe('beeswax_launch');
  });

  it('should have valid subscription fields', async () => {
    const db = await getDb();
    expect(db).toBeDefined();
    
    const [subscriber] = await db!
      .select()
      .from(emailSubscribers)
      .where(eq(emailSubscribers.email, testEmail));
    
    // createdAt is the timestamp field, not subscribedAt
    expect(subscriber.createdAt).toBeDefined();
    // isActive is stored as int (1 = true)
    expect(subscriber.isActive).toBe(1);
  });
});

describe('Product Reviews', () => {
  let testReviewId: number;

  afterAll(async () => {
    // Cleanup test review
    const db = await getDb();
    if (db && testReviewId) {
      await db.delete(reviews).where(eq(reviews.id, testReviewId));
    }
  });

  it('should create a new review', async () => {
    const db = await getDb();
    expect(db).toBeDefined();
    
    const [result] = await db!.insert(reviews).values({
      productId: testProductId,
      reviewerName: 'Test Rider',
      rating: 5,
      title: 'Best gear ever',
      content: 'This is a test review for the product.',
    }).$returningId();
    
    testReviewId = result.id;
    expect(testReviewId).toBeDefined();
    expect(testReviewId).toBeGreaterThan(0);
  });

  it('should find the created review', async () => {
    const db = await getDb();
    expect(db).toBeDefined();
    
    const [review] = await db!
      .select()
      .from(reviews)
      .where(eq(reviews.id, testReviewId));
    
    expect(review).toBeDefined();
    expect(review.productId).toBe(testProductId);
    expect(review.reviewerName).toBe('Test Rider');
    expect(review.rating).toBe(5);
  });

  it('should have valid review fields', async () => {
    const db = await getDb();
    expect(db).toBeDefined();
    
    const [review] = await db!
      .select()
      .from(reviews)
      .where(eq(reviews.id, testReviewId));
    
    expect(review.title).toBe('Best gear ever');
    expect(review.content).toBe('This is a test review for the product.');
    expect(review.createdAt).toBeDefined();
    // isApproved is stored as int (1 = true)
    expect(review.isApproved).toBe(1);
  });

  it('should list reviews for a product', async () => {
    const db = await getDb();
    expect(db).toBeDefined();
    
    const productReviews = await db!
      .select()
      .from(reviews)
      .where(eq(reviews.productId, testProductId));
    
    expect(Array.isArray(productReviews)).toBe(true);
    expect(productReviews.length).toBeGreaterThan(0);
  });
});
