"use client";

import { useEffect, useState } from "react";
import {
  formatYearsExperience,
  type AdviserProfile,
} from "@/lib/marketplace/adviser-profiles";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const iconClass = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className={`${iconClass} ${i < Math.round(rating) ? "text-violet" : "text-border"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.5l-3.52 1.84.67-3.92L2.3 5.64l3.94-.57L8 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-light px-3 py-1 text-xs font-semibold text-violet">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M6.5 10.5l-3-3 1-1 2 2 5-5 1 1-6 6z" />
      </svg>
      Sanctury Verified
    </span>
  );
}

type AdviserProfileModalProps = {
  profile: AdviserProfile;
  onClose: () => void;
  onChoose: () => void;
};

export function AdviserProfileModal({
  profile,
  onClose,
  onChoose,
}: AdviserProfileModalProps) {
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adviser-profile-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        aria-label="Close profile"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-surface sm:max-h-[90vh] sm:rounded-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:bg-background hover:text-foreground"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="overflow-y-auto overscroll-contain px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6] text-2xl font-bold text-foreground">
              {photoError || !profile.photo ? (
                profile.initials
              ) : (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-full w-full rounded-full object-cover"
                  onError={() => setPhotoError(true)}
                />
              )}
            </div>
            <h2 id="adviser-profile-title" className="mt-4 text-2xl font-bold text-foreground">
              {profile.name}
            </h2>
            <p className="mt-1 text-muted">{profile.title}</p>
            <p className="text-sm text-muted">{profile.region}</p>
            <div className="mt-3">
              <VerifiedBadge />
            </div>
            <p className="mt-3 text-sm text-muted">
              {formatYearsExperience(profile.yearsExperience)}
            </p>
          </div>

          {/* Qualifications */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-foreground">Qualifications</h3>
            <ul className="mt-2 space-y-1.5">
              {profile.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Insurers */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">Insurers</h3>
            <p className="mt-2 text-sm text-muted">
              {profile.insurers.join(" · ")}
            </p>
          </div>

          {/* Specialities */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">Specialities</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.specialities.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">About</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{profile.bio}</p>
          </div>

          {/* Response stats */}
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-border bg-background p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted">Response rate</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                {profile.responseRate}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Response time</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                {profile.averageResponseTime}
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">Reviews</h3>
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <StarRating rating={profile.overallRating} />
                {profile.overallRating.toFixed(1)} ({profile.reviewCount})
              </span>
            </div>
            <ul className="mt-4 space-y-4">
              {profile.reviews.map((review) => (
                <li
                  key={review.firstName + review.comment.slice(0, 20)}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">
                      {review.firstName}
                    </span>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-border bg-surface p-4 sm:p-5">
          <button
            type="button"
            onClick={() => {
              onChoose();
              onClose();
            }}
            className="btn-violet w-full py-3.5 text-base"
          >
            Choose this adviser
          </button>
        </div>
      </div>
    </div>
  );
}
