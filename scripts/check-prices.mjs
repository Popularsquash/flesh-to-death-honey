import { createConnection } from "mysql2/promise";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const conn = await createConnection(process.env.DATABASE_URL);

const [rows] = await conn.execute(`
  SELECT p.id, p.name, p.isActive, MIN(pv.retailPrice) as minPrice, MAX(pv.retailPrice) as maxPrice, COUNT(pv.id) as variantCount
  FROM products p
  LEFT JOIN productVariants pv ON pv.productId = p.id
  GROUP BY p.id, p.name, p.isActive
  ORDER BY p.id
`);

console.log("ID  | Active | MinPrice | MaxPrice | Variants | Name");
console.log("=".repeat(90));
for (const r of rows) {
  const minP = r.minPrice !== null ? `$${(r.minPrice / 100).toFixed(2)}` : "$0.00";
  const maxP = r.maxPrice !== null ? `$${(r.maxPrice / 100).toFixed(2)}` : "$0.00";
  console.log(`${String(r.id).padStart(3)} | ${r.isActive}      | ${minP.padStart(8)} | ${maxP.padStart(8)} | ${String(r.variantCount).padStart(8)} | ${r.name}`);
}

// Also check for products with no variants
const [noVariants] = await conn.execute(`
  SELECT p.id, p.name FROM products p
  LEFT JOIN productVariants pv ON pv.productId = p.id
  WHERE pv.id IS NULL
`);
if (noVariants.length > 0) {
  console.log("\n⚠️  Products with NO variants (will show $0.00):");
  for (const r of noVariants) {
    console.log(`  ID ${r.id}: ${r.name}`);
  }
}

await conn.end();
