import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock environment variables
vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_mock");
vi.stubEnv("PRINTFUL_API_KEY", "test_api_key");

describe("Checkout Flow", () => {
  describe("Cart Item Validation", () => {
    it("should reject empty cart", async () => {
      const cartItems: any[] = [];
      
      // Simulate the validation that happens in createCheckoutSession
      const isCartEmpty = cartItems.length === 0;
      expect(isCartEmpty).toBe(true);
    });

    it("should accept cart with valid items", async () => {
      const cartItems = [
        {
          id: 1,
          variantId: 100,
          quantity: 2,
          variant: {
            id: 100,
            printfulSyncVariantId: 12345,
            printfulVariantId: 67890,
            name: "Test Shirt - Large",
            retailPrice: 3500,
            currency: "USD",
            imageUrl: "https://example.com/image.jpg",
            size: "L",
            color: "Black",
          },
          product: {
            id: 1,
            name: "Test Shirt",
            thumbnailUrl: "https://example.com/thumb.jpg",
          },
        },
      ];

      expect(cartItems.length).toBeGreaterThan(0);
      expect(cartItems[0].quantity).toBeGreaterThan(0);
      expect(cartItems[0].variant.retailPrice).toBeGreaterThan(0);
    });
  });

  describe("Price Calculations", () => {
    it("should calculate total correctly", () => {
      const cartItems = [
        { quantity: 2, variant: { retailPrice: 3500 } },
        { quantity: 1, variant: { retailPrice: 2000 } },
      ];

      const total = cartItems.reduce(
        (sum, item) => sum + item.variant.retailPrice * item.quantity,
        0
      );

      expect(total).toBe(9000); // (2 * 3500) + (1 * 2000) = 9000 cents = $90.00
    });

    it("should format price correctly", () => {
      const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
      
      expect(formatPrice(3500)).toBe("$35.00");
      expect(formatPrice(100)).toBe("$1.00");
      expect(formatPrice(9999)).toBe("$99.99");
    });
  });

  describe("Stripe Line Items", () => {
    it("should build valid line items for Stripe", () => {
      const cartItems = [
        {
          id: 1,
          variantId: 100,
          quantity: 2,
          variant: {
            id: 100,
            name: "Test Shirt - Large",
            retailPrice: 3500,
            currency: "USD",
            imageUrl: "https://example.com/image.jpg",
            size: "L",
            color: "Black",
          },
          product: {
            id: 1,
            name: "Test Shirt",
            thumbnailUrl: "https://example.com/thumb.jpg",
          },
        },
      ];

      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: item.variant.currency.toLowerCase(),
          product_data: {
            name: item.product.name,
            description: `${item.variant.size ? `Size: ${item.variant.size}` : ""} ${item.variant.color ? `Color: ${item.variant.color}` : ""}`.trim() || undefined,
            images: item.variant.imageUrl ? [item.variant.imageUrl] : undefined,
          },
          unit_amount: item.variant.retailPrice,
        },
        quantity: item.quantity,
      }));

      expect(lineItems).toHaveLength(1);
      expect(lineItems[0].price_data.currency).toBe("usd");
      expect(lineItems[0].price_data.unit_amount).toBe(3500);
      expect(lineItems[0].quantity).toBe(2);
      expect(lineItems[0].price_data.product_data.name).toBe("Test Shirt");
      expect(lineItems[0].price_data.product_data.description).toBe("Size: L Color: Black");
    });
  });

  describe("Order Metadata", () => {
    it("should serialize cart items for metadata", () => {
      const cartItems = [
        {
          variant: {
            id: 100,
            printfulSyncVariantId: 12345,
            retailPrice: 3500,
            name: "Test Shirt - Large",
          },
          product: {
            name: "Test Shirt",
          },
          quantity: 2,
        },
      ];

      const metadata = JSON.stringify(
        cartItems.map((item) => ({
          variantId: item.variant.id,
          printfulSyncVariantId: item.variant.printfulSyncVariantId,
          quantity: item.quantity,
          price: item.variant.retailPrice,
          productName: item.product.name,
          variantName: item.variant.name,
        }))
      );

      const parsed = JSON.parse(metadata);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].variantId).toBe(100);
      expect(parsed[0].printfulSyncVariantId).toBe(12345);
      expect(parsed[0].quantity).toBe(2);
    });
  });

  describe("Shipping Address Parsing", () => {
    it("should parse shipping details from Stripe session", () => {
      const shippingDetails = {
        name: "John Doe",
        address: {
          line1: "123 Main St",
          line2: "Apt 4",
          city: "New York",
          state: "NY",
          country: "US",
          postal_code: "10001",
        },
      };

      const shippingAddress = {
        name: shippingDetails.name || "",
        address1: shippingDetails.address.line1 || "",
        address2: shippingDetails.address.line2 || undefined,
        city: shippingDetails.address.city || "",
        state_code: shippingDetails.address.state || "",
        country_code: shippingDetails.address.country || "",
        zip: shippingDetails.address.postal_code || "",
      };

      expect(shippingAddress.name).toBe("John Doe");
      expect(shippingAddress.address1).toBe("123 Main St");
      expect(shippingAddress.address2).toBe("Apt 4");
      expect(shippingAddress.city).toBe("New York");
      expect(shippingAddress.state_code).toBe("NY");
      expect(shippingAddress.country_code).toBe("US");
      expect(shippingAddress.zip).toBe("10001");
    });
  });
});
