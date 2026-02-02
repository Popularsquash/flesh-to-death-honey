import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

const [products] = await connection.execute(
  "SELECT id, name, thumbnailUrl FROM products ORDER BY id"
);

console.log("All Products:");
console.log("=".repeat(80));
for (const p of products) {
  const isManuscript = p.thumbnailUrl?.includes('manuscdn.com');
  console.log(`ID: ${p.id} | ${p.name} | CDN: ${isManuscript ? 'YES' : 'NO'}`);
}

await connection.end();
