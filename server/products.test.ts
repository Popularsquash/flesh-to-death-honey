import { describe, expect, it } from "vitest";

describe("Product Pricing - 35% Markup", () => {
  // Printful base costs and expected retail prices (in cents)
  const pricingData = [
    { name: "Hive Mind Cap", baseCost: 1777, expectedRetail: 2399 },
    { name: "Swarm Hoodie", baseCost: 2888, expectedRetail: 3899 },
    { name: "The Flag Bearer Tee", baseCost: 1185, expectedRetail: 1599 },
    { name: "Beekeeper Tank", baseCost: 1629, expectedRetail: 2199 },
    { name: "The Daily Rider Tee", baseCost: 2518, expectedRetail: 3399 },
    { name: "The Swarm Rag (Bandana)", baseCost: 1036, expectedRetail: 1399 },
    { name: "Buzz Stompers (Socks)", baseCost: 740, expectedRetail: 999 },
  ];

  it("should apply 35% markup correctly for all products", () => {
    pricingData.forEach(({ name, baseCost, expectedRetail }) => {
      // 35% markup formula: base * 1.35, rounded to nearest .99 cent value
      const rawMarkup = baseCost * 1.35;
      const roundedToNearestDollar = Math.ceil(rawMarkup / 100) * 100 - 1;
      expect(roundedToNearestDollar).toBe(
        expectedRetail,
      );
    });
  });

  it("should have all retail prices ending in .99", () => {
    pricingData.forEach(({ name, expectedRetail }) => {
      expect(expectedRetail % 100).toBe(99);
    });
  });

  it("should have markup between 30% and 40% for all products", () => {
    pricingData.forEach(({ name, baseCost, expectedRetail }) => {
      const markupPercent = ((expectedRetail - baseCost) / baseCost) * 100;
      expect(markupPercent).toBeGreaterThan(30);
      expect(markupPercent).toBeLessThan(40);
    });
  });
});

describe("Product Theme Mapping", () => {
  // Replicating the getProductTheme logic for testing
  const getProductTheme = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes("cap") || name.includes("hoodie")) {
      return "garage";
    }
    if (name.includes("tank") || name.includes("beekeeper") || name.includes("rag") || name.includes("bandana") || name.includes("stomper") || name.includes("sock")) {
      return "alley";
    }
    if (name.includes("tee") || name.includes("shirt") || name.includes("signature") || name.includes("rider") || name.includes("flag")) {
      return "tattoo";
    }
    return "garage";
  };

  it("should assign garage theme to caps and hoodies", () => {
    expect(getProductTheme("Hive Mind Cap")).toBe("garage");
    expect(getProductTheme("Swarm Hoodie")).toBe("garage");
  });

  it("should assign alley theme to tanks, bandanas, and socks", () => {
    expect(getProductTheme("Beekeeper Tank")).toBe("alley");
    expect(getProductTheme("The Swarm Rag")).toBe("alley");
    expect(getProductTheme("Buzz Stompers")).toBe("alley");
  });

  it("should assign tattoo theme to t-shirts", () => {
    expect(getProductTheme("The Flag Bearer Tee")).toBe("tattoo");
    expect(getProductTheme("The Daily Rider Tee")).toBe("tattoo");
    expect(getProductTheme("The Flag Bearer Tee - Cardinal")).toBe("tattoo");
    expect(getProductTheme("The Flag Bearer Tee - White")).toBe("tattoo");
  });

  it("should default to garage for unknown products", () => {
    expect(getProductTheme("Mystery Product")).toBe("garage");
  });
});

