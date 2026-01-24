import { describe, it, expect } from "vitest";

describe("Printful API Key Validation", () => {
  it("should successfully authenticate with Printful API", async () => {
    const apiKey = process.env.PRINTFUL_API_KEY;
    
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    
    // Test the API key by fetching stores list (OAuth tokens can access multiple stores)
    const response = await fetch("https://api.printful.com/stores", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(data, null, 2));
    
    expect(response.ok).toBe(true);
    expect(data.code).toBe(200);
    expect(data.result).toBeDefined();
    
    console.log("Printful Stores:", data.result);
  });
});
