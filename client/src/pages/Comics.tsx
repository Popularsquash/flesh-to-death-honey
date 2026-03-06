import { Link } from "wouter";
import { Skull, Zap, Calendar, BookOpen, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function Comics() {
  const seoProps = {
    title: "Comics",
    description: "Read The Hive Chronicles — original comics from Flesh to Death Honey Co. Follow the skull bee crew on two wheels.",
    keywords: "biker comics, bee comics, motorcycle comic series, Hive Chronicles, indie comics, skull bee",
    url: "https://fleshtodeathhoney.com/comics",
  };
  
  const comics = [
    {
      id: 1,
      title: "Revenge of the Hive",
      issue: "Issue #1",
      subtitle: "The Bear Necessities",
      tagline: "They're not keeping the peace. They're keeping the honey.",
      date: "January 2026",
      coverImage: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/uTAjHVyJjsljKgdP.webp",
      pages: 9,
      status: "NEW",
      description: "Every paradise has a serpent. Ours has a bear. Name's Biff. He doesn't pay for honey. He 'liberates' it. Watch as Buzzkill, Stinger, and Prop teach him a lesson he won't forget.",
    },
    {
      id: 2,
      title: "Revenge of the Hive",
      issue: "Issue #2",
      subtitle: "Posers",
      tagline: "They wear the stripes, but they ain't earned them.",
      date: "February 2026",
      coverImage: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/VpRjuPCeskNfNFLA.png",
      pages: 9,
      status: "NEW",
      description: "Prop passes out in the Hive's Garage after too much Hive Mind Fuel. What follows is a fever dream of fog-choked highways, a menacing Yellowjacket with a cheap unpatched vest, and the kind of neck-snapping hospitality that makes you question your life choices.",
    },
    {
      id: 3,
      title: "Revenge of the Hive",
      issue: "Issue #3",
      subtitle: "The Visit",
      tagline: "Some stings don't fade. Some just knock first.",
      date: "Coming Soon",
      coverImage: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/qUSAvZaRYVxzsqQm.webp",
      pages: 0,
      status: "COMING SOON",
      description: "The Pollen Patrol rolls up to The Hive's Garage. Three riders. Matching vests. Neon-lit choppers. They don't look friendly. The swarm's about to find out what happens when old stings come knocking.",
    },
  ];

  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen bg-black text-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b-4 border-primary">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png" alt="F2D Logo" className="h-8 md:h-10 w-auto" />
            <span className="font-heading text-xl md:text-3xl text-primary hover:text-white transition-colors">
              FLESH TO DEATH
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/shop" className="font-heading text-lg hover:text-primary transition-colors">SHOP</Link>
            <Link href="/buzzkill" className="font-heading text-lg hover:text-primary transition-colors">BUZZKILL APP</Link>
            <Link href="/comics" className="font-heading text-lg text-primary">COMICS</Link>
            <Link href="/about" className="font-heading text-lg hover:text-primary transition-colors">ABOUT</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,195,0,0.1) 10px, rgba(255,195,0,0.1) 20px)"
               }}>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-secondary text-white px-4 md:px-6 py-1 md:py-2 font-heading text-base md:text-xl transform -rotate-2 mb-6 md:mb-8">
              ANARCHIC ENTERTAINMENT
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-heading text-white leading-none mb-4 md:mb-6">
              THE <span className="text-primary">HIVE</span> CHRONICLES
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-300 font-heading mb-4 md:mb-6">
              Bee Bikers. Honey Heists. Highway Justice.
            </p>
            
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              The anarchic, honey-dripping comic series from Flesh to Death Honey Co.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-12 bg-black" 
             style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }}>
        </div>
      </section>

      {/* Comics Grid */}
      <section className="py-12 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-heading text-primary">ALL ISSUES</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="text-primary" size={18} />
                <span className="font-heading text-sm md:text-lg">
                  {comics.filter(c => c.pages > 0).length} Issue{comics.filter(c => c.pages > 0).length !== 1 ? 's' : ''} Available
                </span>
              </div>
            </div>

            <div className="space-y-8 md:space-y-12">
              {comics.map((comic) => (
                <Link
                  key={comic.id}
                  href={comic.pages > 0 ? `/comics/${comic.id}` : "#"}
                  className={`group block ${comic.pages > 0 ? "" : "pointer-events-none"}`}
                >
                  <div className={`flex flex-col md:flex-row bg-gray-900 border-2 md:border-4 ${comic.pages > 0 ? "border-primary hover:border-secondary hover:shadow-[6px_6px_0px_0px_rgba(255,195,0,1)] hover:-translate-y-1" : "border-gray-700 opacity-70"} transition-all duration-200 overflow-hidden`}>
                    {/* Cover Image */}
                    <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
                      <div className="aspect-[2/3] md:aspect-auto md:h-full overflow-hidden bg-black">
                        <img
                          src={comic.coverImage}
                          alt={`${comic.title} cover`}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`absolute top-3 right-3 ${comic.status === "NEW" ? "bg-secondary" : "bg-gray-600"} text-white px-3 py-1 font-heading text-xs md:text-sm transform rotate-2`}>
                        {comic.status}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-gray-400 mb-3">
                          <Calendar size={14} />
                          <span className="text-xs md:text-sm">{comic.date}</span>
                          {comic.pages > 0 && (
                            <>
                              <span className="text-gray-600">|</span>
                              <BookOpen size={14} />
                              <span className="text-xs md:text-sm">{comic.pages} pages</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-4xl font-heading text-primary mb-1 md:mb-2 group-hover:text-secondary transition-colors">
                          {comic.title}
                        </h3>
                        <p className="text-lg md:text-xl font-heading text-white mb-1">
                          {comic.issue}: "{comic.subtitle}"
                        </p>
                        <p className="text-sm text-gray-400 italic mb-4">{comic.tagline}</p>

                        <p className="text-sm md:text-base text-gray-300 leading-relaxed line-clamp-3">
                          {comic.description}
                        </p>
                      </div>

                      {/* Read button */}
                      {comic.pages > 0 ? (
                        <div className="mt-4 md:mt-6 pt-4 border-t-2 border-dashed border-gray-700">
                          <span className="inline-flex items-center gap-2 text-primary font-heading text-base md:text-lg group-hover:text-secondary transition-colors">
                            <BookOpen size={18} />
                            READ NOW — {comic.pages} PAGES
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      ) : (
                        <div className="mt-4 md:mt-6 pt-4 border-t-2 border-dashed border-gray-700">
                          <span className="inline-flex items-center gap-2 text-gray-500 font-heading text-base md:text-lg">
                            <Skull size={18} />
                            IN PRODUCTION...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Coming Soon Teaser */}
            <div className="mt-12 md:mt-16 p-8 md:p-12 bg-gradient-to-br from-gray-900 to-black border-4 border-dashed border-gray-700 text-center">
              <Skull className="mx-auto text-primary mb-4" size={40} />
              <h3 className="text-2xl md:text-3xl font-heading text-white mb-3">
                MORE CHAOS COMING SOON
              </h3>
              <p className="text-base md:text-xl text-gray-400 mb-4">
                New issues drop when the hive mind says so.
              </p>
              <p className="text-gray-500 italic text-sm">
                Subscribe below to get notified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-7xl font-heading text-black mb-4 md:mb-6">JOIN THE SWARM</h2>
          <p className="text-lg md:text-2xl text-black/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Get notified when new issues drop. We promise not to spam you.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-black text-primary hover:bg-secondary hover:text-white font-heading text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 border-4 border-black transition-colors"
          >
            SUBSCRIBE TO UPDATES
          </Link>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
