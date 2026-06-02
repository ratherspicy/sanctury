"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  PLACEHOLDER_DASHBOARD,
  getEquityPercentage,
  type AlertCategory,
  type DashboardAlert,
  type MarketplaceRequest,
  type MarketplaceRequestStatus,
} from "@/lib/my-sanctury/dashboard-data";

type DashboardViewProps = {
  firstName: string;
};

type TabId = "overview" | "requests" | "report";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "requests", label: "Active requests" },
  { id: "report", label: "My report" },
];

const ALERT_BORDER: Record<AlertCategory, string> = {
  Insurance: "border-l-danger",
  Mortgage: "border-l-violet",
  Maintenance: "border-l-warning",
  Market: "border-l-border",
};

const ALERT_ICONS: Record<AlertCategory, ReactNode> = {
  Insurance: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Mortgage: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M4 10v10h16V10M2 10l10-7 10 7M9 20v-6h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Maintenance: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Market: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M3 17l6-6 4 4 8-10M21 21H3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const REQUEST_STATUS_STYLES: Record<MarketplaceRequestStatus, string> = {
  Pending: "bg-bg-secondary text-muted",
  "Quotes received": "bg-violet-light text-violet",
  "Adviser chosen": "bg-accent-light text-accent",
  Completed: "bg-accent-light text-accent",
};

function RequestTypeIcon({ type }: { type: MarketplaceRequest["type"] }) {
  if (type === "Insurance") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M4 10v10h16V10M2 10l10-7 10 7M9 20v-6h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertCard({ alert }: { alert: DashboardAlert }) {
  return (
    <div className={`card border-l-4 p-4 ${ALERT_BORDER[alert.category]}`}>
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-muted">
          {ALERT_ICONS[alert.category]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {alert.category}
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {alert.headline}
          </p>
          <p className="mt-1 text-sm text-muted">{alert.description}</p>
          <Link
            href={alert.actionHref}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-violet hover:underline"
          >
            {alert.actionLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function RequestCard({ request }: { request: MarketplaceRequest }) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-muted">
          <RequestTypeIcon type={request.type} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-foreground">{request.title}</p>
              <p className="mt-1 text-sm text-muted">
                Posted {formatDate(request.createdAt)}
              </p>
            </div>
            <span
              className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${REQUEST_STATUS_STYLES[request.status]}`}
            >
              {request.status}
            </span>
          </div>

          {request.status === "Quotes received" && (
            <div className="mt-4 rounded-lg bg-bg-secondary p-4">
              <p className="text-sm font-medium text-foreground">
                Sarah Mitchell · Eves Insurance Tauranga
              </p>
              <p className="mt-1 text-sm text-muted">
                New sum insured: $1,064,000 · Premium: $2,890/yr · Excess:
                $1,000
              </p>
              <Link
                href="/marketplace/insurance"
                className="btn-violet mt-4 inline-flex h-9 px-4 text-sm"
              >
                View quote
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DashboardView({ firstName }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const data = PLACEHOLDER_DASHBOARD;
  const { property, alerts, marketplaceRequests, lastHealthCheckDate } = data;

  const equityPercent = getEquityPercentage(
    property.equityAmount,
    property.estimatedCurrentValue
  );
  const loanBalance =
    property.estimatedCurrentValue - property.equityAmount;

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Hi {firstName} 👋
          </h1>
          <p className="mt-2 text-muted">
            Here&apos;s everything happening with your home.
          </p>
        </div>

        <div className="mb-8 flex gap-6 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-violet text-violet"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {property.address}
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-bg-secondary p-4">
                  <p className="text-sm text-muted">Estimated value</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {formatCurrency(property.estimatedCurrentValue)}
                  </p>
                </div>
                <div className="rounded-lg bg-bg-secondary p-4">
                  <p className="text-sm text-muted">Equity built</p>
                  <p className="mt-1 text-lg font-semibold text-accent">
                    {formatCurrency(property.equityAmount)}
                  </p>
                </div>
                <div className="rounded-lg bg-bg-secondary p-4">
                  <p className="text-sm text-muted">Loan balance</p>
                  <p className="mt-1 text-lg font-semibold text-violet">
                    {formatCurrency(loanBalance)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted">Ownership progress</p>
                <div className="mt-3">
                  <div className="h-2 overflow-hidden rounded-lg bg-border">
                    <div
                      className="h-full rounded-lg bg-brand transition-all"
                      style={{ width: `${equityPercent}%` }}
                      role="progressbar"
                      aria-valuenow={equityPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${equityPercent}% equity`}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted">
                    <span>Mortgage</span>
                    <span>{equityPercent}% owned outright</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-4">
            {marketplaceRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}

            <Link
              href="/marketplace/insurance"
              className="card flex items-center gap-4 p-5 transition-colors hover:bg-bg-secondary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-secondary text-muted">
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
                <p className="font-semibold text-foreground">
                  Start a new request
                </p>
                <p className="mt-1 text-sm text-muted">
                  Insurance, mortgage, or maintenance — we&apos;ll connect you
                  with the right people.
                </p>
              </div>
            </Link>
          </div>
        )}

        {activeTab === "report" && (
          <div className="card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Home Health Check
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Last updated {formatDate(lastHealthCheckDate)}
                </p>
              </div>
              <Link href="/check" className="btn-violet h-11 px-6 text-sm">
                Run a new check
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-bg-secondary p-4">
                <p className="text-sm text-muted">Insurance gap</p>
                <p className="mt-1 text-lg font-semibold text-danger">$164K</p>
              </div>
              <div className="rounded-lg bg-bg-secondary p-4">
                <p className="text-sm text-muted">Refix in</p>
                <p className="mt-1 text-lg font-semibold text-warning">
                  47 days
                </p>
              </div>
              <div className="rounded-lg bg-bg-secondary p-4">
                <p className="text-sm text-muted">Maintenance</p>
                <p className="mt-1 text-lg font-semibold text-danger">
                  1 overdue
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm text-muted">
                Run a new check anytime your situation changes.{" "}
                <Link
                  href="/check"
                  className="font-medium text-violet hover:underline"
                >
                  Start a new Home Health Check
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
