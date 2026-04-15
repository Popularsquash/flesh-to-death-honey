/**
 * Blog post database operations
 * FTD Field Notes — the beekeeper's journal
 */

import { eq, desc, and } from "drizzle-orm";
import { getDb } from "./db";
import { blogPosts, InsertBlogPost, BlogPost } from "../drizzle/schema";

/**
 * Get all published blog posts, newest first
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, 1))
    .orderBy(desc(blogPosts.publishedAt));
}

/**
 * Get a single published post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, 1)))
    .limit(1);

  return post ?? null;
}

/**
 * Get a single post by ID (admin use)
 */
export async function getPostById(id: number): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  return post ?? null;
}

/**
 * Create a new blog post
 */
export async function createPost(data: InsertBlogPost): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogPosts).values(data);
  return { id: result[0].insertId };
}

/**
 * Update an existing blog post
 */
export async function updatePost(
  id: number,
  data: Partial<InsertBlogPost>
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

/**
 * Delete a blog post
 */
export async function deletePost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

/**
 * Seed initial blog posts if the table is empty
 */
export async function seedBlogIfEmpty(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const existing = await db.select().from(blogPosts).limit(1);
  if (existing.length > 0) return;

  const seedPosts: InsertBlogPost[] = [
    {
      slug: "why-we-started-ftd",
      title: "Why We Started Flesh to Death Honey",
      excerpt:
        "A veteran, a desert, and a box full of bees. This is how it started.",
      content: `I got out of the military and needed something real to hold onto.

Not a desk. Not a cubicle. Not a career path drawn on a whiteboard by someone who's never bled for anything.

I needed dirt under my fingernails and something alive that depended on me.

So I got bees.

Started with two hives in the Nevada desert. Watched them die the first winter. Started over. Watched them thrive. Watched them swarm. Watched them build something from nothing — just like I was trying to do.

Flesh to Death Honey isn't a brand. It's a philosophy. You work until it kills you, and then you keep working. The bees taught me that.

Real hives. Real honey. No shortcuts. No fluff.

This is what we're building.`,
      imageUrl:
        "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png",
      author: "The Beekeeper",
      category: "Hive Life",
      isPublished: 1,
    },
    {
      slug: "nevada-desert-beekeeping",
      title: "Beekeeping in the Nevada Desert: What Nobody Tells You",
      excerpt:
        "The desert is brutal. The bees don't care. Here's what I learned the hard way.",
      content: `Everyone pictures beekeeping as rolling green fields and white boxes.

Nevada doesn't do that.

Out here it's 110 degrees in July, alkaline soil, and plants that bloom for two weeks and then disappear for months. The bees adapt or they die. Same goes for the beekeeper.

What I've learned:

**Water is everything.** In the desert, your bees will travel miles for water. Set up a water source close to the hive or they'll find your neighbor's pool — and your neighbor won't be happy about it.

**The bloom windows are short and violent.** When the desert blooms, it BLOOMS. You have maybe 10-14 days to pull honey before the nectar flow stops cold. Miss it and you're waiting another year.

**Heat kills.** Not just the bees — the wax. At 110°F, comb starts to melt and collapse. Shade your hives. Ventilate your hives. Or lose your hives.

**The honey is different.** Desert wildflower honey has a complexity that clover honey just doesn't have. Sage, desert willow, palo verde — it's darker, richer, and it hits different.

We're still learning. Every season teaches us something new. That's the point.`,
      imageUrl:
        "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png",
      author: "The Beekeeper",
      category: "Hive Life",
      isPublished: 1,
    },
    {
      slug: "honey-products-coming",
      title: "What's Coming: Real Honey Products from Real Hives",
      excerpt:
        "The merch is just the beginning. Here's what's in the works for the honey side of FTD.",
      content: `The merch keeps the lights on while we build the real thing.

Here's what's coming from the hives:

**Raw Desert Wildflower Honey** — unfiltered, unpasteurized, straight from Nevada desert blooms. No additives. No heat treatment. Just honey the way it's supposed to be.

**Beeswax Products** — we render our own wax. Lip balm, candles, wood conditioner. If it can be made from beeswax, we're making it.

**Infused Honey** — hot honey, herb-infused honey, bourbon honey. We're experimenting. Some of it will be terrible. Some of it will be incredible. You'll get to try both.

**Honeycomb** — if the hive produces it and it's clean, we're selling it as-is. Nothing more honest than a piece of comb straight from the box.

Timeline: we're not rushing it. The bees don't rush. Neither do we.

Sign up for the swarm list if you want to know when products drop. We'll tell you first.`,
      imageUrl:
        "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png",
      author: "The Beekeeper",
      category: "Honey",
      isPublished: 1,
    },
  ];

  await db.insert(blogPosts).values(seedPosts);
  console.log("[Blog] Seeded 3 initial blog posts");
}
