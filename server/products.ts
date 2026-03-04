/**
 * Product database operations
 */

import { eq, and, isNull } from "drizzle-orm";
import { getDb } from "./db";
import { 
  products, 
  productVariants, 
  cartItems,
  InsertProduct, 
  InsertProductVariant,
  InsertCartItem,
  Product,
  ProductVariant,
  CartItem
} from "../drizzle/schema";
import { getProducts as getPrintfulProducts, getProduct as getPrintfulProduct } from "./printful";

/**
 * Sync all products from Printful to local database
 */
export async function syncProductsFromPrintful(): Promise<{ synced: number; errors: string[] }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const errors: string[] = [];
  let synced = 0;

  try {
    const printfulProducts = await getPrintfulProducts();
    
    for (const pProduct of printfulProducts) {
      try {
        // Get full product details with variants
        const productDetails = await getPrintfulProduct(pProduct.id);
        
        // Upsert product
        const productData: InsertProduct = {
          printfulSyncProductId: pProduct.id,
          name: pProduct.name,
          thumbnailUrl: pProduct.thumbnail_url,
          isActive: pProduct.is_ignored ? 0 : 1,
        };

        await db.insert(products)
          .values(productData)
          .onDuplicateKeyUpdate({
            set: {
              name: productData.name,
              thumbnailUrl: productData.thumbnailUrl,
              isActive: productData.isActive,
            },
          });

        // Get the product ID
        const [existingProduct] = await db
          .select()
          .from(products)
          .where(eq(products.printfulSyncProductId, pProduct.id))
          .limit(1);

        if (!existingProduct) {
          errors.push(`Failed to find product after insert: ${pProduct.name}`);
          continue;
        }

        // Upsert variants
        for (const variant of productDetails.sync_variants) {
          // Parse size and color from variant name or options
          let size: string | undefined;
          let color: string | undefined;
          
          for (const option of variant.options || []) {
            if (option.id === "size") {
              size = Array.isArray(option.value) ? option.value[0] : option.value;
            }
            if (option.id === "color") {
              color = Array.isArray(option.value) ? option.value[0] : option.value;
            }
          }

          // Extract from name if not in options (format: "Product Name - Color / Size")
          if (!size || !color) {
            const nameParts = variant.name.split(" - ");
            if (nameParts.length > 1) {
              const variantPart = nameParts[nameParts.length - 1];
              const [colorPart, sizePart] = variantPart.split(" / ");
              if (!color && colorPart) color = colorPart.trim();
              if (!size && sizePart) size = sizePart.trim();
            }
          }

          const variantData: InsertProductVariant = {
            productId: existingProduct.id,
            printfulSyncVariantId: variant.id,
            printfulVariantId: variant.variant_id,
            name: variant.name,
            sku: variant.sku || undefined,
            retailPrice: Math.round(parseFloat(variant.retail_price) * 100), // Convert to cents
            currency: variant.currency || "USD",
            imageUrl: variant.product?.image || variant.files?.[0]?.preview_url || pProduct.thumbnail_url,
            size,
            color,
            inStock: variant.synced ? 1 : 0,
          };

          await db.insert(productVariants)
            .values(variantData)
            .onDuplicateKeyUpdate({
              set: {
                productId: variantData.productId,
                printfulVariantId: variantData.printfulVariantId,
                name: variantData.name,
                sku: variantData.sku,
                retailPrice: variantData.retailPrice,
                currency: variantData.currency,
                imageUrl: variantData.imageUrl,
                size: variantData.size,
                color: variantData.color,
                inStock: variantData.inStock,
              },
            });
        }

        synced++;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        errors.push(`Failed to sync product ${pProduct.name}: ${errorMessage}`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    errors.push(`Failed to fetch products from Printful: ${errorMessage}`);
  }

  return { synced, errors };
}

/**
 * Get all active products with their variants
 */
export async function getAllProducts(): Promise<(Product & { variants: ProductVariant[] })[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.isActive, 1));

  const productsWithVariants = await Promise.all(
    allProducts.map(async (product) => {
      const variants = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.productId, product.id));
      
      return {
        ...product,
        variants,
      };
    })
  );

  return productsWithVariants;
}

/**
 * Get a single product with its variants
 */
export async function getProductById(productId: number): Promise<(Product & { variants: ProductVariant[] }) | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    return null;
  }

  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, product.id));

  return {
    ...product,
    variants,
  };
}

/**
 * Get a variant by ID
 */
export async function getVariantById(variantId: number): Promise<ProductVariant | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const [variant] = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.id, variantId))
    .limit(1);

  return variant || null;
}

