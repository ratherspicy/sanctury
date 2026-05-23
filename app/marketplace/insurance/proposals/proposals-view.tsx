"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  INSURANCE_QUOTES,
  TOTAL_QUOTES,
} from "@/lib/marketplace/insurance-quotes";
import {
  loadInsuranceJobPosting,
  saveSelectedAdviser,
  type InsuranceJobPosting,
} from "@/lib/marketplace/insurance-storage";
import { QuoteCard } from "./quote-card";

function LiveStatusBanner({ quotesReceived }: { quotesReceived: number }) {
  const allReceived = quotesReceived >= TOTAL_QUOTES;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <span className="relative mt-1 flex h-3 w-3 shrink-0" aria-hidden>
          {!allReceived && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/40 opacity-75" />
          )}
          <span
            className={`relative inline-flex h-3 w-3 rounded-full ${
              allReceived ? "bg-brand" : "bg-brand-light live-pulse"
            }`}
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">
            Your request has been sent to verified advisers in your area.
            Quotes arrive within 1–3 hours.
          </p>
          <p className="mt-2 text-sm text-muted">
            {allReceived
              ? "All quotes have been received. Compare and choose the option that suits you."
              : "Quotes are arriving now — new options will appear below as advisers respond."}
          </p>
        </div>
      </div>
    </div>
  );
}

function WaitingQuotePlaceholder({ index }: { index: number }) {
  return (
    <div
      className="rounded-2xl border border-dashed border-border bg-surface/50 p-5 sm:p-6"
      aria-hidden
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded-full bg-border" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-border" />
          <div className="h-3 w-48 animate-pulse rounded bg-border" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-border" />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Waiting for quote {index} of {TOTAL_QUOTES}…
      </p>
    </div>
  );
}

export function InsuranceProposalsView() {
  const router = useRouter();
  const [posting, setPosting] = useState<InsuranceJobPosting | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const job = loadInsuranceJobPosting();
    if (!job) {
      router.replace("/marketplace/insurance");
      return;
    }
    setPosting(job);
  }, [router]);

  useEffect(() => {
    const timers = INSURANCE_QUOTES.map((quote, index) =>
      setTimeout(() => {
        setVisibleCount((c) => Math.max(c, index + 1));
      }, quote.arrivalDelayMs)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleChoose = (adviserId: string) => {
    saveSelectedAdviser(adviserId);
    router.push("/marketplace/insurance/confirmed");
  };

  if (!posting) {
    return <p className="text-muted">Loading quotes…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
          Compare quotes
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your insurance quotes
        </h1>
        <p className="mt-3 text-lg text-muted">
          Compare adviser quotes side by side — same cover, clear pricing.
        </p>
      </div>

      <LiveStatusBanner quotesReceived={visibleCount} />

      <p className="text-sm font-medium text-foreground">
        Showing {visibleCount} of {TOTAL_QUOTES} quotes received
        {visibleCount < TOTAL_QUOTES && (
          <span className="font-normal text-muted"> — more arriving soon</span>
        )}
      </p>

      <div className="space-y-4">
        {INSURANCE_QUOTES.map((quote, index) => {
          if (index < visibleCount) {
            return (
              <QuoteCard
                key={quote.id}
                quote={quote}
                posting={posting}
                onChoose={handleChoose}
                animateIn
              />
            );
          }
          if (index === visibleCount && visibleCount < TOTAL_QUOTES) {
            return (
              <WaitingQuotePlaceholder
                key={`waiting-${index}`}
                index={index + 1}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
