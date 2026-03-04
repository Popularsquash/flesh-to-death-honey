import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, PackageX, RefreshCw } from "lucide-react";
import { Link } from "wouter";

export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-black text-white font-body">
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
            SHIPPING & <span className="text-primary grunge-text">REGRETS</span>
          </h1>
          <p className="text-xl font-bold text-gray-400 max-w-2xl">
            How we get it to you, and what happens if you hate it.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/pattern.png')] bg-repeat"></div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Section 1: Shipping */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-none rotate-3">
                <Truck className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">1. Shipping (We Try Our Best)</h2>
            </div>
            <Card className="bg-gray-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6 text-gray-300">
                <p className="mb-4">
                  We ship from Sparks, NV. Usually within 2-3 business days, unless we're out riding or the bees are swarming.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Standard Shipping:</strong> Takes a few days. Be patient.</li>
                  <li><strong>Expedited Shipping:</strong> Costs more. We'll drive faster to the post office.</li>
                  <li><strong>International:</strong> Maybe. If the customs agents are cool.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Returns */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-none -rotate-2">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">2. Returns (No Whining)</h2>
            </div>
            <Card className="bg-gray-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6 text-gray-300">
                <p className="mb-4">
                  Look, we're a small business. We don't have an Amazon warehouse.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Unopened Items:</strong> You can return them within 30 days. You pay shipping.</li>
                  <li><strong>Opened Items:</strong> No. That's gross.</li>
                  <li><strong>Defective Items:</strong> If it arrived broken, send us a photo. We'll fix it.</li>
                  <li><strong>Apparel:</strong> If it doesn't fit, you can exchange it. Don't wash it first.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Lost Packages */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-none rotate-1">
                <PackageX className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-heading text-white uppercase">3. Lost Packages</h2>
            </div>
            <Card className="bg-gray-900 border-4 border-primary rounded-none">
              <CardContent className="pt-6 text-gray-300">
                <p>
                  Once we hand it to the carrier, it's out of our hands. If they lose it, we'll help you yell at them, but we can't magically make it appear.
                </p>
              </CardContent>
            </Card>
          </section>

        </div>
      </main>
    </div>
  );
}
