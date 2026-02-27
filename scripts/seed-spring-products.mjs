import { drizzle } from "drizzle-orm/mysql2";
import { products, productVariants } from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

// Spring Collection products from Printful
const springProducts = [
  {
    name: "Spring Hex Tee",
    description: "Warped geometry meets skeletal bees on this fitted white tee. The optical illusion print bends reality — front and back — like a fever dream in a field of dead flowers. DTF printed on a Bella + Canvas 3001 so it actually fits like it gives a damn.",
    printfulSyncProductId: 420295401,
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/PwpogSOpdWseaIvT.webp",
    backImageUrl: null,
    isActive: 1,
    variants: [
      { printfulVariantId: 4018, name: "XS", size: "XS", color: "White", retailPrice: 2250, currency: "USD" },
      { printfulVariantId: 4019, name: "S", size: "S", color: "White", retailPrice: 2250, currency: "USD" },
      { printfulVariantId: 4020, name: "M", size: "M", color: "White", retailPrice: 2250, currency: "USD" },
      { printfulVariantId: 4021, name: "L", size: "L", color: "White", retailPrice: 2250, currency: "USD" },
      { printfulVariantId: 4022, name: "XL", size: "XL", color: "White", retailPrice: 2250, currency: "USD" },
      { printfulVariantId: 4023, name: "2XL", size: "2XL", color: "White", retailPrice: 2400, currency: "USD" },
      { printfulVariantId: 4024, name: "3XL", size: "3XL", color: "White", retailPrice: 2400, currency: "USD" },
    ]
  },
  {
    name: "Beekeepin Things Tote",
    description: "Haul your cursed belongings in this all-over print large tote. Dark botanical pattern crawling with skeleton bees and bell-shaped blooms — like a Victorian funeral bouquet turned into luggage. Comes with a pocket, because even chaos needs organization.",
    printfulSyncProductId: 421538754,
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/ypEfQjeBROSHzeWG.webp",
    backImageUrl: null,
    isActive: 1,
    variants: [
      { printfulVariantId: 14854, name: "One Size", size: null, color: "Green/Black", retailPrice: 3050, currency: "USD" },
    ]
  }
];

async function seedSpringProducts() {
  console.log("Starting Spring Collection seed...");
  
  for (const productData of springProducts) {
    console.log(`Creating product: ${productData.name}`);
    
    // Insert product
    const [insertedProduct] = await db.insert(products).values({
      name: productData.name,
      description: productData.description,
      printfulSyncProductId: productData.printfulSyncProductId,
      thumbnailUrl: productData.thumbnailUrl,
      backImageUrl: productData.backImageUrl,
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
        imageUrl: productData.thumbnailUrl, // Use product image
        inStock: 1,
      });
    }
    
    console.log(`  Added ${productData.variants.length} variants`);
  }
  
  console.log("Spring Collection seed complete!");
  process.exit(0);
}

seedSpringProducts().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
