import { formatCurrency } from "@/lib/format";

export type QuoteHighlight = {
  label: string;
  included: boolean;
};

export type QuoteFeatureRow = {
  label: string;
  included: boolean;
};

export type InsuranceQuote = {
  id: string;
  arrivalDelayMs: number;
  name: string;
  title: string;
  region: string;
  initials: string;
  photo: string;
  responseTime: string;
  rating: number;
  reviewCount: number;
  insurer: string;
  policyName: string;
  sumInsured: number;
  monthlyPremium: number;
  excess: number;
  highlights: QuoteHighlight[];
  featuresTable: QuoteFeatureRow[];
  excessOptions: string[];
  exclusions: string[];
  getPersonalNote: (gap: number, region: string, address?: string) => string;
};

export const INSURANCE_QUOTES: InsuranceQuote[] = [
  {
    id: "sarah-mitchell",
    arrivalDelayMs: 1500,
    name: "Sarah Mitchell",
    title: "Independent Insurance Adviser",
    region: "Bay of Plenty",
    initials: "SM",
    photo: "/avatars/sarah-mitchell.jpg",
    responseTime: "Responded in 42 minutes",
    rating: 4.9,
    reviewCount: 127,
    insurer: "Tower",
    policyName: "Tower Home and Contents",
    sumInsured: 1064000,
    monthlyPremium: 241,
    excess: 500,
    highlights: [
      { label: "Full rebuild cover", included: true },
      { label: "Contents included", included: true },
      { label: "Natural hazard cover", included: true },
      { label: "Temporary accommodation", included: true },
      { label: "New for old replacement", included: true },
      { label: "Liability cover", included: true },
    ],
    featuresTable: [
      { label: "Full rebuild cover to sum insured", included: true },
      { label: "Contents cover (80% of sum insured)", included: true },
      { label: "Natural hazards (earthquake, flood where eligible)", included: true },
      { label: "Temporary accommodation (up to 12 months)", included: true },
      { label: "New for old replacement on dwelling", included: true },
      { label: "Legal liability ($2m)", included: true },
      { label: "Gradual damage", included: false },
      { label: "Landscaping over $5,000", included: false },
    ],
    excessOptions: ["$500 standard excess", "$1,000 reduced premium option", "$2,500 premium saver"],
    exclusions: [
      "Unrepaired pre-existing damage",
      "Vacant property over 60 consecutive days",
      "Commercial use of home without disclosure",
    ],
    getPersonalNote: (gap, region) =>
      `I've recommended Tower Home and Contents because it closes your ${formatCurrency(gap)} coverage gap with a sum insured of $1,064,000 — fully covering your estimated rebuild cost in ${region}. Tower's package is straightforward for homeowners who want solid core cover without paying for premium extras they won't use. This is the option I'd choose for my own clients in your situation.`,
  },
  {
    id: "james-tauroa",
    arrivalDelayMs: 3500,
    name: "James Tauroa",
    title: "Senior Insurance Broker",
    region: "Auckland",
    initials: "JT",
    photo: "/avatars/james-tauroa.jpg",
    responseTime: "Responded in 1 hour 15 minutes",
    rating: 4.8,
    reviewCount: 203,
    insurer: "Vero",
    policyName: "Vero Premier Home",
    sumInsured: 1150000,
    monthlyPremium: 268,
    excess: 400,
    highlights: [
      { label: "Full rebuild cover", included: true },
      { label: "Contents included", included: true },
      { label: "Natural hazard cover", included: true },
      { label: "Temporary accommodation", included: true },
      { label: "New for old replacement", included: true },
      { label: "Liability cover", included: true },
    ],
    featuresTable: [
      { label: "Full rebuild cover to sum insured", included: true },
      { label: "Contents cover (unlimited specified items option)", included: true },
      { label: "Natural hazards including tsunami cover", included: true },
      { label: "Temporary accommodation (up to 24 months)", included: true },
      { label: "New for old replacement — dwelling and contents", included: true },
      { label: "Legal liability ($5m)", included: true },
      { label: "Spoilage of frozen food", included: true },
      { label: "Landscaping", included: false },
    ],
    excessOptions: ["$400 Premier excess", "$750 standard", "$1,500 reduced premium"],
    exclusions: [
      "Known structural defects not disclosed",
      "Unconsented building work",
      "Wear and tear",
    ],
    getPersonalNote: (gap, region, address) =>
      `Vero Premier Home offers the highest sum insured in your comparison at $1,150,000. I've priced this deliberately above the estimated rebuild figure because ${region} properties like yours at ${address} benefit from a buffer — building cost blowouts during a claim are common, and being underinsured at claim time is far costlier than a slightly higher premium today. You're closing a ${formatCurrency(gap)} gap with room to spare. Premier also adds higher liability limits and extended temporary accommodation.`,
  },
  {
    id: "rachel-chen",
    arrivalDelayMs: 6000,
    name: "Rachel Chen",
    title: "Insurance Adviser",
    region: "Wellington",
    initials: "RC",
    photo: "/avatars/rachel-chen.jpg",
    responseTime: "Responded in 58 minutes",
    rating: 4.9,
    reviewCount: 89,
    insurer: "AMI",
    policyName: "AMI Home Insurance",
    sumInsured: 1065000,
    monthlyPremium: 232,
    excess: 750,
    highlights: [
      { label: "Full rebuild cover", included: true },
      { label: "Contents included", included: true },
      { label: "Natural hazard cover", included: true },
      { label: "Temporary accommodation", included: true },
      { label: "New for old replacement", included: true },
      { label: "Liability cover", included: true },
    ],
    featuresTable: [
      { label: "Full rebuild cover to sum insured", included: true },
      { label: "Contents cover (sum insured basis)", included: true },
      { label: "Natural hazards", included: true },
      { label: "Temporary accommodation (up to 12 months)", included: true },
      { label: "New for old replacement on main dwelling", included: true },
      { label: "Legal liability ($2m)", included: true },
      { label: "Accidental damage to glass", included: true },
      { label: "Deliberate damage by tenants", included: false },
    ],
    excessOptions: ["$750 standard excess", "$1,000 mid-tier", "$2,000 lower premium option"],
    exclusions: [
      "Damage from gradual deterioration",
      "Properties with unresolved weather-tightness issues",
      "Home office over 50% of floor area without endorsement",
    ],
    getPersonalNote: (gap, region) =>
      `AMI Home Insurance is my value recommendation: at $232 per month it's the most competitive premium here while still closing your ${formatCurrency(gap)} shortfall with a $1,065,000 sum insured — above your estimated rebuild cost. For homeowners in ${region} who want dependable cover without overpaying for premium-tier extras, AMI consistently delivers. The trade-off is a higher standard excess ($750), which suits most clients who prefer lower ongoing costs.`,
  },
];

export const TOTAL_QUOTES = INSURANCE_QUOTES.length;

export function getQuoteById(id: string): InsuranceQuote | undefined {
  return INSURANCE_QUOTES.find((q) => q.id === id);
}

/** Map quote id to adviser id for confirmation page compatibility */
export function getAdviserIdFromQuoteId(quoteId: string): string {
  return quoteId;
}
