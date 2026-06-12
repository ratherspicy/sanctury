"use client";

import Link from "next/link";
import { MAINTENANCE_EVENTS } from "@/lib/my-sanctury/vault-data";
import { PROPERTY } from "@/lib/my-sanctury/handover-data";

type UpcomingItem = {
  id: string;
  title: string;
  cadence: string;
  detail: string;
  action: string;
  tone: "warning" | "upcoming";
};

const UPCOMING: UpcomingItem[] = [
  {
    id: "heat-pump",
    title: "Heat pump service",
    cadence: "Recommended every 2 years",
    detail: "Last serviced: unknown",
    action: "Book a tradie →",
    tone: "warning",
  },
  {
    id: "gutter-clear",
    title: "Gutter clear",
    cadence: "Recommended annually",
    detail: "Best time: April–May",
    action: "Schedule reminder →",
    tone: "upcoming",
  },
  {
    id: "roof-inspection",
    title: "Roof inspection",
    cadence: "Recommended every 5 years",
    detail: "Last inspected: unknown",
    action: "Book a tradie →",
    tone: "warning",
  },
];

export function MaintenanceView() {
  // The March 2024 plumbing repair lives in the vault record — surface it
  // here so the maintenance story starts with what's already known.
  const recentRecord = MAINTENANCE_EVENTS.find((e) => e.id === "kitchen-leak");

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Maintenance
        </h1>
        <p className="mt-1 text-sm text-muted">
          {PROPERTY.address}{" "}· what&apos;s been done, what&apos;s coming up.
        </p>
      </div>

      {/* Recent record (from the vault) */}
      {recentRecord && (
        <section aria-label="Recent maintenance record">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Most recent record
          </h2>
          <article className="card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-bold text-foreground">
                {recentRecord.date}
              </p>
              <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                {recentRecord.category}
              </span>
            </div>
            <h3 className="mt-2 text-base font-bold text-foreground">
              {recentRecord.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{recentRecord.contractor}</p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {recentRecord.cost}
            </p>
            <span
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                recentRecord.signOff.type === "certified"
                  ? "bg-accent-light text-accent"
                  : "bg-amber-50 text-warning"
              }`}
            >
              {recentRecord.signOff.type === "certified" ? (
                <span aria-hidden>✅</span>
              ) : (
                <span aria-hidden>⚠️</span>
              )}
              {recentRecord.signOff.label}
            </span>
            <p className="mt-3 text-sm italic text-muted">{recentRecord.notes}</p>
            {recentRecord.infoBox && (
              <div className="mt-4 rounded-lg border border-warning/30 bg-amber-50 px-4 py-3 text-sm text-foreground">
                {recentRecord.infoBox}
              </div>
            )}
            <p className="mt-4 text-sm">
              <Link
                href="/my-sanctury/vault"
                className="font-medium text-violet hover:underline"
              >
                See the full record in your vault →
              </Link>
            </p>
          </article>
        </section>
      )}

      {/* Upcoming maintenance */}
      <section aria-label="Upcoming maintenance">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Coming up
        </h2>
        <div className="space-y-3">
          {UPCOMING.map((item) => (
            <article
              key={item.id}
              className={`rounded-xl border-l-4 p-4 ${
                item.tone === "warning"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-300 bg-bg-secondary"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.tone === "warning"
                      ? "bg-white/70 text-warning"
                      : "bg-white text-muted"
                  }`}
                >
                  {item.tone === "warning" ? "Due" : "Upcoming"}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                {item.cadence} · {item.detail}
              </p>
              <button
                type="button"
                className="mt-3 text-sm font-semibold text-foreground hover:text-violet"
              >
                {item.action}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Tradesperson contacts */}
      <section aria-label="Your tradespeople">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Your tradespeople
        </h2>
        <div className="card flex items-start gap-4 p-4 sm:p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-light text-base font-bold text-violet">
            MT
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-foreground">Mike Tauroa</p>
            <p className="mt-0.5 text-xs text-muted">Tauranga Plumbing Co</p>
            <a
              href="tel:0274458821"
              className="mt-0.5 inline-block text-xs font-medium text-violet hover:underline"
            >
              027 445 8821
            </a>
            <p className="mt-2 text-xs italic text-muted">
              &ldquo;Knows the history of your wall&rdquo;
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-transparent px-4 py-4 text-sm font-medium text-muted transition-colors hover:border-violet hover:text-violet"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Add a tradesperson
        </button>
      </section>
    </div>
  );
}
