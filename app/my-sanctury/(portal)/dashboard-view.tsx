"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  CalendarCheck,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
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
import { ICON_MAP } from "./components/icon-map";
import { HorizontalScroll } from "./components/horizontal-scroll";
import { StatusCard } from "./components/status-card";
import {
  STATUS_STYLES,
  UNKNOWN_ICON_BG,
  type StatusKey,
} from "./components/status-system";

type DashboardViewProps = { firstName: string };

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#EEEDF8" strokeWidth="10" />
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

const PILLAR_ICON: Record<string, LucideIcon> = {
  insurance: ICON_MAP.insurance,
  mortgage: ICON_MAP.mortgage,
  documents: ICON_MAP.documents,
  safety: ShieldCheck,
  planning: CalendarCheck,
};

const QUICK_NAV: { label: string; description: string; href: string; icon: LucideIcon }[] = [
  { label: "Finances", description: "Equity, mortgage, insurance", href: "/my-sanctury/finances", icon: ICON_MAP.equity },
  { label: "Documents", description: "Your property record", href: "/my-sanctury/vault", icon: ICON_MAP.documents },
  { label: "Maintenance", description: "Record and planner", href: "/my-sanctury/maintenance", icon: ICON_MAP.maintenance },
  { label: "Marketplace", description: "Advisers and services", href: "/my-sanctury/marketplace", icon: ICON_MAP.marketplace },
];

const PRIORITY_ACTIONS: {
  id: string;
  icon: LucideIcon;
  label: string;
  status: StatusKey;
  detail: string;
  cta: { label: string; href: string };
}[] = [
  {
    id: "insurance",
    icon: ICON_MAP.insurance,
    label: `${formatCurrency(FINANCES.insuranceGap)} underinsured`,
    status: "urgent",
    detail: "Your cover sits below the rebuild cost.",
    cta: { label: "Review your cover", href: "/marketplace/insurance" },
  },
  {
    id: "mortgage",
    icon: ICON_MAP.mortgage,
    label: `Mortgage refix in ${FINANCES.refixDays} days`,
    status: "attention",
    detail: `Refix date ${FINANCES.refixDateLabel}.`,
    cta: { label: "See options", href: "/my-sanctury/finances" },
  },
  {
    id: "documents",
    icon: ICON_MAP.documents,
    label: "2 documents to review",
    status: "attention",
    detail: "LIM expires this year.",
    cta: { label: "Open vault", href: "/my-sanctury/vault" },
  },
];

const DETAIL_CHIPS = [
  { label: "Purchase price", value: formatCurrency(HANDOVER.purchasePrice) },
  { label: "Floor area", value: `${PROPERTY.floorArea}m²` },
  { label: "Year built", value: String(PROPERTY.yearBuilt) },
  { label: "Build quality", value: PROPERTY.buildQuality },
  { label: "Region", value: PROPERTY.region },
];

function ScorePillar({
  pillar,
}: {
  pillar: { key: string; label: string; score: number | null; status: string };
}) {
  const status = pillar.status as StatusKey;
  const s = STATUS_STYLES[status];
  const isUnknown = status === "unknown";
  const Icon = PILLAR_ICON[pillar.key] ?? ICON_MAP.unknown;

  return (
    <div className="flex min-w-[84px] snap-start flex-col items-center sm:min-w-0">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          backgroundColor: isUnknown ? UNKNOWN_ICON_BG : s.bg,
          color: s.text,
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span
        className="mt-1.5 text-lg font-bold leading-none"
        style={{ color: s.text }}
      >
        {pillar.score ?? "—"}
      </span>
      <span className="mt-1 text-[11px] font-medium text-muted">
        {pillar.label}
      </span>
    </div>
  );
}

