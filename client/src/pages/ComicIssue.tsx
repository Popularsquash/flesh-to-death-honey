import { Link, useParams } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, BookOpen, Skull } from "lucide-react";
import Footer from "@/components/Footer";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface ComicPage {
  image: string;
  caption?: string;
}

interface ComicData {
  id: number;
  title: string;
  issue: string;
  subtitle: string;
  tagline: string;
  date: string;
  coverImage: string;
  synopsis: string;
  pages: ComicPage[];
  credits: {
    story: string;
    art: string;
    letters: string;
  };
  nextIssue: {
    title: string;
    teaser: string;
  };
}

const comicsData: Record<string, ComicData> = {
  "1": {
    id: 1,
    title: "Revenge of the Hive",
    issue: "Issue #1",
    subtitle: "The Bear Necessities",
    tagline: "They're not keeping the peace. They're keeping the honey.",
    date: "January 2026",
    coverImage: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/uTAjHVyJjsljKgdP.webp",
    synopsis: "Every paradise has a serpent. Ours has a bear. Name's Biff. He doesn't pay for honey. He 'liberates' it. Watch as Buzzkill, Stinger, and Prop teach him a lesson he won't forget.",
    pages: [
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/uTAjHVyJjsljKgdP.webp",
        caption: "Flesh to Death Honey Co. presents: Death's Door Honey Blend. It's the bee's... death!",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/AocpNquOrxZSJMJp.webp",
        caption: "Buzzkill rolls through Sunflower Valley with a sidecar full of Death's Door honey.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/VtCXPHCPBNpPgGVf.webp",
        caption: "Queen Stinger doesn't take kindly to honey thieves. \"Queen is a Title, Not a Mood.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/fCJfaVoIcMwuSxpI.webp",
        caption: "Prop tears down the highway. The swarm rides at dawn.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/pYrVjhmKDLvgBfHV.webp",
        caption: "\"Sunflower Valley... Soon.\" The plan is set. No bear is safe.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/nPXxqyCoZcLYEmGq.webp",
        caption: "\"Just one taste, Biff... It's to die for.\" The trap is baited.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/SMLklyHDENbtJjvJ.webp",
        caption: "Meanwhile, in the meadow... Biff takes the bait while the swarm closes in.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/KCYXeoxavRnryJml.webp",
        caption: "Biff was NOT ready for the spice. Death's Door hits different.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/hpMiJvfcNYFtNEro.webp",
        caption: "\"Heh.\" \"Empty.\" \"Told ya.\" Another honey thief handled. The hive always wins.",
      },
    ],
    credits: {
      story: "Flesh to Death Honey Co.",
      art: "Flesh to Death Honey Co.",
      letters: "The Hive Mind",
    },
    nextIssue: {
      title: "The Yellowjacket Gang",
      teaser: "They wear the stripes, but they ain't earned them. Coming Soon.",
    },
  },
};

