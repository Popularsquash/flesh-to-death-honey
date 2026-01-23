import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skull } from "lucide-react";

interface JoinSwarmModalProps {
  trigger: React.ReactNode;
}

export function JoinSwarmModal({ trigger }: JoinSwarmModalProps) {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent("I want to join the Flesh to Death Swarm");
    const body = encodeURIComponent(`Add me to the list. My email is: ${email}\n\n(I understand this means I'll get emails about new drops, products, and general mayhem.)`);
    
    window.location.href = `mailto:queenbeerider@fleshtodeathhoney.com?subject=${subject}&body=${body}`;
    setIsOpen(false);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-4 border-primary text-white rounded-none">
        <DialogHeader>
          <DialogTitle className="text-3xl font-heading text-primary uppercase tracking-widest flex items-center gap-2">
            <Skull className="h-6 w-6" /> Join the Swarm
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-body text-lg">
            Sign up for the newsletter. We promise not to spam you with boring sh*t. Just new drops, discounts, and bad attitude.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-heading text-white uppercase">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-900 border-2 border-gray-700 text-white rounded-none focus:border-primary focus:ring-0"
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-primary text-black hover:bg-white hover:text-black font-heading text-xl uppercase rounded-none border-2 border-transparent hover:border-black transition-all">
              Join Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
