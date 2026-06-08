"use client";

import { useState } from "react";
import { getAdviserProfile } from "@/lib/marketplace/adviser-profiles";
import { formatCurrency } from "@/lib/format";
import type { InsuranceQuote } from "@/lib/marketplace/insurance-quotes";
import type { InsuranceJobPosting } from "@/lib/marketplace/insurance-storage";
import { AdviserConsentModal } from "./adviser-consent-modal";
import { AdviserProfileModal } from "./adviser-profile-modal";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-violet">
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 text-violet"
        fill="currentColor"
        aria-hidden
      >
        <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.5l-3.52 1.84.67-3.92L2.3 5.64l3.94-.57L8 1.5z" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}

function TickIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-violet" aria-hidden>
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-muted/60" aria-hidden>
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type QuoteCardProps = {
  quote: InsuranceQuote;
  posting: InsuranceJobPosting;
  onChoose: (id: string) => void;
  animateIn?: boolean;
};

export function QuoteCard({
  quote,
  posting,
  onChoose,
  animateIn = true,
}: QuoteCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const openConsent = () => setConsentOpen(true);
  const confirmChoose = () => {
    setConsentOpen(false);
    onChoose(quote.id);
  };
  const profile = getAdviserProfile(quote.id);
  const personalNote = quote.getPersonalNote(
    posting.coverageGap,
    posting.region,
    posting.address
  );

  return (
    <>
    {consentOpen && (
      <AdviserConsentModal
        adviserName={quote.name}
        onConfirm={confirmChoose}
        onClose={() => setConsentOpen(false)}
      />
    )}
    {profileOpen && profile && (
      <AdviserProfileModal
        profile={profile}
        onClose={() => setProfileOpen(false)}
        onChoose={() => {
          setProfileOpen(false);
          openConsent();
        }}
      />
    )}
    <article
      className={`overflow-hidden card ${
        animateIn ? "quote-enter" : ""
      }`}
    >
      <div className="p-5 sm:p-6">
        {/* Adviser row */}
        <div className="flex flex-wrap items-start gap-4 border-b border-border pb-4">
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="contents text-left"
          >
            <div className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6] text-sm font-bold text-foreground">
              {photoError ? (
                quote.initials
              ) : (
                <img
                  src={quote.photo}
                  alt={quote.name}
                  className="h-full w-full rounded-full object-cover"
                  onError={() => setPhotoError(true)}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="cursor-pointer text-lg font-bold text-foreground">
                    {quote.name}
                  </h2>
                  <p className="text-sm text-muted">{quote.title}</p>
                  <p className="text-sm text-muted">{quote.region}</p>
                </div>
                <span
                  className="inline-flex items-center rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs font-medium text-muted"
                  onClick={(e) => e.stopPropagation()}
                >
                  {quote.responseTime}
                </span>
              </div>
              <div
                className="mt-2 flex flex-wrap items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <StarRating rating={quote.rating} />
                <span className="text-xs text-muted">
                  {quote.reviewCount} reviews
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Pricing row */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-background px-4 py-3">
            <p className="text-xs font-medium text-muted">Sum insured</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">
              {formatCurrency(quote.sumInsured)}
            </p>
          </div>
          <div className="rounded-xl bg-background px-4 py-3">
            <p className="text-xs font-medium text-muted">Est. monthly premium</p>
            <p className="mt-0.5 text-lg font-bold text-violet">
              ${quote.monthlyPremium}/mo
            </p>
          </div>
          <div className="rounded-xl bg-background px-4 py-3">
            <p className="text-xs font-medium text-muted">Standard excess</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">
              {formatCurrency(quote.excess)}
            </p>
          </div>
        </div>

        {/* Policy label */}
        <p className="mt-3 text-sm text-muted">
          <span className="font-medium text-foreground">{quote.insurer}</span>
          {" · "}
          {quote.policyName}
        </p>

        {/* Feature badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {quote.highlights.map((h) => (
            <span
              key={h.label}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                h.included
                  ? "bg-violet-light text-violet"
                  : "bg-background text-muted line-through"
              }`}
            >
              {h.included && <TickIcon />}
              {h.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="btn-ghost h-11 flex-1 px-6 text-sm"
            >
              {expanded ? "Collapse" : "See full quote"}
            </button>
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="btn-ghost h-11 flex-1 px-6 text-sm"
            >
              View profile
            </button>
          </div>
          <button
            type="button"
            onClick={openConsent}
            className="btn-violet h-11 w-full px-6 text-sm"
          >
            Choose this adviser
          </button>
        </div>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div className="border-t border-border bg-background px-5 py-6 sm:px-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Policy details
            </h3>
            <p className="mt-1 text-lg font-bold text-foreground">
              {quote.insurer} — {quote.policyName}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 font-semibold text-foreground">
                    Cover feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-foreground">
                    Included
                  </th>
                </tr>
              </thead>
              <tbody>
                {quote.featuresTable.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 text-muted">{row.label}</td>
                    <td className="px-4 py-3">
                      {row.included ? (
                        <span className="inline-flex items-center gap-1.5 text-violet">
                          <TickIcon />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-muted">
                          <CrossIcon />
                          No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Excess options
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {quote.excessOptions.map((opt) => (
                  <li key={opt} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Exclusions to note
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {quote.exclusions.map((ex) => (
                  <li key={ex} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-bg-secondary p-4">
            <h4 className="text-sm font-semibold text-violet">
              Note from {quote.name}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {personalNote}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="mt-6 text-sm font-semibold text-violet hover:text-violet-dark"
          >
            Collapse
          </button>
        </div>
      )}
    </article>
    </>
  );
}
