/**
 * FTD Database Update Script
 * 1. Updates prices for existing products to GFDD benchmark prices
 * 2. Adds 9 new Printful products with FTD brand-voice names and descriptions
 *
 * Run with: node scripts/update-prices-and-add-products.mjs
 */

import { createConnection } from "mysql2/promise";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const conn = await createConnection(process.env.DATABASE_URL);

console.log("Connected to database.");

// ─────────────────────────────────────────────
// TASK 1: Update prices for existing products
// Prices are stored in cents (integer)
// ─────────────────────────────────────────────
const priceUpdates = [
  { name: "Hive Mind Cap",       newPrice: 3300 },  // $33.00
  { name: "Swarm Hoodie",        newPrice: 6900 },  // $69.00
  { name: "The Flag Bearer Tee", newPrice: 3500 },  // $35.00
  { name: "Beekeeper Tank",      newPrice: 3500 },  // $35.00
  { name: "The Daily Rider Tee", newPrice: 3500 },  // $35.00
  { name: "The Swarm Rag",       newPrice: 1500 },  // $15.00
  { name: "Buzz Stompers",       newPrice:  995 },  // $9.95
];

console.log("\n── Updating prices ──");
for (const { name, newPrice } of priceUpdates) {
  const [rows] = await conn.execute(
    "SELECT id FROM products WHERE name = ?",
    [name]
  );
  if (rows.length === 0) {
    console.log(`  SKIP (not found): ${name}`);
    continue;
  }
  const productId = rows[0].id;
  const [result] = await conn.execute(
    "UPDATE productVariants SET retailPrice = ? WHERE productId = ?",
    [newPrice, productId]
  );
  console.log(`  Updated ${result.affectedRows} variants for "${name}" → $${(newPrice/100).toFixed(2)}`);
}

// ─────────────────────────────────────────────
// TASK 2: Add new Printful products
// FTD brand-voice names and descriptions
// ─────────────────────────────────────────────

