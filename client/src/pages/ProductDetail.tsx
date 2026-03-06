import { Link, useParams } from "wouter";
import { ArrowLeft, ShoppingCart, Ruler, Check, ZoomIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect } from "react";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { SEO } from "@/components/SEO";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomerReviews } from "@/components/CustomerReviews";

// Size chart data for T-shirts
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

// Size chart data for bandana
const sizeChartBandana = {
  headers: ["Size", "Width (in)", "Height (in)", "Best For"],
  rows: [
    ["S", "18", "18", "Pets / Wrist Wrap"],
    ["M", "22", "22", "Face Cover / Neck"],
    ["L", "26", "26", "Head Wrap / Bandana"],
  ],
};

// Size chart data for socks
const sizeChartSocks = {
  headers: ["Size", "US Shoe Size", "EU Size", "Sock Length (in)"],
  rows: [
    ["S", "5-7", "35-38", "15"],
    ["M", "7-9", "38-42", "16"],
    ["L", "9-12", "42-46", "17"],
  ],
};

// Get the right size chart for a product
const getSizeChart = (productName: string) => {
  const name = productName.toLowerCase();
  if (name.includes("rag") || name.includes("bandana")) return sizeChartBandana;
  if (name.includes("stomper") || name.includes("sock")) return sizeChartSocks;
  return sizeChartTshirt;
};

// Themed backgrounds for product detail pages
const THEMED_BACKGROUNDS = {
  garage: {
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/vvJAFsJbkqgchzSF.jpg",
    overlay: "from-black/90 via-black/70 to-black/90",
    accent: "primary",
    name: "The Garage",
  },
  alley: {
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/uCXbexnulAyZVyDR.jpg",
    overlay: "from-black/85 via-black/60 to-black/85",
    accent: "cyan-400",
    name: "The Alley",
  },
  tattoo: {
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/neyabfULZjroBxrH.jpg",
    overlay: "from-black/80 via-black/50 to-black/80",
    accent: "red-500",
    name: "The Parlor",
  },
};

// Map product categories to themes
const getProductTheme = (productName: string): keyof typeof THEMED_BACKGROUNDS => {
  const name = productName.toLowerCase();
  if (name.includes("cap") || name.includes("hoodie")) {
    return "garage";
  }
  if (name.includes("tank") || name.includes("beekeeper") || name.includes("rag") || name.includes("bandana") || name.includes("stomper") || name.includes("sock") || name.includes("tote") || name.includes("beekeepin")) {
    return "alley";
  }
  if (name.includes("tee") || name.includes("shirt") || name.includes("signature") || name.includes("rider") || name.includes("flag") || name.includes("hex")) {
    return "tattoo";
  }
  return "garage";
};

// Lifestyle / additional images per product ID (appended after front/back)
const LIFESTYLE_IMAGES: Record<number, { url: string; label: string }[]> = {
  120001: [
    { url: "/images/hive-mind-cap-lifestyle.jpg", label: "Lifestyle" },
  ],
};

// Color-specific images for products with multiple colors
// Maps productId -> color -> { front, back }
const COLOR_IMAGES: Record<number, Record<string, { front: string; back: string }>> = {
  120003: {
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
  },
};

