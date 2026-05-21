"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveHealthCheckAndReport } from "@/lib/storage/health-check";
import type { FeatureKey, HealthCheckFormData } from "@/lib/types/health-check";
import { PROPERTY_FEATURES } from "@/lib/types/health-check";
import { AddressAutocomplete } from "./address-autocomplete";

const BUILD_QUALITY_OPTIONS = ["Standard", "Above Standard", "High Spec"] as const;

const STEPS = [
  { id: 1, label: "Property Details" },
  { id: 2, label: "Insurance Details" },
  { id: 3, label: "Mortgage Details" },
] as const;

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const labelClassName = "block text-sm font-medium text-foreground";

const initialFeatures = Object.fromEntries(
  PROPERTY_FEATURES.map((f) => [f, false])
) as Record<FeatureKey, boolean>;

const initialFormData: HealthCheckFormData = {
  address: "",
  region: "",
  floorArea: "",
  yearBuilt: "",
  buildQuality: "",
  features: initialFeatures,
  sumInsured: "",
  sumInsuredYear: "",
  refixDate: "",
  loanAmount: "",
  interestRate: "",
  fixedPercent: "",
  floatingPercent: "",
  revolvingPercent: "",
  monthlyIncome: "",
};

function loanSplitTotal(data: HealthCheckFormData): number {
  return (
    (Number(data.fixedPercent) || 0) +
    (Number(data.floatingPercent) || 0) +
    (Number(data.revolvingPercent) || 0)
  );
}

