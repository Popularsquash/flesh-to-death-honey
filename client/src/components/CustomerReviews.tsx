import { useState } from "react";
import { Star, User, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface CustomerReviewsProps {
  productId: number;
  productName: string;
}

export function CustomerReviews({ productId, productName }: CustomerReviewsProps) {
  
  const [showForm, setShowForm] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: reviews, isLoading, refetch } = trpc.reviews.list.useQuery({ productId });
  const { data: ratingData } = trpc.reviews.rating.useQuery({ productId });
  const addReviewMutation = trpc.reviews.add.useMutation({
    onSuccess: () => {
      toast.success("Review submitted! Thanks for sharing your thoughts, road warrior.");
      setShowForm(false);
      setReviewerName("");
      setRating(5);
      setTitle("");
      setContent("");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to submit review: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      toast.error("Name required. Tell us what to call you.");
      return;
    }
    addReviewMutation.mutate({
      productId,
      reviewerName: reviewerName.trim(),
      rating,
      title: title.trim() || undefined,
      content: content.trim() || undefined,
    });
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= (interactive ? (hoverRating || rating) : count)
                ? "fill-primary text-primary"
                : "text-gray-600"
            } ${interactive ? "cursor-pointer transition-colors" : ""}`}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl text-white uppercase">Customer Reviews</h2>
          {ratingData && ratingData.count > 0 && (
            <div className="flex items-center gap-3 mt-2">
              {renderStars(Math.round(ratingData.average))}
              <span className="text-gray-400 font-body">
                {ratingData.average} out of 5 ({ratingData.count} {ratingData.count === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-black font-heading uppercase"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="font-heading text-white uppercase">
              Share Your Thoughts on {productName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 font-body mb-2">Your Rating</label>
                {renderStars(rating, true)}
              </div>

              <div>
                <label className="block text-gray-400 font-body mb-2">Your Name</label>
                <Input
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Road Warrior"
                  className="bg-gray-800 border-gray-700 text-white"
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 font-body mb-2">Review Title (optional)</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Best gear I've ever owned"
                  className="bg-gray-800 border-gray-700 text-white"
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-gray-400 font-body mb-2">Your Review (optional)</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell us what you think..."
                  className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  maxLength={2000}
                />
              </div>

              <Button
                type="submit"
                disabled={addReviewMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-black font-heading uppercase w-full md:w-auto"
              >
                {addReviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-4 font-body">Loading reviews...</p>
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div>
                        <span className="font-heading text-white">{review.reviewerName}</span>
                        <span className="text-gray-600 font-body text-sm ml-3">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    {review.title && (
                      <h4 className="font-heading text-primary text-lg mb-2">{review.title}</h4>
                    )}
                    {review.content && (
                      <p className="text-gray-400 font-body whitespace-pre-wrap">{review.content}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="py-12 text-center">
            <ThumbsUp className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-body">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