// Color swatch display values
const COLOR_SWATCHES: Record<string, string> = {
  "Black": "#1a1a1a",
  "Cardinal": "#8C1515",
  "White": "#f5f5f5",
};

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id ? parseInt(params.id) : 0;
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { addToCart } = useCart();

  // Fetch product data
  const { data: products, isLoading } = trpc.products.list.useQuery();
  
  const product = products?.find(p => p.id === productId);
  const allVariants = product?.variants || [];

  // Get unique colors for this product
  const uniqueColors = useMemo(() => {
    const colors = new Set<string>();
    allVariants.forEach(v => {
      if (v.color) colors.add(v.color);
    });
    return Array.from(colors);
  }, [allVariants]);

  // Determine if this product has multiple colors
  const hasMultipleColors = uniqueColors.length > 1;

  // Auto-select first color when product loads
  useEffect(() => {
    if (uniqueColors.length > 0 && !selectedColor) {
      setSelectedColor(uniqueColors[0]);
    }
  }, [uniqueColors, selectedColor]);

  // Filter variants by selected color
  const variants = useMemo(() => {
    if (!hasMultipleColors || !selectedColor) return allVariants;
    return allVariants.filter(v => v.color === selectedColor);
  }, [allVariants, selectedColor, hasMultipleColors]);

  // Reset selected variant when color changes
  useEffect(() => {
    setSelectedVariantId(null);
  }, [selectedColor]);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  // Get themed background based on product
  const theme = product ? THEMED_BACKGROUNDS[getProductTheme(product.name)] : THEMED_BACKGROUNDS.garage;

  // Product images - use color-specific images if available
  const productImages = useMemo(() => {
    if (!product) return [];
    
    const colorImagesForProduct = COLOR_IMAGES[product.id];
    if (colorImagesForProduct && selectedColor && colorImagesForProduct[selectedColor]) {
      const colorImg = colorImagesForProduct[selectedColor];
      return [
        { url: colorImg.front, label: "Front" },
        { url: colorImg.back, label: "Back" },
      ];
    }
    
    const baseImages = [
      { url: product.thumbnailUrl || "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png", label: "Front" },
      { url: product.backImageUrl || product.thumbnailUrl || "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png", label: "Back" },
    ];
    const lifestyleImages = LIFESTYLE_IMAGES[product.id] || [];
    return [...baseImages, ...lifestyleImages];
  }, [product, selectedColor]);

  // Reset active image when color changes
  useEffect(() => {
    setActiveImage(0);
  }, [selectedColor]);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select a size");
      return;
    }
    
    try {
      await addToCart(selectedVariant.id, 1);
      const colorLabel = hasMultipleColors && selectedColor ? ` - ${selectedColor}` : "";
      toast.success(`${product!.name}${colorLabel} (${selectedVariant.size}) added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-primary mb-4">PRODUCT NOT FOUND</h1>
          <p className="text-gray-400 mb-8">This product doesn't exist.</p>
          <Link href="/shop" className="text-primary hover:text-secondary font-heading">
            ← BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  const startingPrice = variants.length > 0 
    ? Math.min(...variants.map(v => v.retailPrice)) / 100 
    : 0;

  const seoProps = {
    title: product.name,
    description: product.description || `Shop ${product.name} from Flesh to Death Honey Co.`,
    url: `https://fleshtodeathhoney.com/product/${productId}`,
    image: product.thumbnailUrl || "https://fleshtodeathhoney.com/images/og-image.jpg",
    type: "product",
    structuredData: {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.thumbnailUrl || "https://fleshtodeathhoney.com/images/og-image.jpg",
      "description": product.description || `Shop ${product.name} from Flesh to Death Honey Co.`,
      "brand": {
        "@type": "Organization",
        "name": "Flesh to Death Honey Co."
      },
      "offers": {
        "@type": "Offer",
        "url": `https://fleshtodeathhoney.com/product/${productId}`,
        "priceCurrency": "USD",
        "price": startingPrice.toFixed(2),
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    }
  };

  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen bg-black text-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png" alt="F2D Logo" className="h-10 w-auto" />
            <span className="font-heading text-3xl text-primary hover:text-white transition-colors">
              FLESH TO DEATH
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/shop" className="font-heading text-lg text-primary">
              SHOP
            </Link>
            <Link href="/comics" className="font-heading text-lg hover:text-primary transition-colors">
              COMICS
            </Link>
            <Link href="/cart" className="font-heading text-lg hover:text-primary transition-colors">
              CART
            </Link>
          </nav>
        </div>
      </header>

      {/* Themed Background Section */}
      <section 
        className="relative min-h-[calc(100vh-80px)] overflow-hidden"
        style={{
          backgroundImage: `url(${theme.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.overlay}`}></div>
        
        {/* Animated grain texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Back Navigation */}
        <div className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-heading"
            >
              <ArrowLeft size={20} />
              BACK TO SHOP
            </Link>
          </div>
        </div>

        {/* Product Content */}
        <div className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image with zoom capability */}
                <div 
                  className="relative bg-black/60 backdrop-blur-md border-2 border-white/20 p-4 aspect-square cursor-zoom-in group rounded-lg overflow-hidden"
                  onClick={() => setIsZoomed(true)}
                >
                  <img
                    src={productImages[activeImage]?.url}
                    alt={`${product.name} - ${productImages[activeImage]?.label}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 font-heading text-sm rounded">
                    POD
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 font-heading text-xs flex items-center gap-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} />
                    Click to zoom
                  </div>
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-4 justify-center">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative w-20 h-20 border-2 transition-all rounded overflow-hidden ${
                        activeImage === index 
                          ? "border-primary ring-2 ring-primary/50" 
                          : "border-white/20 hover:border-white/50"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs text-center py-1 text-gray-300 font-heading">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6 bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-lg border border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-heading text-primary/80 tracking-widest uppercase">
                      {theme.name} Collection
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary mb-2 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-2xl md:text-3xl font-heading text-white">
                    From ${startingPrice.toFixed(2)}
                  </p>
                </div>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector - only show for multi-color products */}
                {hasMultipleColors && (
                  <div className="space-y-3">
                    <label className="font-heading text-lg text-white">
                      SELECT COLOR
                      {selectedColor && (
                        <span className="ml-2 text-sm text-primary font-body">— {selectedColor}</span>
                      )}
                    </label>
                    <div className="flex gap-3">
                      {uniqueColors.map((color) => {
                        const isSelected = selectedColor === color;
                        const swatchColor = COLOR_SWATCHES[color] || "#666";
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                              isSelected
                                ? "border-primary ring-2 ring-primary/50 scale-110"
                                : "border-white/30 hover:border-white/60 hover:scale-105"
                            }`}
                            style={{ backgroundColor: swatchColor }}
                            title={color}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check size={18} className={color === "White" ? "text-black" : "text-white"} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-heading text-lg text-white">SELECT SIZE</label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors text-sm">
                          <Ruler size={16} />
                          Size Guide
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-2 border-primary text-white max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="font-heading text-2xl text-primary">SIZE CHART</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-700">
                                {getSizeChart(product.name).headers.map((header: string, i: number) => (
                                  <th key={i} className="py-3 px-4 text-left font-heading text-primary">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {getSizeChart(product.name).rows.map((row: string[], i: number) => (
                                <tr key={i} className="border-b border-gray-800">
                                  {row.map((cell: string, j: number) => (
                                    <td key={j} className="py-3 px-4 text-gray-300">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                          Measurements are approximate. For best fit, measure a similar garment you own.
                        </p>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Select
                    value={selectedVariantId?.toString() || ""}
                    onValueChange={(value) => setSelectedVariantId(parseInt(value))}
                  >
                    <SelectTrigger className="w-full bg-black/50 border-2 border-primary text-white h-14 font-heading">
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-2 border-primary">
                      {variants.map((variant) => (
                        <SelectItem
                          key={variant.id}
                          value={variant.id.toString()}
                          className="text-white hover:bg-primary hover:text-black font-heading"
                        >
                          {variant.size} - ${(variant.retailPrice / 100).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedVariantId}
                  className="w-full bg-primary text-black hover:bg-secondary hover:text-white font-heading text-xl py-6 rounded-lg border-2 border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <ShoppingCart className="mr-2 h-6 w-6 transition-transform group-hover:scale-110" />
                  ADD TO CART
                </Button>

                {/* Product Features */}
                <div className="border-t border-white/20 pt-6 space-y-3">
                  <h3 className="font-heading text-lg text-primary">PRODUCT DETAILS</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-primary" />
                      Print-on-demand (made to order)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-primary" />
                      Premium quality materials
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-primary" />
                      Ships within 3-5 business days
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-primary" />
                      Worldwide shipping available
                    </li>
                    {hasMultipleColors && (
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-primary" />
                        Available in {uniqueColors.length} colors: {uniqueColors.join(", ")}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setIsZoomed(false)}
          >
            <X size={32} />
          </button>
          <img
            src={productImages[activeImage]?.url}
            alt={`${product.name} - ${productImages[activeImage]?.label}`}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(index);
                }}
                className={`w-16 h-16 border-2 transition-all rounded overflow-hidden ${
                  activeImage === index 
                    ? "border-primary" 
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <section className="py-16 bg-gray-900 border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <CustomerReviews productId={productId} productName={product.name} />
          </div>
        </div>
      </section>

      {/* Related Products CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-6xl font-heading text-black mb-6">
            MORE FROM THE STASH
          </h3>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Check out our other products and gear up for the ride.
          </p>
          <Link href="/shop">
            <Button className="bg-black text-primary hover:bg-secondary hover:text-white font-heading text-xl px-12 py-4 border-4 border-black transition-colors rounded-none">
              BROWSE ALL PRODUCTS
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
