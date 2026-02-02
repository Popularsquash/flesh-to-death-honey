import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Skull, Share2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Comic data - in a real app, this would come from a database or API
const comicsData: Record<string, {
  id: number;
  title: string;
  issue: string;
  subtitle: string;
  tagline: string;
  date: string;
  imageUrl: string;
  synopsis: string;
  credits: {
    story: string;
    art: string;
    letters: string;
  };
  nextIssue: {
    title: string;
    teaser: string;
  };
}> = {
  "1": {
    id: 1,
    title: "Revenge of the Hive",
    issue: "Issue #1",
    subtitle: "The Bear Necessities",
    tagline: "They're not keeping the peace. They're keeping the honey.",
    date: "January 2026",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/sBNQxpQOyJIPEjgz.png",
    synopsis: "Every paradise has a serpent. Ours has a bear. Name's Biff. He doesn't pay for honey. He 'liberates' it. Watch as Buzzkill, Stinger, and Prop teach him a lesson he won't forget. In this debut issue, the bees of Flesh to Death Honey Co. face their greatest threat yet - a bear with an appetite for destruction and a complete disregard for the natural order.",
    credits: {
      story: "Flesh to Death Honey Co.",
      art: "Flesh to Death Honey Co.",
      letters: "The Hive Mind",
    },
    nextIssue: {
      title: "The Yellowjacket Gang",
      teaser: "Coming Soon: The Yellowjacket Gang rolls into town. Posers.",
    },
  },
};

