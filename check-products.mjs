import mysql from 'mysql2/promise';

const url = new URL(process.env.DATABASE_URL);
const conn = await mysql.createConnection({
  host: url.hostname,
  port: url.port,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: true }
});

const [products] = await conn.execute('SELECT id, name FROM products ORDER BY id');
console.log('Products:');
products.forEach(p => console.log(`  ${p.id}: ${p.name}`));

const [variants] = await conn.execute('SELECT id, productId, name, retailPrice FROM productVariants ORDER BY productId, id');
console.log('\nVariants:');
variants.forEach(v => console.log(`  Product ${v.productId} - ${v.name}: $${(v.retailPrice/100).toFixed(2)}`));

await conn.end();
