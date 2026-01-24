import { drizzle } from "drizzle-orm/mysql2";
import { products, productVariants } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

// Product data based on Printful catalog
const productsData = [
  {
    name: "Death Rider Football Jersey",
    description: "Rep the hive on the field or in the pit. This breathable mesh jersey stays light, even in heat or crowds. The loose fit and side slits give plenty of room to move. All-over sublimation print that won't crack or fade.",
    printfulProductId: 918,
    thumbnailUrl: "https://files.cdn.printful.com/o/upload/product-catalog-img/d0/d05ae634a9736063dfb1edd1df2c4ad6_l",
    isActive: true,
    variants: [
      { printfulVariantId: 23612, name: "2XS", size: "2XS", color: "White", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 23613, name: "XS", size: "XS", color: "White", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 23614, name: "S", size: "S", color: "White", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 23615, name: "M", size: "M", color: "White", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 23616, name: "L", size: "L", color: "White", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 23617, name: "XL", size: "XL", color: "White", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 23618, name: "2XL", size: "2XL", color: "White", retailPrice: 5800, currency: "USD" },
      { printfulVariantId: 23619, name: "3XL", size: "3XL", color: "White", retailPrice: 6000, currency: "USD" },
      { printfulVariantId: 23620, name: "4XL", size: "4XL", color: "White", retailPrice: 6200, currency: "USD" },
      { printfulVariantId: 23621, name: "5XL", size: "5XL", color: "White", retailPrice: 6400, currency: "USD" },
    ]
  },
  {
    name: "Hive Guard Rashguard",
    description: "Don't let sunburn, wind, sand, or other elements ruin your day! This smooth and versatile long-sleeve rash guard will protect you while you have fun. All-over sublimation print with UPF 38 protection.",
    printfulProductId: 301,
    thumbnailUrl: "https://files.cdn.printful.com/o/upload/product-catalog-img/f5/f515cd70efe83bee7e42d06c9e1c4e3c_l",
    isActive: true,
    variants: [
      { printfulVariantId: 9326, name: "XS", size: "XS", color: "Black", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 9327, name: "S", size: "S", color: "Black", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 9328, name: "M", size: "M", color: "Black", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 9329, name: "L", size: "L", color: "Black", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 9330, name: "XL", size: "XL", color: "Black", retailPrice: 5500, currency: "USD" },
      { printfulVariantId: 9331, name: "2XL", size: "2XL", color: "Black", retailPrice: 5800, currency: "USD" },
      { printfulVariantId: 9332, name: "3XL", size: "3XL", color: "Black", retailPrice: 6000, currency: "USD" },
    ]
  },
  {
    name: "Swarm Tank Top",
    description: "Premium quality tank top for the hive. Made from 100% combed ring-spun cotton for ultimate comfort. Perfect for hot days, gym sessions, or showing off your ink.",
    printfulProductId: 537,
    thumbnailUrl: "https://files.cdn.printful.com/o/upload/product-catalog-img/f1/f1a2114ae93247d9c839ab55e5300ba5_l",
    isActive: true,
    variants: [
      { printfulVariantId: 13571, name: "S - Black", size: "S", color: "Black", retailPrice: 3200, currency: "USD" },
      { printfulVariantId: 13572, name: "M - Black", size: "M", color: "Black", retailPrice: 3200, currency: "USD" },
      { printfulVariantId: 13573, name: "L - Black", size: "L", color: "Black", retailPrice: 3200, currency: "USD" },
      { printfulVariantId: 13574, name: "XL - Black", size: "XL", color: "Black", retailPrice: 3200, currency: "USD" },
      { printfulVariantId: 13575, name: "2XL - Black", size: "2XL", color: "Black", retailPrice: 3500, currency: "USD" },
      { printfulVariantId: 13576, name: "3XL - Black", size: "3XL", color: "Black", retailPrice: 3800, currency: "USD" },
    ]
  },
  {
    name: "Heavyweight Hive Tee",
    description: "Elevate your outfit with this premium heavyweight tee. Structured, classy fit with a thick fabric that drapes well. 100% ring-spun cotton, pre-shrunk for a lasting fit.",
    printfulProductId: 508,
    thumbnailUrl: "https://files.cdn.printful.com/o/upload/product-catalog-img/27/27a0e15dcb0e2d6b6ba4a836d05a2d1e_l",
    isActive: true,
    variants: [
      { printfulVariantId: 12780, name: "S - Black", size: "S", color: "Black", retailPrice: 3500, currency: "USD" },
      { printfulVariantId: 12781, name: "M - Black", size: "M", color: "Black", retailPrice: 3500, currency: "USD" },
      { printfulVariantId: 12782, name: "L - Black", size: "L", color: "Black", retailPrice: 3500, currency: "USD" },
      { printfulVariantId: 12783, name: "XL - Black", size: "XL", color: "Black", retailPrice: 3500, currency: "USD" },
      { printfulVariantId: 12784, name: "2XL - Black", size: "2XL", color: "Black", retailPrice: 3800, currency: "USD" },
      { printfulVariantId: 12785, name: "3XL - Black", size: "3XL", color: "Black", retailPrice: 4000, currency: "USD" },
    ]
  }
];

async function seedProducts() {
  console.log("Starting product seed...");
  
  for (const productData of productsData) {
    console.log(`Creating product: ${productData.name}`);
    
    // Insert product
    const [insertedProduct] = await db.insert(products).values({
      name: productData.name,
      description: productData.description,
      printfulProductId: productData.printfulProductId,
      thumbnailUrl: productData.thumbnailUrl,
      isActive: productData.isActive,
    }).$returningId();
    
    const productId = insertedProduct.id;
    console.log(`  Created product ID: ${productId}`);
    
    // Insert variants
    for (const variant of productData.variants) {
      await db.insert(productVariants).values({
        productId,
        printfulVariantId: variant.printfulVariantId,
        printfulSyncVariantId: null, // Will be set when synced with Printful store
        name: variant.name,
        size: variant.size,
        color: variant.color,
        retailPrice: variant.retailPrice,
        currency: variant.currency,
        imageUrl: productData.thumbnailUrl, // Use product image for now
        inStock: true,
      });
    }
    
    console.log(`  Added ${productData.variants.length} variants`);
  }
  
  console.log("Product seed complete!");
  process.exit(0);
}

seedProducts().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
