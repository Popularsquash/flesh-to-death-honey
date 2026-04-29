import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Skull, Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function Shop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [highlightedProduct, setHighlightedProduct] = useState<number | null>(null);
  
  const seoProps = {
    title: "Shop",
    description: "Shop Flesh to Death Honey Co. gear: dark biker-apothecary apparel, beeswax goods, and road-lifestyle merch for the hive that refuses to behave.",
    keywords: "beeswax balm, biker apparel, motorcycle gear, honey products, rebel clothing, handcrafted soap",
    url: "https://fleshtodeathhoney.com/shop",
  };
  
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const { itemCount, addToCart } = useCart();

  const handleAddToCart = async (productId: number) => {
    const variantId = selectedVariants[productId];
    if (!variantId) {
      toast.error("Pick a size first. Chaos needs measurements.");
      setHighlightedProduct(productId);
      setTimeout(() => setHighlightedProduct(null), 1500);
      return;
    }
    
    try {
      await addToCart(variantId);
      toast.success("Claimed. The stash approves.");
    } catch (error) {
      toast.error("Cart rejected it. Rude. Try again.");
    }
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  // Group variants by color for display
  const getUniqueColors = (variants: any[]) => {
    const colors = new Set<string>();
    variants.forEach(v => {
      if (v.color) colors.add(v.color);
    });
    return Array.from(colors);
  };

  const getUniqueSizes = (variants: any[]) => {
    const sizes = new Set<string>();
    variants.forEach(v => {
      if (v.size) sizes.add(v.size);
    });
    return Array.from(sizes);
  };

  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen flex flex-col ftd-page text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-primary/70 sticky top-0 z-50 bg-black/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
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
            <Link href="/shop" className="text-primary">Stash</Link>
            <Link href="/digital-downloads" className="hover:text-primary transition-colors">Digital</Link>
            <Link href="/garage" className="hover:text-secondary transition-colors text-secondary">Garage</Link>
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
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Stash</Link>
            <Link href="/digital-downloads" onClick={() => setIsMenuOpen(false)}>Digital</Link>
            <Link href="/garage" onClick={() => setIsMenuOpen(false)} className="text-secondary">Garage</Link>
            <Link href="/cart">
              <Button className="w-full bg-primary text-background font-bold rounded-none">
                Cart ({itemCount})
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Header */}
      <header className="py-16 relative ftd-grit bg-[radial-gradient(circle_at_18%_0%,rgba(217,144,33,0.2),transparent_24rem),linear-gradient(135deg,#130d07_0%,#050505_68%)] border-b border-primary/50">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-none">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to the Hive
            </Button>
          </Link>
          <h1 className="text-5xl md:text-7xl font-heading text-white">
            The <span className="text-primary grunge-text">Stash</span>
          </h1>
          <p className="text-xl font-body text-muted-foreground mt-4 max-w-2xl border-l-4 border-primary pl-6">
            Official gear from the hive: road-worn apparel, biker-apothecary goods, and merch with more backbone than a beige template ever deserved. Open at your own risk.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}></div>
      </header>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
          ) : products && products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => {
                const variants = product.variants || [];
                const firstVariant = variants[0];
                const selectedVariantId = selectedVariants[product.id];
                const selectedVariant = variants.find(v => v.id === selectedVariantId) || firstVariant;
                const uniqueSizes = getUniqueSizes(variants);
                
                return (
                  <Card key={product.id} className="ftd-card overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(157,36,24,0.95)] transition-all duration-300 group">
<Link href={`/product/${product.id}`}>
                                      <div className="relative h-64 overflow-hidden bg-[#0a0908] flex items-center justify-center p-4 cursor-pointer border-b border-primary/30">
                                        <div className="absolute top-4 right-4 z-10">
                                          <Badge className="bg-primary text-black rounded-none font-heading uppercase text-sm border-2 border-black">
                                            POD
                                          </Badge>
                                        </div>
                                        <img 
                                          src={product.thumbnailUrl || "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png"} 
                                          alt={product.name} 
                                          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                      </div>
                                    </Link>
                    <CardHeader className="border-b-2 border-dashed border-gray-700">
                      <div className="flex justify-between items-start">
                        <Link href={`/product/${product.id}`}>
                                          <CardTitle className="font-heading text-xl text-primary hover:text-secondary transition-colors cursor-pointer">{product.name}</CardTitle>
                                        </Link>
                        <span className="font-body font-bold text-lg text-white">
                          {firstVariant ? `From ${formatPrice(firstVariant.retailPrice)}` : "N/A"}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      {uniqueSizes.length > 0 && (
                        <Select
                          value={selectedVariantId?.toString() || ""}
                          onValueChange={(value) => setSelectedVariants(prev => ({ ...prev, [product.id]: parseInt(value) }))}
                        >
                          <SelectTrigger className={`w-full bg-gray-800 rounded-none text-white border-2 transition-all ${highlightedProduct === product.id ? 'border-red-500 animate-pulse' : 'border-gray-600'}`}>
                            <SelectValue placeholder="Pick Your Poison" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-2 border-gray-600">
                            {variants.map((variant) => (
                              <SelectItem 
                                key={variant.id} 
                                value={variant.id.toString()}
                                className="text-white hover:bg-primary hover:text-black"
                              >
                                {variant.size || variant.color || variant.name} - {formatPrice(variant.retailPrice)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full bg-white text-black hover:bg-primary hover:text-black font-heading uppercase text-lg rounded-none border-2 border-black transition-colors"
                        disabled={!selectedVariantId && uniqueSizes.length > 0}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Claim It
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Skull className="h-24 w-24 mx-auto text-gray-600 mb-6" />
              <h2 className="text-3xl font-heading text-white mb-4">The Stash Is Temporarily Empty</h2>
              <p className="text-gray-400 font-body text-lg mb-8">
                The merch gremlins are syncing inventory. Check back before they unionize.
              </p>
              <Link href="/">
                <Button className="bg-primary text-black font-heading uppercase rounded-none">
                  Back to Home
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
