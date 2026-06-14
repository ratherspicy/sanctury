"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { seedDemoDataIfEmpty } from "@/lib/storage/demo-seed";
import {
  FINANCES,
  HANDOVER,
  HOME_HEALTH_SCORE,
  HOUSEHOLD,
  PROPERTY,
  PROPERTY_PHOTOS,
} from "@/lib/my-sanctury/handover-data";

type DashboardViewProps = { firstName: string };

const SUB_SCORE_COLORS: Record<string, string> = {
  danger: "#DC2626",
  accent: "#16A34A",
  warning: "#D97706",
};

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#EEEDF8"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#6D5FD8"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black tracking-tight text-foreground">
          {score}
        </span>
        <span className="text-xs font-medium text-muted">/ 100</span>
      </div>
    </div>
  );
}

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const QUICK_NAV = [
  {
    label: "Finances",
    description: "Equity, mortgage, insurance",
    href: "/my-sanctury/finances",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path d="M4 19V5M4 19h16M8 15v-3m4 3V9m4 6v-5" {...strokeProps} />
      </svg>
    ),
  },
  {
    label: "Documents",
    description: "Your property record",
    href: "/my-sanctury/vault",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
          {...strokeProps}
        />
      </svg>
    ),
  },
  {
    label: "Maintenance",
    description: "Record and planner",
    href: "/my-sanctury/maintenance",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
          {...strokeProps}
        />
      </svg>
    ),
  },
  {
    label: "Marketplace",
    description: "Advisers and services",
    href: "/my-sanctury/marketplace",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M4 7l1.5-4h13L20 7M4 7h16M4 7v12a1 1 0 001 1h14a1 1 0 001-1V7M9 11a3 3 0 006 0"
          {...strokeProps}
        />
      </svg>
    ),
  },
];

const PRIORITY_ACTIONS = [
  {
    id: "insurance",
    eyebrow: "Insurance gap",
    headline: `${formatCurrency(FINANCES.insuranceGap)} underinsured`,
    action: "Review your cover →",
    href: "/marketplace/insurance",
    cardClass: "border-l-4 border-[#DC2626] bg-red-50",
    eyebrowClass: "text-danger",
  },
  {
    id: "mortgage",
    eyebrow: "Mortgage refix",
    headline: `${FINANCES.refixDays} days`,
    detail: `Refix date ${FINANCES.refixDateLabel}`,
    action: "See options →",
    href: "/my-sanctury/finances",
    cardClass: "border-l-4 border-amber-500 bg-amber-50",
    eyebrowClass: "text-warning",
  },
  {
    id: "documents",
    eyebrow: "2 documents to review",
    headline: "LIM expires this year",
    action: "Open vault →",
    href: "/my-sanctury/vault",
    cardClass: "border-l-4 border-[#6D5FD8] bg-violet-light",
    eyebrowClass: "text-violet",
  },
];

const DETAIL_CHIPS = [
  { label: "Purchase price", value: formatCurrency(HANDOVER.purchasePrice) },
  { label: "Floor area", value: `${PROPERTY.floorArea}m²` },
  { label: "Year built", value: String(PROPERTY.yearBuilt) },
  { label: "Build quality", value: PROPERTY.buildQuality },
  { label: "Region", value: PROPERTY.region },
];

// Phase 1 teaser — UI only, no functionality yet.
const PHYSICAL_SAFETY = [
  {
    id: "structural",
    label: "Structural",
    status: "Last inspection unknown",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path d="M4 10v10h16V10M2 11l10-8 10 8M9 20v-6h6v6" {...strokeProps} />
      </svg>
    ),
  },
  {
    id: "mould",
    label: "Mould & damp",
    status: "No damp assessment on file",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" {...strokeProps} />
      </svg>
    ),
  },
  {
    id: "warmth",
    label: "Warmth",
    status: "Heat pump service unknown",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 2c1 3-1 4-1 6a3 3 0 006 0c0-1-.5-2-1-3 2 1 4 4 4 8a8 8 0 01-16 0c0-4 3-7 5-9 1 .5 2 1 3 1z"
          {...strokeProps}
        />
      </svg>
    ),
  },
  {
    id: "electrical",
    label: "Electrical",
    status: "CoC from 2019 — 7 years ago",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path d="M13 2L4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2z" {...strokeProps} />
      </svg>
    ),
  },
  {
    id: "plumbing",
    label: "Plumbing",
    status: "Pipe material unknown for 1998 build",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 8h8a4 4 0 014 4v8M4 4v8m0-4h4m12-4v8m0-4h-4"
          {...strokeProps}
        />
      </svg>
    ),
  },
];