export default function ComicIssue() {
  const params = useParams();
  const id = params.id || "1";
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const comic = comicsData[id];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
    setZoomLevel(1);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1);
  };

  if (!comic) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center px-4">
          <Skull className="mx-auto text-primary mb-4" size={64} />
          <h1 className="text-3xl md:text-4xl font-heading text-primary mb-4">ISSUE NOT FOUND</h1>
          <p className="text-gray-400 mb-8">This comic doesn't exist... yet.</p>
          <Link href="/comics" className="text-primary hover:text-secondary font-heading">
            ← BACK TO ALL ISSUES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-body">
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          {/* Fullscreen Header */}
          <div className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <span className="font-heading text-primary text-lg">{comic.issue}: {comic.title}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="text-white hover:text-primary"
              >
                <ZoomOut size={20} />
              </Button>
              <span className="text-sm text-gray-400 min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="text-white hover:text-primary"
              >
                <ZoomIn size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseFullscreen}
                className="text-white hover:text-primary ml-2"
              >
                <X size={24} />
              </Button>
            </div>
          </div>
          
          {/* Fullscreen Image */}
          <div className="flex-1 overflow-auto p-4">
            <img
              src={comic.imageUrl}
              alt={`${comic.title} ${comic.issue}`}
              className="mx-auto transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            />
          </div>
          
          {/* Fullscreen Footer */}
          <div className="flex-shrink-0 bg-gray-900 border-t border-gray-800 px-4 py-3 text-center">
            <p className="text-sm text-gray-400">Pinch to zoom • Swipe to pan</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b-4 border-primary">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img src="/images/f2d-logo.png" alt="F2D Logo" className="h-8 md:h-10 w-auto" />
            <span className="font-heading text-xl md:text-3xl text-primary hover:text-white transition-colors">
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

      {/* Back Navigation */}
      <div className="bg-gray-900 border-b-2 border-gray-800">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <Link
            href="/comics"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-heading text-sm md:text-base"
          >
            <ArrowLeft size={18} />
            BACK TO ALL ISSUES
          </Link>
        </div>
      </div>

      {/* Comic Header - Mobile Optimized */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-gray-900 to-black border-b-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-secondary text-white px-4 md:px-6 py-1 md:py-2 font-heading text-base md:text-lg transform -rotate-2 mb-4 md:mb-6">
              {comic.issue}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-heading text-white leading-none mb-3 md:mb-4">
              {comic.title}
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading text-primary mb-4 md:mb-6">
              "{comic.subtitle}"
            </h2>

            <p className="text-base md:text-xl text-gray-400 italic mb-6 md:mb-8 px-4">
              {comic.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-gray-400 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{comic.date}</span>
              </div>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis - Mobile Optimized */}
      <section className="py-8 md:py-12 bg-black border-b-2 border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-heading text-primary mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <Skull size={20} />
              SYNOPSIS
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {comic.synopsis}
            </p>
          </div>
        </div>
      </section>

      {/* Comic Image - Mobile Optimized with Controls */}
      <section className="py-8 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Mobile Reading Instructions */}
            <div className="md:hidden bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-gray-400 mb-3">
                <span className="text-primary font-bold">Tap the comic</span> to open fullscreen reader
              </p>
              <div className="flex justify-center gap-4 text-xs text-gray-500">
                <span>📱 Pinch to zoom</span>
                <span>👆 Tap to close</span>
              </div>
            </div>

            {/* Comic Viewer Controls - Desktop */}
            <div className="hidden md:flex justify-end gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="border-gray-700 text-gray-300 hover:text-primary hover:border-primary"
              >
                <ZoomOut size={18} className="mr-2" />
                Zoom Out
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="border-gray-700 text-gray-300 hover:text-primary hover:border-primary"
              >
                <ZoomIn size={18} className="mr-2" />
                Zoom In
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFullscreen}
                className="border-gray-700 text-gray-300 hover:text-primary hover:border-primary"
              >
                <Maximize2 size={18} className="mr-2" />
                Fullscreen
              </Button>
            </div>

            {/* Comic Image Container */}
            <div 
              className="border-2 md:border-4 border-primary bg-gray-900 p-2 md:p-4 shadow-[4px_4px_0px_0px_rgba(255,195,0,1)] md:shadow-[12px_12px_0px_0px_rgba(255,195,0,1)] cursor-pointer overflow-auto"
              onClick={() => window.innerWidth < 768 && handleFullscreen()}
            >
              <img
                src={comic.imageUrl}
                alt={`${comic.title} ${comic.issue}`}
                className="w-full h-auto transition-transform duration-200"
                style={{ 
                  transform: window.innerWidth >= 768 ? `scale(${zoomLevel})` : 'none',
                  transformOrigin: 'top left'
                }}
              />
            </div>

            {/* Mobile Tap Hint */}
            <div className="md:hidden text-center mt-4">
              <Button
                onClick={handleFullscreen}
                className="bg-primary text-black hover:bg-secondary font-heading"
              >
                <Maximize2 size={18} className="mr-2" />
                Open Fullscreen Reader
              </Button>
            </div>

            {/* Credits - Mobile Optimized */}
            <div className="mt-8 md:mt-12 p-4 md:p-8 bg-gray-900 border-2 border-gray-800 rounded-lg md:rounded-none">
              <h3 className="text-xl md:text-2xl font-heading text-primary mb-4 md:mb-6">CREDITS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-center">
                <div className="bg-gray-800/50 p-4 rounded-lg sm:rounded-none sm:bg-transparent">
                  <p className="text-xs md:text-sm text-gray-500 uppercase mb-1 md:mb-2">Story</p>
                  <p className="text-base md:text-lg text-white font-heading">{comic.credits.story}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg sm:rounded-none sm:bg-transparent">
                  <p className="text-xs md:text-sm text-gray-500 uppercase mb-1 md:mb-2">Art</p>
                  <p className="text-base md:text-lg text-white font-heading">{comic.credits.art}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg sm:rounded-none sm:bg-transparent">
                  <p className="text-xs md:text-sm text-gray-500 uppercase mb-1 md:mb-2">Letters</p>
                  <p className="text-base md:text-lg text-white font-heading">{comic.credits.letters}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Issue Teaser - Mobile Optimized */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-black to-gray-900 border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl lg:text-6xl font-heading text-white mb-4 md:mb-6">
              NEXT ISSUE
            </h3>
            <div className="inline-block bg-secondary text-white px-6 md:px-8 py-2 md:py-3 font-heading text-lg md:text-2xl transform -rotate-1 mb-4 md:mb-6">
              {comic.nextIssue.title}
            </div>
            <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 px-4">
              {comic.nextIssue.teaser}
            </p>
            <Link
              href="/comics"
              className="inline-block bg-primary text-black hover:bg-secondary hover:text-white font-heading text-lg md:text-xl px-8 md:px-10 py-3 md:py-4 border-4 border-black transition-colors"
            >
              VIEW ALL ISSUES
            </Link>
          </div>
        </div>
      </section>

      {/* Shop CTA - Mobile Optimized */}
      <section className="py-10 md:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl lg:text-6xl font-heading text-black mb-4 md:mb-6">
            FUEL YOUR REBELLION
          </h3>
          <p className="text-base md:text-xl text-black/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Shop our weaponized beeswax products and join the swarm.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-primary hover:bg-secondary hover:text-white font-heading text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 border-4 border-black transition-colors"
          >
            SHOP THE STASH
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