// Cart operations

/**
 * Get cart items for a user or session
 */
export async function getCartItems(userId?: number, sessionId?: string): Promise<(CartItem & { variant: ProductVariant; product: Product })[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  let items: CartItem[];
  
  if (userId) {
    items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, userId));
  } else if (sessionId) {
    items = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.sessionId, sessionId), isNull(cartItems.userId)));
  } else {
    return [];
  }

  const itemsWithDetails = await Promise.all(
    items.map(async (item) => {
      const [variant] = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.id, item.variantId))
        .limit(1);

      if (!variant) {
        return null;
      }

      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, variant.productId))
        .limit(1);

      if (!product) {
        return null;
      }

      return {
        ...item,
        variant,
        product,
      };
    })
  );

  return itemsWithDetails.filter((item): item is NonNullable<typeof item> => item !== null);
}

/**
 * Add item to cart
 */
export async function addToCart(
  variantId: number,
  quantity: number,
  userId?: number,
  sessionId?: string
): Promise<CartItem> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Check if item already exists in cart
  let existingItem: CartItem | undefined;
  
  if (userId) {
    [existingItem] = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.variantId, variantId)))
      .limit(1);
  } else if (sessionId) {
    [existingItem] = await db
      .select()
      .from(cartItems)
      .where(and(
        eq(cartItems.sessionId, sessionId),
        eq(cartItems.variantId, variantId),
        isNull(cartItems.userId)
      ))
      .limit(1);
  }

  if (existingItem) {
    // Update quantity
    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity + quantity })
      .where(eq(cartItems.id, existingItem.id));

    return { ...existingItem, quantity: existingItem.quantity + quantity };
  }

  // Insert new item
  const newItem: InsertCartItem = {
    userId: userId || undefined,
    sessionId: sessionId || undefined,
    variantId,
    quantity,
  };

  const result = await db.insert(cartItems).values(newItem);
  const insertId = result[0].insertId;

  const [inserted] = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.id, insertId))
    .limit(1);

  return inserted;
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  cartItemId: number,
  quantity: number,
  userId?: number,
  sessionId?: string
): Promise<CartItem | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Verify ownership
  const [item] = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.id, cartItemId))
    .limit(1);

  if (!item) {
    return null;
  }

  if (userId && item.userId !== userId) {
    return null;
  }
  if (sessionId && !userId && item.sessionId !== sessionId) {
    return null;
  }

  if (quantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
    return null;
  }

  await db
    .update(cartItems)
    .set({ quantity })
    .where(eq(cartItems.id, cartItemId));

  return { ...item, quantity };
}

/**
 * Remove item from cart
 */
export async function removeFromCart(
  cartItemId: number,
  userId?: number,
  sessionId?: string
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Verify ownership
  const [item] = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.id, cartItemId))
    .limit(1);

  if (!item) {
    return false;
  }

  if (userId && item.userId !== userId) {
    return false;
  }
  if (sessionId && !userId && item.sessionId !== sessionId) {
    return false;
  }

  await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
  return true;
}

/**
 * Clear cart for a user or session
 */
export async function clearCart(userId?: number, sessionId?: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  if (userId) {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  } else if (sessionId) {
    await db.delete(cartItems).where(and(eq(cartItems.sessionId, sessionId), isNull(cartItems.userId)));
  }
}

/**
 * Merge guest cart into user cart after login
 */
export async function mergeGuestCart(sessionId: string, userId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Get guest cart items
  const guestItems = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.sessionId, sessionId), isNull(cartItems.userId)));

  for (const guestItem of guestItems) {
    // Check if user already has this variant in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.variantId, guestItem.variantId)))
      .limit(1);

    if (existingItem) {
      // Add quantities
      await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + guestItem.quantity })
        .where(eq(cartItems.id, existingItem.id));
      
      // Delete guest item
      await db.delete(cartItems).where(eq(cartItems.id, guestItem.id));
    } else {
      // Transfer to user
      await db
        .update(cartItems)
        .set({ userId, sessionId: null })
        .where(eq(cartItems.id, guestItem.id));
    }
  }
}

/**
 * Update a product's thumbnail image URL
 */
export async function updateProductImage(productId: number, thumbnailUrl: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products)
    .set({ thumbnailUrl })
    .where(eq(products.id, productId));
}

/**
 * Update retail price for all variants of a product (price in cents)
 */
export async function updateProductPrice(productId: number, retailPriceCents: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(productVariants)
    .set({ retailPrice: retailPriceCents })
    .where(eq(productVariants.productId, productId));
}
