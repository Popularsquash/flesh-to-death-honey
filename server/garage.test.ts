import { describe, it, expect } from "vitest";

describe("Garage Sale (HIVES GARAGE)", () => {
  describe("Discount calculation", () => {
    const getDiscountPercent = (original: number, sale: number) => {
      if (!original || !sale || original <= sale) return 0;
      return Math.round(((original - sale) / original) * 100);
    };

    it("should calculate correct discount percentage", () => {
      // $35.00 original -> $15.00 sale = ~57% off
      expect(getDiscountPercent(3500, 1500)).toBe(57);
    });

    it("should calculate 50% discount correctly", () => {
      expect(getDiscountPercent(6900, 3450)).toBe(50);
    });

    it("should return 0 when sale price equals original", () => {
      expect(getDiscountPercent(3500, 3500)).toBe(0);
    });

    it("should return 0 when sale price is higher than original", () => {
      expect(getDiscountPercent(3500, 4000)).toBe(0);
    });

    it("should return 0 for zero or missing prices", () => {
      expect(getDiscountPercent(0, 1500)).toBe(0);
      expect(getDiscountPercent(3500, 0)).toBe(0);
    });

    it("should handle small discounts", () => {
      // $35.00 -> $33.00 = ~6% off
      expect(getDiscountPercent(3500, 3300)).toBe(6);
    });

    it("should handle large discounts", () => {
      // $69.00 -> $10.00 = ~86% off
      expect(getDiscountPercent(6900, 1000)).toBe(86);
    });
  });

  describe("Sale toggle logic", () => {
    const buildSaleUpdate = (
      onSale: boolean,
      salePrice?: number,
      saleLabel?: string,
      originalPrice: number = 3500
    ) => {
      return {
        onSale: onSale ? 1 : 0,
        salePrice: onSale ? (salePrice || null) : null,
        originalPrice: onSale ? originalPrice : null,
        saleLabel: onSale ? (saleLabel || "SALE") : null,
      };
    };

    it("should set correct fields when enabling sale", () => {
      const update = buildSaleUpdate(true, 2000, "CLEARANCE", 3500);
      expect(update).toEqual({
        onSale: 1,
        salePrice: 2000,
        originalPrice: 3500,
        saleLabel: "CLEARANCE",
      });
    });

    it("should use default SALE label when none provided", () => {
      const update = buildSaleUpdate(true, 2000, undefined, 3500);
      expect(update.saleLabel).toBe("SALE");
    });

    it("should clear all sale fields when disabling", () => {
      const update = buildSaleUpdate(false);
      expect(update).toEqual({
        onSale: 0,
        salePrice: null,
        originalPrice: null,
        saleLabel: null,
      });
    });

    it("should preserve original price when enabling sale", () => {
      const update = buildSaleUpdate(true, 1500, "HOT DEAL", 6900);
      expect(update.originalPrice).toBe(6900);
      expect(update.salePrice).toBe(1500);
    });
  });

  describe("Price formatting", () => {
    const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

    it("should format whole dollar amounts", () => {
      expect(formatPrice(3500)).toBe("$35.00");
      expect(formatPrice(6900)).toBe("$69.00");
    });

    it("should format cents correctly", () => {
      expect(formatPrice(995)).toBe("$9.95");
      expect(formatPrice(1500)).toBe("$15.00");
    });

    it("should handle zero", () => {
      expect(formatPrice(0)).toBe("$0.00");
    });
  });
});
