import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    },
    onError: (err) => {
      toast.error("Failed to send message. Please try again or email us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    sendContact.mutate({ name, email, message });
  };

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
            <div className="bg-gray-900 border-l-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(255,195,0,0.3)]">
              <h2 className="text-3xl font-heading text-white mb-6 uppercase">The Hive HQ</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Address:</p>
                    <p className="text-gray-400">
                      1344 Disc Drive #1017<br />
                      Sparks, NV 89436
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-white">Phone:</p>
                    <p className="text-gray-400">949-939-1739</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-white">Email:</p>
                    <p className="text-gray-400">support@fleshtodeath.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border-4 border-primary p-6">
              <h3 className="font-heading text-xl mb-2 text-white">Support Hours</h3>
              <p className="text-gray-400">
                Whenever we're awake and not riding.<br />
                Usually Mon-Fri, 9am - 5pm PST.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 border-4 border-primary p-8 shadow-[12px_12px_0px_0px_rgba(255,195,0,0.4)]">
            <h2 className="text-3xl font-heading text-white mb-6 uppercase flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-primary" /> Send a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-primary" />
                <h3 className="text-2xl font-heading text-white">MESSAGE SENT!</h3>
                <p className="text-gray-400">We got your message. We'll get back to you when we're done riding.</p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-primary text-black hover:bg-white font-heading uppercase"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-heading text-sm uppercase mb-1 text-gray-300">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border-2 border-gray-600 text-white p-3 font-body focus:outline-none focus:border-primary rounded-none transition-colors"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm uppercase mb-1 text-gray-300">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border-2 border-gray-600 text-white p-3 font-body focus:outline-none focus:border-primary rounded-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm uppercase mb-1 text-gray-300">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black border-2 border-gray-600 text-white p-3 font-body focus:outline-none focus:border-primary h-32 rounded-none transition-colors"
                    placeholder="What's on your mind?"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sendContact.isPending}
                  className="w-full bg-primary text-black hover:bg-white hover:text-black font-heading uppercase text-lg py-6 rounded-none transition-colors disabled:opacity-60"
                >
                  {sendContact.isPending ? "Sending..." : "Send It"}
                </Button>
              </form>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
