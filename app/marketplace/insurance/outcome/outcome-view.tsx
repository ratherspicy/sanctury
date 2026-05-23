"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReviewPreviewCard } from "@/app/marketplace/insurance/components/review-preview-card";
import { getAdviserById } from "@/lib/marketplace/advisers";
import { getAdviserProfile } from "@/lib/marketplace/adviser-profiles";
import {
  loadFollowupState,
  setOutcomeChoice,
  submitDeclineReason,
  submitReview,
  type DeclineReason,
  type OutcomeChoice,
} from "@/lib/marketplace/followup-storage";
import { formatCurrency } from "@/lib/format";
import {
  loadInsuranceJobPosting,
  loadSelectedAdviser,
  type InsuranceJobPosting,
} from "@/lib/marketplace/insurance-storage";
import {
  getAdviserFirstName,
  getHomeownerFirstName,
} from "@/lib/marketplace/request-timeline";
import { loadHomeownerContact } from "@/lib/storage/homeowner";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const DECLINE_OPTIONS: { value: DeclineReason; label: string }[] = [
  { value: "too_expensive", label: "Too expensive" },
  { value: "not_right_time", label: "Not the right time" },
  { value: "better_quote", label: "Got a better quote elsewhere" },
  { value: "other", label: "Other" },
];

