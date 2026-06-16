/**
 * Agent-handover demo context shared across the homeowner portal screens.
 * The property record was pre-loaded by the agent at settlement — these
 * values describe that handover, not the live health-check calculation
 * (which still comes from sessionStorage via the demo seed).
 */
import { calculateDaysUntilRefix } from "@/lib/calculations/report";

/**
 * Single canonical refix date for Jane's mortgage. Both the seeded health
 * check (/report) and the authenticated area compute days from this same
 * value, so the day count stays consistent everywhere and current.
 */
export const REFIX_DATE = "2026-10-01";

export const HANDOVER = {
  agentName: "Mark Williams",
  agency: "Tall Poppy Tauranga",
  agencyFull: "Tall Poppy Real Estate, Tauranga",
  settlementDateLabel: "15 March 2024",
  purchasePrice: 1_285_000,
  previousOwnerYears: 14,
  propertyType: "Freehold residential",
} as const;

export const PROPERTY = {
  address: "14 Cameron Road, Tauranga",
  floorArea: 262,
  yearBuilt: 1998,
  buildQuality: "Above Standard",
  region: "Bay of Plenty",
} as const;

export const FINANCES = {
  mortgage: 480_000,
  refixDateLabel: "1 Oct 2026",
  // Computed from the canonical REFIX_DATE so it matches /report and stays
  // current as the pitch approaches (no stale hardcoded day count).
  refixDays: calculateDaysUntilRefix(REFIX_DATE),
  equity: HANDOVER.purchasePrice - 480_000, // 805,000
  lvrPercent: 37.4, // 480 / 1285
  extraMonthly: 500,
  extraSavings: 153_891,
  extraYearsSooner: 6.7,
  insuranceCover: 900_000,
  rebuildCost: 1_063_290,
  insuranceGap: 163_290,
  interestRate: 6.5,
} as const;

export const HOME_HEALTH_SCORE = {
  overall: 68,
  attentionCount: 2,
  // Five pillars. Safety rolls up the physical-safety items (structural,
  // mould, warmth, electrical, plumbing) and Planning is new — neither is
  // assessed yet, so both read as quiet "unknown" with no number.
  subScores: [
    { key: "insurance", label: "Insurance", score: 45, status: "urgent" },
    { key: "mortgage", label: "Mortgage", score: 82, status: "good" },
    { key: "documents", label: "Documents", score: 78, status: "attention" },
    { key: "safety", label: "Safety", score: null, status: "unknown" },
    { key: "planning", label: "Planning", score: null, status: "unknown" },
  ],
} as const;

export const HOUSEHOLD = {
  displayName: "Jane & David Thompson",
  occupancyLabel: "Owner-occupiers since March 2024",
  familyLabel: "Family of 4",
  kidsLabel: "Lily (14) · Sam (9)",
  tenureLabel: "Freehold · Owner-occupied",
  members: [
    { name: "Jane Thompson", role: "Primary contact", detail: "jane@example.com" },
    { name: "David Thompson", role: "Co-owner", detail: "" },
    { name: "Lily Thompson", role: "Dependent", detail: "14" },
    { name: "Sam Thompson", role: "Dependent", detail: "9" },
  ],
  pets: [{ name: "Archie", role: "Golden Retriever", detail: "3 years" }],
  photos: {
    jane: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    david: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
} as const;

export type PropertyPhoto = {
  id: string;
  label: string;
  url: string;
};

/** Unsplash-hosted property photography for the handover hero. */
export const PROPERTY_PHOTOS: { hero: PropertyPhoto; thumbnails: PropertyPhoto[] } = {
  hero: {
    id: "exterior",
    label: "Front of house",
    url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
  },
  thumbnails: [
    {
      id: "living",
      label: "Living room",
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    },
    {
      id: "kitchen",
      label: "Kitchen",
      url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    },
    {
      id: "bedroom",
      label: "Master bedroom",
      url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
    },
    {
      id: "garden",
      label: "Garden",
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80",
    },
  ],
};
