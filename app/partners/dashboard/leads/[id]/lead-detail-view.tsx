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

type LeadDetailViewProps = {
  lead: PartnerLead;
};

export function LeadDetailView({ lead }: LeadDetailViewProps) {
  const router = useRouter();
  const [sumInsured, setSumInsured] = useState(String(lead.recommendedSumInsured));
  const [annualPremium, setAnnualPremium] = useState("");
  const [excess, setExcess] = useState("");
  const [coverType, setCoverType] = useState("Replacement");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="sumInsured" className="block text-sm font-medium text-foreground">
                  Recommended sum insured ($)
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
                <label htmlFor="annualPremium" className="block text-sm font-medium text-foreground">
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
                <label htmlFor="excess" className="block text-sm font-medium text-foreground">
                  Excess amount ($)
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
                <label htmlFor="coverType" className="block text-sm font-medium text-foreground">
                  Cover type
                </label>
                <select
                  id="coverType"
                  required
                  className={inputClassName}
                  value={coverType}
                  onChange={(e) => setCoverType(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="Replacement">Replacement</option>
                  <option value="Agreed value">Agreed value</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message to homeowner
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Brief note explaining your recommendation…"
                  className={inputClassName}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-medium text-white transition-colors hover:bg-teal-700 sm:w-auto"
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
