"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PLACEHOLDER_DASHBOARD, getEquityPercentage } from "@/lib/my-sanctury/dashboard-data";
import { formatCurrency } from "@/lib/format";
import { seedDemoDataIfEmpty } from "@/lib/storage/demo-seed";

type DashboardViewProps = { firstName: string };

function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  }
  if (amount >= 1_000) {
    return `$${Math.round(amount / 1_000)}k`;
  }
  return formatCurrency(amount);
}

export function DashboardView({ firstName: _firstName }: DashboardViewProps) {
  useEffect(() => {
    seedDemoDataIfEmpty();
  }, []);

  const data = PLACEHOLDER_DASHBOARD;
  const equityPercent = getEquityPercentage(
    data.property.equityAmount,
    data.property.estimatedCurrentValue
  );
  const loanBalance = data.property.estimatedCurrentValue - data.property.equityAmount;
  const gain = data.property.estimatedCurrentValue - data.property.purchasePrice;

  return (
    <div>
      {/* Header banner */}
      <section
        className="px-8 py-10 text-white"
        style={{
          background:
            "linear-gradient(135deg, #4C1D95 0%, #6D5FD8 50%, #7C3AED 100%)",
        }}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-6 sm:max-w-3xl lg:max-w-4xl lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/70">
              My Sanctury · Your home, sorted
            </p>
            <h1 className="!text-white mt-2 text-4xl font-black">
              Your home, sorted.
            </h1>
            <p className="mt-2 text-base text-white/85">{data.property.address}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              Est. value {formatCurrency(data.property.estimatedCurrentValue)}
            </span>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              {formatCompactCurrency(data.property.equityAmount)} equity built
            </span>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              47 days to refix
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6">
        {/* Property snapshot */}
        <section className="card overflow-hidden border-t-4 border-[#6D5FD8] p-0">
          <div className="flex items-start justify-between p-4 sm:p-5">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {data.property.address}
              </p>
              <p className="mt-0.5 text-xs text-muted">Tauranga · Since 2021</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold tracking-tight text-foreground">
                {formatCurrency(data.property.estimatedCurrentValue)}
              </p>
              <p className="text-xs text-muted">est. value</p>
            </div>
          </div>
          <div className="px-4 pb-3 sm:px-5">
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#6D5FD8]"
                style={{ width: `${equityPercent}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-muted">
              <span>{formatCurrency(loanBalance)} mortgage</span>
              <span>{equityPercent}% owned</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#16A34A]">
              {formatCurrency(data.property.equityAmount)} equity built
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-border">
            <div className="p-4 sm:p-5">
              <p className="text-xs text-muted">Gain since purchase</p>
              <p className="mt-0.5 text-base font-semibold text-accent">
                +{formatCurrency(gain)}
              </p>
            </div>
            <div className="border-l border-border p-4 sm:p-5">
              <p className="text-xs text-muted">Refix date</p>
              <p className="mt-0.5 text-base font-semibold text-warning">
                18 Jul 2026
              </p>
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Active requests
          </p>
          <div className="space-y-2">
            {data.marketplaceRequests.map((req) => (
              <div key={req.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-light text-violet">
                    {req.type === "Insurance" ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                        <path
                          d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                        <path
                          d="M4 10v10h16V10M2 10l10-7 10 7M9 20v-6h6v6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{req.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      Posted{" "}
                      {new Date(req.createdAt).toLocaleDateString("en-NZ", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      req.status === "Quotes received"
                        ? "bg-violet-light text-violet"
                        : req.status === "Completed"
                          ? "bg-accent-light text-accent"
                          : "bg-bg-secondary text-muted"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                {req.status === "Quotes received" && (
                  <div className="mt-3 rounded-lg bg-bg-secondary p-3">
                    <p className="text-xs font-semibold text-foreground">
                      Sarah Mitchell · Eves Insurance Tauranga
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      $1,064,000 cover · $2,892/yr · $1,000 excess
                    </p>
                    <Link
                      href="/marketplace/insurance/proposals"
                      className="mt-2 inline-flex rounded-full bg-[#6D5FD8] px-4 py-2 text-sm font-medium text-white hover:bg-violet-dark"
                    >
                      View quote
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <div className="card flex cursor-pointer items-center gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-muted">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Start a new request</p>
                <p className="text-xs text-muted">Insurance, mortgage, energy or tradie</p>
              </div>
              <svg
                viewBox="0 0 16 16"
                className="ml-auto h-4 w-4 text-muted"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Home status — alert cards */}
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Home status
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border-l-4 border-red-500 bg-red-50 p-4">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-danger-soft text-danger">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-xs font-medium text-foreground">Insurance</p>
              <p className="mt-0.5 text-base font-bold text-danger">$164K gap</p>
              <p className="text-xs text-muted">Underinsured</p>
              <Link
                href="/marketplace/insurance"
                className="mt-3 inline-flex rounded-full bg-[#6D5FD8] px-4 py-2 text-sm font-medium text-white hover:bg-violet-dark"
              >
                Fix this
              </Link>
            </div>
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-warning">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="text-xs font-medium text-foreground">Mortgage</p>
              <p className="mt-0.5 text-base font-bold text-warning">47 days</p>
              <p className="text-xs text-muted">Until refix</p>
              <Link
                href="/report"
                className="mt-3 inline-flex rounded-full bg-[#6D5FD8] px-4 py-2 text-sm font-medium text-white hover:bg-violet-dark"
              >
                Review
              </Link>
            </div>
            <div className="rounded-xl border-l-4 border-red-500 bg-red-50 p-4">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-danger-soft text-danger">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-xs font-medium text-foreground">Maintenance</p>
              <p className="mt-0.5 text-base font-bold text-danger">1 overdue</p>
              <p className="text-xs text-muted">Roof inspection</p>
              <Link
                href="/check"
                className="mt-3 inline-flex rounded-full bg-[#6D5FD8] px-4 py-2 text-sm font-medium text-white hover:bg-violet-dark"
              >
                Find tradie
              </Link>
            </div>
            <div className="rounded-xl border-l-4 border-green-500 bg-green-50 p-4">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light text-accent">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M3 17l6-6 4 4 8-10M21 21H3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-xs font-medium text-foreground">Market</p>
              <p className="mt-0.5 text-base font-bold text-accent">+$28K</p>
              <p className="text-xs text-muted">Est. gain this qtr</p>
              <Link
                href="/report"
                className="mt-3 inline-flex rounded-full bg-[#6D5FD8] px-4 py-2 text-sm font-medium text-white hover:bg-violet-dark"
              >
                See detail
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center">
            <Link href="/report" className="text-sm font-medium text-violet hover:underline">
              View your full Home Health Check report
            </Link>
          </p>
        </section>

        {/* For you — alert-style nudges */}
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            For you
          </p>
          <div className="space-y-2">
            {[
              {
                border: "border-amber-500 bg-amber-50",
                text: "Your mortgage refixes in 47 days — now is the right time to compare rates.",
                href: "/marketplace/insurance",
              },
              {
                border: "border-blue-500 bg-blue-50",
                text: "3 homes sold on your street — your estimated equity is up $28K this quarter.",
                href: "/report",
              },
              {
                border: "border-red-500 bg-red-50",
                text: "Building costs up 8% since your last review. You may be underinsured.",
                href: "/marketplace/insurance",
              },
            ].map((nudge, i) => (
              <Link
                key={i}
                href={nudge.href}
                className={`flex items-center gap-3 rounded-xl border-l-4 p-4 transition-colors hover:opacity-90 ${nudge.border}`}
              >
                <p className="flex-1 text-sm text-foreground">{nudge.text}</p>
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 text-muted"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
