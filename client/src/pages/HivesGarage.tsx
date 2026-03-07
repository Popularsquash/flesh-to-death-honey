import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Skull, Menu, X, ArrowLeft, Tag, Percent, Flame } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function HivesGarage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [highlightedProduct, setHighlightedProduct] = useState<number | null>(null);

  const seoProps = {
    title: "HIVES GARAGE - Clearance Sale",
    description: "Score deals on biker gear and beeswax products at the Hives Garage. Clearance prices on apparel, balms, and more from Flesh to Death Honey Co.",
    keywords: "clearance sale, biker gear deals, discounted apparel, garage sale, beeswax products sale",
    url: "https://fleshtodeathhoney.com/garage",
  };

  const { data: saleProducts, isLoading } = trpc.garage.list.useQuery();
  const { itemCount, addToCart } = useCart();

  const handleAddToCart = async (productId: number) => {
    const variantId = selectedVariants[productId];
    if (!variantId) {
      toast.error("Please select a size/variant");
      setHighlightedProduct(productId);
      setTimeout(() => setHighlightedProduct(null), 1500);
      return;
    }

    try {
      await addToCart(variantId);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getDiscountPercent = (original: number, sale: number) => {
    if (!original || !sale || original <= sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        {/* Navigation */}
        <nav className="border-b-4 border-primary sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png" alt="Logo" className="h-12 w-12 object-contain" />
                <span className="font-heading text-2xl md:text-3xl text-primary tracking-widest grunge-text">
                  FLESH TO DEATH
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 font-body text-lg uppercase tracking-wide font-bold">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/garage" className="text-secondary">Garage</Link>
              <Link href="/cart">
                <Button variant="outline" className="border-2 border-primary hover:bg-primary hover:text-background font-bold uppercase rounded-none">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Cart ({itemCount})
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-background border-b-4 border-primary p-4 flex flex-col gap-4 font-heading text-xl uppercase">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link href="/garage" onClick={() => setIsMenuOpen(false)} className="text-secondary">Garage</Link>
              <Link href="/cart">
                <Button className="w-full bg-primary text-background font-bold rounded-none">
                  Cart ({itemCount})
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Header - Grungy Garage Theme */}
        <header className="bg-secondary py-12 relative overflow-hidden">
          {/* Diagonal stripes background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 22px)",
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <Link href="/shop">
              <Button variant="ghost" className="mb-4 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-2">
              <Flame className="h-10 w-10 md:h-14 md:w-14 text-primary animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-heading text-white">
                HIVES <span className="text-primary grunge-text">GARAGE</span>
              </h1>
              <Flame className="h-10 w-10 md:h-14 md:w-14 text-primary animate-pulse" />
            </div>
            <p className="text-xl font-body text-white/80 mt-4 max-w-2xl">
              Clearance deals, last-chance gear, and marked-down merch. Grab it before it's gone.
            </p>
            <div className="flex gap-3 mt-6">
              <Badge className="bg-primary text-black rounded-none font-heading uppercase text-sm border-2 border-black px-4 py-2">
                <Tag className="mr-1 h-4 w-4" /> Clearance
              </Badge>
              <Badge className="bg-white text-secondary rounded-none font-heading uppercase text-sm border-2 border-black px-4 py-2">
                <Percent className="mr-1 h-4 w-4" /> Limited Time
              </Badge>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}></div>
        </header>

        {/* Sale Products Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="bg-background border-4 border-gray-700 rounded-none">
                    <Skeleton className="h-64 w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/4 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-12 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : saleProducts && saleProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {saleProducts.map((product) => {
                  const variants = product.variants || [];
                  const firstVariant = variants[0];
                  const selectedVariantId = selectedVariants[product.id];
                  const selectedVariant = variants.find(v => v.id === selectedVariantId) || firstVariant;
                  const uniqueSizes = Array.from(new Set(variants.map(v => v.size).filter((s): s is string => !!s)));

                  const originalPrice = product.originalPrice || (firstVariant?.retailPrice || 0);
                  const salePrice = product.salePrice || (firstVariant?.retailPrice || 0);
                  const discount = getDiscountPercent(originalPrice, salePrice);

                  return (
                    <Card key={product.id} className="bg-background border-4 border-secondary rounded-none overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(199,0,57,1)] transition-all duration-300 group relative">
                      {/* Sale Badge */}
                      {discount > 0 && (
                        <div className="absolute top-0 left-0 z-20 bg-secondary text-white font-heading text-lg px-4 py-1 border-b-2 border-r-2 border-black">
                          {discount}% OFF
                        </div>
                      )}
                      {product.saleLabel && (
                        <div className="absolute top-0 right-0 z-20 bg-primary text-black font-heading text-sm px-3 py-1 border-b-2 border-l-2 border-black">
                          {product.saleLabel}
                        </div>
                      )}

                      <Link href={`/product/${product.id}`}>
                        <div className="relative h-64 overflow-hidden bg-gray-800 flex items-center justify-center p-4 cursor-pointer">
                          <img
                            src={selectedVariant?.imageUrl || product.thumbnailUrl || "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png"}
                            alt={product.name}
                            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                      <CardHeader className="border-b-2 border-dashed border-secondary/50">
                        <div className="flex justify-between items-start">
                          <Link href={`/product/${product.id}`}>
                            <CardTitle className="font-heading text-xl text-primary hover:text-secondary transition-colors cursor-pointer">{product.name}</CardTitle>
                          </Link>
                          <div className="text-right">
                            {discount > 0 && (
                              <span className="font-body text-sm text-gray-500 line-through block">
                                {formatPrice(originalPrice)}
                              </span>
                            )}
                            <span className="font-body font-bold text-lg text-secondary">
                              {formatPrice(salePrice)}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-4">
                        {uniqueSizes.length > 0 && (
                          <Select
                            value={selectedVariantId?.toString() || ""}
                            onValueChange={(value) => setSelectedVariants(prev => ({ ...prev, [product.id]: parseInt(value) }))}
                          >
                            <SelectTrigger className={`w-full bg-gray-800 rounded-none text-white border-2 transition-all ${highlightedProduct === product.id ? 'border-red-500 animate-pulse' : 'border-gray-600'}`}>
                              <SelectValue placeholder="Select Size" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-2 border-gray-600">
                              {variants.map((variant) => (
                                <SelectItem
                                  key={variant.id}
                                  value={variant.id.toString()}
                                  className="text-white hover:bg-secondary hover:text-white"
                                >
                                  {variant.size || variant.color || variant.name} - {formatPrice(product.salePrice || variant.retailPrice)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-full bg-secondary text-white hover:bg-primary hover:text-black font-heading uppercase text-lg rounded-none border-2 border-black transition-colors"
                          disabled={!selectedVariantId && uniqueSizes.length > 0}
                        >
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Grab This Deal
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <Skull className="h-24 w-24 mx-auto text-gray-600 mb-6" />
                <h2 className="text-3xl font-heading text-white mb-4">Garage is Empty</h2>
                <p className="text-gray-400 font-body text-lg mb-4">
                  No clearance items right now. Check back soon for deals.
                </p>
                <p className="text-gray-500 font-body text-sm mb-8">
                  When we mark items down, they'll show up here.
                </p>
                <Link href="/shop">
                  <Button className="bg-primary text-black font-heading uppercase rounded-none">
                    Browse the Full Stash
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
