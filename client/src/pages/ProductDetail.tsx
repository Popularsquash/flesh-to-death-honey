import { Link, useParams } from "wouter";
import { ArrowLeft, ShoppingCart, Ruler, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
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

// Size chart data for T-shirts
const sizeChart = {
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

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id ? parseInt(params.id) : 0;
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  // Fetch product data
  const { data: products, isLoading } = trpc.products.list.useQuery();
  
  const product = products?.find(p => p.id === productId);
  const variants = product?.variants || [];
  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  // Product images - front and back views
  const productImages = product ? [
    { url: product.thumbnailUrl || "/images/products/placeholder.png", label: "Front" },
    { url: product.thumbnailUrl || "/images/products/placeholder.png", label: "Back" },
  ] : [];

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select a size");
      return;
    }
    
    try {
      await addToCart(selectedVariant.id, 1);
      toast.success(`${product!.name} (${selectedVariant.size}) added to cart!`);
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

  return (
    <div className="min-h-screen bg-black text-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/hero-bee.png" alt="F2D Logo" className="h-10 w-auto" />
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

      {/* Back Navigation */}
      <div className="bg-gray-900 border-b-2 border-gray-800">
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
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-900 border-4 border-primary p-4 aspect-square">
                <img
                  src={productImages[activeImage]?.url}
                  alt={`${product.name} - ${productImages[activeImage]?.label}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 font-heading text-sm">
                  POD
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 border-2 transition-all ${
                      activeImage === index 
                        ? "border-primary" 
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs text-center py-1 text-gray-300">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-heading text-primary mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-heading text-white">
                  From ${startingPrice.toFixed(2)}
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                {product.description}
              </p>

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
                              {sizeChart.headers.map((header, i) => (
                                <th key={i} className="py-3 px-4 text-left font-heading text-primary">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sizeChart.rows.map((row, i) => (
                              <tr key={i} className="border-b border-gray-800">
                                {row.map((cell, j) => (
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
                  <SelectTrigger className="w-full bg-gray-900 border-2 border-primary text-white h-14 font-heading">
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
                className="w-full bg-primary text-black hover:bg-secondary hover:text-white font-heading text-xl py-6 rounded-none border-4 border-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-2 h-6 w-6" />
                ADD TO CART
              </Button>

              {/* Product Features */}
              <div className="border-t-2 border-dashed border-gray-700 pt-6 space-y-3">
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
                </ul>
              </div>
            </div>
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
  );
}