describe("Size Chart Selection", () => {
  const sizeChartTshirt = {
    headers: ["Size", "Chest (in)", "Length (in)", "Sleeve (in)"],
    rows: [
      ["S", "34-36", "28", "15.5"],
      ["M", "38-40", "29", "17"],
      ["L", "42-44", "30", "18.5"],
      ["XL", "46-48", "31", "20"],
      ["2XL", "50-52", "32", "21.5"],
      ["3XL", "54-56", "33", "23"],
    ],
  };

  const sizeChartBandana = {
    headers: ["Size", "Width (in)", "Height (in)", "Best For"],
    rows: [
      ["S", "18", "18", "Pets / Wrist Wrap"],
      ["M", "22", "22", "Face Cover / Neck"],
      ["L", "26", "26", "Head Wrap / Bandana"],
    ],
  };

  const sizeChartSocks = {
    headers: ["Size", "US Shoe Size", "EU Size", "Sock Length (in)"],
    rows: [
      ["S", "5-7", "35-38", "15"],
      ["M", "7-9", "38-42", "16"],
      ["L", "9-12", "42-46", "17"],
    ],
  };

  const getSizeChart = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes("rag") || name.includes("bandana")) return sizeChartBandana;
    if (name.includes("stomper") || name.includes("sock")) return sizeChartSocks;
    return sizeChartTshirt;
  };

  it("should return bandana size chart for The Swarm Rag", () => {
    const chart = getSizeChart("The Swarm Rag");
    expect(chart.headers).toContain("Best For");
    expect(chart.rows).toHaveLength(3);
    expect(chart.rows[0][3]).toBe("Pets / Wrist Wrap");
  });

  it("should return socks size chart for Buzz Stompers", () => {
    const chart = getSizeChart("Buzz Stompers");
    expect(chart.headers).toContain("US Shoe Size");
    expect(chart.rows).toHaveLength(3);
    expect(chart.rows[0][1]).toBe("5-7");
  });

  it("should return t-shirt size chart for tees", () => {
    const chart = getSizeChart("The Flag Bearer Tee");
    expect(chart.headers).toContain("Chest (in)");
    expect(chart.rows).toHaveLength(6);
  });

  it("should return t-shirt size chart for hoodies", () => {
    const chart = getSizeChart("Swarm Hoodie");
    expect(chart.headers).toContain("Chest (in)");
  });
});

describe("New Product Data Validation", () => {
  const newProducts = [
    {
      id: 150001,
      name: "The Swarm Rag",
      description: "Rep the swarm from your face to your Frenchie. All-over print bandana covered in skull bees, poker chips, flames, and honey jars. Wear it, wrap it, ride with it.",
      variants: [
        { name: "S - Pet", size: "S", color: "Yellow", retailPrice: 1399 },
        { name: "M - Face Cover", size: "M", color: "Yellow", retailPrice: 1399 },
        { name: "L - Bandana", size: "L", color: "Yellow", retailPrice: 1399 },
      ],
    },
    {
      id: 150002,
      name: "Buzz Stompers",
      description: "Stomp the pavement with the biker bee on your feet. Sublimation crew socks with repeating bee head pattern. Cushioned sole. Black cuffs. Zero regrets.",
      variants: [
        { name: "S (US 5-7)", size: "S", color: "White", retailPrice: 999 },
        { name: "M (US 7-9)", size: "M", color: "White", retailPrice: 999 },
        { name: "L (US 9-12)", size: "L", color: "White", retailPrice: 999 },
      ],
    },
  ];

  it("should have valid product IDs for new products", () => {
    expect(newProducts[0].id).toBe(150001);
    expect(newProducts[1].id).toBe(150002);
  });

  it("should have 3 size variants each", () => {
    newProducts.forEach((product) => {
      expect(product.variants).toHaveLength(3);
      const sizes = product.variants.map((v) => v.size);
      expect(sizes).toContain("S");
      expect(sizes).toContain("M");
      expect(sizes).toContain("L");
    });
  });

  it("should have consistent pricing within each product", () => {
    newProducts.forEach((product) => {
      const prices = product.variants.map((v) => v.retailPrice);
      const uniquePrices = new Set(prices);
      expect(uniquePrices.size).toBe(1); // All variants same price
    });
  });

  it("should have bandana priced at $13.99", () => {
    expect(newProducts[0].variants[0].retailPrice).toBe(1399);
  });

  it("should have socks priced at $9.99", () => {
    expect(newProducts[1].variants[0].retailPrice).toBe(999);
  });

  it("should have non-empty descriptions", () => {
    newProducts.forEach((product) => {
      expect(product.description.length).toBeGreaterThan(20);
    });
  });
});

