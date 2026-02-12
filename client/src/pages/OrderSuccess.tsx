import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, ShoppingCart, Menu, X, Package, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

export default function OrderSuccess() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");
  const { itemCount, refetch: refetchCart } = useCart();

  // Refetch cart to clear it after successful order
  useEffect(() => {
    refetchCart();
  }, []);

  const { data: order, isLoading } = trpc.checkout.getOrder.useQuery(
    { sessionId: sessionId || "" },
    { enabled: !!sessionId, retry: 3, retryDelay: 1000 }
  );

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
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

      {/* Success Content */}
      <section className="py-16 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-2xl">
          {isLoading ? (
            <Card className="bg-gray-900 border-4 border-gray-700 rounded-none">
              <CardHeader className="text-center">
                <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-8 w-48 mx-auto" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900 border-4 border-primary rounded-none overflow-hidden">
              <div className="bg-primary py-8 text-center">
                <CheckCircle className="h-20 w-20 mx-auto text-black mb-4" />
                <h1 className="text-4xl md:text-5xl font-heading text-black">
                  Order Confirmed!
                </h1>
              </div>
              
              <CardContent className="pt-8 space-y-8">
                <div className="text-center">
                  <p className="text-xl text-gray-300 font-body">
                    Thanks for joining the swarm! Your order is being processed.
                  </p>
                  <p className="text-gray-500 mt-2">
                    A confirmation email will be sent to your inbox.
                  </p>
                </div>

                {order && (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-700 p-6">
                      <h3 className="font-heading text-xl text-primary mb-4">Order Details</h3>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex justify-between">
                          <span>Order ID:</span>
                          <span className="font-mono text-white">#{order.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="text-green-500 font-bold uppercase">{order.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="text-white font-bold">{formatPrice(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-800 p-4 border-l-4 border-secondary">
                      <Truck className="h-8 w-8 text-secondary flex-shrink-0" />
                      <div>
                        <h4 className="font-heading text-white">Print-on-Demand</h4>
                        <p className="text-gray-400 text-sm">
                          Your items will be printed and shipped directly to you. 
                          Expect delivery in 5-10 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/shop" className="flex-1">
                    <Button className="w-full bg-white text-black hover:bg-primary font-heading uppercase rounded-none py-6">
                      <Package className="mr-2 h-5 w-5" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full border-2 border-gray-600 text-white hover:bg-gray-800 font-heading uppercase rounded-none py-6">
                      Back to Home
                    </Button>
                  </Link>
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
