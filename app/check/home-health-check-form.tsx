"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveHealthCheckAndReport } from "@/lib/storage/health-check";
import { saveHomeownerContact } from "@/lib/storage/homeowner";
import { getAuthCallbackUrl } from "@/lib/auth/auth-callback-url";
import type { FeatureKey, HealthCheckFormData } from "@/lib/types/health-check";
import { PROPERTY_FEATURES } from "@/lib/types/health-check";
import { AddressAutocomplete } from "./address-autocomplete";
import { FormattedNumberInput } from "./formatted-number-input";
import {
  LoanStructureAmounts,
  loanAmountsExceedTotal,
} from "./loan-structure-amounts";

const BUILD_QUALITY_OPTIONS = ["Standard", "Above Standard", "High Spec"] as const;

const STEPS = [
  { id: 1, label: "Property Details" },
  { id: 2, label: "Insurance Details" },
  { id: 3, label: "Mortgage Details" },
  { id: 4, label: "Your report" },
] as const;

const inputClassName =
"mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-violet focus:outline-none focus:ring-0";

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
  fixedLoanAmount: "",
  revolvingCreditAmount: "",
  monthlyIncome: "",
};

export function HomeHealthCheckForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<HealthCheckFormData>(initialFormData);
  const [loanSplitError, setLoanSplitError] = useState("");
  const [regionAutoSet, setRegionAutoSet] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [leadError, setLeadError] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const update = <K extends keyof HealthCheckFormData>(
    key: K,
    value: HealthCheckFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (
      key === "fixedLoanAmount" ||
      key === "revolvingCreditAmount" ||
      key === "loanAmount"
    ) {
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
      if (
        loanAmountsExceedTotal(
          formData.loanAmount,
          formData.fixedLoanAmount,
          formData.revolvingCreditAmount
        )
      ) {
        setLoanSplitError("Amount exceeds your total loan");
        return;
      }
      saveHealthCheckAndReport(formData);
      setStep(4);
      return;
    }
    setStep((s) => s + 1);
  };

  const submitLeadAndViewReport = async () => {
    setLeadError("");
    setIsSubmittingLead(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setLeadError(
          data.error ?? "Something went wrong. Please try again."
        );
        return;
      }

      await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          fullName,
          redirectTo: getAuthCallbackUrl(window.location.origin),
        }),
      });

      saveHomeownerContact(fullName, email);
      router.push("/report");
    } catch {
      setLeadError("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const goBack = () => {
    setLoanSplitError("");
    setStep((s) => Math.max(1, s - 1));
  };

  return (
    <div>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-violet">
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
            className="h-full rounded-full bg-violet transition-all duration-300 ease-out"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
        <ol className="mt-4 hidden gap-2 sm:flex">
          {STEPS.map((s) => (
            <li
              key={s.id}
              className={`flex-1 rounded-lg px-3 py-2 text-center text-xs font-medium ${
                s.id === step
                  ? "bg-violet-light text-violet"
                  : s.id < step
                    ? "bg-violet-light text-violet/70"
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
          if (step === 4) {
            submitLeadAndViewReport();
          } else {
            goNext();
          }
        }}
        className="card p-6 sm:p-10"
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
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors has-checked:border-violet has-checked:bg-violet-light"
                  >
                    <input
                      type="checkbox"
                      checked={formData.features[feature]}
                      onChange={() => toggleFeature(feature)}
                      className="h-4 w-4 rounded border-border text-violet focus:ring-violet/30"
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

            <FormattedNumberInput
              id="sumInsured"
              label="Current sum insured ($)"
              placeholder="e.g. 650,000"
              value={formData.sumInsured}
              onChange={(v) => update("sumInsured", v)}
            />

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

            <FormattedNumberInput
              id="loanAmount"
              label="Current loan amount ($)"
              placeholder="e.g. 480,000"
              value={formData.loanAmount}
              onChange={(v) => update("loanAmount", v)}
            />

            <LoanStructureAmounts
              loanAmount={formData.loanAmount}
              fixedLoanAmount={formData.fixedLoanAmount}
              revolvingCreditAmount={formData.revolvingCreditAmount}
              onFixedChange={(v) => update("fixedLoanAmount", v)}
              onRevolvingChange={(v) => update("revolvingCreditAmount", v)}
            />

            {loanSplitError && (
              <p className="text-sm font-medium text-danger" role="alert">
                {loanSplitError}
              </p>
            )}

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

            <FormattedNumberInput
              id="monthlyIncome"
              label="Monthly take-home income ($)"
              placeholder="e.g. 6,500"
              value={formData.monthlyIncome}
              onChange={(v) => update("monthlyIncome", v)}
              hint="Your household's combined monthly income after tax."
            />
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className="space-y-6">
            <legend className="sr-only">Your report</legend>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Your report is ready
              </h2>
              <p className="mt-2 text-muted">
                Enter your details to see your personalised home health report.
                We&apos;ll also send you a copy to keep.
              </p>
            </div>

            <div>
              <label htmlFor="fullName" className={labelClassName}>
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Jane Smith"
                className={inputClassName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmittingLead}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClassName}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="e.g. jane@example.com"
                className={inputClassName}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmittingLead}
              />
            </div>

            {leadError && (
              <p className="text-sm font-medium text-danger" role="alert">
                {leadError}
              </p>
            )}
          </fieldset>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={isSubmittingLead}
              className="btn-ghost h-12 px-8 text-base disabled:opacity-50"
            >
              Back
            </button>
          ) : (
            <Link
              href="/"
              className="btn-ghost h-12 px-8 text-base"
            >
              Cancel
            </Link>
          )}
          <div className="flex flex-col items-stretch gap-3 sm:ml-auto sm:items-end">
            <button
              type="submit"
              disabled={isSubmittingLead}
              className="btn-violet h-12 px-8 text-base"
            >
              {step === 4
                ? isSubmittingLead
                  ? "Saving…"
                  : "See my report"
                : step === 3
                  ? "Complete check"
                  : "Next"}
            </button>
            {step === 4 && (
              <p className="text-center text-xs text-muted sm:text-right">
                We&apos;ll email a magic link for My Sanctury — no password
                needed. No spam. Unsubscribe anytime.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
