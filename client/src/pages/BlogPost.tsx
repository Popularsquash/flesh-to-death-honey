import { useState } from "react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Calendar, ArrowLeft, Tag } from "lucide-react";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Render plain text content with paragraph breaks */
function renderContent(content: string) {
  return content.split(/\n\n+/).map((paragraph, idx) => {
    // Bold text: **text**
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <p key={idx} className="font-body text-gray-300 text-lg leading-relaxed mb-6">
        {parts}
      </p>
    );
  });
}

export default function BlogPost() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { itemCount } = useCart();

  const { data: post, isLoading } = trpc.blog.bySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  );

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

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <Link href="/blog">
            <button className="flex items-center gap-2 text-primary font-body text-sm uppercase tracking-wide font-bold mb-8 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-4 w-4" /> Back to Field Notes
            </button>
          </Link>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : !post ? (
            <div className="text-center py-24">
              <p className="font-heading text-4xl text-primary mb-4">POST NOT FOUND</p>
              <p className="font-body text-gray-400 mb-8">
                That post doesn't exist or has been unpublished.
              </p>
              <Link href="/blog">
                <Button className="bg-primary text-black font-heading uppercase rounded-none px-8 py-3">
                  Back to Field Notes
                </Button>
              </Link>
            </div>
          ) : (
            <article>
              {/* Category */}
              {post.category && (
                <div className="mb-4">
                  <span className="bg-primary text-black font-heading text-xs uppercase px-3 py-1 tracking-wider">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl text-white leading-tight mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-gray-500 text-sm font-body mb-8 pb-8 border-b-2 border-gray-800">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span>·</span>
                <span className="text-gray-400">{post.author}</span>
              </div>

              {/* Hero Image */}
              {post.imageUrl && (
                <div className="mb-10 border-4 border-gray-800 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover opacity-80"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>

              {/* Footer CTA */}
              <div className="mt-16 border-t-4 border-primary pt-10 text-center">
                <p className="font-heading text-2xl text-white mb-2">
                  SUPPORT THE HIVE
                </p>
                <p className="font-body text-gray-400 mb-6">
                  Every purchase keeps the bees fed and the lights on.
                </p>
                <Link href="/shop">
                  <Button
                    className="bg-primary text-black font-heading text-lg uppercase px-10 py-4 rounded-none hover:bg-primary/90"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Shop the Collection
                  </Button>
                </Link>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
