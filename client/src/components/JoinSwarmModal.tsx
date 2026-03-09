import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skull, Mail, Loader2, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface JoinSwarmModalProps {
  trigger: React.ReactNode;
}

export function JoinSwarmModal({ trigger }: JoinSwarmModalProps) {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribeMutation = trpc.email.subscribe.useMutation({
    onSuccess: (data) => {
      toast.success(data.message || "You're in the swarm.");
      setIsSubscribed(true);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter your email, road warrior.");
      return;
    }
    subscribeMutation.mutate({ email: email.trim(), interest: "join_the_swarm" });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when closing
      setIsSubscribed(false);
      setEmail("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-4 border-primary text-white rounded-none">
        <DialogHeader>
          <DialogTitle className="text-3xl font-heading text-primary uppercase tracking-widest flex items-center gap-2">
            <Skull className="h-6 w-6" /> Join the Swarm
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-body text-lg">
            Drop your email. Get first access to new drops, restocks, and the kind of content corporate brands are too scared to send.
          </DialogDescription>
        </DialogHeader>

        {isSubscribed ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <p className="text-green-400 font-heading text-xl uppercase">You're in.</p>
            <p className="text-gray-500 font-body text-sm text-center">
              Welcome to the swarm. Watch your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="swarm-email" className="font-heading text-white uppercase">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="swarm-email"
                  type="email"
                  placeholder="yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={subscribeMutation.isPending}
                  className="pl-10 bg-gray-900 border-2 border-gray-700 text-white rounded-none focus:border-primary focus:ring-0"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="w-full bg-primary text-black hover:bg-white hover:text-black font-heading text-xl uppercase rounded-none border-2 border-transparent hover:border-black transition-all"
            >
              {subscribeMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Now"
              )}
            </Button>
            <p className="text-xs text-gray-600 text-center font-body">
              No spam. No fluff. Unsubscribe anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
