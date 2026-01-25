import { Link } from "wouter";
import { Skull, Zap, Calendar } from "lucide-react";
import Footer from "@/components/Footer";

export default function Comics() {
  const comics = [
    {
      id: 1,
      title: "Revenge of the Hive",
      issue: "Issue #1",
      subtitle: "The Bear Necessities",
      tagline: "They're not keeping the peace. They're keeping the honey.",
      date: "January 2026",
      thumbnail: "/assets/revenge_of_the_hive_issue1_web.jpg",
      status: "NEW",
      description: "Every paradise has a serpent. Ours has a bear. Name's Biff. He doesn't pay for honey. He 'liberates' it. Watch as Buzzkill, Stinger, and Prop teach him a lesson he won't forget.",
    },
    {
      id: 2,
      title: "The Yellowjacket Gang",
      issue: "Issue #2",
      subtitle: "Posers",
      tagline: "They wear the stripes, but they ain't earned them.",
      date: "Coming Soon",
      thumbnail: "/assets/yellowjacket-gang-cover.jpg",
      status: "COMING SOON",
      description: "A rival gang rolls into town wearing yellow and black. They call themselves the Yellowjackets. They think they run these roads. Buzzkill and the crew have other plans. Time to show these posers what real stingers look like.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/f2d-logo.png" alt="F2D Logo" className="h-10 w-auto" />
            <span className="font-heading text-3xl text-primary hover:text-white transition-colors">
              FLESH TO DEATH
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/shop" className="font-heading text-lg hover:text-primary transition-colors">
              SHOP
            </Link>
            <Link href="/buzzkill" className="font-heading text-lg hover:text-primary transition-colors">
              BUZZKILL APP
            </Link>
            <Link href="/comics" className="font-heading text-lg text-primary">
              COMICS
            </Link>
            <Link href="/about" className="font-heading text-lg hover:text-primary transition-colors">
              ABOUT
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,195,0,0.1) 10px, rgba(255,195,0,0.1) 20px)"
               }}>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-secondary text-white px-6 py-2 font-heading text-xl transform -rotate-2 mb-8">
              ANARCHIC ENTERTAINMENT
            </div>
            
            <h1 className="text-7xl md:text-9xl font-heading text-white leading-none mb-6">
              THE <span className="text-primary">HIVE</span> CHRONICLES
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-heading mb-8">
              Bee Bikers. Honey Heists. Highway Justice.
            </p>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Welcome to the anarchic, honey-dripping comic series from Flesh to Death Honey Co. 
              Where the only thing sweeter than revenge is the honey that causes it.
            </p>
          </div>
        </div>

        {/* Jagged Divider */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-black" 
             style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}>
        </div>
      </section>

      {/* Comics Grid */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-5xl font-heading text-primary">
                ALL ISSUES
              </h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="text-primary" />
                <span className="font-heading text-lg">
                  {comics.length} Issue{comics.length !== 1 ? 's' : ''} Available
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {comics.map((comic) => (
                <Link
                  key={comic.id}
                  href={`/comics/${comic.id}`}
                  className="group relative bg-gray-900 border-4 border-primary hover:border-secondary transition-all transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(255,195,0,1)]"
                >
                  {/* Status Badge */}
                  {comic.status && (
                    <div className="absolute top-4 right-4 z-10 bg-secondary text-white px-4 py-2 font-heading text-sm transform rotate-3">
                      {comic.status}
                    </div>
                  )}

                  {/* Thumbnail */}
                  <div className="relative overflow-hidden bg-black aspect-[3/4]">
                    <img
                      src={comic.thumbnail}
                      alt={`${comic.title} ${comic.issue}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <Calendar size={16} />
                      <span className="text-sm font-body">{comic.date}</span>
                    </div>

                    <div>
                      <h3 className="text-3xl font-heading text-primary mb-2">
                        {comic.title}
                      </h3>
                      <p className="text-xl font-heading text-white mb-1">
                        {comic.issue}: "{comic.subtitle}"
                      </p>
                      <p className="text-sm text-gray-400 italic">
                        {comic.tagline}
                      </p>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {comic.description}
                    </p>

                    <div className="pt-4 border-t-2 border-dashed border-gray-700">
                      <span className="inline-flex items-center gap-2 text-primary font-heading text-lg group-hover:text-secondary transition-colors">
                        READ NOW
                        <Skull size={20} className="group-hover:rotate-12 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Coming Soon Teaser */}
            <div className="mt-16 p-12 bg-gradient-to-br from-gray-900 to-black border-4 border-dashed border-gray-700 text-center">
              <Skull className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-3xl font-heading text-white mb-4">
                MORE CHAOS COMING SOON
              </h3>
              <p className="text-xl text-gray-400 mb-6">
                Issue #2: "The Yellowjacket Gang" is in production.
              </p>
              <p className="text-gray-500 italic">
                Posers incoming...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-heading text-black mb-6">
            JOIN THE SWARM
          </h2>
          <p className="text-2xl text-black/80 mb-8 max-w-2xl mx-auto">
            Get notified when new issues drop. We promise not to spam you. 
            (The bees might judge you though.)
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-black text-primary hover:bg-secondary hover:text-white font-heading text-xl px-12 py-4 border-4 border-black transition-colors"
          >
            SUBSCRIBE TO UPDATES
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