export function DashboardView({ firstName }: DashboardViewProps) {
  const [householdOpen, setHouseholdOpen] = useState(false);

  useEffect(() => {
    seedDemoDataIfEmpty();
  }, []);

  const householdChips = [
    ...HOUSEHOLD.members.map((m) => ({
      name: m.name.split(" ")[0],
      photo: m.name.startsWith("Jane")
        ? HOUSEHOLD.photos.jane
        : m.name.startsWith("David")
          ? HOUSEHOLD.photos.david
          : undefined,
      isPet: false,
    })),
    ...HOUSEHOLD.pets.map((p) => ({ name: p.name, photo: undefined, isPet: true })),
  ];

  const PetIcon = ICON_MAP.pet;

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
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              <p className="mt-1 text-sm text-muted">{HOUSEHOLD.occupancyLabel}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs text-muted sm:text-right">
            <p className="flex items-center gap-1.5 sm:justify-end">
              <ICON_MAP.household className="h-3.5 w-3.5" strokeWidth={1.8} />
              {HOUSEHOLD.familyLabel}
            </p>
            <p>{HOUSEHOLD.kidsLabel}</p>
            <p>{HOUSEHOLD.tenureLabel}</p>
          </div>
        </section>

        {/* Photo gallery — horizontal scroll */}
        <section aria-label="Property photos">
          <HorizontalScroll>
            {PROPERTY_PHOTOS.thumbnails.map((photo) => (
              <figure
                key={photo.id}
                className="group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[300px]"
              >
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
          </HorizontalScroll>
        </section>

        {/* Sanctury Score — five pillars */}
        <section className="card p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-10">
            <ScoreRing score={HOME_HEALTH_SCORE.overall} />
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold text-foreground">
                Your Sanctury Score
              </h2>
              <p className="mt-1 text-sm text-muted">
                {HOME_HEALTH_SCORE.attentionCount} things need your attention
              </p>
              <p className="mt-1 text-xs text-muted">
                Safety and Planning not yet assessed
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <HorizontalScroll smGridCols={5} bleed={false}>
              {HOME_HEALTH_SCORE.subScores.map((pillar) => (
                <ScorePillar key={pillar.key} pillar={pillar} />
              ))}
            </HorizontalScroll>
          </div>
        </section>

        {/* Needs your attention */}
        <section aria-label="Priority actions">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Needs your attention
          </h2>
          <HorizontalScroll smGridCols={3}>
            {PRIORITY_ACTIONS.map((card) => (
              <StatusCard
                key={card.id}
                compact
                icon={card.icon}
                label={card.label}
                status={card.status}
                detail={card.detail}
                cta={card.cta}
              />
            ))}
          </HorizontalScroll>
        </section>

        {/* Quick nav tiles */}
        <section aria-label="Explore your home">
          <div className="grid grid-cols-2 gap-3">
            {QUICK_NAV.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={tile.href}
                  href={tile.href}
                  className="card flex flex-col gap-3 p-5 transition-colors hover:bg-violet-light/50"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-light text-violet">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
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
              );
            })}
          </div>
        </section>

        {/* Your household — chip row, collapsed by default */}
        <section aria-label="Your household" className="card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Your household</h2>
            <button
              type="button"
              onClick={() => setHouseholdOpen((s) => !s)}
              aria-expanded={householdOpen}
              className="inline-flex items-center gap-1 text-sm font-medium text-violet hover:underline"
            >
              {householdOpen ? "Hide details" : "Show details"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${householdOpen ? "rotate-180" : ""}`}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Compact chip row */}
          <div className="mt-4 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {householdChips.map((chip) => (
              <div
                key={chip.name}
                className="flex shrink-0 flex-col items-center"
              >
                <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-violet-light text-violet">
                  {chip.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={chip.photo}
                      alt={chip.name}
                      className="h-full w-full object-cover"
                    />
                  ) : chip.isPet ? (
                    <PetIcon className="h-5 w-5" strokeWidth={1.8} />
                  ) : (
                    <span className="text-sm font-bold">{chip.name[0]}</span>
                  )}
                </span>
                <span className="mt-1.5 text-xs font-medium text-foreground">
                  {chip.name}
                </span>
              </div>
            ))}
          </div>

          {/* Expanded detail */}
          {householdOpen && (
            <div className="mt-4 border-t border-border pt-3">
              <ul className="divide-y divide-border">
                {HOUSEHOLD.members.map((member) => (
                  <li key={member.name} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted">
                        {member.role}
                        {member.detail ? ` · ${member.detail}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
                {HOUSEHOLD.pets.map((pet) => (
                  <li key={pet.name} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{pet.name}</p>
                      <p className="text-xs text-muted">
                        {pet.role} · {pet.detail}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <p className="text-sm font-semibold text-muted">Emergency contact</p>
                    <p className="text-xs text-muted/80">None on file</p>
                  </div>
                  <button type="button" className="text-sm font-semibold text-violet hover:underline">
                    Add →
                  </button>
                </li>
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <button type="button" className="text-sm font-medium text-violet hover:underline">
                  Edit household
                </button>
              </div>
              <p className="mt-3 text-xs text-muted/80">
                Your household profile helps Sanctury surface the right services
                at the right time.
              </p>
            </div>
          )}
        </section>

        {/* Property details strip */}
        <section aria-label="Property details">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Property details
          </h2>
          <HorizontalScroll>
            {DETAIL_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className="card min-w-[140px] shrink-0 snap-start px-4 py-3"
              >
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                  {chip.label}
                </p>
                <p className="mt-0.5 whitespace-nowrap text-sm font-bold text-foreground">
                  {chip.value}
                </p>
              </div>
            ))}
          </HorizontalScroll>
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
