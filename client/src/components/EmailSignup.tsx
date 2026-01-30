import { useState } from "react";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface EmailSignupProps {
  interest?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function EmailSignup({
  interest = "beeswax_launch",
  buttonText = "Get Notified",
  placeholder = "your@email.com",
  className = "",
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribeMutation = trpc.email.subscribe.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setIsSubscribed(true);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to subscribe. Try again later.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter your email, road warrior.");
      return;
    }
    subscribeMutation.mutate({ email: email.trim(), interest });
  };

  if (isSubscribed) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <CheckCircle className="w-6 h-6 text-green-500" />
        <span className="text-green-400 font-body">You're on the list!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          disabled={subscribeMutation.isPending}
        />
      </div>
      <Button
        type="submit"
        disabled={subscribeMutation.isPending}
        className="bg-primary hover:bg-primary/90 text-black font-heading uppercase whitespace-nowrap"
      >
        {subscribeMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Joining...
          </>
        ) : (
          buttonText
        )}
      </Button>
    </form>
  );
}