export default function ComicIssue() {
  const params = useParams();
  const id = params.id || "1";
  const comic = comicsData[id];

  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const totalPages = comic?.pages.length || 0;

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      setIsImageLoaded(false);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === "f" || e.key === "F") {
        setIsFullscreen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage, isFullscreen]);

  // Preload next image
  useEffect(() => {
    if (comic && currentPage < totalPages - 1) {
      const img = new Image();
      img.src = comic.pages[currentPage + 1].image;
    }
  }, [currentPage, comic, totalPages]);

  // Auto-hide controls in fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3000);
    };
    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [isFullscreen]);

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

  const page = comic.pages[currentPage];
  const progressPercent = ((currentPage + 1) / totalPages) * 100;

  // Fullscreen Reader
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col select-none">
        {/* Top Bar */}
        <div
          className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/90 to-transparent px-4 py-3 flex items-center justify-between transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="flex items-center gap-3">
            <span className="font-heading text-primary text-sm md:text-lg">{comic.issue}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300 text-sm">{comic.title}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(false)}
            className="text-white hover:text-primary"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Main Image Area */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Left click zone */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer group"
            onClick={prevPage}
          >
            {currentPage > 0 && (
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-2 transition-opacity duration-300 ${showControls ? "opacity-70 group-hover:opacity-100" : "opacity-0"}`}>
                <ChevronLeft size={32} className="text-white" />
              </div>
            )}
          </div>

          {/* Image */}
          <img
            src={page.image}
            alt={`Page ${currentPage + 1}`}
            className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Loading spinner */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Right click zone */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer group"
            onClick={nextPage}
          >
            {currentPage < totalPages - 1 && (
              <div className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-2 transition-opacity duration-300 ${showControls ? "opacity-70 group-hover:opacity-100" : "opacity-0"}`}>
                <ChevronRight size={32} className="text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-10 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {/* Caption */}
          {page.caption && (
            <div className="text-center px-6 pb-2">
              <p className="text-gray-300 text-sm md:text-base italic max-w-2xl mx-auto">
                {page.caption}
              </p>
            </div>
          )}

          {/* Progress bar */}
          <div className="h-1 bg-gray-800 w-full">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Page indicator */}
          <div className="bg-black/90 px-4 py-2 flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-sm font-heading text-gray-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← PREV
            </button>
            <div className="flex items-center gap-2">
              {comic.pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentPage ? "bg-primary w-6" : "bg-gray-600 hover:bg-gray-400"}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="text-sm font-heading text-gray-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal page view
  return (
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

      {/* Back Navigation */}
      <div className="bg-gray-900 border-b-2 border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <Link href="/comics" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-heading text-sm md:text-base">
            <ArrowLeft size={18} />
            BACK TO ALL ISSUES
          </Link>
        </div>
      </div>

      {/* Comic Title Bar */}
      <section className="py-6 md:py-10 bg-gradient-to-b from-gray-900 to-black border-b-2 border-primary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-secondary text-white px-4 py-1 font-heading text-sm md:text-base transform -rotate-2 mb-3">
            {comic.issue}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading text-white leading-none mb-2">
            {comic.title}
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading text-primary mb-3">
            "{comic.subtitle}"
          </h2>
          <p className="text-sm md:text-base text-gray-400 italic">{comic.tagline}</p>
        </div>
      </section>

      {/* Comic Reader */}
      <section className="py-6 md:py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Reader Controls Top */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <BookOpen size={16} />
                <span className="text-sm font-heading">
                  PAGE {currentPage + 1} OF {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className="border-gray-700 text-gray-300 hover:text-primary hover:border-primary bg-transparent"
              >
                <Maximize2 size={16} className="mr-2" />
                Fullscreen
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-800 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Comic Panel */}
            <div className="relative bg-gray-900 border-2 md:border-4 border-primary shadow-[4px_4px_0px_0px_rgba(255,195,0,0.6)] md:shadow-[8px_8px_0px_0px_rgba(255,195,0,0.6)] overflow-hidden group">
              {/* Navigation Overlay - Left */}
              {currentPage > 0 && (
                <button
                  onClick={prevPage}
                  className="absolute left-0 top-0 bottom-0 w-1/4 z-10 flex items-center justify-start pl-2 md:pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <div className="bg-black/70 rounded-full p-1.5 md:p-3 backdrop-blur-sm">
                    <ChevronLeft size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                </button>
              )}

              {/* Navigation Overlay - Right */}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={nextPage}
                  className="absolute right-0 top-0 bottom-0 w-1/4 z-10 flex items-center justify-end pr-2 md:pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <div className="bg-black/70 rounded-full p-1.5 md:p-3 backdrop-blur-sm">
                    <ChevronRight size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                </button>
              )}

              {/* Image */}
              <img
                src={page.image}
                alt={`Page ${currentPage + 1}`}
                className={`w-full h-auto transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-30"}`}
                onLoad={() => setIsImageLoaded(true)}
                onClick={() => setIsFullscreen(true)}
                style={{ cursor: "zoom-in" }}
              />

              {/* Loading overlay */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Caption */}
            {page.caption && (
              <div className="mt-4 p-3 md:p-4 bg-gray-900/80 border-l-4 border-primary">
                <p className="text-sm md:text-base text-gray-300 italic leading-relaxed">
                  {page.caption}
                </p>
              </div>
            )}

            {/* Page Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="border-gray-700 text-gray-300 hover:text-primary hover:border-primary disabled:opacity-30 bg-transparent font-heading"
              >
                <ChevronLeft size={18} className="mr-1" />
                PREV
              </Button>

              {/* Page dots */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[60%]">
                {comic.pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentPage
                        ? "bg-primary w-8 h-2.5"
                        : "bg-gray-700 hover:bg-gray-500 w-2.5 h-2.5"
                    }`}
                    title={`Page ${i + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="border-gray-700 text-gray-300 hover:text-primary hover:border-primary disabled:opacity-30 bg-transparent font-heading"
              >
                NEXT
                <ChevronRight size={18} className="ml-1" />
              </Button>
            </div>

            {/* Keyboard hint */}
            <p className="text-center text-xs text-gray-600 mt-3 hidden md:block">
              Use ← → arrow keys to navigate • Press F for fullscreen • Click panel to zoom
            </p>
          </div>
        </div>
      </section>

      {/* Synopsis & Credits (shown below reader) */}
      <section className="py-8 md:py-12 bg-gray-950 border-t-2 border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Synopsis */}
            <div>
              <h3 className="text-xl font-heading text-primary mb-3 flex items-center gap-2">
                <Skull size={18} />
                SYNOPSIS
              </h3>
              <p className="text-gray-300 leading-relaxed">{comic.synopsis}</p>
            </div>

            {/* Credits */}
            <div>
              <h3 className="text-xl font-heading text-primary mb-3">CREDITS</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500 text-sm uppercase">Story</span>
                  <span className="text-white font-heading">{comic.credits.story}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500 text-sm uppercase">Art</span>
                  <span className="text-white font-heading">{comic.credits.art}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500 text-sm uppercase">Letters</span>
                  <span className="text-white font-heading">{comic.credits.letters}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Issue Teaser */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-gray-950 to-black border-t-4 border-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-heading text-white mb-4">NEXT ISSUE</h3>
          <div className="inline-block bg-secondary text-white px-6 py-2 font-heading text-lg md:text-2xl transform -rotate-1 mb-4">
            {comic.nextIssue.title}
          </div>
          <p className="text-base md:text-lg text-gray-400 mb-8">{comic.nextIssue.teaser}</p>
          <Link
            href="/comics"
            className="inline-block bg-primary text-black hover:bg-secondary hover:text-white font-heading text-lg px-8 py-3 border-4 border-black transition-colors"
          >
            VIEW ALL ISSUES
          </Link>
        </div>
      </section>

      {/* Shop CTA */}
      <section className="py-10 md:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-heading text-black mb-4">FUEL YOUR REBELLION</h3>
          <p className="text-base md:text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Shop our weaponized beeswax products and join the swarm.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-primary hover:bg-secondary hover:text-white font-heading text-lg px-10 py-3 border-4 border-black transition-colors"
          >
            SHOP THE STASH
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