export function DashboardView({ firstName }: DashboardViewProps) {
  const [householdOpen, setHouseholdOpen] = useState(false);

  useEffect(() => {
    seedDemoDataIfEmpty();
  }, []);

  return (
    <div>
      {/* Hero — the home, already waiting */}
      <section className="relative h-[60vh] max-h-[560px] min-h-[380px] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROPERTY_PHOTOS.hero.url}
          alt={PROPERTY_PHOTOS.hero.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10, 10, 10, 0.78) 0%, rgba(10, 10, 10, 0.35) 40%, transparent 60%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-4xl px-5 pb-7 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-widest text-white/75">
              Welcome home{firstName !== "there" ? `, ${firstName}` : ""}
            </p>
            <h1 className="!text-white mt-2 text-xl font-bold leading-tight tracking-tight sm:text-3xl">
              {PROPERTY.address}
            </h1>
            <p className="mt-1.5 text-sm text-white/70">
              {PROPERTY.floorArea}m² · Built {PROPERTY.yearBuilt} ·{" "}
              {PROPERTY.buildQuality} · {PROPERTY.region}
            </p>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              Handed over by {HANDOVER.agentName} · {HANDOVER.agency}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  {...strokeProps}
                />
              </svg>
              Settled {HANDOVER.settlementDateLabel} ·{" "}
              {formatCurrency(HANDOVER.purchasePrice)}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:px-6">
        {/* Homeowner profile — the emotional anchor of the page */}
        <section
          aria-label="Household profile"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 -space-x-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HOUSEHOLD.photos.jane}
                alt="Jane Thompson"
                className="h-16 w-16 rounded-full border-2 border-surface object-cover shadow-sm sm:h-[68px] sm:w-[68px]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HOUSEHOLD.photos.david}
                alt="David Thompson"
                className="h-16 w-16 rounded-full border-2 border-surface object-cover shadow-sm sm:h-[68px] sm:w-[68px]"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {HOUSEHOLD.displayName}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {HOUSEHOLD.occupancyLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs text-muted sm:text-right">
            <p className="flex items-center gap-1.5 sm:justify-end">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <path
                  d="M16 19v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1m20 0v-1a4 4 0 00-3-3.87M15 3.13a4 4 0 010 7.75M12 7a3 3 0 11-6 0 3 3 0 016 0z"
                  {...strokeProps}
                />
              </svg>
              {HOUSEHOLD.familyLabel}
            </p>
            <p>{HOUSEHOLD.kidsLabel}</p>
            <p>{HOUSEHOLD.tenureLabel}</p>
          </div>
        </section>

        {/* Photo thumbnails */}
        <section aria-label="Property photos">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {PROPERTY_PHOTOS.thumbnails.map((photo) => (
              <figure key={photo.id} className="group relative overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-1.5 left-2 rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-medium text-white">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Sanctury Score */}
        <section className="card flex flex-col items-center gap-5 p-6 sm:flex-row sm:gap-10 sm:p-8">
          <ScoreRing score={HOME_HEALTH_SCORE.overall} />
          <div className="flex w-full flex-1 flex-col items-center sm:items-start">
            <h2 className="text-lg font-bold text-foreground">
              Your Sanctury Score
            </h2>
            <p className="mt-1 text-sm text-muted">
              {HOME_HEALTH_SCORE.attentionCount} things need your attention
            </p>
            <dl className="mt-5 grid w-full grid-cols-3 gap-3">
              {HOME_HEALTH_SCORE.subScores.map((sub) => (
                <div
                  key={sub.label}
                  className="rounded-xl bg-bg-secondary px-3 py-3 text-center"
                >
                  <dt className="text-xs font-medium text-muted">{sub.label}</dt>
                  <dd
                    className="mt-1 text-lg font-bold"
                    style={{ color: SUB_SCORE_COLORS[sub.tone] }}
                  >
                    {sub.score}
                    <span className="text-xs font-medium text-muted">/100</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Physical Safety — Phase 1 teaser */}
        <section aria-label="Physical safety">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
              Physical Safety
            </h2>
            <span className="rounded-full bg-bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted">
              Coming soon
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {PHYSICAL_SAFETY.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl border-l-4 bg-surface p-4 shadow-sm"
                style={{ borderLeftColor: "#D97706" }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-[#D97706]">
                  {item.icon}
                </span>
                <p className="mt-2.5 text-sm font-bold text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 flex-1 text-xs text-muted">{item.status}</p>
                <button
                  type="button"
                  className="mt-3 self-start text-sm font-semibold text-[#D97706] hover:underline"
                >
                  Assess →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Priority actions */}
        <section aria-label="Priority actions">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Needs your attention
          </h2>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {PRIORITY_ACTIONS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className={`flex min-w-[240px] snap-start flex-col rounded-xl p-4 transition-opacity hover:opacity-90 sm:min-w-0 ${card.cardClass}`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${card.eyebrowClass}`}
                >
                  {card.eyebrow}
                </p>
                <p className="mt-1.5 text-lg font-bold text-foreground">
                  {card.headline}
                </p>
                {card.detail && (
                  <p className="mt-0.5 text-xs text-muted">{card.detail}</p>
                )}
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {card.action}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick nav tiles */}
        <section aria-label="Explore your home">
          <div className="grid grid-cols-2 gap-3">
            {QUICK_NAV.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="card flex flex-col gap-3 p-5 transition-colors hover:bg-violet-light/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-light text-violet">
                  {tile.icon}
                </span>
                <span>
                  <span className="block text-sm font-bold text-foreground">
                    {tile.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {tile.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Your household */}
        <section aria-label="Your household" className="card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Your household
            </h2>
            <button
              type="button"
              onClick={() => setHouseholdOpen((s) => !s)}
              aria-expanded={householdOpen}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-bg-secondary md:hidden"
            >
              <svg
                viewBox="0 0 16 16"
                className={`h-4 w-4 transition-transform ${householdOpen ? "rotate-180" : ""}`}
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
          </div>
          <div className={`${householdOpen ? "block" : "hidden"} md:block`}>
            <ul className="mt-3 divide-y divide-border">
              {HOUSEHOLD.members.map((member) => (
                <li
                  key={member.name}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted">
                      {member.role}
                      {member.detail ? ` · ${member.detail}` : ""}
                    </p>
                  </div>
                </li>
              ))}
              {HOUSEHOLD.pets.map((pet) => (
                <li key={pet.name} className="flex items-center gap-3 py-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-light text-violet">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                      <circle cx="11" cy="4" r="2" {...strokeProps} />
                      <circle cx="18" cy="8" r="2" {...strokeProps} />
                      <circle cx="20" cy="16" r="2" {...strokeProps} />
                      <path
                        d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
                        {...strokeProps}
                      />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {pet.name}
                    </p>
                    <p className="text-xs text-muted">
                      {pet.role} · {pet.detail}
                    </p>
                  </div>
                </li>
              ))}
              <li className="flex items-center justify-between gap-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-muted">
                    Emergency contact
                  </p>
                  <p className="text-xs text-muted/80">None on file</p>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-violet hover:underline"
                >
                  Add →
                </button>
              </li>
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <button
                type="button"
                className="text-sm font-medium text-violet hover:underline"
              >
                Edit household
              </button>
            </div>
            <p className="mt-3 text-xs text-muted/80">
              Your household profile helps Sanctury surface the right services
              at the right time.
            </p>
          </div>
        </section>

        {/* Property details strip */}
        <section aria-label="Property details">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Property details
          </h2>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {DETAIL_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className="card min-w-[140px] shrink-0 px-4 py-3 sm:min-w-0"
              >
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                  {chip.label}
                </p>
                <p className="mt-0.5 whitespace-nowrap text-sm font-bold text-foreground">
                  {chip.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            {HANDOVER.propertyType} · Previous owner occupied{" "}
            {HANDOVER.previousOwnerYears} years · Record prepared by{" "}
            {HANDOVER.agentName}, {HANDOVER.agencyFull}
          </p>
        </section>
      </div>
    </div>
  );
}
