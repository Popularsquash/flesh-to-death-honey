import { createConnection } from "mysql2/promise";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const conn = await createConnection(process.env.DATABASE_URL);

// GFDD benchmark prices by product type (in cents)
const priceUpdates = [
  // Tote bag
  { id: 180001, name: "Beekeepin things", price: 2500 },
  // Tees -> $35
  { id: 180002, name: "Unisex t-shirt", price: 3500 },
  { id: 180004, name: "Men's cotton crew neck t-shirt", price: 3500 },
  { id: 180006, name: "Warped bees", price: 3500 },
  { id: 180011, name: "Unisex t-shirt (2)", price: 3500 },
  { id: 180014, name: "Unisex fine jersey tee", price: 3500 },
  // Journal
  { id: 180003, name: "Softcover journal with inside prints", price: 2000 },
  // Sweatshirt -> $55
  { id: 180005, name: "Unisex Sweatshirt", price: 5500 },
  // Tank -> $35
  { id: 180007, name: "Men's tank top", price: 3500 },
  // Socks -> $15
  { id: 180008, name: "Crew socks", price: 1500 },
  // Hoodie -> $69
  { id: 180009, name: "Bee Hoodie", price: 6900 },
  // Bomber Jacket -> $89
  { id: 180010, name: "Unisex Bomber Jacket", price: 8900 },
  // Cap -> $33
  { id: 180012, name: "Five Panel Cap", price: 3300 },
  // Bandana -> $15
  { id: 180013, name: "All-over print bandana", price: 1500 },
  // Swim Trunks -> $45
  { id: 180015, name: "Bee Swim Trunks", price: 4500 },
];

console.log("Updating prices to GFDD benchmarks...\n");

for (const { id, name, price } of priceUpdates) {
  const [result] = await conn.execute(
    "UPDATE productVariants SET retailPrice = ? WHERE productId = ?",
    [price, id]
  );
  console.log(`  ${name} (ID ${id}): $${(price / 100).toFixed(2)} — ${result.affectedRows} variants updated`);
}

// Also deactivate the two empty Flag Bearer variants
await conn.execute("UPDATE products SET isActive = 0 WHERE id IN (120006, 120007)");
console.log("\n  Deactivated empty Flag Bearer variants (120006, 120007)");

console.log("\nDone! All prices updated.");
await conn.end();
