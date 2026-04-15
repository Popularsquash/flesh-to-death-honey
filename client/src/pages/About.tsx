import { Link } from "wouter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skull, Heart, Zap, MapPin, Calendar, Users, Star, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import { JoinSwarmModal } from "@/components/JoinSwarmModal";

export default function About() {
  const seoProps = {
    title: "About",
    description: "The story behind Flesh to Death Honey Co. Veteran-owned, beekeeper-built, Nevada-based. Where motorcycle culture and beekeeping collide.",
    keywords: "veteran owned business, beekeeper, motorcycle culture, tattoo artistry, about flesh to death, nevada honey",
    url: "https://fleshtodeathhoney.com/about",
  };
  
  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen flex flex-col bg-black text-white font-body">
      {/* Header */}
      <header className="border-b-4 border-primary sticky top-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png" alt="Logo" className="h-12 w-12 object-contain" />
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
            <span className="text-primary">About</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Field Notes</Link>
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
            <div className="inline-block bg-primary text-black px-6 py-1 font-heading text-sm tracking-widest uppercase transform -rotate-1 mb-6">
              Veteran Owned &amp; Operated
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-primary mb-6 grunge-text">
              The Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              No corporate origin myth. No venture capital. Just a veteran, some bees, and a refusal to do things the easy way.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story — The Real Version */}
      <section className="py-16 md:py-24 bg-gray-900 border-y-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-heading text-white mb-6">
                Where the <span className="text-primary">Hive</span> Meets the <span className="text-primary">Highway</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Flesh to Death Honey Co. started the way most good things do — with dirt under the fingernails and zero business plan. A veteran beekeeper in the Nevada desert, running hives in triple-digit heat, pulling frames while the rest of the world scrolled Instagram. The bees didn't care about your follower count. Neither did we.
                </p>
                <p>
                  After years of military service and a lifetime of riding, the founder came home and did what made sense: built something with their hands. Real apiaries. Real beeswax. Real honey. The kind of work where you get stung and keep going — because that's what you do.
                </p>
                <p>
                  The name came from the bees themselves. Worker bees literally fly until their wings shred and they drop. Flesh to death. No retirement plan, no exit strategy — just full commitment until the work is done. We related to that. Hard.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/JBOoIseEJnYaBiOP.png" 
                  alt="Flesh to Death Bee" 
                  className="relative z-10 w-full max-w-md drop-shadow-[0_0_25px_rgba(255,195,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Veteran-Owned Callout */}
      <section className="py-12 md:py-16 bg-black border-b-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-primary/10 border-4 border-primary rounded-full flex items-center justify-center">
                <Star className="w-12 h-12 text-primary fill-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-heading text-primary mb-3">Veteran-Owned. Not a Marketing Gimmick.</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                This isn't a flag on a label to move units. Military service taught discipline, grit, and the understanding that nothing worth having comes easy. Those values are baked into every product, every decision, and every interaction with this brand. We earned the right to say it. We don't need to shout it.
              </p>
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
                Real apiaries in the Nevada high desert. We raise bees the hard way — no shortcuts, no factory farms, no cutting corners. The honey and beeswax we harvest goes into products we actually stand behind. If the bees wouldn't approve, it doesn't ship.
              </p>
            </div>

            {/* Tattoos */}
            <div className="bg-gray-900 border-2 border-gray-800 p-8 text-center hover:border-primary transition-colors group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-heading text-primary mb-4">Tattoo Culture</h3>
              <p className="text-gray-400 leading-relaxed">
                The skulls, the bees, the dark humor — it all comes from ink culture. Our aesthetic isn't designed by committee. It's drawn by people who understand that art should make you feel something, even if that something is slightly uncomfortable.
              </p>
            </div>

            {/* Motorcycle Lifestyle */}
            <div className="bg-gray-900 border-2 border-gray-800 p-8 text-center hover:border-primary transition-colors group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Skull className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-heading text-primary mb-4">Motorcycle Lifestyle</h3>
              <p className="text-gray-400 leading-relaxed">
                Two wheels, open road, zero apologies. The motorcycle isn't transportation — it's a worldview. We build products for people who understand that the best therapy has a throttle and no roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-heading text-black mb-8">
              What's Coming
            </h2>
            <p className="text-xl text-black/80 mb-8 leading-relaxed">
              The merch is live. The apparel is shipping. But the real play? <strong>Handcrafted beeswax and honey products</strong> — balms, salves, soaps, and things you didn't know you needed until you tried them. Made from our own hives, formulated by hand, and tested on people who actually use their hands for a living.
            </p>
            <p className="text-xl text-black/80 leading-relaxed">
              <strong>Goods from beeswax is just the beginning.</strong> We're building a lifestyle brand for people who ride, create, and refuse to settle for mass-produced garbage wrapped in a wellness label. This is the biker apothecary. Welcome to the swarm.
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
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-heading text-white mb-2">Veteran</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Owned</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-heading text-white mb-2">Nevada</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Home Base</p>
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
              <p className="text-3xl md:text-4xl font-heading text-white mb-2">Real</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Hives &amp; Bees</p>
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
            Ready to ride with us? Grab some gear, read the comics, or drop your email and we'll let you know when the honey drops.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-primary text-black hover:bg-white font-heading text-xl px-8 py-6 rounded-none">
                Shop the Stash
              </Button>
            </Link>
            <JoinSwarmModal 
              trigger={
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none">
                  Join the Swarm
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
