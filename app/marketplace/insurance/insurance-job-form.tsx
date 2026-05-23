"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/format";
import {
  saveInsuranceJobPosting,
  type InsuranceJobPosting,
} from "@/lib/marketplace/insurance-storage";
import { loadHealthCheckReport } from "@/lib/storage/health-check";
import type { FeatureKey } from "@/lib/types/health-check";
import { PROPERTY_FEATURES } from "@/lib/types/health-check";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const labelClassName = "block text-sm font-medium text-foreground";

function getSelectedFeatures(
  features: Record<FeatureKey, boolean>
): string[] {
  return PROPERTY_FEATURES.filter((f) => features[f]);
}

export function InsuranceJobForm() {
  const router = useRouter();
  const [posting, setPosting] = useState<InsuranceJobPosting | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = loadHealthCheckReport();
    if (!stored) {
      router.replace("/check");
      return;
    }

    const { formData, report } = stored;
    const insurance = report.insurance;

    setPosting({
      address: formData.address,
      region: formData.region,
      estimatedRebuildCost: insurance.estimatedRebuildCost,
      currentSumInsured: insurance.currentSumInsured,
      coverageGap: Math.max(0, insurance.insuranceGap),
      sumInsuredYear: formData.sumInsuredYear,
      features: getSelectedFeatures(formData.features),
      notes: "",
    });
  }, [router]);

  if (!posting) {
    return (
      <p className="text-muted">Loading your coverage summary…</p>
    );
  }

  const update = <K extends keyof InsuranceJobPosting>(
    key: K,
    value: InsuranceJobPosting[K]
  ) => {
    setPosting((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    saveInsuranceJobPosting(posting);
    router.push("/marketplace/insurance/proposals");
  };

  const gap = posting.coverageGap;

  return (
    <div className="space-y-8">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
          Insurance marketplace
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Review your cover with an adviser
        </h1>
        <p className="mt-3 text-lg text-muted">
          Get independent proposals from Sanctury verified advisers — free for
          homeowners.
        </p>
      </div>

      {/* Coverage gap summary */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">
          Your coverage summary
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-background p-4">
            <p className="text-sm text-muted">Estimated rebuild cost</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              {formatCurrency(posting.estimatedRebuildCost)}
            </p>
          </div>
          <div className="rounded-xl bg-background p-4">
            <p className="text-sm text-muted">Current sum insured</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              {formatCurrency(posting.currentSumInsured)}
            </p>
          </div>
          <div className="rounded-xl bg-background p-4">
            <p className="text-sm text-muted">Coverage gap</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              {gap > 0 ? formatCurrency(gap) : "None identified"}
            </p>
          </div>
        </div>
        {gap > 0 && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-amber-950">
            <p className="text-sm leading-relaxed">
              You may be underinsured by{" "}
              <span className="font-semibold">{formatCurrency(gap)}</span>.
              Independent advisers on Sanctury can help you close this gap for
              free.
            </p>
          </div>
        )}
      </div>

      {/* Job brief */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-bold text-foreground">
          Your job brief
        </h2>
        <p className="mt-2 text-sm text-muted">
          Review and edit before sending to advisers. They&apos;ll use this to
          prepare tailored proposals.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="address" className={labelClassName}>
              Property address
            </label>
            <input
              id="address"
              type="text"
              required
              className={inputClassName}
              value={posting.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="region" className={labelClassName}>
              NZ region
            </label>
            <input
              id="region"
              type="text"
              required
              className={inputClassName}
              value={posting.region}
              onChange={(e) => update("region", e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="coverageGap" className={labelClassName}>
                Coverage gap amount ($)
              </label>
              <input
                id="coverageGap"
                type="text"
                readOnly
                className={`${inputClassName} bg-background text-muted`}
                value={formatCurrency(posting.coverageGap)}
              />
              <p className="mt-1 text-xs text-muted">
                From your Home Health Check report
              </p>
            </div>
            <div>
              <label htmlFor="sumInsured" className={labelClassName}>
                Current sum insured ($)
              </label>
              <input
                id="sumInsured"
                type="text"
                readOnly
                className={`${inputClassName} bg-background text-muted`}
                value={formatCurrency(posting.currentSumInsured)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sumInsuredYear" className={labelClassName}>
              Year sum insured was last updated
            </label>
            <input
              id="sumInsuredYear"
              type="number"
              required
              min={1990}
              max={new Date().getFullYear()}
              className={inputClassName}
              value={posting.sumInsuredYear}
              onChange={(e) => update("sumInsuredYear", e.target.value)}
            />
          </div>

          <div>
            <span className={labelClassName}>Property features</span>
            <p className="mt-2 text-sm text-muted">
              {posting.features.length > 0
                ? posting.features.join(", ")
                : "None selected"}
            </p>
          </div>

          <div>
            <label htmlFor="notes" className={labelClassName}>
              Additional notes (optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Anything else advisers should know — recent renovations, special items, claims history…"
              className={inputClassName}
              value={posting.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 flex w-full items-center justify-center rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? "Sending…" : "Get free proposals from advisers"}
        </button>

        <p className="mt-4 text-center text-xs text-muted sm:text-left">
          Your details are only shared with the adviser you choose. Sanctury
          verified advisers are independent professionals paid by insurers,
          not by you.
        </p>
      </form>
    </div>
  );
}