function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Star rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        const selected = star <= value;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            onClick={() => onChange(star)}
            className="rounded-lg p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <svg
              viewBox="0 0 16 16"
              className={`h-8 w-8 ${selected ? "text-amber-500" : "text-border"}`}
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.5l-3.52 1.84.67-3.92L2.3 5.64l3.94-.57L8 1.5z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function OutcomeCard({
  title,
  description,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border p-5 text-left transition-colors sm:p-6 ${
        selected
          ? "border-brand bg-brand/5 shadow-sm"
          : "border-border bg-surface hover:border-brand/30 hover:bg-background"
      }`}
    >
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </button>
  );
}

export function InsuranceOutcomeView() {
  const router = useRouter();
  const [adviserId, setAdviserId] = useState<string | null>(null);
  const [adviserFirstName, setAdviserFirstName] = useState("");
  const [posting, setPosting] = useState<InsuranceJobPosting | null>(null);
  const [choice, setChoice] = useState<OutcomeChoice | null>(null);
  const [declineReason, setDeclineReason] = useState<DeclineReason | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [declineSubmitted, setDeclineSubmitted] = useState(false);

  useEffect(() => {
    const selected = loadSelectedAdviser();
    const jobPosting = loadInsuranceJobPosting();
    const followup = loadFollowupState();

    if (!selected || !jobPosting) {
      router.replace("/marketplace/insurance");
      return;
    }

    if (followup.contactCheck !== "yes" && !followup.reviewSubmitted) {
      router.replace("/marketplace/insurance/followup");
      return;
    }

    const adviser = getAdviserById(selected);
    if (!adviser) {
      router.replace("/marketplace/insurance");
      return;
    }

    setAdviserId(selected);
    setAdviserFirstName(getAdviserFirstName(adviser.name));
    setPosting(jobPosting);

    if (followup.reviewSubmitted && followup.submittedReview) {
      setChoice("updated");
      setReviewSubmitted(true);
      setRating(followup.submittedReview.rating);
      setComment(followup.submittedReview.comment);
      return;
    }

    if (followup.outcomeChoice) {
      setChoice(followup.outcomeChoice);
      if (followup.outcomeChoice === "declined" && followup.declineReason) {
        setDeclineReason(followup.declineReason);
        setDeclineSubmitted(true);
      }
    }
  }, [router]);

  const handleChoice = (next: OutcomeChoice) => {
    setChoice(next);
    setOutcomeChoice(next);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact = loadHomeownerContact();
    const firstName = getHomeownerFirstName(contact?.name ?? "Homeowner");
    submitReview({ rating, comment: comment.trim(), firstName });
    setReviewSubmitted(true);
  };

  const handleDeclineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declineReason) return;
    submitDeclineReason(declineReason);
    setDeclineSubmitted(true);
  };

  if (!adviserFirstName || !posting) {
    return <p className="text-muted">Loading…</p>;
  }

  const profile = adviserId ? getAdviserProfile(adviserId) : null;
  const submittedReview = loadFollowupState().submittedReview;
  const showOutcomeCards =
    !reviewSubmitted && !declineSubmitted && choice === null;

  return (
    <div className="space-y-8">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
          Share your outcome
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          How did it go with {adviserFirstName}?
        </h1>
        <p className="mt-3 text-lg text-muted">
          Your feedback helps other homeowners and keeps advisers accountable.
        </p>
      </div>

      {showOutcomeCards && (
        <div className="space-y-3">
          <OutcomeCard
            title="Yes, I updated my cover"
            description="You went ahead and changed or upgraded your insurance."
            selected={choice === "updated"}
            onSelect={() => handleChoice("updated")}
          />
          <OutcomeCard
            title="Still deciding"
            description="You're weighing options or waiting on more information."
            selected={choice === "deciding"}
            onSelect={() => handleChoice("deciding")}
          />
          <OutcomeCard
            title="Decided not to proceed"
            description="You chose not to move forward with this adviser."
            selected={choice === "declined"}
            onSelect={() => handleChoice("declined")}
          />
        </div>
      )}

      {choice === "updated" && !reviewSubmitted && (
        <form
          onSubmit={handleReviewSubmit}
          className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-lg font-semibold text-foreground">
            Leave a review for {adviserFirstName}
          </h2>
          <p className="mt-1 text-sm text-muted">
            Share how the process went — it will appear on {adviserFirstName}&apos;s
            Sanctury profile.
          </p>

          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground">
              Your rating
            </label>
            <StarSelector value={rating} onChange={setRating} />
          </div>

          <div className="mt-6">
            <label htmlFor="review-comment" className="block text-sm font-medium text-foreground">
              Your review
            </label>
            <textarea
              id="review-comment"
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What stood out about working with this adviser?"
              className={inputClassName}
            />
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark sm:w-auto"
          >
            Submit review
          </button>
        </form>
      )}

      {choice === "updated" && reviewSubmitted && submittedReview && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:p-8">
            <p className="font-semibold text-foreground">
              Thank you for sharing your experience.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your review helps other Sanctury homeowners make informed
              decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Preview on {adviserFirstName}&apos;s profile
            </h2>
            <p className="mt-1 text-sm text-muted">
              This is how your review will appear alongside{" "}
              {profile?.reviewCount ?? 0} others.
            </p>
            <div className="mt-4">
              <ReviewPreviewCard review={submittedReview} />
            </div>
          </div>

          <Link
            href="/report"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark"
          >
            Back to your report
          </Link>
        </div>
      )}

      {choice === "deciding" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <p className="font-semibold text-foreground">
              That&apos;s completely fine — take the time you need.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {posting.coverageGap > 0 ? (
                <>
                  Your report still shows a coverage gap of{" "}
                  <span className="font-semibold text-foreground">
                    {formatCurrency(posting.coverageGap)}
                  </span>
                  . Closing that gap protects you if rebuild costs have moved
                  since your last renewal.
                </>
              ) : (
                <>
                  Your report is a useful reference while you compare options.
                  When you&apos;re ready, you can return to your coverage summary
                  anytime.
                </>
              )}
            </p>
          </div>

          <Link
            href="/report"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark"
          >
            Return to your report
          </Link>
        </div>
      )}

      {choice === "declined" && !declineSubmitted && (
        <form
          onSubmit={handleDeclineSubmit}
          className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-lg font-semibold text-foreground">
            What put you off?
          </h2>
          <p className="mt-1 text-sm text-muted">
            Optional — your answer helps us improve the marketplace.
          </p>
          <div className="mt-4 space-y-2">
            {DECLINE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  declineReason === option.value
                    ? "border-brand bg-brand/5"
                    : "border-border bg-background hover:border-brand/30"
                }`}
              >
                <input
                  type="radio"
                  name="decline-reason"
                  value={option.value}
                  checked={declineReason === option.value}
                  onChange={() => setDeclineReason(option.value)}
                  className="h-4 w-4 accent-brand"
                />
                <span className="text-sm font-medium text-foreground">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={!declineReason}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Submit feedback
          </button>
        </form>
      )}

      {choice === "declined" && declineSubmitted && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <p className="font-semibold text-foreground">
              Thanks for letting us know.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We&apos;ve recorded your feedback. You can revisit your Home Health
              Check report anytime if your situation changes.
            </p>
          </div>
          <Link
            href="/report"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-8 text-base font-semibold text-foreground transition-colors hover:border-brand/40"
          >
            Back to your report
          </Link>
        </div>
      )}

      {!choice && (
        <Link
          href="/marketplace/insurance/followup"
          className="inline-block text-sm font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
        >
          Back to contact check
        </Link>
      )}
    </div>
  );
}
