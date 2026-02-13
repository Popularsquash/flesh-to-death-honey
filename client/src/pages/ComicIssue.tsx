import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, BookOpen, Skull } from "lucide-react";
import Footer from "@/components/Footer";
import { useState, useEffect, useCallback, useRef } from "react";


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
    link?: string;
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
    synopsis: "Welcome to the first issue of the anarchic, honey-dripping comic series from Flesh to Death Honey Co. Every paradise has a serpent. Ours has a bear. Name's Biff. He doesn't pay for honey. He 'liberates' it. Watch as Buzzkill, Stinger, and Prop teach him a lesson he won't forget.",
    pages: [
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/uTAjHVyJjsljKgdP.webp",
        caption: "FLESH TO DEATH HONEY CO. presents: Death's Door Honey Blend. Incredible New Discovery! It's the bee's... death! WARNING: Not for the faint of heart. May cause uncontrollable delight.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/pYrVjhmKDLvgBfHV.webp",
        caption: "The Hive's War Room. Night. BUZZKILL leans over a worn map, one finger jabbing at a circled region: SUNFLOWER VALLEY. Behind her, two silhouettes sit astride idling choppers. BUZZKILL: \"Sunflower Valley... Soon. Biff's been gorging on our reserves for the last time.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/SMLklyHDENbtJjvJ.webp",
        caption: "3:47 PM. Sunflower Valley. A lush, anarchic meadow. Meanwhile, in the meadow... A massive, dopey-looking bear sits on his haunches, licking honey off his paws. Three bee bikers roll up on tiny choppers, staring him down. BUZZKILL: \"Every paradise has a serpent. Ours has a bear. Name's Biff. He doesn't pay for honey. He 'liberates' it.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/AocpNquOrxZSJMJp.webp",
        caption: "BUZZKILL cruises into the sunflower field on her bee-sized Softail, a jar of Death's Door Honey Blend riding shotgun in the sidecar. Her antennae are bent with purpose. BUZZKILL: \"Alright, Biff. The 'all-you-can-eat' buffet is closed.\" BIFF (off-panel): \"But it's organic!\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/VtCXPHCPBNpPgGVf.webp",
        caption: "Close-up on BUZZKILL, the leader. Perched on her bee-sized Harley, antennae bent menacingly. Her jacket patch reads: \"Queen is a Title, Not a Mood.\" BUZZKILL: \"We're artisans, not animals. But we're not above a little... seasoning.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/fCJfaVoIcMwuSxpI.webp",
        caption: "STINGER revs the tiny engine of his bike. SFX: bzzz-BRAP-BRAP! Exhaust smoke billows behind him as he tears through the sunflower field. STINGER: \"He's not gonna listen, Buzz. Let's sting first, ask questions never.\" BUZZKILL: \"Hold your pollen, Stinger. We're artisans, not animals.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/nPXxqyCoZcLYEmGq.webp",
        caption: "PROP holds the open jar of Death's Door under Biff's nose. The bear's eyes go wide with desire. A tiny drool drip hangs from his mouth. PROP: \"Just one taste, Biff... It's to die for.\" The ghost pepper nectar glows faintly inside the jar.",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/KCYXeoxavRnryJml.webp",
        caption: "Biff's entire face is bright red. Smoke pours from his ears and nostrils. His eyes are wide with shock and regret. The three bee bikers watch from their choppers, unfazed. SFX: FWOOOOOSH!! BIFF (internal): \"MY SOUL! IT BURNS!\" Caption: \"Biff was spicines...\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/hpMiJvfcNYFtNEro.webp",
        caption: "Biff is a tiny speck, running screaming into the distant forest. The three bees gather around the now-empty honey jar. BUZZKILL: \"Heh.\" PROP: \"Empty.\" STINGER: \"Told ya.\" FLESH TO DEATH HONEY CO. — Our Honey Solves Problems. Permanently.",
      },
    ],
    credits: {
      story: "Flesh to Death Honey Co.",
      art: "Flesh to Death Honey Co.",
      letters: "The Hive Mind",
    },
    nextIssue: {
      title: "Posers",
      teaser: "They wear the stripes, but they ain't earned them.",
      link: "/comics/2",
    },
  },
  "2": {
    id: 2,
    title: "Revenge of the Hive",
    issue: "Issue #2",
    subtitle: "Posers",
    tagline: "They wear the stripes, but they ain't earned them.",
    date: "February 2026",
    coverImage: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/VpRjuPCeskNfNFLA.png",
    synopsis: "Prop passes out in the Hive's Garage after too much Hive Mind Fuel. What follows is a fever dream of fog-choked highways, a menacing Yellowjacket with a cheap unpatched vest, and the kind of neck-snapping hospitality that makes you question your life choices. When he wakes up, Stinger is there to remind him it wasn't cool.",
    pages: [
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/VpRjuPCeskNfNFLA.png",
        caption: "The Hive's Garage. Night. Prop is slumped over a workbench, tools scattered around him. A half-empty jar of Hive Mind Fuel is clutched in his grip. His antennae twitch. SFX: Zzzzz... bzzzz...",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/PFfWGmaEyPOslqWo.png",
        caption: "DREAM SEQUENCE. Prop rides his bee-sized Softail through an endless gray fog. His helmet is strapped tight. Too tight. PROP: \"Just another Tuesday. Road was empty. Tank was full. Felt almost peaceful.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/oMxgqyvyErOYORVt.png",
        caption: "A shadow falls over him. Long. Thin. Menacing. Prop's antennae go rigid. SFX: BZZZZZZZT. PROP: \"...Almost.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/LhKVBlLSuWIRIUeU.png",
        caption: "A Yellowjacket materializes from the fog. Massive. Sleek. Wearing a cheap, unpatched vest. His mandibles curl into something resembling a smile. YELLOWJACKET: \"Nice helmet.\" PROP: \"...Thanks. Composite weave. Impact-rated.\" YELLOWJACKET: \"Didn't ask.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/DyvxUcSDTbQnSJoZ.png",
        caption: "CLOSE-UP. Yellowjacket's face inches from Prop's. Hot breath. Cold eyes. YELLOWJACKET: \"Stripes don't make you tough, Bee.\" PROP: \"...You're literally wearing the same stripes.\" YELLOWJACKET: \"Yeah, but ours are cooler.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/eDFSYImLTMSKJFCr.png",
        caption: "The Yellowjacket moves. Prop doesn't. One hand grips Prop's helmet. The other pins his wings. Prop's legs kick uselessly. PROP: \"HEY— THAT'S RIDING GEAR, THAT'S EXPENSIVE—\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/tLhvEmkbyJLpUqUR.png",
        caption: "SFX: CRK-POP. Clean. Surgical. Prop's helmet stays on. Completely intact. His head, however, now faces backward. PROP: \"...Oh, come ON. That's not even aerodynamic.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/myNphJebpvAryaRG.png",
        caption: "Prop bolts upright. He's in the garage. Still alive. Still facing forward. Stinger is staring at him from inside an empty coffee can. STINGER: \"You were screaming 'not the jacket' again.\" PROP: \"...Was it at least a cool scream?\" STINGER: \"Sounded like a deflating bumblebee.\" PROP: \"...I need more coffee.\"",
      },
      {
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/104679889/qUSAvZaRYVxzsqQm.webp",
        caption: "NEXT TIME ON REVENGE OF THE HIVE... The Pollen Patrol rolls up to The Hive's Garage. Three riders. Matching vests. Neon-lit choppers. They don't look friendly. Issue #3: \"The Visit\" — Some stings don't fade. Some just knock first.",
      },
    ],
    credits: {
      story: "Flesh to Death Honey Co.",
      art: "Flesh to Death Honey Co.",
      letters: "The Hive Mind",
    },
    nextIssue: {
      title: "The Visit",
      teaser: "Some stings don't fade. Some just knock first.",
    },
  },
};

