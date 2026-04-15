import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Calendar, Tag, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { data: posts, isLoading } = trpc.blog.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b-4 border-primary sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png"
                alt="Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="font-heading text-2xl md:text-3xl text-primary tracking-widest grunge-text">
                FLESH TO DEATH
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-body text-lg uppercase tracking-wide font-bold">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/garage" className="hover:text-primary transition-colors">Garage</Link>
            <Link href="/comics" className="hover:text-primary transition-colors">Comics</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/blog" className="text-primary transition-colors">Field Notes</Link>
            <Link href="/cart">
              <Button
                variant="outline"
                className="border-2 border-primary hover:bg-primary hover:text-background font-bold uppercase rounded-none"
              >
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
            <Link href="/garage" onClick={() => setIsMenuOpen(false)}>Garage</Link>
            <Link href="/comics" onClick={() => setIsMenuOpen(false)}>Comics</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-primary">Field Notes</Link>
            <Link href="/cart">
              <Button className="w-full bg-primary text-background font-bold rounded-none">
                Cart ({itemCount})
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="bg-primary py-16 relative">
        <div className="container mx-auto px-4">
          <p className="text-black/70 font-body uppercase tracking-widest text-sm mb-2">
            From the Hive
          </p>
          <h1 className="text-5xl md:text-7xl font-heading text-black">
            <span className="text-white grunge-text">Field Notes</span>
          </h1>
          <p className="text-xl font-body text-black/80 mt-4 max-w-xl">
            Dispatches from the Nevada desert. Hive life, honey, gear, and the
            grind of building something real from scratch.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-8 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}
        />
      </header>

      {/* Posts Grid */}
      <section className="py-16 bg-background flex-1">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-4 border-gray-800 rounded-none p-0 overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-heading text-3xl text-gray-600">NO POSTS YET.</p>
              <p className="font-body text-gray-500 mt-2">The beekeeper is still writing.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group border-4 border-gray-800 hover:border-primary transition-colors duration-200 rounded-none overflow-hidden cursor-pointer h-full flex flex-col">
                    {/* Cover Image */}
                    <div className="relative h-48 bg-gray-900 overflow-hidden flex-shrink-0">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-heading text-6xl text-primary opacity-30">🐝</span>
                        </div>
                      )}
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-primary text-black font-heading text-xs uppercase px-2 py-1 tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-gray-500 text-xs font-body mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span>·</span>
                        <span>{post.author}</span>
                      </div>

                      <h2 className="font-heading text-xl text-white group-hover:text-primary transition-colors mb-3 leading-tight">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="font-body text-gray-400 text-sm leading-relaxed flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-2 text-primary font-body text-sm font-bold uppercase tracking-wide">
                        Read More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
