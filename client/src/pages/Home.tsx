import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Skull, Zap, Droplet, Flame, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Brap Balm",
      price: "$18.00",
      description: "Leather salve for your road-rash gear. Smells like victory and beeswax.",
      image: "/images/brap-balm-label.png",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Sin Eraser Soap",
      price: "$12.00",
      description: "Washes away grease, grime, and yesterday's bad decisions.",
      image: "/images/charcoal-soap-label.png",
      tag: "New"
    },
    {
      id: 3,
      name: "Sting Salve",
      price: "$14.00",
      description: "Pain is temporary, swelling is hilarious. For bites, burns, and bad ideas.",
      image: "/images/sting-salve-label.png",
      tag: "Essential"
    },
    {
      id: 8,
      name: "Hive Mind Fuel",
      price: "$6.00",
      description: "Liquid adrenaline for the chronically lost. Honey energy gel.",
      image: "/images/hive-mind-fuel-label.png",
      tag: "Fuel"
    },
    {
      id: 9,
      name: "New Prospect Kit",
      price: "$50.00",
      description: "Everything you need to join the swarm. Includes balm, soap, and stickers.",
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
      image: "/images/hellfire-honey.jpg",
      tag: "Experimental"
    },
    {
      id: 102,
      name: "Midnight Comb Glow™",
      price: "$28.00",
      description: "Beeswax serum laced with bioluminescent spores. Makes scars glow like radioactive mile markers.",
      tagline: "Your Face is a Highway. Light it Up.",
      warning: "Permanently confuses moths.",
      image: "/images/hero-bee.png",
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
      image: "/images/hellfire-honey.jpg",
      tag: "Sentient"
    },
    {
      id: 105,
      name: "Hive Alchemy Elixir™",
      price: "$45.00",
      description: "Drinkable honey-mead brewed in a salvaged gas tank. Notes of burnt rubber and existential clarity.",
      tagline: "For When Your Soul Needs an Oil Change.",
      warning: "Causes prophetic dreams about highway pylons.",
      image: "/images/hero-bee.png",
      tag: "Volatile"
    }
  ];

  const apparel = [
    {
      id: 4,
      name: "Death Rider Tee",
      price: "$35.00",
      description: "Heavyweight cotton for heavy situations. Features the classic Flesh to Death back print.",
      image: "/images/apparel/FLESHTODEATHTSHIRTDESIGN.png",
      tag: "Limited"
    },
    {
      id: 5,
      name: "Hive Mind Tee",
      price: "$35.00",
      description: "Join the swarm. Front and back print with our signature skull bee.",
      image: "/images/apparel/FLESHTODEATHTSHIRTDESIGN2.png",
      tag: "New Drop"
    },
    {
      id: 6,
      name: "Reaper Patch",
      price: "$10.00",
      description: "Embroidered patch for your cut. Guaranteed to scare grandmas.",
      image: "/images/apparel/FLESHTODEATHCIRCLEDESIGN.png",
      tag: "Accessory"
    },
    {
      id: 7,
      name: "Swarm Sticker Pack",
      price: "$15.00",
      description: "Slap 'em on your helmet, your tank, or your local stop sign.",
      image: "/images/apparel/FLESHTODEATHELEMENTDESIGNS.png",
      tag: "Sticky"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b-4 border-primary sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/images/hero-bee.png" alt="Logo" className="h-12 w-12 object-contain" />
            <span className="font-heading text-2xl md:text-3xl text-primary tracking-widest grunge-text">
              FLESH TO DEATH
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-body text-lg uppercase tracking-wide font-bold">
            <a href="#products" className="hover:text-primary transition-colors">Shop</a>
            <a href="#buzzkill" className="hover:text-primary transition-colors">BuzzKill App</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <Button variant="outline" className="border-2 border-primary hover:bg-primary hover:text-background font-bold uppercase rounded-none">
              <ShoppingCart className="mr-2 h-5 w-5" /> Cart (0)
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-b-4 border-primary p-4 flex flex-col gap-4 font-heading text-xl uppercase">
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Shop</a>
            <a href="#buzzkill" onClick={() => setIsMenuOpen(false)}>BuzzKill App</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <Button className="w-full bg-primary text-background font-bold rounded-none">
              Cart (0)
            </Button>
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
              Sweetness with a Sting
            </Badge>
            <h1 className="text-6xl md:text-8xl font-heading leading-none text-white grunge-text">
              Where the <span className="text-primary">Hive</span> Meets the <span className="text-primary">Highway</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-body max-w-lg border-l-4 border-primary pl-6">
              Weaponized beeswax, honey, and anarchic humor for outlaws, poets, and people who laugh at warning labels.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-background hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none border-2 border-transparent hover:border-black transition-all transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(199,0,57,1)]">
                Shop the Stash
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none transition-all">
                Join the Swarm
              </Button>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform scale-75"></div>
            <img 
              src="/images/hero-bee.png" 
              alt="Biker Bee Mascot" 
              className="relative z-10 w-full max-w-md drop-shadow-[0_0_15px_rgba(255,195,0,0.5)] transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        {/* Torn Paper Divider */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-primary" style={{ clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0% 100%)" }}></div>
      </header>

      {/* Products Section */}
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

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 mb-24">
            {products.map((product) => (
              <Card key={product.id} className="bg-background border-4 border-black rounded-none overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden bg-gray-800 flex items-center justify-center p-4">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-secondary text-white rounded-none font-heading uppercase text-sm border-2 border-black">
                      {product.tag}
                    </Badge>
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="border-b-2 border-dashed border-gray-700">
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-heading text-2xl text-primary">{product.name}</CardTitle>
                    <span className="font-body font-bold text-xl text-white">{product.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-400 font-body text-lg leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-black hover:bg-secondary hover:text-white font-heading uppercase text-lg rounded-none border-2 border-black transition-colors">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* The Hive's Revenge Collection */}
          <div className="text-center mb-16 pt-12 border-t-4 border-black border-dashed">
            <h2 className="text-5xl md:text-7xl font-heading text-black mb-4 mt-12">
              The Hive's <span className="text-white grunge-text">Revenge</span>
            </h2>
            <p className="text-xl font-body text-black/80 max-w-2xl mx-auto font-bold mb-2">
              We Put the ‘Mental’ in Experimental. (And the ‘Hurt’ in Dessert.)
            </p>
            <p className="text-sm font-body text-black/60 italic max-w-xl mx-auto">
              Warning: All jars double as ash trays / emotional support objects. Labels dissolve in rain to reveal hidden insults.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {revengeCollection.map((item) => (
              <Card key={item.id} className="bg-black border-4 border-white rounded-none overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 group relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
                <div className="relative h-64 overflow-hidden bg-gray-900 flex items-center justify-center p-4">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-red-600 text-white rounded-none font-heading uppercase text-sm border-2 border-white animate-pulse">
                      {item.tag}
                    </Badge>
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <CardHeader className="border-b-2 border-dashed border-gray-700 bg-black">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="font-heading text-2xl text-white">{item.name}</CardTitle>
                      <span className="font-body font-bold text-xl text-primary">{item.price}</span>
                    </div>
                    <p className="text-xs font-heading text-secondary uppercase tracking-wider">{item.tagline}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 bg-black">
                  <p className="text-gray-300 font-body text-lg leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="bg-gray-900 p-3 border-l-4 border-red-600">
                    <p className="text-red-500 text-xs font-bold uppercase mb-1">⚠️ Warning</p>
                    <p className="text-gray-400 text-xs italic">{item.warning}</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-black">
                  <Button className="w-full bg-white text-black hover:bg-red-600 hover:text-white font-heading uppercase text-lg rounded-none border-2 border-white transition-colors">
                    Risk It
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Apparel Section */}
          <div className="text-center mb-16 pt-12 border-t-4 border-black border-dashed">
            <h2 className="text-5xl md:text-7xl font-heading text-black mb-4 mt-12">
              Wear Your <span className="text-white grunge-text">Allegiance</span>
            </h2>
            <p className="text-xl font-body text-black/80 max-w-2xl mx-auto font-bold">
              Threads for the hive. Wear it loud, wear it proud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apparel.map((item) => (
              <Card key={item.id} className="bg-background border-4 border-black rounded-none overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden bg-white flex items-center justify-center p-4">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-primary text-black rounded-none font-heading uppercase text-sm border-2 border-black">
                      {item.tag}
                    </Badge>
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="border-b-2 border-dashed border-gray-700">
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-heading text-xl text-primary">{item.name}</CardTitle>
                    <span className="font-body font-bold text-lg text-white">{item.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-400 font-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-black hover:bg-secondary hover:text-white font-heading uppercase text-sm rounded-none border-2 border-black transition-colors">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
                Coming Soon to iOS & Android
              </div>
              <h2 className="text-5xl md:text-7xl font-heading text-white leading-none">
                Buzz<span className="text-secondary">Kill</span> App
              </h2>
              <h3 className="text-2xl md:text-3xl font-heading text-gray-400">
                'Cause Bees Love an Audit
              </h3>
              <p className="text-xl text-gray-300 font-body border-l-4 border-secondary pl-6">
                The comprehensive beekeeping management platform that helps you track hives, monitor health, and manage apiaries without losing your soul to a spreadsheet.
              </p>
              
              <ul className="space-y-4 font-body text-lg text-gray-300">
                <li className="flex items-center gap-3">
                  <Zap className="text-primary" /> Track hive health & queen status
                </li>
                <li className="flex items-center gap-3">
                  <Droplet className="text-primary" /> Monitor honey production levels
                </li>
                <li className="flex items-center gap-3">
                  <Flame className="text-primary" /> Sarcastic notifications & alerts
                </li>
              </ul>
              
              <Button size="lg" className="bg-secondary text-white hover:bg-white hover:text-black font-heading text-xl px-8 py-6 rounded-none border-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                Join the Beta Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <img src="/images/hero-bee.png" alt="Logo" className="h-10 w-10 object-contain grayscale" />
                <span className="font-heading text-2xl text-white tracking-widest">
                  FLESH TO DEATH
                </span>
              </div>
              <p className="text-gray-500 font-body max-w-sm">
                Small scale motorcycle lifestyle brand focusing on apparel and beeswax products for the younger generation alpha and Z.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading text-white text-xl mb-6 uppercase">Shop</h4>
              <ul className="space-y-3 font-body text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Apparel</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Beeswax Products</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-white text-xl mb-6 uppercase">Legal</h4>
              <ul className="space-y-3 font-body text-gray-400">
                <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">No Snitches Policy</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 font-body text-sm">
              © 2026 Flesh to Death Honey Co. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Social Icons would go here */}
              <div className="w-8 h-8 bg-gray-800 hover:bg-primary transition-colors"></div>
              <div className="w-8 h-8 bg-gray-800 hover:bg-primary transition-colors"></div>
              <div className="w-8 h-8 bg-gray-800 hover:bg-primary transition-colors"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
