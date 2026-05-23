import type { SubmittedReview } from "@/lib/marketplace/followup-storage";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className={`h-3.5 w-3.5 ${i < rating ? "text-amber-500" : "text-border"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.5l-3.52 1.84.67-3.92L2.3 5.64l3.94-.57L8 1.5z" />
        </svg>
      ))}
    </span>
  );
}

type ReviewPreviewCardProps = {
  review: SubmittedReview;
};

export function ReviewPreviewCard({ review }: ReviewPreviewCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-foreground">{review.firstName}</span>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{review.comment}</p>
    </div>
  );
}
