/**
 * Printful API Service
 * Handles all communication with the Printful API for POD integration
 */

const PRINTFUL_API_URL = "https://api.printful.com";
const STORE_ID = 5532073; // Flesh to Death Clothing Co.

interface PrintfulResponse<T> {
  code: number;
  result: T;
  error?: {
    reason: string;
    message: string;
  };
}

interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  main_category_id: number;
  warehouse_product_variant_id: number | null;
  retail_price: string;
  sku: string;
  currency: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    hash: string;
    url: string | null;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number | null;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
    is_temporary: boolean;
  }>;
  options: Array<{
    id: string;
    value: string | string[];
  }>;
  is_ignored: boolean;
}

interface PrintfulSyncProductDetails {
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariant[];
}

interface PrintfulOrderItem {
  sync_variant_id: number;
  quantity: number;
  retail_price?: string;
}

interface PrintfulOrderRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  phone?: string;
  email?: string;
}

interface PrintfulOrder {
  id: number;
  external_id: string;
  store: number;
  status: string;
  shipping: string;
  shipping_service_name: string;
  created: number;
  updated: number;
  recipient: PrintfulOrderRecipient;
  items: Array<{
    id: number;
    external_id: string | null;
    variant_id: number;
    sync_variant_id: number;
    external_variant_id: string;
    warehouse_product_variant_id: number | null;
    product_template_id: number | null;
    quantity: number;
    price: string;
    retail_price: string;
    name: string;
    product: {
      variant_id: number;
      product_id: number;
      image: string;
      name: string;
    };
    files: Array<{
      type: string;
      url: string;
      filename: string;
    }>;
  }>;
  retail_costs: {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    tax: string;
    total: string;
  };
}

async function printfulFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<PrintfulResponse<T>> {
  const apiKey = process.env.PRINTFUL_API_KEY;
  
  if (!apiKey) {
    throw new Error("PRINTFUL_API_KEY is not configured");
  }

  const url = `${PRINTFUL_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-PF-Store-Id": STORE_ID.toString(),
      ...options.headers,
    },
  });

  const data = await response.json() as PrintfulResponse<T>;
  
  if (!response.ok || data.code !== 200) {
    throw new Error(data.error?.message || `Printful API error: ${data.code}`);
  }

  return data;
}

/**
 * Get all sync products from the store
 */
export async function getProducts(): Promise<PrintfulSyncProduct[]> {
  const response = await printfulFetch<PrintfulSyncProduct[]>("/store/products");
  return response.result;
}

/**
 * Get a single sync product with all its variants
 */
export async function getProduct(syncProductId: number): Promise<PrintfulSyncProductDetails> {
  const response = await printfulFetch<PrintfulSyncProductDetails>(`/store/products/${syncProductId}`);
  return response.result;
}

/**
 * Get shipping rates for an order
 */
export async function getShippingRates(
  recipient: PrintfulOrderRecipient,
  items: PrintfulOrderItem[]
): Promise<any[]> {
  const response = await printfulFetch<any[]>("/shipping/rates", {
    method: "POST",
    body: JSON.stringify({
      recipient,
      items,
    }),
  });
  return response.result;
}

/**
 * Create an order in Printful
 */
export async function createOrder(
  recipient: PrintfulOrderRecipient,
  items: PrintfulOrderItem[],
  externalId?: string
): Promise<PrintfulOrder> {
  const response = await printfulFetch<PrintfulOrder>("/orders", {
    method: "POST",
    body: JSON.stringify({
      external_id: externalId,
      recipient,
      items,
    }),
  });
  return response.result;
}

/**
 * Confirm an order (submit for fulfillment)
 */
export async function confirmOrder(orderId: number): Promise<PrintfulOrder> {
  const response = await printfulFetch<PrintfulOrder>(`/orders/${orderId}/confirm`, {
    method: "POST",
  });
  return response.result;
}

/**
 * Get order status
 */
export async function getOrder(orderId: number): Promise<PrintfulOrder> {
  const response = await printfulFetch<PrintfulOrder>(`/orders/${orderId}`);
  return response.result;
}

export type {
  PrintfulSyncProduct,
  PrintfulSyncVariant,
  PrintfulSyncProductDetails,
  PrintfulOrderItem,
  PrintfulOrderRecipient,
  PrintfulOrder,
};
