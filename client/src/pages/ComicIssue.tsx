import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Skull, Share2 } from "lucide-react";
import Footer from "@/components/Footer";

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
    imageUrl: "/assets/revenge_of_the_hive_issue1_web.jpg",
    synopsis: "Every paradise has a serpent. Ours has a bear. Name's Biff. He doesn't pay for honey. He 'liberates' it. Watch as Buzzkill, Stinger, and Prop teach him a lesson he won't forget. In this debut issue, the bees of Flesh to Death Honey Co. face their greatest threat yet - a bear with an appetite for destruction and a complete disregard for the natural order.",
    credits: {
      story: "Flesh to Death Honey Co.",
      art: "AI-Generated Anarchic Imagery",
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
  
  const comic = comicsData[id];

  if (!comic) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Skull className="mx-auto text-primary mb-4" size={64} />
          <h1 className="text-4xl font-heading text-primary mb-4">ISSUE NOT FOUND</h1>
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

      {/* Back Navigation */}
      <div className="bg-gray-900 border-b-2 border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/comics"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-heading"
          >
            <ArrowLeft size={20} />
            BACK TO ALL ISSUES
          </Link>
        </div>
      </div>

      {/* Comic Header */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black border-b-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-secondary text-white px-6 py-2 font-heading text-lg transform -rotate-2 mb-6">
              {comic.issue}
            </div>

            <h1 className="text-6xl md:text-8xl font-heading text-white leading-none mb-4">
              {comic.title}
            </h1>

            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-6">
              "{comic.subtitle}"
            </h2>

            <p className="text-xl text-gray-400 italic mb-8">
              {comic.tagline}
            </p>

            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{comic.date}</span>
              </div>
              <span className="text-gray-600">•</span>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="py-12 bg-black border-b-2 border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading text-primary mb-4 flex items-center gap-3">
              <Skull size={24} />
              SYNOPSIS
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {comic.synopsis}
            </p>
          </div>
        </div>
      </section>

      {/* Comic Image */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="border-4 border-primary bg-gray-900 p-4 shadow-[12px_12px_0px_0px_rgba(255,195,0,1)]">
              <img
                src={comic.imageUrl}
                alt={`${comic.title} ${comic.issue}`}
                className="w-full h-auto"
              />
            </div>

            {/* Credits */}
            <div className="mt-12 p-8 bg-gray-900 border-2 border-gray-800">
              <h3 className="text-2xl font-heading text-primary mb-6">CREDITS</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-2">Story</p>
                  <p className="text-lg text-white font-heading">{comic.credits.story}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-2">Art</p>
                  <p className="text-lg text-white font-heading">{comic.credits.art}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-2">Letters</p>
                  <p className="text-lg text-white font-heading">{comic.credits.letters}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Issue Teaser */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl md:text-6xl font-heading text-white mb-6">
              NEXT ISSUE
            </h3>
            <div className="inline-block bg-secondary text-white px-8 py-3 font-heading text-2xl transform -rotate-1 mb-6">
              {comic.nextIssue.title}
            </div>
            <p className="text-xl text-gray-400 mb-8">
              {comic.nextIssue.teaser}
            </p>
            <Link
              href="/comics"
              className="inline-block bg-primary text-black hover:bg-secondary hover:text-white font-heading text-xl px-10 py-4 border-4 border-black transition-colors"
            >
              VIEW ALL ISSUES
            </Link>
          </div>
        </div>
      </section>

      {/* Shop CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-6xl font-heading text-black mb-6">
            FUEL YOUR REBELLION
          </h3>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Shop our weaponized beeswax products and join the swarm.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-primary hover:bg-secondary hover:text-white font-heading text-xl px-12 py-4 border-4 border-black transition-colors"
          >
            SHOP THE STASH
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
