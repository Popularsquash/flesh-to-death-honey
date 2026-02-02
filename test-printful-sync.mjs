import 'dotenv/config';

const PRINTFUL_API_URL = "https://api.printful.com";
const STORE_ID = 5532073;

async function printfulFetch(endpoint) {
  const apiKey = process.env.PRINTFUL_API_KEY;
  
  if (!apiKey) {
    throw new Error("PRINTFUL_API_KEY is not configured");
  }

  const url = `${PRINTFUL_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-PF-Store-Id": STORE_ID.toString(),
    },
  });

  const data = await response.json();
  return data;
}

async function main() {
  console.log("Fetching products from Printful store...");
  
  const productsResponse = await printfulFetch("/store/products");
  console.log("\n=== Products in Printful Store ===");
  console.log(JSON.stringify(productsResponse, null, 2));
  
  if (productsResponse.result && productsResponse.result.length > 0) {
    console.log("\n=== Getting details for each product ===");
    for (const product of productsResponse.result) {
      console.log(`\n--- Product: ${product.name} (ID: ${product.id}) ---`);
      const details = await printfulFetch(`/store/products/${product.id}`);
      console.log(JSON.stringify(details, null, 2));
    }
  }
}

main().catch(console.error);
