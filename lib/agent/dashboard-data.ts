export type AlertUrgency = "urgent" | "amber" | "green";

export type AgentAlert = {
  id: string;
  clientName: string;
  urgency: AlertUrgency;
  headline: string;
  description: string;
  action: "generate" | "view";
  situationSummary: string;
  message: string;
};

export type ClientRow = {
  id: string;
  name: string;
  address: string;
  purchaseDate: string;
  purchasePrice: number;
  estimatedValue: number;
  healthCheckStatus: "Completed" | "Not started" | "In progress";
  daysToRefix: number | null;
};

export const AGENT_STATS = {
  totalClients: 8,
  healthChecksCompleted: 3,
  marketplaceReferrals: 2,
  estimatedReferralIncome: 480,
} as const;

export const AGENT_ALERTS: AgentAlert[] = [
  {
    id: "sarah-chen-refix",
    clientName: "Sarah Chen",
    urgency: "urgent",
    headline: "Mortgage refix in 14 days",
    description: "$480,000 loan — fixed rate expires soon. Client may need guidance before lender contact.",
    action: "generate",
    situationSummary:
      "Sarah Chen has a $480,000 fixed-rate mortgage refixing in 14 days at 14 Greerton Road, Tauranga.",
    message: `Hi Sarah,

I hope you're well. I noticed your fixed mortgage rate on your Greerton Road property is due to refix in about two weeks.

With rates having shifted over the past year, it's worth a quick conversation before your lender reaches out — even a small difference in rate can add up over the term. I'm happy to walk you through your options or point you toward an independent mortgage adviser if you'd like a second opinion.

Would you have 15 minutes this week for a quick chat?

Kind regards,
Mark Johnson
Tall Poppy Real Estate — Bay of Plenty`,
  },
  {
    id: "james-wilson-insurance",
    clientName: "James Wilson",
    urgency: "amber",
    headline: "Insurance gap of $142,000 identified",
    description: "Home Health Check flagged underinsurance against current rebuild costs.",
    action: "generate",
    situationSummary:
      "James Wilson's Sanctury Home Health Check shows a $142,000 coverage gap on his Mount Maunganui property.",
    message: `Hi James,

Following your recent Home Health Check, Sanctury flagged a potential insurance gap of around $142,000 on your Mount Maunganui home — meaning your current sum insured may not cover a full rebuild at today's costs.

This is very common across the Bay of Plenty after several years of rising build costs. It's worth a quick review with your insurer or an independent adviser before your next renewal.

I can share your check summary if helpful, or connect you with a Sanctury verified insurance adviser — there's no cost to you.

Let me know if you'd like to discuss.

Best,
Mark`,
  },
  {
    id: "emma-thompson-equity",
    clientName: "Emma Thompson",
    urgency: "amber",
    headline: "Equity up an estimated $95,000 since purchase",
    description: "Recent market movement suggests strong equity growth on Bethlehem property.",
    action: "generate",
    situationSummary:
      "Emma Thompson's Bethlehem property shows an estimated $95,000 equity gain since purchase in 2021.",
    message: `Hi Emma,

Great news — based on recent sales activity in Bethlehem and your purchase price in 2021, your property equity may have grown by around $95,000.

That's a useful number to have on hand whether you're thinking about renovations, a future move, or simply understanding your overall position. Happy to run through what this means for your plans whenever suits.

Would a quick catch-up over coffee work for you?

Cheers,
Mark`,
  },
  {
    id: "michael-brown-brightline",
    clientName: "Michael Brown",
    urgency: "green",
    headline: "Bright-line test expires in 90 days",
    description: "Investment property approaching five-year ownership threshold.",
    action: "generate",
    situationSummary:
      "Michael Brown's Papamoa Beach investment property reaches the bright-line threshold in approximately 90 days.",
    message: `Hi Michael,

A heads-up on your Papamoa Beach property — you're approaching the 90-day mark before your bright-line period completes. If you're considering selling, the timing could affect any tax treatment on capital gains.

This isn't advice, just a prompt so you can speak with your accountant if plans are on the horizon. Happy to discuss market conditions in Papamoa whenever you're ready.

Regards,
Mark`,
  },
  {
    id: "jane-smith-completed",
    clientName: "Jane Smith",
    urgency: "green",
    headline: "Home Health Check complete — adviser connected",
    description: "Completed check and connected with insurance adviser via Sanctury marketplace.",
    action: "view",
    situationSummary:
      "Jane Smith completed her Home Health Check and chose Sarah Mitchell as her insurance adviser through Sanctury.",
    message: `Hi Jane,

Just checking in — I saw you've completed your Sanctury Home Health Check and connected with Sarah Mitchell for an insurance review. That's a great step toward making sure your Otumoetai home is properly covered.

If you need anything from me while that's in progress, or want to talk through the report together, I'm here.

Best wishes,
Mark`,
  },
];

export const AGENT_CLIENTS: ClientRow[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    address: "14 Greerton Road, Tauranga",
    purchaseDate: "2019-03-15",
    purchasePrice: 685_000,
    estimatedValue: 920_000,
    healthCheckStatus: "Completed",
    daysToRefix: 14,
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    address: "8 Matua Drive, Mount Maunganui",
    purchaseDate: "2020-11-08",
    purchasePrice: 798_000,
    estimatedValue: 1_050_000,
    healthCheckStatus: "Completed",
    daysToRefix: 127,
  },
  {
    id: "emma-thompson",
    name: "Emma Thompson",
    address: "22 Bethlehem Road, Tauranga",
    purchaseDate: "2021-06-22",
    purchasePrice: 720_000,
    estimatedValue: 915_000,
    healthCheckStatus: "Completed",
    daysToRefix: 203,
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    address: "5 Papamoa Beach Road, Papamoa",
    purchaseDate: "2020-02-10",
    purchasePrice: 650_000,
    estimatedValue: 875_000,
    healthCheckStatus: "Not started",
    daysToRefix: null,
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    address: "17 Otumoetai Road, Tauranga",
    purchaseDate: "2018-09-04",
    purchasePrice: 610_000,
    estimatedValue: 890_000,
    healthCheckStatus: "Completed",
    daysToRefix: 89,
  },
  {
    id: "david-park",
    name: "David Park",
    address: "3 Pyes Pa Road, Tauranga",
    purchaseDate: "2022-01-18",
    purchasePrice: 945_000,
    estimatedValue: 1_020_000,
    healthCheckStatus: "In progress",
    daysToRefix: 312,
  },
  {
    id: "lisa-ngata",
    name: "Lisa Ngata",
    address: "11 Te Puna Station Road, Te Puna",
    purchaseDate: "2017-07-30",
    purchasePrice: 580_000,
    estimatedValue: 820_000,
    healthCheckStatus: "Not started",
    daysToRefix: null,
  },
  {
    id: "tom-harrison",
    name: "Tom Harrison",
    address: "44 Maxwells Road, Bethlehem",
    purchaseDate: "2023-04-12",
    purchasePrice: 1_150_000,
    estimatedValue: 1_200_000,
    healthCheckStatus: "Not started",
    daysToRefix: 456,
  },
];

export function getAlertById(id: string): AgentAlert | undefined {
  return AGENT_ALERTS.find((a) => a.id === id);
}

export function getClientById(id: string): ClientRow | undefined {
  return AGENT_CLIENTS.find((c) => c.id === id);
}

export function getAlertsForClient(clientName: string): AgentAlert[] {
  return AGENT_ALERTS.filter((a) => a.clientName === clientName);
}