// Custom hook for swipe gesture detection
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = null;
    isSwiping.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    const diffX = Math.abs((touchEndX.current || 0) - (touchStartX.current || 0));
    const diffY = Math.abs(e.targetTouches[0].clientY - (touchStartY.current || 0));
    // Only count as swipe if horizontal movement is dominant
    if (diffX > 30 && diffX > diffY) {
      isSwiping.current = true;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current || !isSwiping.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      onSwipeLeft(); // Swiped left → next page
    } else if (distance < -minSwipeDistance) {
      onSwipeRight(); // Swiped right → prev page
    }
    touchStartX.current = null;
    touchEndX.current = null;
    isSwiping.current = false;
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

export default function ComicIssue() {
  const params = useParams();
  const [, navigate] = useLocation();
  const id = params.id || "1";
  const comic = comicsData[id];

  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const readerRef = useRef<HTMLDivElement>(null);
  const swipeTouchStartX = useRef<number | null>(null);
  const swipeTouchStartY = useRef<number | null>(null);

  const totalPages = comic?.pages.length || 0;

  // Reset page to 0 when issue ID changes (e.g., navigating to next issue)
  useEffect(() => {
    setCurrentPage(0);
    setIsImageLoaded(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      setIsImageLoaded(false);
      setSwipeOffset(0);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Swipe handlers for the comic panel (visual feedback version)
  const handlePanelTouchStart = useCallback((e: React.TouchEvent) => {
    swipeTouchStartX.current = e.targetTouches[0].clientX;
    swipeTouchStartY.current = e.targetTouches[0].clientY;
  }, []);

  const handlePanelTouchMove = useCallback((e: React.TouchEvent) => {
    if (swipeTouchStartX.current === null || swipeTouchStartY.current === null) return;
    const diffX = e.targetTouches[0].clientX - swipeTouchStartX.current;
    const diffY = Math.abs(e.targetTouches[0].clientY - swipeTouchStartY.current);
    // Only track horizontal swipes
    if (Math.abs(diffX) > 15 && Math.abs(diffX) > diffY) {
      // Limit offset and add resistance at edges
      const isAtStart = currentPage === 0 && diffX > 0;
      const isAtEnd = currentPage === totalPages - 1 && diffX < 0;
      const resistance = (isAtStart || isAtEnd) ? 0.2 : 0.6;
      setSwipeOffset(diffX * resistance);
    }
  }, [currentPage, totalPages]);

  const handlePanelTouchEnd = useCallback(() => {
    if (swipeTouchStartX.current === null) return;
    const threshold = 60;
    if (swipeOffset < -threshold && currentPage < totalPages - 1) {
      nextPage();
    } else if (swipeOffset > threshold && currentPage > 0) {
      prevPage();
    }
    setSwipeOffset(0);
    swipeTouchStartX.current = null;
    swipeTouchStartY.current = null;
  }, [swipeOffset, currentPage, totalPages, nextPage, prevPage]);

  // Fullscreen swipe handlers
  const fullscreenSwipe = useSwipe(nextPage, prevPage);

  // Scroll to reader top on page change (but not on first load)
  useEffect(() => {
    if (readerRef.current && currentPage > 0) {
      readerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

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
        navigate("/comics");
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
        {/* Always-visible X button in top-right corner */}
        <button
          onClick={() => {
            setIsFullscreen(false);
            navigate("/comics");
          }}
          className="absolute top-3 right-3 z-20 bg-black/70 hover:bg-black text-white hover:text-primary p-2.5 rounded-full transition-colors backdrop-blur-sm border border-white/20"
          title="Exit to Comics"
        >
          <X size={22} />
        </button>

        {/* Top Bar (auto-hides) */}
        <div
          className={`absolute top-0 left-0 right-14 z-10 bg-gradient-to-b from-black/90 to-transparent px-4 py-3 flex items-center transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="flex items-center gap-3">
            <span className="font-heading text-primary text-sm md:text-lg">{comic.issue}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300 text-xs md:text-sm truncate">{comic.title}</span>
          </div>
        </div>

        {/* Main Image Area - with swipe support */}
        <div
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          {...fullscreenSwipe}
        >
          {/* Left click zone */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer group"
            onClick={prevPage}
          >
            {currentPage > 0 && (
              <div className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-2 transition-opacity duration-300 ${showControls ? "opacity-70 group-hover:opacity-100" : "opacity-0"}`}>
                <ChevronLeft size={24} className="text-white md:w-8 md:h-8" />
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
              <div className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-2 transition-opacity duration-300 ${showControls ? "opacity-70 group-hover:opacity-100" : "opacity-0"}`}>
                <ChevronRight size={24} className="text-white md:w-8 md:h-8" />
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
            <div className="text-center px-4 md:px-6 pb-2">
              <p className="text-gray-300 text-xs md:text-sm italic max-w-2xl mx-auto line-clamp-3">
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
          <div className="bg-black/90 px-3 md:px-4 py-2 flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-xs md:text-sm font-heading text-primary hover:text-secondary disabled:opacity-30 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors px-2 md:px-3 py-1"
            >
              ← PREV
            </button>
            <div className="flex items-center gap-1">
              {comic.pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${i === currentPage ? "bg-primary w-4 md:w-6" : "bg-gray-600 hover:bg-gray-400"}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="text-xs md:text-sm font-heading text-primary hover:text-secondary disabled:opacity-30 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors px-2 md:px-3 py-1"
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
      <section className="py-5 md:py-10 bg-gradient-to-b from-gray-900 to-black border-b-2 border-primary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-secondary text-white px-4 py-1 font-heading text-sm md:text-base transform -rotate-2 mb-2 md:mb-3">
            {comic.issue}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-heading text-white leading-none mb-1 md:mb-2">
            {comic.title}
          </h1>
          <h2 className="text-base sm:text-lg md:text-2xl font-heading text-primary mb-2 md:mb-3">
            "{comic.subtitle}"
          </h2>
          <p className="text-xs md:text-base text-gray-400 italic">{comic.tagline}</p>
        </div>
      </section>

      {/* Comic Reader */}
      <section ref={readerRef} className="py-4 md:py-10 bg-black">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            {/* Reader Controls Top */}
            <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
              <div className="flex items-center gap-2 text-gray-400">
                <BookOpen size={14} className="md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-heading">
                  PAGE {currentPage + 1} OF {totalPages}
                </span>
              </div>
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 md:py-1.5 border-2 border-primary text-primary hover:bg-primary hover:text-black font-heading text-xs md:text-sm transition-colors"
              >
                <Maximize2 size={14} className="md:w-4 md:h-4" />
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 md:h-1.5 bg-gray-800 rounded-full mb-3 md:mb-4 overflow-hidden mx-1">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Comic Panel - with swipe support */}
            <div
              className="relative bg-gray-900 border-2 md:border-4 border-primary shadow-[2px_2px_0px_0px_rgba(255,195,0,0.6)] md:shadow-[8px_8px_0px_0px_rgba(255,195,0,0.6)] overflow-hidden touch-pan-y"
              onTouchStart={handlePanelTouchStart}
              onTouchMove={handlePanelTouchMove}
              onTouchEnd={handlePanelTouchEnd}
            >
              {/* Desktop Navigation Overlay - Left (hidden on mobile, visible on hover) */}
              {currentPage > 0 && (
                <button
                  onClick={prevPage}
                  className="hidden md:flex absolute left-0 top-0 bottom-0 w-1/4 z-10 items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <div className="bg-black/70 rounded-full p-3 backdrop-blur-sm">
                    <ChevronLeft size={32} className="text-white" />
                  </div>
                </button>
              )}

              {/* Desktop Navigation Overlay - Right (hidden on mobile, visible on hover) */}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={nextPage}
                  className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/4 z-10 items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <div className="bg-black/70 rounded-full p-3 backdrop-blur-sm">
                    <ChevronRight size={32} className="text-white" />
                  </div>
                </button>
              )}

              {/* Swipe direction indicators (mobile) */}
              {swipeOffset !== 0 && (
                <>
                  {swipeOffset > 20 && currentPage > 0 && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-primary/80 rounded-full p-2 transition-opacity">
                      <ChevronLeft size={24} className="text-black" />
                    </div>
                  )}
                  {swipeOffset < -20 && currentPage < totalPages - 1 && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-primary/80 rounded-full p-2 transition-opacity">
                      <ChevronRight size={24} className="text-black" />
                    </div>
                  )}
                </>
              )}

              {/* Image */}
              <img
                src={page.image}
                alt={`Page ${currentPage + 1}`}
                className={`w-full h-auto transition-all duration-200 ${isImageLoaded ? "opacity-100" : "opacity-30"}`}
                onLoad={() => setIsImageLoaded(true)}
                onClick={() => setIsFullscreen(true)}
                style={{
                  cursor: "zoom-in",
                  transform: swipeOffset ? `translateX(${swipeOffset}px)` : undefined,
                  transition: swipeOffset ? "none" : "transform 0.3s ease-out",
                }}
                draggable={false}
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
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-900/80 border-l-4 border-primary mx-1 md:mx-0">
                <p className="text-xs sm:text-sm md:text-base text-gray-300 italic leading-relaxed">
                  {page.caption}
                </p>
              </div>
            )}

            {/* Page Navigation - Always visible, high contrast */}
            <div className="mt-4 md:mt-6 mx-1 md:mx-0">
              {/* Mobile: stacked layout with large tap targets */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-1.5 px-4 py-3 md:px-6 md:py-3 font-heading text-sm md:text-base transition-all duration-200 border-2 shrink-0 ${
                    currentPage === 0
                      ? "bg-gray-800/50 text-gray-600 border-gray-700 cursor-not-allowed"
                      : "bg-white text-black border-white hover:bg-primary hover:border-primary active:scale-95"
                  }`}
                >
                  <ChevronLeft size={18} />
                  PREV
                </button>

                {/* Page counter (mobile) / Page dots (desktop) */}
                <div className="flex flex-col items-center gap-1">
                  {/* Always show page number */}
                  <span className="text-xs font-heading text-primary md:hidden">
                    {currentPage + 1} / {totalPages}
                  </span>
                  {/* Page dots - desktop only */}
                  <div className="hidden md:flex items-center gap-1.5">
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
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center gap-1.5 px-4 py-3 md:px-6 md:py-3 font-heading text-sm md:text-base transition-all duration-200 border-2 shrink-0 ${
                    currentPage === totalPages - 1
                      ? "bg-gray-800/50 text-gray-600 border-gray-700 cursor-not-allowed"
                      : "bg-white text-black border-white hover:bg-primary hover:border-primary active:scale-95"
                  }`}
                >
                  NEXT
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Mobile page dots row */}
              <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
                {comic.pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentPage
                        ? "bg-primary w-5 h-2"
                        : "bg-gray-700 active:bg-gray-500 w-2 h-2"
                    }`}
                    title={`Page ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Keyboard hint - desktop only */}
            <p className="text-center text-xs text-gray-500 mt-3 hidden md:block">
              Use ← → arrow keys to navigate &bull; Press F for fullscreen &bull; Click panel to zoom
            </p>

            {/* Touch hint - mobile only */}
            <p className="text-center text-xs text-gray-600 mt-2 md:hidden">
              Swipe left/right to turn pages &bull; Tap image to zoom
            </p>
          </div>
        </div>
      </section>

      {/* Synopsis & Credits (shown below reader) */}
      <section className="py-6 md:py-12 bg-gray-950 border-t-2 border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Synopsis */}
            <div>
              <h3 className="text-lg md:text-xl font-heading text-primary mb-3 flex items-center gap-2">
                <Skull size={18} />
                SYNOPSIS
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">{comic.synopsis}</p>
            </div>

            {/* Credits */}
            <div>
              <h3 className="text-lg md:text-xl font-heading text-primary mb-3">CREDITS</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500 text-xs md:text-sm uppercase">Story</span>
                  <span className="text-white font-heading text-sm md:text-base">{comic.credits.story}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500 text-xs md:text-sm uppercase">Art</span>
                  <span className="text-white font-heading text-sm md:text-base">{comic.credits.art}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500 text-xs md:text-sm uppercase">Letters</span>
                  <span className="text-white font-heading text-sm md:text-base">{comic.credits.letters}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Issue Teaser */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-gray-950 to-black border-t-4 border-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-5xl font-heading text-white mb-3 md:mb-4">NEXT ISSUE</h3>
          <div className="inline-block bg-secondary text-white px-5 md:px-6 py-1.5 md:py-2 font-heading text-base md:text-2xl transform -rotate-1 mb-3 md:mb-4">
            {comic.nextIssue.title}
          </div>
          <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8">{comic.nextIssue.teaser}</p>
          {comic.nextIssue.link ? (
            <Link
              href={comic.nextIssue.link}
              className="inline-block bg-primary text-black hover:bg-secondary hover:text-white font-heading text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 border-4 border-black transition-colors"
            >
              READ NEXT ISSUE →
            </Link>
          ) : (
            <Link
              href="/comics"
              className="inline-block bg-primary text-black hover:bg-secondary hover:text-white font-heading text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 border-4 border-black transition-colors"
            >
              VIEW ALL ISSUES
            </Link>
          )}
        </div>
      </section>

      {/* Shop CTA */}
      <section className="py-8 md:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-5xl font-heading text-black mb-3 md:mb-4">FUEL YOUR REBELLION</h3>
          <p className="text-sm md:text-lg text-black/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Shop our weaponized beeswax products and join the swarm.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-primary hover:bg-secondary hover:text-white font-heading text-base md:text-lg px-8 md:px-10 py-2.5 md:py-3 border-4 border-black transition-colors"
          >
            SHOP THE STASH
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
