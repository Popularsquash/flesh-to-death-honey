import { useAuth } from "@/_core/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Skull, Zap, Droplet, Flame, Menu, X } from "lucide-react";
import { useState } from "react";
import { JoinSwarmModal } from "@/components/JoinSwarmModal";
import { EmailSignup } from "@/components/EmailSignup";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Brap Balm",
      price: "$18.00",
      description: "Leather salve for your road-rash gear. Smells like victory, beeswax, and the open road at 2 AM. Rub it on anything that needs saving.",
      image: "/images/brap-balm-label.png",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Sin Eraser Soap",
      price: "$12.00",
      description: "Activated charcoal soap that washes away grease, grime, and yesterday's bad decisions. Lather up like your sins depend on it.",
      image: "/images/charcoal-soap-label.png",
      tag: "New"
    },
    {
      id: 3,
      name: "Sting Salve",
      price: "$14.00",
      description: "Pain is temporary, swelling is hilarious. Beeswax salve for bites, burns, and the consequences of your own hubris.",
      image: "/images/sting-salve-label.png",
      tag: "Essential"
    },
    {
      id: 8,
      name: "Hive Mind Fuel",
      price: "$6.00",
      description: "Liquid adrenaline for the chronically lost. Raw honey energy gel that tastes like purpose and keeps you vertical when the trail fights back.",
      image: "/images/hive-mind-fuel-label.png",
      tag: "Fuel"
    },
    {
      id: 9,
      name: "New Prospect Kit",
      price: "$50.00",
      description: "Everything a new recruit needs to join the swarm. Balm, soap, stickers, and the faint sense that you've made a commitment you can't undo.",
      image: "/images/starter-kit-label.png",
      tag: "Bundle"
    }
  ];

  const revengeCollection = [
    {
      id: 101,
      name: "Road Rash Roulette™",
      price: "$22.00",
      description: "Honey-punk salve for road burn. Infused with asphalt resin and junkyard rust. Guaranteed to offend dermatologists.",
      tagline: "Scabs Are Just Nature’s Temporary Tattoos.",
      warning: "May cause healed wounds to whisper biker poetry.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/EViPcMnJiIKyurWs.jpg",
      tag: "Experimental"
    },
    {
      id: 102,
      name: "Midnight Comb Glow™",
      price: "$28.00",
      description: "Beeswax serum laced with bioluminescent spores. Makes scars glow like radioactive mile markers.",
      tagline: "Your Face is a Highway. Light it Up.",
      warning: "Permanently confuses moths.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png",
      tag: "Radioactive"
    },
    {
      id: 103,
      name: "Queen's Command™",
      price: "$15.00",
      description: "Throat spray for voices ruined by screaming into headwinds. Raw honey + ghost pepper + crushed wasp ego.",
      tagline: "Soothe Your Rebel Yell.",
      warning: "Spray may summon a council of bees to critique your karaoke.",
      image: "/images/skeleton-bees.png",
      tag: "Spicy"
    },
    {
      id: 104,
      name: "Buzz Wax™",
      price: "$20.00",
      description: "Pomade infused with motorcycle battery acid. Styles beards, mohawks, and bad decisions.",
      tagline: "Hold So Stiff, It Judges Your Life Choices.",
      warning: "Hair gains sentience after 3 uses.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/EViPcMnJiIKyurWs.jpg",
      tag: "Sentient"
    },
    {
      id: 105,
      name: "Hive Alchemy Elixir™",
      price: "$45.00",
      description: "Drinkable honey-mead brewed in a salvaged gas tank. Notes of burnt rubber and existential clarity.",
      tagline: "For When Your Soul Needs an Oil Change.",
      warning: "Causes prophetic dreams about highway pylons.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png",
      tag: "Volatile"
    }
  ];

  const apparel = [
    {
      id: 10,
      name: "Spring Hex Tee",
      price: "$22.50",
      description: "Warped geometry meets skeletal bees. The optical illusion print bends reality — front and back — like a fever dream in a field of dead flowers. Fitted on a Bella + Canvas 3001.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/PwpogSOpdWseaIvT.webp",
      tag: "Spring Drop"
    },
    {
      id: 11,
      name: "Beekeepin Things Tote",
      price: "$30.50",
      description: "Haul your cursed belongings in this all-over print tote. Dark botanical pattern crawling with skeleton bees and bell-shaped blooms — like a Victorian funeral bouquet turned into luggage.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/ypEfQjeBROSHzeWG.webp",
      tag: "Spring Drop"
    },
    {
      id: 4,
      name: "Death Rider Tee",
      price: "$35.00",
      description: "Heavyweight cotton for heavy situations. The classic Flesh to Death back print that tells the world you ride with the hive — or you ride alone.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/wYGrrFwHJMQdeNIs.png",
      tag: "Limited"
    },
    {
      id: 5,
      name: "Hive Mind Tee",
      price: "$35.00",
      description: "Join the swarm. Front and back print with our signature skull bee. Wear it to declare allegiance or start arguments at family dinners.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/ceAnSevZKwPsDkAe.png",
      tag: "New Drop"
    },
    {
      id: 6,
      name: "Reaper Patch",
      price: "$10.00",
      description: "Embroidered patch for your cut. Iron it on, sew it on, or just hold it up menacingly. Guaranteed to scare grandmas and impress nobody who matters.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/FCrRDCqkRJoYjhtp.png",
      tag: "Accessory"
    },
    {
      id: 7,
      name: "Swarm Sticker Pack",
      price: "$15.00",
      description: "Slap 'em on your helmet, your tank, or your local stop sign. Die-cut vinyl that survives rain, sun, and regret.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/PloaTZpmpdODxDKE.png",
      tag: "Sticky"
    }
  ];

  return (
    <>
      <SEO
        title="Flesh to Death Honey Co. | Biker Apothecary"
        description="Flesh to Death Honey Co. — The Biker Apothecary. Handcrafted beeswax balms, apparel, and comics. Born from the hive, built for the road."
        url="https://fleshtodeathhoney.com/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "Flesh to Death Honey Co.",
          "description": "Veteran-owned biker apothecary. Handcrafted beeswax products, apparel, and lifestyle goods. Born from the hive, built for the road.",
          "url": "https://fleshtodeathhoney.com",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "NV",
            "addressCountry": "US"
          }
        }}
      />
      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b-4 border-primary sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png" alt="Logo" className="h-12 w-12 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-xl md:text-2xl text-primary tracking-widest grunge-text">
                FLESH TO DEATH
              </span>
              <span className="font-heading text-xs md:text-sm text-white tracking-[0.3em]">
                HONEY CO.
              </span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-body text-lg uppercase tracking-wide font-bold">
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/garage" className="hover:text-secondary transition-colors text-secondary">Garage</Link>
            <Link href="/comics" className="hover:text-primary transition-colors">Comics</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Field Notes</Link>
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
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link href="/garage" onClick={() => setIsMenuOpen(false)} className="text-secondary">Garage</Link>
            <Link href="/comics" onClick={() => setIsMenuOpen(false)}>Comics</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Field Notes</Link>
            <Link href="/cart">
              <Button className="w-full bg-primary text-background font-bold rounded-none">
                Cart ({itemCount})
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/skeleton-bees.png')] bg-repeat opacity-10 rotate-12 scale-150"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-secondary text-white border-none rounded-none px-4 py-1 text-lg font-heading uppercase transform -rotate-2 inline-block">
              Biker Apothecary
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading leading-none text-white grunge-text">
              <span className="text-primary">Flesh to Death</span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">Honey Co.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-body max-w-lg border-l-4 border-primary pl-6">
              Where the <span className="text-primary font-bold">Hive</span> meets the <span className="text-primary font-bold">Highway</span>. Born from beekeeping, tattoos, and the motorcycle lifestyle.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="bg-primary text-background hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none border-2 border-transparent hover:border-black transition-all transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(199,0,57,1)]">
                  Shop the Stash
                </Button>
              </Link>
              <JoinSwarmModal 
                trigger={
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none transition-all">
                    Join the Swarm
                  </Button>
                }
              />
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform scale-75"></div>
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/JBOoIseEJnYaBiOP.png" 
              alt="Biker Bee Mascot" 
              className="relative z-10 w-full max-w-lg drop-shadow-[0_0_25px_rgba(255,195,0,0.6)] transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        {/* Torn Paper Divider */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-primary" style={{ clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0% 100%)" }}></div>
      </header>

      {/* NEW DROPS Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/images/skeleton-bees.png')] bg-repeat bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-red-600 text-white rounded-none font-heading uppercase text-lg px-6 py-2 mb-4 inline-block border-2 border-white animate-pulse">
              Fresh Off the Press
            </Badge>
            <h2 className="text-5xl md:text-7xl font-heading text-white mb-4">
              New <span className="text-primary grunge-text">Drops</span>
            </h2>
            <p className="text-xl font-body text-gray-400 max-w-2xl mx-auto">
              Just landed in the hive. Grab 'em before they're gone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Swarm Rag - Bandana */}
            <Link href="/product/150001">
              <div className="group relative bg-gray-900 border-4 border-primary hover:border-white transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-red-600 text-white rounded-none font-heading uppercase text-sm px-3 py-1 border border-white">
                    New Drop
                  </Badge>
                </div>
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/QIAVUQdfVvxcwJHj.png" 
                    alt="The Swarm Rag" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-heading text-primary">The Swarm Rag</h3>
                    <span className="text-2xl font-heading text-white">$13.99</span>
                  </div>
                  <p className="text-gray-400 font-body text-sm mb-4">
                    Rep the swarm from your face to your Frenchie. All-over print bandana covered in skull bees, poker chips, flames, and honey jars.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs font-heading text-gray-500 border border-gray-700 px-2 py-1">S - Pet</span>
                    <span className="text-xs font-heading text-gray-500 border border-gray-700 px-2 py-1">M - Face Cover</span>
                    <span className="text-xs font-heading text-gray-500 border border-gray-700 px-2 py-1">L - Bandana</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Buzz Stompers - Crew Socks */}
            <Link href="/product/150002">
              <div className="group relative bg-gray-900 border-4 border-primary hover:border-white transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-red-600 text-white rounded-none font-heading uppercase text-sm px-3 py-1 border border-white">
                    New Drop
                  </Badge>
                </div>
                <div className="relative h-80 overflow-hidden bg-white">
                  <img 
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/BNjdxcmRkRwWMvWV.png" 
                    alt="Buzz Stompers" 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-heading text-primary">Buzz Stompers</h3>
                    <span className="text-2xl font-heading text-white">$9.99</span>
                  </div>
                  <p className="text-gray-400 font-body text-sm mb-4">
                    Stomp the pavement with the biker bee on your feet. Sublimation crew socks with repeating bee head pattern. Cushioned sole. Black cuffs.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs font-heading text-gray-500 border border-gray-700 px-2 py-1">S (US 5-7)</span>
                    <span className="text-xs font-heading text-gray-500 border border-gray-700 px-2 py-1">M (US 7-9)</span>
                    <span className="text-xs font-heading text-gray-500 border border-gray-700 px-2 py-1">L (US 9-12)</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>


          <div className="text-center mt-12">
            <Link href="/shop" onClick={() => window.scrollTo(0, 0)}>
              <Button size="lg" className="bg-primary text-black hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none border-2 border-transparent hover:border-primary transition-all shadow-[4px_4px_0px_0px_rgba(199,0,57,1)]">
                View All Merch
              </Button>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-primary" style={{ clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0% 100%)" }}></div>
      </section>

      {/* THE CULTURE — Lifestyle Gallery */}
      <section className="bg-black py-0 overflow-hidden">
        {/* Section Header */}
        <div className="container mx-auto px-4 pt-16 pb-10 text-center">
          <div className="inline-block bg-primary text-black px-6 py-1 font-heading text-sm tracking-widest uppercase transform -rotate-1 mb-4">
            The Culture
          </div>
          <h2 className="text-5xl md:text-7xl font-heading text-white leading-none">
            Born from the <span className="text-primary">Hive</span>
          </h2>
        </div>
        {/* Full-bleed two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Left — biker + dog */}
          <div className="relative overflow-hidden group" style={{ aspectRatio: '3/4' }}>
            <img
              src="/images/lifestyle-biker-dog.jpg"
              alt="Flesh to Death lifestyle — biker with pit bull"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>
          {/* Right — frenchie + honeycomb */}
          <div className="relative overflow-hidden group" style={{ aspectRatio: '3/4' }}>
            <img
              src="/images/lifestyle-frenchie-honey.jpg"
              alt="Flesh to Death lifestyle — French bulldog with honeycomb"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>
        {/* Bottom bar */}
        <div className="w-full h-2 bg-primary" />
      </section>

      {/* About the Beekeeper — Trust Section */}
      <section className="py-16 md:py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/images/skeleton-bees.png')] bg-repeat bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary text-black px-6 py-1 font-heading text-sm tracking-widest uppercase transform rotate-1 mb-6">
              About the Beekeeper
            </div>
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
              Real Hives. Real <span className="text-primary">Honey</span>. No Posers.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-body leading-relaxed border-l-4 border-primary pl-6 text-left">
              Flesh to Death Honey Co. is veteran-owned and operated out of the Nevada desert. Real hives, real bees, real beeswax — not some dropship fever dream. Handcrafted honey and beeswax products are on the way, and the merch you see here is just the opening salvo. Built by a beekeeper who served, rides, and doesn't do things halfway.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - Coming Soon */}
      <section id="products" className="py-24 bg-primary relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-heading text-black mb-4">
              Grease, Grime & <span className="text-white grunge-text">Glory</span>
            </h2>
            <p className="text-xl font-body text-black/80 max-w-2xl mx-auto font-bold">
              Handcrafted beeswax products for the road-worn and rebellious.
            </p>
          </div>


          {/* The Hive's Revenge Collection - Coming Soon */}
          <div className="text-center mb-16 pt-12 border-t-4 border-black border-dashed">
            <h2 className="text-5xl md:text-7xl font-heading text-black mb-4 mt-12">
              The Hive's <span className="text-white grunge-text">Revenge</span>
            </h2>
            <p className="text-xl font-body text-black/80 max-w-2xl mx-auto font-bold mb-2">
              We Put the 'Mental' in Experimental. (And the 'Hurt' in Dessert.)
            </p>
          </div>

          {/* Revenge Collection Coming Soon */}
          <div className="relative bg-black border-4 border-red-600 p-12 mb-24 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-black"></div>
            </div>
            <div className="relative z-10">
              <Badge className="bg-red-600 text-white rounded-none font-heading uppercase text-xl px-6 py-2 mb-6 inline-block border-2 border-white">
                🔥 Phase 2: Classified
              </Badge>
              <h3 className="text-3xl md:text-4xl font-heading text-white mb-6">
                Experimental Formulas Currently Fermenting
              </h3>
              <p className="text-lg font-body text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
                Our "Revenge" line requires ingredients that are technically legal in Nevada but morally questionable everywhere else. 
                We're talking propolis harvested during thunderstorms, beeswax aged in decommissioned gas tanks, 
                and honey from bees that exclusively pollinate haunted sunflower fields.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="bg-gray-900/50 p-4 border border-red-900">
                  <p className="text-red-500 font-heading text-sm">Road Rash Roulette™</p>
                  <p className="text-gray-500 text-xs">Status: Curing</p>
                </div>
                <div className="bg-gray-900/50 p-4 border border-red-900">
                  <p className="text-red-500 font-heading text-sm">Midnight Comb Glow™</p>
                  <p className="text-gray-500 text-xs">Status: Glowing</p>
                </div>
                <div className="bg-gray-900/50 p-4 border border-red-900">
                  <p className="text-red-500 font-heading text-sm">Buzz Wax™</p>
                  <p className="text-gray-500 text-xs">Status: Gaining Sentience</p>
                </div>
              </div>
              <p className="text-xs font-body text-gray-600 italic max-w-xl mx-auto">
                All jars will double as ash trays / emotional support objects. Labels dissolve in rain to reveal hidden insults.
              </p>
            </div>
          </div>

          {/* Sticker Pack Coming Soon */}
          <div className="text-center mb-16 pt-12 border-t-4 border-black border-dashed">
            <h2 className="text-5xl md:text-7xl font-heading text-black mb-4 mt-12">
              Swarm <span className="text-white grunge-text">Sticker Pack</span>
            </h2>
            <p className="text-xl font-body text-black/80 max-w-2xl mx-auto font-bold">
              Slap 'em on your helmet, your tank, or your local stop sign.
            </p>
          </div>

          <div className="relative bg-black border-4 border-primary p-12 text-center overflow-hidden max-w-2xl mx-auto">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('https://files.manuscdn.com/user_upload_by_module/session_file/104679889/PloaTZpmpdODxDKE.png')] bg-center bg-contain bg-no-repeat"></div>
            </div>
            <div className="relative z-10">
              <Badge className="bg-primary text-black rounded-none font-heading uppercase text-xl px-6 py-2 mb-6 inline-block border-2 border-black">
                🐝 Coming Soon
              </Badge>
              <h3 className="text-3xl md:text-4xl font-heading text-white mb-4">
                The Swarm Sticker Pack
              </h3>
              <p className="text-lg font-body text-gray-300 max-w-xl mx-auto mb-6">
                A collection of die-cut vinyl stickers featuring the Flesh to Death crew. 
                Perfect for marking your territory or making your gear look 47% more intimidating.
              </p>
              <p className="text-2xl font-heading text-primary mb-4">$15.00</p>
              <div className="mt-6 max-w-sm mx-auto">
                <EmailSignup 
                  interest="sticker_pack"
                  buttonText="Notify Me"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Jagged Divider */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}></div>
      </section>

      {/* BuzzKill App Section */}
      <section id="buzzkill" className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-secondary/20 blur-2xl rounded-full"></div>
              <div className="relative border-4 border-primary bg-black p-2 transform -rotate-3 shadow-[10px_10px_0px_0px_rgba(255,195,0,1)]">
                {/* Mockup of App Interface */}
                <div className="bg-gray-900 aspect-[9/16] p-6 flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <Menu className="text-primary" />
                    <span className="font-heading text-primary">BuzzKill</span>
                    <Skull className="text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-800 p-4 border-l-4 border-secondary">
                      <h4 className="text-white font-heading text-sm">Hive #666 Status</h4>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-400 text-xs">Queen: Alive & Angry</span>
                        <span className="text-green-500 text-xs font-bold">Healthy</span>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 border-l-4 border-primary">
                      <h4 className="text-white font-heading text-sm">Honey Harvest</h4>
                      <div className="w-full bg-gray-700 h-2 mt-2">
                        <div className="bg-primary h-2 w-3/4"></div>
                      </div>
                      <span className="text-xs text-primary mt-1 block text-right">75% Full</span>
                    </div>
                    <div className="mt-8 text-center">
                      <h3 className="text-white font-heading text-2xl mb-2">AUDIT COMPLETE</h3>
                      <p className="text-gray-400 text-xs">Your bees are judging you.</p>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute bottom-10 right-10 bg-secondary text-white p-2 font-heading text-xs transform rotate-12">
                    DATA OR DEATH
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-8">
              <div className="inline-block bg-primary text-black px-4 py-1 font-heading text-lg transform rotate-2">
                For Beekeepers
              </div>
              <h2 className="text-5xl md:text-7xl font-heading text-white leading-none">
                Buzz<span className="text-secondary">Kill</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-heading text-gray-400">
                Nothing kills a bee&apos;s vibe like an audit.
              </h3>
              <p className="text-xl text-gray-300 font-body border-l-4 border-secondary pl-6">
                Built from real beekeeping experience, <span className="text-white font-semibold">BuzzKill</span> is a separate hive health tracking app designed to help beekeepers monitor patterns, catch issues earlier, and stay closer to what their colonies are telling them.
              </p>
              
              <ul className="space-y-4 font-body text-lg text-gray-300">
                <li className="flex items-center gap-3">
                  <Zap className="text-primary" /> Track hive health, colony patterns, and queen status
                </li>
                <li className="flex items-center gap-3">
                  <Droplet className="text-primary" /> Catch trouble early with clearer signals and records
                </li>
                <li className="flex items-center gap-3">
                  <Flame className="text-primary" /> Built for beekeepers who want fewer nasty surprises in the yard
                </li>
              </ul>
              
              <a href="https://buzzkillbee.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary text-white hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none border-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  Meet BuzzKill
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