// FTD Brand-Voice Product Definitions
// Printful IDs are the sync_product IDs from the store
const newProducts = [
  {
    // Printful: "Beekeepin things" (tote bag) — ID 421538754
    printfulSyncProductId: 421538754,
    name: "The Carry-All",
    description: "Built for the rider who hauls everything and apologises for nothing. Heavy-duty tote with the FTD mark — take it to the farmers market or the swap meet.",
    thumbnailUrl: "https://files.cdn.printful.com/files/634/634b1014b0dbf84bb20b6188e9cdd9ff_preview.png",
    variants: [
      { printfulSyncVariantId: 5234567890, name: "One Size", size: "OS", color: "Black", retailPrice: 2500, imageUrl: "https://files.cdn.printful.com/files/634/634b1014b0dbf84bb20b6188e9cdd9ff_preview.png" },
    ],
  },
  {
    // Printful: "Unisex t-shirt" — ID 420295401 (7 variants)
    printfulSyncProductId: 420295401,
    name: "The Colony Tee",
    description: "Soft, unisex cut. Wears like a second skin after the first wash. The hive on your chest, wherever the road takes you.",
    thumbnailUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png",
    variants: [
      { printfulSyncVariantId: 5202133080, name: "S", size: "S", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png" },
      { printfulSyncVariantId: 5202133081, name: "M", size: "M", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png" },
      { printfulSyncVariantId: 5202133082, name: "L", size: "L", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png" },
      { printfulSyncVariantId: 5202133083, name: "XL", size: "XL", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png" },
      { printfulSyncVariantId: 5202133084, name: "2XL", size: "2XL", color: "Black", retailPrice: 3800, imageUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png" },
      { printfulSyncVariantId: 5202133085, name: "3XL", size: "3XL", color: "Black", retailPrice: 3800, imageUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png" },
      { printfulSyncVariantId: 5202133086, name: "4XL", size: "4XL", color: "Black", retailPrice: 4000, imageUrl: "https://files.cdn.printful.com/files/c4b/c4bd92998eea9657ef6a7180069774f1_preview.png" },
    ],
  },
  {
    // Printful: "Softcover journal with inside prints" — ID 420011820 (2 variants)
    printfulSyncProductId: 420011820,
    name: "The Dead Reckoning Journal",
    description: "No GPS, no excuses. Write your routes, your receipts, your confessions. Softcover journal with FTD art printed inside — for those who still put pen to paper.",
    thumbnailUrl: "https://files.cdn.printful.com/files/760/760e58986872b755c7533abfb70e80e6_preview.png",
    variants: [
      { printfulSyncVariantId: 5199634590, name: "100 pages", size: "100 pages", color: "Black", retailPrice: 2000, imageUrl: "https://files.cdn.printful.com/files/01e/01e484b5993ebcd70bbe11d59081afba_preview.png" },
      { printfulSyncVariantId: 5199634591, name: "200 pages", size: "200 pages", color: "Black", retailPrice: 2500, imageUrl: "https://files.cdn.printful.com/files/d39/d39c4f5a9fffb30abb49601d75d1603f_preview.png" },
    ],
  },
  {
    // Printful: "Men's cotton crew neck t-shirt" — ID 420011684 (1 variant)
    printfulSyncProductId: 420011684,
    name: "The Crew Neck",
    description: "Heavy cotton. Clean lines. The kind of shirt you wear when you want people to know you're not trying — and that's exactly the point.",
    thumbnailUrl: "https://files.cdn.printful.com/files/c7d/c7d0e93b3cbe93630f79de0f5a5da0cf_preview.png",
    variants: [
      { printfulSyncVariantId: 5199632369, name: "One Size", size: "OS", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/5d6/5d6e37b28e33468f4b0f008ef4cfe9a0_preview.png" },
    ],
  },
  {
    // Printful: "Unisex Sweatshirt" — ID 420011508 (7 variants)
    printfulSyncProductId: 420011508,
    name: "The Hive Crewneck",
    description: "Thick fleece for cold mornings and late nights. Unisex fit that doesn't care what you rode in on — just that you showed up.",
    thumbnailUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png",
    variants: [
      { printfulSyncVariantId: 5199631423, name: "XS", size: "XS", color: "Black", retailPrice: 5500, imageUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png" },
      { printfulSyncVariantId: 5199631424, name: "S", size: "S", color: "Black", retailPrice: 5500, imageUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png" },
      { printfulSyncVariantId: 5199631425, name: "M", size: "M", color: "Black", retailPrice: 5500, imageUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png" },
      { printfulSyncVariantId: 5199631426, name: "L", size: "L", color: "Black", retailPrice: 5500, imageUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png" },
      { printfulSyncVariantId: 5199631427, name: "XL", size: "XL", color: "Black", retailPrice: 5500, imageUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png" },
      { printfulSyncVariantId: 5199631428, name: "2XL", size: "2XL", color: "Black", retailPrice: 5500, imageUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png" },
      { printfulSyncVariantId: 5199631429, name: "3XL", size: "3XL", color: "Black", retailPrice: 5800, imageUrl: "https://files.cdn.printful.com/files/bcc/bccf49fad513c0854228fb8abf5d7d09_preview.png" },
    ],
  },
  {
    // Printful: "Warped bees" — ID 420011414 (5 variants, tee)
    printfulSyncProductId: 420011414,
    name: "The Warp Tee",
    description: "The bees are distorted. So is the world. Graphic tee for those who see things a little differently — and wouldn't have it any other way.",
    thumbnailUrl: "https://files.cdn.printful.com/files/530/5305c6d9072ce53970ec68e8fbb28591_preview.png",
    variants: [
      { printfulSyncVariantId: 5199630660, name: "S", size: "S", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/0a2/0a266e33afd6afd3b32283b7be739681_preview.png" },
      { printfulSyncVariantId: 5199630661, name: "M", size: "M", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/0a2/0a266e33afd6afd3b32283b7be739681_preview.png" },
      { printfulSyncVariantId: 5199630662, name: "L", size: "L", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/0a2/0a266e33afd6afd3b32283b7be739681_preview.png" },
      { printfulSyncVariantId: 5199630663, name: "XL", size: "XL", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/0a2/0a266e33afd6afd3b32283b7be739681_preview.png" },
      { printfulSyncVariantId: 5199630664, name: "2XL", size: "2XL", color: "Black", retailPrice: 3800, imageUrl: "https://files.cdn.printful.com/files/0a2/0a266e33afd6afd3b32283b7be739681_preview.png" },
    ],
  },
  {
    // Printful: "Men's tank top" — ID 420011350 (6 variants)
    printfulSyncProductId: 420011350,
    name: "The Sleeveless",
    description: "Cut the sleeves. Show the ink. Men's tank for the days when the heat is on and you've got nothing left to hide.",
    thumbnailUrl: "https://files.cdn.printful.com/files/344/344628db1224d50c9a14f5b4478b6503_preview.png",
    variants: [
      { printfulSyncVariantId: 5199630318, name: "S", size: "S", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/344/344628db1224d50c9a14f5b4478b6503_preview.png" },
      { printfulSyncVariantId: 5199630319, name: "M", size: "M", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/344/344628db1224d50c9a14f5b4478b6503_preview.png" },
      { printfulSyncVariantId: 5199630320, name: "L", size: "L", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/344/344628db1224d50c9a14f5b4478b6503_preview.png" },
      { printfulSyncVariantId: 5199630321, name: "XL", size: "XL", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/344/344628db1224d50c9a14f5b4478b6503_preview.png" },
      { printfulSyncVariantId: 5199630322, name: "2XL", size: "2XL", color: "Black", retailPrice: 3500, imageUrl: "https://files.cdn.printful.com/files/344/344628db1224d50c9a14f5b4478b6503_preview.png" },
      { printfulSyncVariantId: 5199630323, name: "3XL", size: "3XL", color: "Black", retailPrice: 3800, imageUrl: "https://files.cdn.printful.com/files/344/344628db1224d50c9a14f5b4478b6503_preview.png" },
    ],
  },
  {
    // Printful: "Crew socks" — ID 420011255 (3 variants: L, M, S)
    printfulSyncProductId: 420011255,
    name: "The Hive Socks",
    description: "From the boots up. FTD crew socks — because even your feet should rep the hive. Thick, durable, and built for miles.",
    thumbnailUrl: "https://files.cdn.printful.com/files/db5/db598bb51656947674ef4d0542ddb814_preview.png",
    variants: [
      { printfulSyncVariantId: 5199629720, name: "L (9-12)", size: "L", color: "Black", retailPrice: 1500, imageUrl: "https://files.cdn.printful.com/files/700/700451aed957579acc05668b5e255788_preview.png" },
      { printfulSyncVariantId: 5199629721, name: "M (6-9)", size: "M", color: "Black", retailPrice: 1500, imageUrl: "https://files.cdn.printful.com/files/7a1/7a1998e78489f0d7a80f06b1c80e7e56_preview.png" },
      { printfulSyncVariantId: 5199629722, name: "S (4-6)", size: "S", color: "Black", retailPrice: 1500, imageUrl: "https://files.cdn.printful.com/files/db5/db598bb51656947674ef4d0542ddb814_preview.png" },
    ],
  },
  {
    // Printful: "Bee Hoodie" — ID 420011207 (1 variant)
    printfulSyncProductId: 420011207,
    name: "The Sting Hoodie",
    description: "One size. One statement. The Sting Hoodie is for those who run cold on the outside and hot on the inside. Pull up the hood and disappear into the swarm.",
    thumbnailUrl: "https://files.cdn.printful.com/files/76f/76fe1c9dc6f2932f7d8ba7feb887b739_preview.png",
    variants: [
      { printfulSyncVariantId: 5199629356, name: "One Size", size: "OS", color: "Black", retailPrice: 5500, imageUrl: "https://files.cdn.printful.com/files/76f/76fe1c9dc6f2932f7d8ba7feb887b739_preview.png" },
    ],
  },
];

console.log("\n── Adding new products ──");
for (const product of newProducts) {
  // Check if already exists
  const [existing] = await conn.execute(
    "SELECT id FROM products WHERE name = ? OR printfulSyncProductId = ?",
    [product.name, product.printfulSyncProductId]
  );
  if (existing.length > 0) {
    console.log(`  SKIP (already exists): ${product.name}`);
    continue;
  }

  // Insert product
  const [insertResult] = await conn.execute(
    `INSERT INTO products (name, description, printfulSyncProductId, thumbnailUrl, isActive, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, 1, NOW(), NOW())`,
    [product.name, product.description, product.printfulSyncProductId, product.thumbnailUrl]
  );
  const productId = insertResult.insertId;
  console.log(`  Created product ID=${productId}: "${product.name}"`);

  // Insert variants
  for (const v of product.variants) {
    await conn.execute(
      `INSERT INTO productVariants (productId, printfulSyncVariantId, printfulVariantId, name, size, color, retailPrice, currency, imageUrl, inStock, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'USD', ?, 1, NOW(), NOW())`,
      [productId, v.printfulSyncVariantId, v.printfulSyncVariantId, v.name, v.size, v.color, v.retailPrice, v.imageUrl]
    );
  }
  console.log(`    Added ${product.variants.length} variant(s)`);
}

await conn.end();
console.log("\nDone.");
