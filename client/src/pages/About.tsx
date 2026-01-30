import { Link } from "wouter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skull, Heart, Zap, MapPin, Calendar, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-body">
      {/* Header */}
      <header className="border-b-4 border-primary sticky top-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/hero-bee.png" alt="Logo" className="h-12 w-12 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-xl md:text-2xl text-primary tracking-widest grunge-text">
                FLESH TO DEATH
              </span>
              <span className="font-heading text-xs md:text-sm text-white tracking-[0.3em]">
                HONEY CO.
              </span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-body text-lg uppercase tracking-wide font-bold">
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/comics" className="hover:text-primary transition-colors">Comics</Link>
            <a href="https://buzzkillbee-gno4vhs3.manus.space/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">BuzzKill App</a>
            <span className="text-primary">About</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/skeleton-bees.png')] bg-repeat bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-primary mb-6 grunge-text">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Born from beekeeping, tattoos, and the open road. This is how the hive came to be.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 md:py-24 bg-gray-900 border-y-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-heading text-white mb-6">
                Where the <span className="text-primary">Hive</span> Meets the <span className="text-primary">Highway</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  It started with a motorcycle, a beehive, and a complete disregard for conventional career paths. 
                  Somewhere between the Nevada desert and a tattoo parlor, the idea for Flesh to Death Honey Co. was born.
                </p>
                <p>
                  We're beekeepers who ride. Riders who keep bees. And somewhere in between, we discovered that 
                  beeswax makes incredible products for people who live hard and laugh at warning labels.
                </p>
                <p>
                  The name? It came from a late-night conversation about mortality, honey, and the fact that 
                  bees literally work themselves to death for the hive. We related to that. Minus the dying part. Mostly.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <img 
                  src="/images/hero-bee-transparent.png" 
                  alt="Flesh to Death Bee" 
                  className="relative z-10 w-full max-w-md drop-shadow-[0_0_25px_rgba(255,195,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-heading text-center text-white mb-16">
            The <span className="text-primary">Three Pillars</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Beekeeping */}
            <div className="bg-gray-900 border-2 border-gray-800 p-8 text-center hover:border-primary transition-colors group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-heading text-primary mb-4">Beekeeping</h3>
              <p className="text-gray-400 leading-relaxed">
                Our apiaries are scattered across Nevada's high desert. We raise bees the old way—with respect, 
                patience, and a healthy fear of getting stung. The honey and beeswax we harvest goes into every product we make.
              </p>
            </div>

            {/* Tattoos */}
            <div className="bg-gray-900 border-2 border-gray-800 p-8 text-center hover:border-primary transition-colors group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-heading text-primary mb-4">Tattoo Culture</h3>
              <p className="text-gray-400 leading-relaxed">
                Ink runs deep in our crew. The aesthetic of Flesh to Death—the skulls, the bees, the anarchic 
                humor—comes straight from tattoo culture. Our products are made for people who wear their stories on their skin.
              </p>
            </div>

            {/* Motorcycle Lifestyle */}
            <div className="bg-gray-900 border-2 border-gray-800 p-8 text-center hover:border-primary transition-colors group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Skull className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-heading text-primary mb-4">Motorcycle Lifestyle</h3>
              <p className="text-gray-400 leading-relaxed">
                Two wheels, open road, no apologies. The motorcycle isn't just transportation—it's a philosophy. 
                We make products for riders who understand that the journey matters more than the destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biker Apothecary */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-heading text-black mb-8">
              The Biker Apothecary
            </h2>
            <p className="text-xl text-black/80 mb-8 leading-relaxed">
              We call ourselves a "biker apothecary" because that's exactly what we are. An apothecary is an old-school 
              word for someone who makes remedies and potions. We make beeswax balms, honey salves, and products that 
              actually work—crafted by hand, tested on the road, and sold to people who appreciate quality over marketing.
            </p>
            <p className="text-xl text-black/80 leading-relaxed">
              <strong>Goods from beeswax is just the beginning.</strong> We're building something bigger—a community, 
              a lifestyle brand, and a middle finger to corporate wellness culture. Welcome to the swarm.
            </p>
          </div>
        </div>
      </section>

      {/* Stats/Facts */}
      <section className="py-16 md:py-24 bg-black border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-heading text-white mb-2">Nevada</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Home Base</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-heading text-white mb-2">2025</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Est.</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Heart className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-heading text-white mb-2">100%</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Handcrafted</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-heading text-white mb-2">∞</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Swarm Size</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-heading text-white mb-6">
            Join the <span className="text-primary">Swarm</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Ready to ride with us? Check out our gear, read our comics, or just follow along as we build this thing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-primary text-black hover:bg-white font-heading text-xl px-8 py-6 rounded-none">
                Shop the Stash
              </Button>
            </Link>
            <Link href="/comics">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none">
                Read Comics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
