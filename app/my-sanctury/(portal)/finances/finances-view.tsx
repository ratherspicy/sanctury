"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { generateLoanBalanceCurve } from "@/lib/calculations/loan-curves";
import { MortgageBalanceChart } from "@/app/report/charts/mortgage-charts";
import { FINANCES, PROPERTY } from "@/lib/my-sanctury/handover-data";

/** Semi-circular LVR gauge. Low LVR = green zone (left), high = red (right). */
function LvrGauge({ percent }: { percent: number }) {
  // Map 0–100% LVR onto a 180° arc.
  const angle = Math.min(100, Math.max(0, percent)) * 1.8;
  const r = 54;
  const cx = 70;
  const cy = 66;
  const polar = (deg: number) => {
    const rad = ((deg - 180) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const start = polar(0);
  const end = polar(angle);
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 78" className="w-44">
        <path
          d={`M ${polar(0).x} ${polar(0).y} A ${r} ${r} 0 0 1 ${polar(180).x} ${polar(180).y}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`}
          fill="none"
          stroke="#16A34A"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </svg>
      <p className="-mt-7 text-2xl font-black tracking-tight text-foreground">
        {percent}%
      </p>
      <p className="text-xs font-medium text-muted">Loan to value · healthy zone</p>
    </div>
  );
}

export function FinancesView() {
  const [showCurve, setShowCurve] = useState(false);

  const loanCurves = useMemo(
    () => generateLoanBalanceCurve(FINANCES.mortgage, FINANCES.interestRate),
    []
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Finances
        </h1>
        <p className="mt-1 text-sm text-muted">
          {PROPERTY.address}{" "}· everything your home owes and owns.
        </p>
      </div>

      {/* Equity + LVR */}
      <section className="card flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between sm:gap-10 sm:p-8">
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Your equity
          </p>
          <p className="mt-2 text-4xl font-black tracking-tight text-[#6D5FD8] sm:text-5xl">
            {formatCurrency(FINANCES.equity)}
          </p>
          <p className="mt-2 text-xs text-muted">
            Purchase price {formatCurrency(1_285_000)} minus mortgage{" "}
            {formatCurrency(FINANCES.mortgage)}
          </p>
        </div>
        <LvrGauge percent={FINANCES.lvrPercent} />
      </section>

      {/* Mortgage summary */}
      <section className="card p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Mortgage</h2>
            <p className="mt-0.5 text-xs text-muted">Fixed rate</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-warning">
            Refix in {FINANCES.refixDays} days
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <div>
            <dt className="text-xs text-muted">Balance</dt>
            <dd className="mt-0.5 text-base font-bold text-foreground">
              {formatCurrency(FINANCES.mortgage)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Refix date</dt>
            <dd className="mt-0.5 text-base font-bold text-foreground">
              {FINANCES.refixDateLabel}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Days left</dt>
            <dd className="mt-0.5 text-base font-bold text-warning">
              {FINANCES.refixDays}
            </dd>
          </div>
        </dl>
      </section>

      {/* Revolving credit / extra repayment widget */}
      <section className="card p-5 sm:p-6">
        <h2 className="text-base font-bold text-foreground">
          Pay it off faster
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          Pay an extra{" "}
          <span className="font-semibold">
            {formatCurrency(FINANCES.extraMonthly)}/month
          </span>{" "}
          → save{" "}
          <span className="font-semibold text-[#16A34A]">
            {formatCurrency(FINANCES.extraSavings)}
          </span>{" "}
          and pay off{" "}
          <span className="font-semibold">{FINANCES.extraYearsSooner} years</span>{" "}
          sooner.
        </p>
        <button
          type="button"
          onClick={() => setShowCurve((s) => !s)}
          aria-expanded={showCurve}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-violet transition-colors hover:bg-violet-light"
        >
          {showCurve ? "Hide payoff curve" : "Show payoff curve"}
          <svg
            viewBox="0 0 16 16"
            className={`h-3.5 w-3.5 transition-transform ${showCurve ? "rotate-180" : ""}`}
            fill="none"
            aria-hidden
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {showCurve && (
          <div className="mt-5">
            <MortgageBalanceChart points={loanCurves.points} />
          </div>
        )}
      </section>

      {/* Insurance summary */}
      <section
        className="card border-l-4 p-5 sm:p-6"
        style={{ borderLeftColor: "#DC2626" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Insurance</h2>
            <p className="mt-0.5 text-xs text-muted">
              Sum insured vs estimated rebuild
            </p>
          </div>
          <span className="rounded-full bg-danger-soft px-3 py-1 text-xs font-semibold text-danger">
            Underinsured
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <div>
            <dt className="text-xs text-muted">Cover</dt>
            <dd className="mt-0.5 text-base font-bold text-foreground">
              {formatCurrency(FINANCES.insuranceCover)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Rebuild</dt>
            <dd className="mt-0.5 text-base font-bold text-foreground">
              {formatCurrency(FINANCES.rebuildCost)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Gap</dt>
            <dd className="mt-0.5 text-base font-bold text-danger">
              {formatCurrency(FINANCES.insuranceGap)}
            </dd>
          </div>
        </dl>
        <Link
          href="/marketplace/insurance"
          className="mt-5 inline-flex rounded-full bg-[#6D5FD8] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-dark"
        >
          Fix this →
        </Link>
      </section>
    </div>
  );
}
