import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Skull, Menu, X, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Footer from "@/components/Footer";

export default function Cart() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, itemCount, total, isLoading, updateQuantity, removeFromCart, clearCart } = useCart();

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
    try {
      await updateQuantity(cartItemId, newQuantity);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  return (
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
            <Link href="/cart">
              <Button variant="outline" className="border-2 border-primary bg-primary/20 text-primary font-bold uppercase rounded-none">
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
            <Link href="/cart">
              <Button className="w-full bg-primary text-background font-bold rounded-none">
                Cart ({itemCount})
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Header */}
      <header className="bg-primary py-12 relative">
        <div className="container mx-auto px-4">
          <Link href="/shop">
            <Button variant="ghost" className="mb-4 text-black hover:bg-black/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
          <h1 className="text-5xl md:text-7xl font-heading text-black">
            Your <span className="text-white grunge-text">Cart</span>
          </h1>
          <p className="text-xl font-body text-black/80 mt-4">
            {itemCount} {itemCount === 1 ? "item" : "items"} ready for checkout
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}></div>
      </header>

      {/* Cart Content */}
      <section className="py-16 bg-background flex-1">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-background border-4 border-gray-700 rounded-none">
                  <div className="flex gap-4 p-4">
                    <Skeleton className="h-24 w-24" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-8 w-32" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-background border-4 border-gray-700 rounded-none overflow-hidden">
                    <div className="flex gap-4 p-4">
                      <div className="h-24 w-24 bg-gray-800 flex-shrink-0">
                        <img 
                          src={item.variant.imageUrl || item.product.thumbnailUrl || "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png"} 
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl text-primary">{item.product.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {item.variant.size && `Size: ${item.variant.size}`}
                          {item.variant.color && ` • Color: ${item.variant.color}`}
                        </p>
                        <p className="text-white font-bold mt-2">{formatPrice(item.variant.retailPrice)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button 
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-2 bg-gray-800 border-2 border-gray-600">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-700 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-700 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Button 
                  variant="ghost" 
                  onClick={handleClearCart}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                </Button>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-gray-900 border-4 border-primary rounded-none sticky top-24">
                  <CardHeader className="border-b-2 border-dashed border-gray-700">
                    <CardTitle className="font-heading text-2xl text-primary">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-sm">Calculated at checkout</span>
                    </div>
                    <div className="border-t-2 border-dashed border-gray-700 pt-4">
                      <div className="flex justify-between text-white font-bold text-xl">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Link href="/checkout" className="w-full">
                      <Button className="w-full bg-primary text-black hover:bg-white font-heading uppercase text-xl py-6 rounded-none border-2 border-black">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <p className="text-xs text-gray-500 text-center">
                      Secure checkout powered by Stripe. Your payment info is never stored on our servers.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 mx-auto text-gray-600 mb-6" />
              <h2 className="text-3xl font-heading text-white mb-4">Your Cart is Empty</h2>
              <p className="text-gray-400 font-body text-lg mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link href="/shop">
                <Button className="bg-primary text-black font-heading uppercase rounded-none px-8 py-6 text-xl">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