export function HomeHealthCheckForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<HealthCheckFormData>(initialFormData);
  const [loanSplitError, setLoanSplitError] = useState("");
  const [regionAutoSet, setRegionAutoSet] = useState(false);

  const update = <K extends keyof HealthCheckFormData>(
    key: K,
    value: HealthCheckFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "fixedPercent" || key === "floatingPercent" || key === "revolvingPercent") {
      setLoanSplitError("");
    }
  };

  const toggleFeature = (feature: FeatureKey) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: !prev.features[feature] },
    }));
  };

  const goNext = () => {
    if (step === 3) {
      const total = loanSplitTotal(formData);
      if (total !== 100) {
        setLoanSplitError(
          `Your loan split must add up to 100%. Currently: ${total}%.`
        );
        return;
      }
      saveHealthCheckAndReport(formData);
      router.push("/report");
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setLoanSplitError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const loanTotal = loanSplitTotal(formData);

  return (
    <div>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-brand">
            Step {step} of {STEPS.length}
          </span>
          <span className="text-muted">{STEPS[step - 1].label}</span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label={`Step ${step} of ${STEPS.length}`}
        >
          <div
            className="h-full rounded-full bg-brand transition-all duration-300 ease-out"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
        <ol className="mt-4 hidden gap-2 sm:flex">
          {STEPS.map((s) => (
            <li
              key={s.id}
              className={`flex-1 rounded-lg px-3 py-2 text-center text-xs font-medium ${
                s.id === step
                  ? "bg-brand/10 text-brand"
                  : s.id < step
                    ? "bg-brand/5 text-brand/70"
                    : "bg-surface text-muted"
              }`}
            >
              {s.label}
            </li>
          ))}
        </ol>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          goNext();
        }}
        className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10"
      >
        {step === 1 && (
          <fieldset className="space-y-6">
            <legend className="sr-only">Property Details</legend>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Property Details
              </h2>
              <p className="mt-2 text-muted">
                Tell us about your home so we can understand its profile.
              </p>
            </div>

            <AddressAutocomplete
              address={formData.address}
              region={formData.region}
              regionAutoSet={regionAutoSet}
              onAddressChange={(address) => update("address", address)}
              onRegionChange={(region) => update("region", region)}
              onRegionAutoSet={setRegionAutoSet}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="floorArea" className={labelClassName}>
                  Floor area (m²)
                </label>
                <input
                  id="floorArea"
                  type="number"
                  required
                  min={1}
                  placeholder="e.g. 145"
                  className={inputClassName}
                  value={formData.floorArea}
                  onChange={(e) => update("floorArea", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="yearBuilt" className={labelClassName}>
                  Year built
                </label>
                <input
                  id="yearBuilt"
                  type="number"
                  required
                  min={1800}
                  max={new Date().getFullYear()}
                  placeholder="e.g. 1985"
                  className={inputClassName}
                  value={formData.yearBuilt}
                  onChange={(e) => update("yearBuilt", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="buildQuality" className={labelClassName}>
                Build quality
              </label>
              <select
                id="buildQuality"
                required
                className={inputClassName}
                value={formData.buildQuality}
                onChange={(e) => update("buildQuality", e.target.value)}
              >
                <option value="" disabled>
                  Select build quality
                </option>
                {BUILD_QUALITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className={labelClassName}>Property features</legend>
              <p className="mt-1 text-sm text-muted">
                Select any that apply to your property.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PROPERTY_FEATURES.map((feature) => (
                  <label
                    key={feature}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors has-checked:border-brand has-checked:bg-brand/5"
                  >
                    <input
                      type="checkbox"
                      checked={formData.features[feature]}
                      onChange={() => toggleFeature(feature)}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand/30"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-6">
            <legend className="sr-only">Insurance Details</legend>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Insurance Details
              </h2>
              <p className="mt-2 text-muted">
                Help us understand how your home is currently insured.
              </p>
            </div>

            <div>
              <label htmlFor="sumInsured" className={labelClassName}>
                Current sum insured ($)
              </label>
              <input
                id="sumInsured"
                type="number"
                required
                min={0}
                step={1000}
                placeholder="e.g. 650000"
                className={inputClassName}
                value={formData.sumInsured}
                onChange={(e) => update("sumInsured", e.target.value)}
              />
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
                placeholder="e.g. 2022"
                className={inputClassName}
                value={formData.sumInsuredYear}
                onChange={(e) => update("sumInsuredYear", e.target.value)}
              />
              <p className="mt-2 text-sm text-muted">
                When did you last review or update your sum insured with your
                insurer?
              </p>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-6">
            <legend className="sr-only">Mortgage Details</legend>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Mortgage Details
              </h2>
              <p className="mt-2 text-muted">
                A few details about your loan help us complete the picture.
              </p>
            </div>

            <div>
              <label htmlFor="refixDate" className={labelClassName}>
                Mortgage refix date
              </label>
              <input
                id="refixDate"
                type="date"
                required
                className={inputClassName}
                value={formData.refixDate}
                onChange={(e) => update("refixDate", e.target.value)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="loanAmount" className={labelClassName}>
                  Current loan amount ($)
                </label>
                <input
                  id="loanAmount"
                  type="number"
                  required
                  min={0}
                  step={1000}
                  placeholder="e.g. 480000"
                  className={inputClassName}
                  value={formData.loanAmount}
                  onChange={(e) => update("loanAmount", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="interestRate" className={labelClassName}>
                  Current interest rate (%)
                </label>
                <input
                  id="interestRate"
                  type="number"
                  required
                  min={0}
                  max={30}
                  step={0.01}
                  placeholder="e.g. 6.45"
                  className={inputClassName}
                  value={formData.interestRate}
                  onChange={(e) => update("interestRate", e.target.value)}
                />
              </div>
            </div>

            <fieldset>
              <legend className={labelClassName}>Loan structure (%)</legend>
              <p className="mt-1 text-sm text-muted">
                Split between fixed, floating, and revolving credit — must total
                100%.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="fixedPercent" className="text-sm text-muted">
                    Fixed
                  </label>
                  <input
                    id="fixedPercent"
                    type="number"
                    required
                    min={0}
                    max={100}
                    placeholder="0"
                    className={inputClassName}
                    value={formData.fixedPercent}
                    onChange={(e) => update("fixedPercent", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="floatingPercent" className="text-sm text-muted">
                    Floating
                  </label>
                  <input
                    id="floatingPercent"
                    type="number"
                    required
                    min={0}
                    max={100}
                    placeholder="0"
                    className={inputClassName}
                    value={formData.floatingPercent}
                    onChange={(e) => update("floatingPercent", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="revolvingPercent" className="text-sm text-muted">
                    Revolving credit
                  </label>
                  <input
                    id="revolvingPercent"
                    type="number"
                    required
                    min={0}
                    max={100}
                    placeholder="0"
                    className={inputClassName}
                    value={formData.revolvingPercent}
                    onChange={(e) =>
                      update("revolvingPercent", e.target.value)
                    }
                  />
                </div>
              </div>
              <p
                className={`mt-3 text-sm font-medium ${
                  loanTotal === 100
                    ? "text-brand"
                    : loanTotal > 100
                      ? "text-accent"
                      : "text-muted"
                }`}
              >
                Total: {loanTotal}% {loanTotal === 100 && "✓"}
              </p>
              {loanSplitError && (
                <p className="mt-2 text-sm font-medium text-accent" role="alert">
                  {loanSplitError}
                </p>
              )}
            </fieldset>

            <div>
              <label htmlFor="monthlyIncome" className={labelClassName}>
                Monthly take-home income ($)
              </label>
              <input
                id="monthlyIncome"
                type="number"
                required
                min={0}
                step={100}
                placeholder="e.g. 6500"
                className={inputClassName}
                value={formData.monthlyIncome}
                onChange={(e) => update("monthlyIncome", e.target.value)}
              />
              <p className="mt-2 text-sm text-muted">
                Your household&apos;s combined monthly income after tax.
              </p>
            </div>
          </fieldset>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-base font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-accent-soft/50"
            >
              Back
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-base font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-accent-soft/50"
            >
              Cancel
            </Link>
          )}
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark sm:ml-auto"
          >
            {step === 3 ? "Complete check" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
