import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Skull, Menu, X, ArrowLeft, Loader2, CreditCard, Lock, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Footer from "@/components/Footer";

export default function Checkout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [, setLocation] = useLocation();
  const { items, itemCount, total, isLoading } = useCart();

  const createSession = trpc.checkout.createSession.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to secure checkout...");
      // Open Stripe checkout in new tab
      window.open(data.url, "_blank");
      setIsRedirecting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create checkout session");
      setIsRedirecting(false);
    },
  });

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsRedirecting(true);
    const sessionId = localStorage.getItem("cart_session_id") || undefined;
    createSession.mutate({ sessionId });
  };

  // Redirect to cart if empty
  useEffect(() => {
    if (!isLoading && items.length === 0) {
      setLocation("/cart");
    }
  }, [isLoading, items.length, setLocation]);

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
          <Link href="/cart">
            <Button variant="ghost" className="mb-4 text-black hover:bg-black/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
            </Button>
          </Link>
          <h1 className="text-5xl md:text-7xl font-heading text-black">
            <span className="text-white grunge-text">Checkout</span>
          </h1>
          <p className="text-xl font-body text-black/80 mt-4">
            Secure payment — Card & PayPal accepted
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}></div>
      </header>

      {/* Checkout Content */}
      <section className="py-16 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-2xl">
          {isLoading ? (
            <Card className="bg-gray-900 border-4 border-gray-700 rounded-none">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900 border-4 border-primary rounded-none">
              <CardHeader className="border-b-2 border-dashed border-gray-700">
                <CardTitle className="font-heading text-2xl text-primary flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Items Summary */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-800">
                      <div className="h-16 w-16 bg-gray-800 flex-shrink-0">
                        <img 
                          src={item.variant.imageUrl || item.product.thumbnailUrl || "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png"} 
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading text-white">{item.product.name}</h4>
                        <p className="text-gray-400 text-sm">
                          {item.variant.size && `Size: ${item.variant.size}`}
                          {item.variant.color && ` • Color: ${item.variant.color}`}
                        </p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-white font-bold">
                        {formatPrice(item.variant.retailPrice * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4">
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
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={handleCheckout}
                  disabled={isRedirecting || items.length === 0}
                  className="w-full bg-primary text-black hover:bg-white font-heading uppercase text-xl py-8 rounded-none border-2 border-black"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Redirecting to Checkout...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-6 w-6" />
                      Proceed to Payment
                    </>
                  )}
                </Button>

                {/* Security Note */}
                {/* Payment Methods */}
                <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </div>
                  <span className="text-gray-700">|</span>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span>PayPal</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <Lock className="h-4 w-4" />
                  <span>Secure checkout powered by Stripe. Card and PayPal accepted. Your payment info is never stored on our servers.</span>
                </div>

                {/* Test Card Info */}
                <div className="bg-gray-800 p-4 border-l-4 border-secondary text-sm">
                  <p className="text-secondary font-bold mb-1">Test Mode Active</p>
                  <p className="text-gray-400">
                    Use card number <span className="font-mono text-white">4242 4242 4242 4242</span> with any future expiry date and CVC.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
