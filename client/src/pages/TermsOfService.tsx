import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, Gavel, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="bg-black text-white py-12 border-b-4 border-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <img src="/images/hero-bee.png" alt="Logo" className="h-12 w-12 group-hover:rotate-12 transition-transform" />
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
            RULES OF THE <span className="text-primary grunge-text">ROAD</span>
          </h1>
          <p className="text-xl font-bold text-gray-400 max-w-2xl">
            Terms of Service. Read them, or don't. But don't say we didn't warn you.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/pattern.png')] bg-repeat"></div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Intro */}
          <div className="bg-black border-l-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg text-gray-300 leading-relaxed">
              Welcome to Flesh to Death Honey Co. By using our website or the BuzzKill app, you agree to these terms. 
              If you don't agree, go buy your honey from a plastic bear at the grocery store.
            </p>
          </div>

          {/* Section 1: Product Usage */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-none rotate-3">
                <AlertTriangle className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-heading text-black uppercase">1. Product Usage (Don't Be Stupid)</h2>
            </div>
            <Card className="bg-white border-4 border-black rounded-none">
              <CardContent className="pt-6">
                <ul className="list-disc list-inside space-y-2 font-bold ml-4">
                  <li><strong>Brap Balm:</strong> It's for leather. Do not eat it. Do not put it in your eyes.</li>
                  <li><strong>Soap:</strong> It washes away dirt, not your criminal record.</li>
                  <li><strong>Hot Honey:</strong> It's hot. If you cry, that's on you.</li>
                  <li><strong>Apparel:</strong> Wearing our gear does not make you a member of a motorcycle club. It just makes you look cool.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: BuzzKill App */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-none -rotate-2">
                <ScrollText className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading text-black uppercase">2. BuzzKill App Terms</h2>
            </div>
            <Card className="bg-white border-4 border-black rounded-none">
              <CardContent className="pt-6">
                <p className="mb-4">
                  The BuzzKill app is a tool. It doesn't replace common sense.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Accuracy:</strong> We try to be accurate, but if the app says your hive is "Happy" and they swarm 5 minutes later, that's nature.</li>
                  <li><strong>Data:</strong> You own your data. We just store it. See our Privacy Policy for the boring details.</li>
                  <li><strong>Subscription:</strong> If you stop paying, we stop hosting your data. We're not a charity.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Liability */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-none rotate-1">
                <Gavel className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-heading text-black uppercase">3. Liability (Not Our Fault)</h2>
            </div>
            <Card className="bg-white border-4 border-black rounded-none">
              <CardContent className="pt-6">
                <p>
                  Flesh to Death Honey Co. is not liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Bee stings (obviously).</li>
                  <li>Speeding tickets received while rushing to buy our products.</li>
                  <li>Existential dread caused by reading our labels.</li>
                  <li>Any injuries sustained while trying to look cool on a motorcycle.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

        </div>
      </main>
    </div>
  );
}
