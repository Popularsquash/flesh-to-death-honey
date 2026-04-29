import { Link } from "wouter";
import { ArrowLeft, Download, FileText, Lock, Skull, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const downloads = [
  {
    title: "The Silver Vault Field Kit",
    status: "Coming Soon",
    icon: FileText,
    copy:
      "Checklists, labels, and field sheets for keeping the hive records tight before memory starts lying to you like a busted speedometer.",
  },
  {
    title: "Biker Apothecary Label Pack",
    status: "In the Darkroom",
    icon: Skull,
    copy:
      "Printable gothic-apothecary labels for jars, tins, and whatever suspicious container you refuse to throw away. We support your clutter, apparently.",
  },
  {
    title: "Hive Garage Maintenance Sheets",
    status: "Road Tested",
    icon: Wrench,
    copy:
      "Garage-style trackers for hive checks, bike notes, shop tasks, and the little disasters that become lore if you write them down.",
  },
];

export default function DigitalDownloads() {
  return (
    <>
      <SEO
        title="Digital Downloads"
        description="Digital downloads from Flesh to Death Honey Co.: dark biker-apothecary field kits, labels, trackers, and printable goods for the hive and garage."
        keywords="Flesh to Death Honey digital downloads, beekeeper printables, biker apothecary labels, gothic field kit"
        url="https://fleshtodeathhoney.com/digital-downloads"
      />

      <div className="min-h-screen flex flex-col ftd-page text-foreground overflow-x-hidden">
        <nav className="border-b border-primary/70 sticky top-0 z-50 bg-black/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png"
                  alt="Flesh to Death Honey Co. logo"
                  className="h-12 w-12 object-contain"
                />
                <span className="font-heading text-2xl md:text-3xl text-primary tracking-widest grunge-text">
                  FLESH TO DEATH
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-7 font-body text-lg uppercase tracking-wide font-bold">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/shop" className="hover:text-primary transition-colors">
                Stash
              </Link>
              <Link href="/digital-downloads" className="text-primary">
                Digital
              </Link>
              <Link href="/garage" className="hover:text-secondary transition-colors text-secondary">
                Garage
              </Link>
            </div>
          </div>
        </nav>

        <header className="relative overflow-hidden ftd-grit bg-[radial-gradient(circle_at_72%_18%,rgba(217,144,33,0.2),transparent_28rem),linear-gradient(135deg,#050505_0%,#130d07_42%,#050505_100%)] border-b border-primary/50 py-20">
          <div className="container mx-auto px-4 relative z-10">
            <Link href="/">
              <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-none">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to the Hive
              </Button>
            </Link>

            <Badge className="ftd-kicker rounded-none mb-6">Open at Your Own Risk</Badge>
            <h1 className="text-6xl md:text-8xl font-heading text-white grunge-text max-w-4xl leading-none">
              Digital <span className="text-primary">Contraband</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-3xl border-l-4 border-primary pl-6">
              Downloads for beekeepers, riders, garage gremlins, and apothecary weirdos who like their paperwork dark, useful, and mildly threatening.
            </p>
          </div>
        </header>

        <main className="flex-1">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {downloads.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="ftd-card rounded-none overflow-hidden group">
                      <CardHeader className="border-b border-primary/30 bg-black/40">
                        <div className="flex justify-between items-start gap-4">
                          <div className="h-14 w-14 border border-primary/70 bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                            <Icon className="h-7 w-7" />
                          </div>
                          <Badge className="bg-secondary text-white rounded-none border border-primary/40 font-heading tracking-widest">
                            {item.status}
                          </Badge>
                        </div>
                        <CardTitle className="font-heading text-3xl text-primary mt-6 leading-tight">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        <p className="text-muted-foreground text-lg leading-relaxed">{item.copy}</p>
                        <Button disabled className="w-full bg-muted text-muted-foreground border border-primary/30 rounded-none font-heading text-lg uppercase cursor-not-allowed">
                          <Lock className="mr-2 h-5 w-5" /> Not Unlocked Yet
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-black border-y border-primary/40 ftd-grit">
            <div className="container mx-auto px-4 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              <div>
                <span className="ftd-kicker">Coming 2026</span>
                <h2 className="text-5xl md:text-7xl font-heading text-white mt-6 mb-6">
                  Printable field gear, minus the beige clipboard energy.
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  This page is now themed to match the rest of Flesh to Death Honey Co. When the downloadable products go live, the experience already has the right bones: dark cards, amber accents, gothic headings, and copy that does not sound like it was assembled in a fluorescent conference room.
                </p>
              </div>
              <div className="ftd-card p-8 border-primary/60">
                <Download className="h-14 w-14 text-primary mb-6" />
                <h3 className="text-4xl font-heading text-white mb-4">No sterile storefront vibes.</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Digital goods should feel like part of the same outlaw hive: gritty, cinematic, practical, and a little sarcastic because apparently we have standards now.
                </p>
                <Link href="/shop">
                  <Button className="bg-primary text-black hover:bg-secondary hover:text-white font-heading uppercase rounded-none text-lg px-8 ftd-cta-shadow">
                    <Zap className="mr-2 h-5 w-5" /> Raid Physical Goods Too
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