describe("Flag Bearer Tee - Color Consolidation", () => {
  // Color-specific images for the Flag Bearer Tee
  const COLOR_IMAGES: Record<string, { front: string; back: string }> = {
    "Black": {
      front: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/DPvuNEVRdZZNzPHW.png",
      back: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/hZmUianlQdPxkNrQ.png",
    },
    "Cardinal": {
      front: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/KwIDfMyMeASFlWmW.png",
      back: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/sgjIdILxSJXwwLyo.png",
    },
    "White": {
      front: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RiOhXtJLWfZTbKtF.png",
      back: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/TegfKOWRqWGqChGx.png",
    },
  };

  const COLOR_SWATCHES: Record<string, string> = {
    "Black": "#1a1a1a",
    "Cardinal": "#8C1515",
    "White": "#f5f5f5",
  };

  it("should have exactly 3 colors defined", () => {
    const colors = Object.keys(COLOR_IMAGES);
    expect(colors).toHaveLength(3);
    expect(colors).toContain("Black");
    expect(colors).toContain("Cardinal");
    expect(colors).toContain("White");
  });

  it("should have front and back images for each color", () => {
    Object.entries(COLOR_IMAGES).forEach(([color, images]) => {
      expect(images.front).toBeTruthy();
      expect(images.back).toBeTruthy();
      expect(images.front).toContain("https://");
      expect(images.back).toContain("https://");
      expect(images.front).not.toBe(images.back);
    });
  });

  it("should have unique images per color", () => {
    const allFronts = Object.values(COLOR_IMAGES).map(i => i.front);
    const allBacks = Object.values(COLOR_IMAGES).map(i => i.back);
    expect(new Set(allFronts).size).toBe(3);
    expect(new Set(allBacks).size).toBe(3);
  });

  it("should have swatch colors for all variants", () => {
    Object.keys(COLOR_IMAGES).forEach(color => {
      expect(COLOR_SWATCHES[color]).toBeTruthy();
    });
  });

  it("should have valid hex color codes for swatches", () => {
    Object.values(COLOR_SWATCHES).forEach(hex => {
      expect(hex).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("should filter variants by color correctly", () => {
    // Simulating the variant filtering logic
    const allVariants = [
      { id: 1, size: "S", color: "Black", retailPrice: 1599 },
      { id: 2, size: "M", color: "Black", retailPrice: 1599 },
      { id: 3, size: "L", color: "Black", retailPrice: 1599 },
      { id: 4, size: "S", color: "Cardinal", retailPrice: 1599 },
      { id: 5, size: "M", color: "Cardinal", retailPrice: 1599 },
      { id: 6, size: "L", color: "Cardinal", retailPrice: 1599 },
      { id: 7, size: "S", color: "White", retailPrice: 1599 },
      { id: 8, size: "M", color: "White", retailPrice: 1599 },
      { id: 9, size: "L", color: "White", retailPrice: 1599 },
    ];

    const blackVariants = allVariants.filter(v => v.color === "Black");
    const cardinalVariants = allVariants.filter(v => v.color === "Cardinal");
    const whiteVariants = allVariants.filter(v => v.color === "White");

    expect(blackVariants).toHaveLength(3);
    expect(cardinalVariants).toHaveLength(3);
    expect(whiteVariants).toHaveLength(3);

    // Each color should have S, M, L sizes
    [blackVariants, cardinalVariants, whiteVariants].forEach(variants => {
      const sizes = variants.map(v => v.size);
      expect(sizes).toContain("S");
      expect(sizes).toContain("M");
      expect(sizes).toContain("L");
    });
  });
});
