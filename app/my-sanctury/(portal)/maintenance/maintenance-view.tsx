"use client";

import Link from "next/link";
import { MAINTENANCE_EVENTS } from "@/lib/my-sanctury/vault-data";
import { PROPERTY } from "@/lib/my-sanctury/handover-data";
import { ICON_MAP } from "../components/icon-map";
import { HorizontalScroll } from "../components/horizontal-scroll";
import { StatusCard } from "../components/status-card";
import { ListItem } from "../components/list-item";
import type { StatusKey } from "../components/status-system";

type UpcomingItem = {
  id: string;
  title: string;
  cadence: string;
  detail: string;
  action: string;
  status: StatusKey;
  icon: (typeof ICON_MAP)[keyof typeof ICON_MAP];
};

const UPCOMING: UpcomingItem[] = [
  {
    id: "heat-pump",
    title: "Heat pump service",
    cadence: "Recommended every 2 years",
    detail: "Last serviced: unknown",
    action: "Book a tradie",
    status: "attention",
    icon: ICON_MAP.warmth,
  },
  {
    id: "gutter-clear",
    title: "Gutter clear",
    cadence: "Recommended annually",
    detail: "Best time: April–May",
    action: "Schedule reminder",
    status: "unknown", // scheduled, not overdue — must read quiet
    icon: ICON_MAP.structural,
  },
  {
    id: "roof-inspection",
    title: "Roof inspection",
    cadence: "Recommended every 5 years",
    detail: "Last inspected: unknown",
    action: "Book a tradie",
    status: "attention",
    icon: ICON_MAP.structural,
  },
];

export function MaintenanceView() {
  // The March 2024 plumbing repair lives in the vault record — surface it
  // here so the maintenance story starts with what's already known.
  const recentRecord = MAINTENANCE_EVENTS.find((e) => e.id === "kitchen-leak");
  const Droplet = ICON_MAP.plumbing;

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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E0F2FE", color: "#0369A1" }}
                >
                  <Droplet className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
                <p className="text-sm font-bold text-foreground">
                  {recentRecord.date}
                </p>
              </div>
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

      {/* Upcoming maintenance — StatusCards */}
      <section aria-label="Upcoming maintenance">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Coming up
        </h2>
        <HorizontalScroll smGridCols={3}>
          {UPCOMING.map((item) => (
            <StatusCard
              key={item.id}
              compact
              icon={item.icon}
              label={item.title}
              status={item.status}
              detail={`${item.cadence} · ${item.detail}`}
              cta={{ label: item.action }}
            />
          ))}
        </HorizontalScroll>
      </section>

      {/* Tradesperson contacts */}
      <section aria-label="Your tradespeople">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Your tradespeople
        </h2>
        <div className="card p-4 sm:p-5">
          <ListItem
            initials="MT"
            title="Mike Tauroa"
            meta="Tauranga Plumbing Co"
            action={
              <a
                href="tel:0274458821"
                className="text-xs font-medium text-violet hover:underline"
              >
                027 445 8821
              </a>
            }
          />
          <p className="mt-1 pl-12 text-xs italic text-muted">
            &ldquo;Knows the history of your wall&rdquo;
          </p>
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
