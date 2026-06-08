"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiteHeader } from "@/app/components/site-header";
import { formatCurrency } from "@/lib/format";
import type { PartnerLead } from "@/lib/partner/dashboard-data";
import { PartnerNav } from "../../components/partner-nav";

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-teal-600 focus:outline-none focus:ring-0";

const labelClassName = "block text-sm font-medium text-foreground";

const COVER_FEATURES = [
  "Contents cover",
  "Natural disaster cover",
  "Temporary accommodation",
  "Legal liability",
  "Underground services",
  "Gradual damage",
] as const;

type LeadDetailViewProps = {
  lead: PartnerLead;
};

export function LeadDetailView({ lead }: LeadDetailViewProps) {
  const router = useRouter();
  const [sumInsured, setSumInsured] = useState("750000");
  const [annualPremium, setAnnualPremium] = useState("");
  const [excess, setExcess] = useState("");
  const [insurer, setInsurer] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [coverFeatures, setCoverFeatures] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(COVER_FEATURES.map((f) => [f, true]))
  );
  const [excessOptions, setExcessOptions] = useState(["", "", ""]);
  const [exclusions, setExclusions] = useState(["", "", ""]);
  const [personalNote, setPersonalNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const monthlyPremium =
    annualPremium && !Number.isNaN(Number(annualPremium))
      ? (Number(annualPremium) / 12).toFixed(2)
      : "";

  const toggleCoverFeature = (feature: string) => {
    setCoverFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const updateExcessOption = (index: number, value: string) => {
    setExcessOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const updateExclusion = (index: number, value: string) => {
    setExclusions((prev) => prev.map((ex, i) => (i === index ? value : ex)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    router.push("/partners/dashboard");
  };

  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <SiteHeader minimal />
      <PartnerNav />

      <main className="relative flex-1">
        <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8 lg:py-10">
          <Link
            href="/partners/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M12 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to dashboard
          </Link>

          <header className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              {lead.name}
            </h1>
            <p className="mt-1 text-muted">{lead.location}</p>
            <p className="mt-1 text-sm text-muted">{lead.address}</p>
          </header>

          <section className="card mt-8 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Property details</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted">Property type</dt>
                <dd className="mt-0.5 font-medium text-foreground">{lead.propertyType}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Year built</dt>
                <dd className="mt-0.5 font-medium text-foreground">{lead.yearBuilt}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Floor area</dt>
                <dd className="mt-0.5 font-medium text-foreground">{lead.floorArea} m²</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Posted</dt>
                <dd className="mt-0.5 font-medium text-foreground">{lead.postedLabel}</dd>
              </div>
            </dl>
          </section>

          <section className="card mt-6 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Insurance gap breakdown</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-background p-4">
                <dt className="text-sm text-muted">Current cover</dt>
                <dd className="mt-1 text-xl font-bold text-foreground">
                  {formatCurrency(lead.currentCover)}
                </dd>
              </div>
              <div className="rounded-xl bg-background p-4">
                <dt className="text-sm text-muted">Estimated rebuild</dt>
                <dd className="mt-1 text-xl font-bold text-foreground">
                  {formatCurrency(lead.estimatedRebuild)}
                </dd>
              </div>
              <div className="rounded-xl bg-background p-4">
                <dt className="text-sm text-muted">Coverage gap</dt>
                <dd className="mt-1 text-xl font-bold text-danger">
                  {formatCurrency(lead.gap)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="card mt-6 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Submit proposal</h2>
            <p className="mt-2 text-sm text-muted">
              Send your quote to {lead.name.split(" ")[0]} through Sanctury.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-8">
              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Pricing
                </h3>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="sumInsured" className={labelClassName}>
                      Sum insured ($)
                    </label>
                    <input
                      id="sumInsured"
                      type="number"
                      required
                      min={1}
                      className={inputClassName}
                      value={sumInsured}
                      onChange={(e) => setSumInsured(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="annualPremium" className={labelClassName}>
                      Annual premium ($)
                    </label>
                    <input
                      id="annualPremium"
                      type="number"
                      required
                      min={1}
                      placeholder="e.g. 2890"
                      className={inputClassName}
                      value={annualPremium}
                      onChange={(e) => setAnnualPremium(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="excess" className={labelClassName}>
                      Standard excess ($)
                    </label>
                    <input
                      id="excess"
                      type="number"
                      required
                      min={0}
                      placeholder="e.g. 500"
                      className={inputClassName}
                      value={excess}
                      onChange={(e) => setExcess(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="monthlyPremium" className={labelClassName}>
                      Est. monthly premium
                    </label>
                    <input
                      id="monthlyPremium"
                      type="text"
                      readOnly
                      placeholder="Calculated from annual premium"
                      className={`${inputClassName} cursor-not-allowed bg-bg-secondary text-muted`}
                      value={monthlyPremium ? `$${monthlyPremium}/mo` : ""}
                      tabIndex={-1}
                    />
                  </div>
                </div>
              </div>

              {/* Policy details */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Policy details
                </h3>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="insurer" className={labelClassName}>
                      Insurer name
                    </label>
                    <input
                      id="insurer"
                      type="text"
                      required
                      placeholder="e.g. Tower Insurance"
                      className={inputClassName}
                      value={insurer}
                      onChange={(e) => setInsurer(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="policyName" className={labelClassName}>
                      Policy name
                    </label>
                    <input
                      id="policyName"
                      type="text"
                      required
                      placeholder="e.g. Tower Home and Contents"
                      className={inputClassName}
                      value={policyName}
                      onChange={(e) => setPolicyName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Cover features */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Cover features
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {COVER_FEATURES.map((feature) => (
                    <label
                      key={feature}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors has-checked:border-teal-600 has-checked:bg-teal-50"
                    >
                      <input
                        type="checkbox"
                        checked={coverFeatures[feature]}
                        onChange={() => toggleCoverFeature(feature)}
                        disabled={isSubmitting}
                        className="h-4 w-4 rounded border-border text-teal-600 focus:ring-teal-600"
                      />
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Excess options */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Excess options
                </h3>
                <div className="mt-4 space-y-4">
                  {excessOptions.map((option, index) => (
                    <div key={index}>
                      <label htmlFor={`excessOption${index}`} className={labelClassName}>
                        Option {index + 1}
                      </label>
                      <input
                        id={`excessOption${index}`}
                        type="text"
                        placeholder="$500 standard excess"
                        className={inputClassName}
                        value={option}
                        onChange={(e) => updateExcessOption(index, e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Exclusions
                </h3>
                <div className="mt-4 space-y-4">
                  {exclusions.map((exclusion, index) => (
                    <div key={index}>
                      <label htmlFor={`exclusion${index}`} className={labelClassName}>
                        Exclusion {index + 1}
                      </label>
                      <input
                        id={`exclusion${index}`}
                        type="text"
                        placeholder="Pre-existing damage not covered"
                        className={inputClassName}
                        value={exclusion}
                        onChange={(e) => updateExclusion(index, e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal note */}
              <div>
                <label htmlFor="personalNote" className={labelClassName}>
                  Personal note to homeowner
                </label>
                <textarea
                  id="personalNote"
                  required
                  rows={4}
                  placeholder="Explain your recommendation and why this policy suits their property…"
                  className={inputClassName}
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0D9488] px-6 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                {isSubmitting ? "Submitting…" : "Submit proposal"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
