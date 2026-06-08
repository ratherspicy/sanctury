export const PARTNER_STATS = {
  activeLeads: 3,
  proposalsSent: 2,
  jobsWonThisMonth: 1,
  earningsThisMonth: 210,
} as const;

export type LeadUrgency = "urgent" | "new";

export type PartnerLead = {
  id: string;
  name: string;
  location: string;
  address: string;
  currentCover: number;
  estimatedRebuild: number;
  gap: number;
  postedLabel: string;
  urgency: LeadUrgency;
  recommendedSumInsured: number;
  propertyType: string;
  yearBuilt: number;
  floorArea: number;
};

export type ActiveProposal = {
  id: string;
  name: string;
  sentLabel: string;
  sumInsured: number;
  premiumAnnual: number;
  status: string;
};

export type WonJob = {
  id: string;
  name: string;
  wonLabel: string;
  sumInsured: number;
  premiumAnnual: number;
  successFee: number;
};

export const PARTNER_LEADS: PartnerLead[] = [
  {
    id: "jane",
    name: "Jane Thompson",
    location: "Tauranga, Bay of Plenty",
    address: "14 Cameron Road, Tauranga",
    currentCover: 600_000,
    estimatedRebuild: 1_063_290,
    gap: 163_290,
    postedLabel: "2 hours ago",
    urgency: "urgent",
    recommendedSumInsured: 750_000,
    propertyType: "Standalone house",
    yearBuilt: 1998,
    floorArea: 262,
  },
  {
    id: "michael",
    name: "Michael Brown",
    location: "Mount Maunganui, Bay of Plenty",
    address: "8 Oceanview Parade, Mount Maunganui",
    currentCover: 480_000,
    estimatedRebuild: 590_000,
    gap: 110_000,
    postedLabel: "1 day ago",
    urgency: "new",
    recommendedSumInsured: 595_000,
    propertyType: "Standalone house",
    yearBuilt: 2005,
    floorArea: 142,
  },
];

export const ACTIVE_PROPOSALS: ActiveProposal[] = [
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    sentLabel: "3 days ago",
    sumInsured: 750_000,
    premiumAnnual: 2_890,
    status: "Pending",
  },
];

export const WON_JOBS: WonJob[] = [
  {
    id: "david-chen",
    name: "David Chen",
    wonLabel: "5 days ago",
    sumInsured: 680_000,
    premiumAnnual: 2_640,
    successFee: 210,
  },
];

export function getLeadById(id: string): PartnerLead | undefined {
  return PARTNER_LEADS.find((lead) => lead.id === id);
}
