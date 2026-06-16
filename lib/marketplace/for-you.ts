import { FINANCES } from "@/lib/my-sanctury/handover-data";

export type ForYouTone = "urgent" | "timely" | "suggested" | "neutral";

export type ForYouCard = {
  id: string;
  tag: string;
  headline: string;
  reasoning: string;
  provider: string;
  cta: string;
  href?: string;
  tone: ForYouTone;
};

/**
 * Personalised marketplace recommendations for the demo homeowner.
 * Each one is traceable to a fact in Jane's property record — the
 * reasoning line says exactly why it surfaced.
 */
export const FOR_YOU_CARDS: ForYouCard[] = [
  {
    id: "insurance-gap",
    tag: "Insurance",
    headline: "You're $163,290 underinsured",
    reasoning:
      "Your rebuild cost is $1,063,290 but your current cover is $900,000. A total loss would leave you $163,290 short.",
    provider: "3 advisers ready to quote",
    cta: "See quotes →",
    href: "/marketplace/insurance",
    tone: "urgent",
  },
  {
    id: "mortgage-refix",
    tag: "Mortgage",
    headline: `Refix window opens in ${FINANCES.refixDays} days`,
    reasoning:
      "Your mortgage refixes 1 October 2026. Bay of Plenty rates are moving — locking in early could save thousands.",
    provider: "Kahu Advisers · Refix specialists",
    cta: "Talk to an adviser →",
    tone: "urgent",
  },
  {
    id: "plumbing-certificate",
    tag: "Plumbing",
    headline: "Your March 2024 repair has no certificate",
    reasoning:
      "Mike Tauroa fixed a leak at 14 Cameron Road — but no compliance certificate was filed. This could affect insurance claims.",
    provider: "Tauranga Plumbing Co · Mike Tauroa · 027 445 8821",
    cta: "Get it certified →",
    tone: "timely",
  },
  {
    id: "pest-inspection",
    tag: "Building Inspection",
    headline: "No pest inspection on file",
    reasoning:
      "Your property vault has no pre-purchase pest report. For a $1.285M home, a clean report is worth having on record.",
    provider: "2 inspectors in Tauranga",
    cta: "Book inspection →",
    tone: "suggested",
  },
  {
    id: "security-update",
    tag: "Security",
    headline: "New homeowners, updated security?",
    reasoning:
      "You settled in March 2024. Previous owner occupied for 14 years. Updating locks and security systems is recommended for new owners.",
    provider: "ADT · Monitored home security",
    cta: "Get a quote →",
    tone: "suggested",
  },
  {
    id: "heat-pump-service",
    tag: "Heat Pumps & HVAC",
    headline: "Heat pump service overdue",
    reasoning:
      "No HVAC service is recorded for 14 Cameron Road. 1998-era homes often have original heat pump units — a service extends life by 5+ years.",
    provider: "3 HVAC technicians in Tauranga",
    cta: "Book a service →",
    tone: "neutral",
  },
];
