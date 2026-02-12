import { describe, it, expect } from "vitest";

const NEW_STORE_ID = 17703560;
const STORE_NAME = "Flesh to Death Honey";

describe("Printful API Key Validation", () => {
  it("should successfully authenticate with Printful API", async () => {
    const apiKey = process.env.PRINTFUL_API_KEY;
    
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    
    // Test the API key by fetching stores list
    const response = await fetch("https://api.printful.com/stores", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    
    expect(response.ok).toBe(true);
    expect(data.code).toBe(200);
    expect(data.result).toBeDefined();
  });

  it("should have access to the Flesh to Death Honey API store", async () => {
    const apiKey = process.env.PRINTFUL_API_KEY;
    
    const response = await fetch("https://api.printful.com/store", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-PF-Store-Id": NEW_STORE_ID.toString(),
      },
    });
    
    const data = await response.json();
    
    expect(response.ok).toBe(true);
    expect(data.code).toBe(200);
    expect(data.result.id).toBe(NEW_STORE_ID);
    expect(data.result.name).toBe(STORE_NAME);
    expect(data.result.type).toBe("native");
  });
});

describe("Printful Store Configuration", () => {
  it("should use the correct store ID in printful.ts", async () => {
    // Verify the hardcoded store ID matches our new API store
    const fs = await import("fs");
    const printfulCode = fs.readFileSync("server/printful.ts", "utf-8");
    expect(printfulCode).toContain(`const STORE_ID = ${NEW_STORE_ID}`);
  });

  it("should be able to list products in the new store", async () => {
    const apiKey = process.env.PRINTFUL_API_KEY;
    
    const response = await fetch("https://api.printful.com/store/products", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-PF-Store-Id": NEW_STORE_ID.toString(),
      },
    });
    
    const data = await response.json();
    
    expect(response.ok).toBe(true);
    expect(data.code).toBe(200);
    expect(Array.isArray(data.result)).toBe(true);
  });
});
