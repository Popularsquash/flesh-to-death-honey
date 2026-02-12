import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="bg-black text-white py-12 border-b-4 border-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/YnCaWLDGLyYNBYzs.png" alt="Logo" className="h-12 w-12 group-hover:rotate-12 transition-transform" />
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
            YELL AT <span className="text-primary grunge-text">US</span>
          </h1>
          <p className="text-xl font-bold text-gray-400 max-w-2xl">
            Got a problem? A compliment? A threat? We're listening.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/pattern.png')] bg-repeat"></div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-black border-l-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-heading text-white mb-6 uppercase">The Hive HQ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <p className="font-bold text-white">Address:</p>
                    <p className="text-gray-400">
                      1344 Disc Drive #1017<br />
                      Sparks, NV 89436
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-bold text-white">Phone:</p>
                    <p className="text-gray-400">949-939-1739</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-bold text-white">Email:</p>
                    <p className="text-gray-400">support@fleshtodeath.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <h3 className="font-heading text-xl mb-2">Support Hours</h3>
              <p className="text-gray-600">
                Whenever we're awake and not riding.<br />
                Usually Mon-Fri, 9am - 5pm PST.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(255,195,0,1)]">
            <h2 className="text-3xl font-heading text-black mb-6 uppercase flex items-center gap-2">
              <MessageSquare className="h-8 w-8" /> Send a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block font-heading text-sm uppercase mb-1">Name</label>
                <input type="text" className="w-full border-2 border-black p-3 font-body focus:outline-none focus:border-primary rounded-none" placeholder="Your Name" />
              </div>
              <div>
                <label className="block font-heading text-sm uppercase mb-1">Email</label>
                <input type="email" className="w-full border-2 border-black p-3 font-body focus:outline-none focus:border-primary rounded-none" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block font-heading text-sm uppercase mb-1">Message</label>
                <textarea className="w-full border-2 border-black p-3 font-body focus:outline-none focus:border-primary h-32 rounded-none" placeholder="What's on your mind?"></textarea>
              </div>
              <Button className="w-full bg-black text-white hover:bg-primary hover:text-black font-heading uppercase text-lg py-6 rounded-none transition-colors">
                Send It
              </Button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
