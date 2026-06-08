"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PLACEHOLDER_DASHBOARD, getEquityPercentage } from "@/lib/my-sanctury/dashboard-data";
import { formatCurrency } from "@/lib/format";
import { seedDemoDataIfEmpty } from "@/lib/storage/demo-seed";

type DashboardViewProps = { firstName: string };

export function DashboardView({ firstName }: DashboardViewProps) {
  useEffect(() => {
    seedDemoDataIfEmpty();
  }, []);

  const data = PLACEHOLDER_DASHBOARD;
  const equityPercent = getEquityPercentage(data.property.equityAmount, data.property.estimatedCurrentValue);
  const loanBalance = data.property.estimatedCurrentValue - data.property.equityAmount;
  const gain = data.property.estimatedCurrentValue - data.property.purchasePrice;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6 sm:px-6">

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Hi {firstName} 👋</h1>
        <p className="mt-1 text-sm text-muted">3 things need your attention today.</p>
      </div>

      {/* Property card */}
      <section className="card overflow-hidden p-0">
        <div className="flex items-start justify-between p-4 sm:p-5">
          <div>
            <p className="text-sm font-semibold text-foreground">{data.property.address}</p>
            <p className="text-xs text-muted mt-0.5">Tauranga · Since 2021</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold tracking-tight text-foreground">{formatCurrency(data.property.estimatedCurrentValue)}</p>
            <p className="text-xs text-muted">est. value</p>
          </div>
        </div>
        <div className="px-4 pb-3 sm:px-5">
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full bg-accent" style={{ width: `${equityPercent}%` }} />
          </div>
          <div className="mt-1.5 flex justify-between text-xs">
            <span className="font-medium text-accent">{formatCurrency(data.property.equityAmount)} equity ({equityPercent}%)</span>
            <span className="text-violet">{formatCurrency(loanBalance)} mortgage</span>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-border">
          <div className="p-4 sm:p-5">
            <p className="text-xs text-muted">Gain since purchase</p>
            <p className="mt-0.5 text-base font-semibold text-accent">+{formatCurrency(gain)}</p>
          </div>
          <div className="p-4 sm:p-5 border-l border-border">
            <p className="text-xs text-muted">Refix date</p>
            <p className="mt-0.5 text-base font-semibold text-warning">18 Jul 2026</p>
          </div>
        </div>
      </section>

      {/* Property Passport */}
      <Link
        href="/my-sanctury/vault"
        className="card flex items-center gap-4 p-4 transition-colors hover:bg-bg-secondary sm:p-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-light text-violet">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
            <path
              d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Property Passport</p>
          <p className="mt-0.5 text-xs text-muted">5 documents · 4 maintenance events</p>
          <p className="mt-0.5 text-xs text-muted">Last updated 14 Mar 2024</p>
        </div>
        <span className="shrink-0 text-sm font-medium text-violet">
          View passport →
        </span>
      </Link>

      {/* Active requests */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">Active requests</p>
        <div className="space-y-2">
          {data.marketplaceRequests.map((req) => (
            <div key={req.id} className="card p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-light text-violet">
                  {req.type === "Insurance" ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden><path d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden><path d="M4 10v10h16V10M2 10l10-7 10 7M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{req.title}</p>
                  <p className="text-xs text-muted mt-0.5">Posted {new Date(req.createdAt).toLocaleDateString("en-NZ", { day: "numeric", month: "long" })}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  req.status === "Quotes received" ? "bg-violet-light text-violet" :
                  req.status === "Completed" ? "bg-accent-light text-accent" :
                  "bg-bg-secondary text-muted"
                }`}>{req.status}</span>
              </div>
              {req.status === "Quotes received" && (
                <div className="mt-3 rounded-lg bg-bg-secondary p-3">
                  <p className="text-xs font-semibold text-foreground">Sarah Mitchell · Eves Insurance Tauranga</p>
                  <p className="text-xs text-muted mt-0.5">$1,064,000 cover · $2,890/yr · $1,000 excess</p>
                  <Link href="/marketplace/insurance/proposals" className="btn-violet mt-2 inline-flex h-7 items-center px-3 text-xs">
                    View quote
                  </Link>
                </div>
              )}
            </div>
          ))}
          <div className="card flex items-center gap-3 p-4 cursor-pointer">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-muted">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Start a new request</p>
              <p className="text-xs text-muted">Insurance, mortgage, energy or tradie</p>
            </div>
            <svg viewBox="0 0 16 16" className="h-4 w-4 ml-auto text-muted" fill="none" aria-hidden><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </section>

      {/* Home status */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">Home status</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="card p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-soft text-danger mb-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden><path d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </span>
            <p className="text-xs font-medium text-foreground">Insurance</p>
            <p className="text-base font-bold text-danger mt-0.5">$164K gap</p>
            <p className="text-xs text-muted">Underinsured</p>
            <Link href="/marketplace/insurance" className="mt-2 flex items-center gap-1 text-xs font-medium text-violet">Fix this <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
          <div className="card p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-warning mb-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <p className="text-xs font-medium text-foreground">Mortgage</p>
            <p className="text-base font-bold text-warning mt-0.5">47 days</p>
            <p className="text-xs text-muted">Until refix</p>
            <Link href="/report" className="mt-2 flex items-center gap-1 text-xs font-medium text-violet">Review <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
          <div className="card p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-soft text-danger mb-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <p className="text-xs font-medium text-foreground">Maintenance</p>
            <p className="text-base font-bold text-danger mt-0.5">1 overdue</p>
            <p className="text-xs text-muted">Roof inspection</p>
            <Link href="/check" className="mt-2 flex items-center gap-1 text-xs font-medium text-violet">Find tradie <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
          <div className="card p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light text-accent mb-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden><path d="M3 17l6-6 4 4 8-10M21 21H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <p className="text-xs font-medium text-foreground">Market</p>
            <p className="text-base font-bold text-accent mt-0.5">+$28K</p>
            <p className="text-xs text-muted">Est. gain this qtr</p>
            <Link href="/report" className="mt-2 flex items-center gap-1 text-xs font-medium text-violet">See detail <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
        </div>
        <p className="mt-4 text-center">
          <Link
            href="/report"
            className="text-sm font-medium text-violet hover:underline"
          >
            View your full Home Health Check report
          </Link>
        </p>
      </section>

      {/* For you */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">For you</p>
        <div className="space-y-2">
          {[
            { color: "bg-warning", text: "Your mortgage refixes in 47 days — now is the right time to compare rates.", href: "/marketplace/insurance" },
            { color: "bg-violet", text: "3 homes sold on your street — your estimated equity is up $28K this quarter.", href: "/report" },
            { color: "bg-danger", text: "Building costs up 8% since your last review. You may be underinsured.", href: "/marketplace/insurance" },
          ].map((nudge, i) => (
            <Link key={i} href={nudge.href} className="flex items-center gap-3 card p-4 hover:bg-bg-secondary transition-colors">
              <span className={`h-2 w-2 rounded-full shrink-0 ${nudge.color}`} />
              <p className="text-sm text-foreground flex-1">{nudge.text}</p>
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-muted" fill="none" aria-hidden><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
