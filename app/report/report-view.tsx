"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { HealthCheckReport } from "@/lib/calculations/report";
import type { TrafficLightStatus } from "@/lib/calculations/report";
import { formatCurrency, formatDate } from "@/lib/format";
import { generateLoanBalanceCurve } from "@/lib/calculations/loan-curves";
import { getMaintenanceMilestones } from "@/lib/calculations/maintenance-timeline";
import { loadHealthCheckReport } from "@/lib/storage/health-check";
import type { HealthCheckFormData } from "@/lib/types/health-check";
import {
  InsuranceCoverBarChart,
  InsuranceHouseVisual,
} from "./charts/insurance-charts";
import {
  MortgageBalanceChart,
  MortgagePayoffTimeline,
} from "./charts/mortgage-charts";
import { MaintenanceTimelineChart } from "./charts/maintenance-chart";

const statusConfig: Record<
  TrafficLightStatus,
  { label: string; dot: string; bg: string; border: string }
> = {
  green: {
    label: "Looking good",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  amber: {
    label: "Worth a review",
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  red: {
    label: "Action recommended",
    dot: "bg-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

function TrafficLight({ status }: { status: TrafficLightStatus }) {
  const config = statusConfig[status];
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 ${config.bg} ${config.border}`}
    >
      <span className={`h-3 w-3 rounded-full ${config.dot}`} aria-hidden />
      <span className="text-sm font-semibold text-foreground">{config.label}</span>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
    </div>
  );
}

function ReportSection({
  id,
  title,
  description,
  children,
  cta,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
  cta: { label: string; href: string };
}) {
  return (
    <section
      id={id}
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 text-muted">{description}</p>
      <div className="mt-6 space-y-6">{children}</div>
      {cta.href.startsWith("/") ? (
        <Link
          href={cta.href}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          {cta.label}
        </Link>
      ) : (
        <a
          href={cta.href}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          {cta.label}
        </a>
      )}
    </section>
  );
}

export function ReportView() {
  const router = useRouter();
  const [formData, setFormData] = useState<HealthCheckFormData | null>(null);
  const [report, setReport] = useState<HealthCheckReport | null>(null);

  useEffect(() => {
    const stored = loadHealthCheckReport();
    if (!stored) {
      router.replace("/check");
      return;
    }
    setFormData(stored.formData);
    setReport(stored.report);
  }, [router]);

  if (!formData || !report) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted">Preparing your report…</p>
      </div>
    );
  }

  const { insurance, mortgage, maintenance } = report;
  const loanAmount = Number(formData.loanAmount) || 0;
  const interestRate = Number(formData.interestRate) || 0;
  const loanCurves = generateLoanBalanceCurve(loanAmount, interestRate);
  const maintenanceMilestones = getMaintenanceMilestones(maintenance.homeAge);

  const gapDisplay =
    insurance.insuranceGap > 0
      ? formatCurrency(insurance.insuranceGap)
      : "Fully covered";

  return (
    <div className="space-y-8">
      {/* Insurance */}
      <ReportSection
        id="insurance"
        title="Insurance Health"
        description="How your current cover compares to what a full rebuild could cost."
        cta={{ label: "Review your sum insured", href: "/marketplace/insurance" }}
      >
        <TrafficLight status={insurance.status} />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-5 sm:p-6">
            <InsuranceCoverBarChart insurance={insurance} />
          </div>
          <InsuranceHouseVisual insurance={insurance} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Estimated rebuild cost"
            value={formatCurrency(insurance.estimatedRebuildCost)}
          />
          <MetricCard
            label="Current sum insured"
            value={formatCurrency(insurance.currentSumInsured)}
            sub={
              formData.sumInsuredYear
                ? `Last updated ${formData.sumInsuredYear}`
                : undefined
            }
          />
          <MetricCard
            label={insurance.insuranceGap > 0 ? "Coverage gap" : "Coverage gap"}
            value={gapDisplay}
            sub={
              insurance.insuranceGap > 0
                ? "Below estimated rebuild"
                : "Meets or exceeds estimate"
            }
          />
        </div>
        <p className="rounded-xl bg-background p-5 text-base leading-relaxed text-foreground">
          {insurance.explanation}
        </p>
      </ReportSection>

      {/* Mortgage */}
      <ReportSection
        id="mortgage"
        title="Mortgage Strategy"
        description="Timely prompts based on your refix date, loan structure, and income."
        cta={{ label: "Explore mortgage options", href: "#mortgage" }}
      >
        <div className="space-y-6 rounded-xl border border-border bg-background p-5 sm:p-6">
          <MortgageBalanceChart points={loanCurves.points} />
          <MortgagePayoffTimeline
            currentPayoffYears={loanCurves.currentPayoffYears}
            restructuredPayoffYears={loanCurves.restructuredPayoffYears}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Days until refix"
            value={mortgage.daysUntilRefix.toLocaleString("en-NZ")}
            sub={
              mortgage.refixDate
                ? `Refix on ${formatDate(mortgage.refixDate)}`
                : undefined
            }
          />
          <MetricCard
            label="Revolving credit opportunity"
            value={formatCurrency(mortgage.revolvingCreditSavings)}
            sub="Est. interest saved over loan term with income flowing through revolving credit"
          />
          <MetricCard
            label="Extra $500/month"
            value={`${formatCurrency(mortgage.overpaymentInterestSaved)} saved`}
            sub={`~${mortgage.overpaymentYearsSaved} years off your loan`}
          />
        </div>
        <p className="rounded-xl bg-background p-5 text-base leading-relaxed text-muted">
          With {mortgage.daysUntilRefix} days until your refix, it&apos;s a good
          time to compare structures. Routing income through your revolving
          credit facility could save around{" "}
          <span className="font-medium text-foreground">
            {formatCurrency(mortgage.revolvingCreditSavings)}
          </span>{" "}
          in interest over your remaining term — and paying an extra{" "}
          <span className="font-medium text-foreground">$500</span> per month
          could trim roughly{" "}
          <span className="font-medium text-foreground">
            {mortgage.overpaymentYearsSaved} years
          </span>{" "}
          while saving{" "}
          <span className="font-medium text-foreground">
            {formatCurrency(mortgage.overpaymentInterestSaved)}
          </span>{" "}
          in total interest.
        </p>
      </ReportSection>

      {/* Maintenance */}
      <ReportSection
        id="maintenance"
        title="Maintenance Snapshot"
        description={`Built in ${maintenance.yearBuilt} — here's one thing worth your attention.`}
        cta={{ label: "Build your maintenance plan", href: "#maintenance" }}
      >
        <div className="rounded-xl border border-border bg-background p-5 sm:p-6">
          <MaintenanceTimelineChart
            homeAge={maintenance.homeAge}
            milestones={maintenanceMilestones}
          />
        </div>
        <div className="rounded-xl border border-border bg-accent-soft/40 p-6">
          <h3 className="text-lg font-semibold text-foreground">
            {maintenance.alertTitle}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            {maintenance.alertMessage}
          </p>
        </div>
      </ReportSection>

      <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-border bg-surface/50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          This report is based on the details you provided. Figures are
          estimates for guidance — not financial advice.
        </p>
        <div className="flex gap-3">
          <Link
            href="/check"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent-soft/50"
          >
            Edit answers
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
