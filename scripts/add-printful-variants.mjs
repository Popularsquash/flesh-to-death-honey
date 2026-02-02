/**
 * Script to add product variants for the new Printful products
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

// Get the product IDs for our new products
const [products] = await connection.execute(
  "SELECT id, name FROM products WHERE name IN ('Hive Mind Cap', 'Swarm Hoodie', 'The Flag Bearer Tee', 'Beekeeper Tank') ORDER BY id DESC"
);

console.log('Found products:', products);

// Define variants for each product
const variantConfigs = {
  'Hive Mind Cap': {
    sizes: ['One Size'],
    basePrice: 2800, // $28.00
    printfulVariantId: 7005, // Yupoong 7005
  },
  'Swarm Hoodie': {
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    basePrice: 5500, // $55.00
    xlPrice: 5800, // $58.00 for XL+
    printfulVariantId: 2580, // Cotton Heritage M2580
  },
  'The Flag Bearer Tee': {
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    basePrice: 2500, // $25.00
    xlPrice: 2800, // $28.00 for XL+
    printfulVariantId: 4012, // Bella Canvas 3001
  },
  'Beekeeper Tank': {
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    basePrice: 2800, // $28.00
    xlPrice: 3000, // $30.00 for XL+
    printfulVariantId: 1790, // Cotton Heritage MC1790
  },
};

for (const product of products) {
  const config = variantConfigs[product.name];
  if (!config) {
    console.log(`No config for product: ${product.name}`);
    continue;
  }

  console.log(`Adding variants for ${product.name} (ID: ${product.id})`);

  for (const size of config.sizes) {
    const isXL = size.includes('XL') || size === '2XL' || size === '3XL';
    const price = isXL && config.xlPrice ? config.xlPrice : config.basePrice;

    const variantName = `${product.name} - Black / ${size}`;
    
    try {
      await connection.execute(
        `INSERT INTO productVariants (productId, printfulVariantId, name, retailPrice, currency, size, color, inStock)
         VALUES (?, ?, ?, ?, 'USD', ?, 'Black', 1)`,
        [product.id, config.printfulVariantId, variantName, price, size]
      );
      console.log(`  Added: ${size} @ $${(price / 100).toFixed(2)}`);
    } catch (error) {
      console.error(`  Error adding ${size}:`, error.message);
    }
  }
}

await connection.end();
console.log('Done!');
