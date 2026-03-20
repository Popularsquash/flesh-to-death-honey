import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Skull, Eye, Lock, Cookie } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="bg-black text-white py-12 border-b-4 border-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png" alt="Logo" className="h-12 w-12 group-hover:rotate-12 transition-transform" />
                <span className="font-heading text-2xl text-primary tracking-wider group-hover:text-white transition-colors">FLESH TO DEATH</span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black font-heading uppercase">
                Back to Safety
              </Button>
            </Link>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading mb-4">
            NO <span className="text-primary grunge-text">SNITCHES</span> POLICY
          </h1>
          <p className="text-xl font-bold text-gray-400 max-w-2xl">
            We collect data like we collect road rash: unintentionally and with a lot of swearing.
          </p>
        </div>
        
        {/* Background Texture */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/pattern.png')] bg-repeat"></div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Intro */}
          <div className="bg-black border-l-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg text-gray-300 leading-relaxed">
              Listen up. We sell beeswax and attitude, not your personal info. We don't care what you ate for lunch, 
              who you're dating, or why you Googled "do bees have knees" at 3 AM. But legally, we have to tell you 
              what we do with the bits of digital lint you leave behind when you visit our site.
            </p>
          </div>

          {/* Section 1: What We Steal */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-none rotate-3">
                <Skull className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">1. What We Steal (Data Collection)</h2>
            </div>
            <Card className="bg-zinc-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-200">We only collect the basics needed to get your gear to your door:</p>
                <ul className="list-disc list-inside space-y-2 font-bold ml-4 text-gray-200">
                  <li>Your Name (or whatever alias you're using to hide from the feds)</li>
                  <li>Shipping Address (so the mailman knows where to drop the goods)</li>
                  <li>Email Address (for order updates and occasional sarcastic rants)</li>
                  <li>Payment Info (we don't see this; our payment processor handles the dirty work)</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Cookies */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-none -rotate-2">
                <Cookie className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">2. Cookies (Not the Edible Kind)</h2>
            </div>
            <Card className="bg-zinc-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-200">
                  Yes, we use cookies. Not the grandma-baked kind. The digital kind that helps the site remember 
                  what's in your cart so you don't have to start over every time you get distracted by a shiny object.
                </p>
                <p className="font-bold italic text-gray-400">
                  "By using this site, you agree to let us put a tiny digital crumb on your browser. If you don't like it, 
                  go clear your cache and live in the stone age."
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Third Parties */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-none rotate-1">
                <Eye className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">3. Snitches Get Stitches (Sharing)</h2>
            </div>
            <Card className="bg-zinc-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-200">
                  We don't sell your data. We're beekeepers, not data brokers. The only people we share your info with are:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-200">
                  <li><strong>The Post Office:</strong> Because teleportation isn't real yet.</li>
                  <li><strong>Payment Processors:</strong> To make sure your money is actually money.</li>
                  <li><strong>The Bees:</strong> They know everything anyway. Resistance is futile.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: BuzzKill App Data Safety */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-secondary p-3 rounded-none -rotate-3">
                <ShieldAlert className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">4. BuzzKill App Data Safety</h2>
            </div>
            <Card className="bg-zinc-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6 space-y-6">
                <p className="font-bold text-gray-200">
                  For the Google Play Console nerds and the paranoid beekeepers, here is exactly what the separate BuzzKill hive health app touches:
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-heading text-xl mb-2 text-primary">Location Permissions (Apiary Mapping)</h3>
                    <p className="text-gray-300">
                      <strong>Why we need it:</strong> To map your hives. We can't tell you where your bees are if we don't know where you are.
                    </p>
                    <p className="text-gray-300">
                      <strong>Justification:</strong> Used strictly for placing hive markers on the map. We don't track your movements, and we definitely don't care where you go for coffee.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-heading text-xl mb-2 text-primary">Camera Permissions (Hive Photos)</h3>
                    <p className="text-gray-300">
                      <strong>Why we need it:</strong> So you can take pictures of your frames, queens, and weird comb patterns.
                    </p>
                    <p className="text-gray-300">
                      <strong>Justification:</strong> Photos are stored locally or synced to your account solely for your inspection records. We don't look at them unless you send them to support asking "Is this foulbrood?"
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-heading text-xl mb-2 text-primary">Data Export & Backup</h3>
                    <p className="text-gray-300">
                      <strong>Your Data is Yours:</strong> Beekeeping records are critical. You can export your entire hive history at any time.
                    </p>
                    <p className="text-gray-300">
                      <strong>Backup:</strong> We perform daily backups of cloud data. If you delete your account, we wipe your data after a 30-day "oops" grace period.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 5: Security */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-none rotate-6">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">5. Security (Fort Knox-ish)</h2>
            </div>
            <Card className="bg-zinc-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6">
                <p className="text-gray-200">
                  We use industry-standard encryption to keep your info safe. Basically, it's harder to hack our site 
                  than it is to explain to your mom why you bought "Road Rash Roulette" salve.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Footer Note */}
          <div className="text-center pt-12 border-t-4 border-black border-dashed">
            <ShieldAlert className="h-16 w-16 mx-auto text-red-600 mb-4" />
            <h3 className="text-2xl font-heading mb-2">Still Paranoid?</h3>
            <p className="text-gray-300">
              Wrap your computer in tinfoil and send us cash via carrier pigeon. We're flexible.
            </p>
            <p className="text-sm text-gray-400 mt-8">
              Last Updated: When the hive told us to.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-8 border-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-2xl text-primary mb-4">FLESH TO DEATH HONEY CO.</p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Flesh to Death. All rights reserved. 
            <span className="mx-2 text-primary">•</span> 
            <Link href="/privacy-policy" className="hover:text-primary underline decoration-primary decoration-2 underline-offset-4">No Snitches Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
