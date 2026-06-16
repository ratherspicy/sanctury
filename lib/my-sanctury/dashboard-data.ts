export type AlertCategory = "Insurance" | "Mortgage" | "Maintenance" | "Market";

export type DashboardAlert = {
  id: string;
  category: AlertCategory;
  headline: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export type MarketplaceRequestStatus =
  | "Pending"
  | "Quotes received"
  | "Adviser chosen"
  | "Completed";

export type MarketplaceRequest = {
  id: string;
  type: "Insurance" | "Mortgage";
  title: string;
  status: MarketplaceRequestStatus;
  createdAt: string;
};

export type PropertySnapshot = {
  address: string;
  estimatedCurrentValue: number;
  purchasePrice: number;
  equityAmount: number;
};

export type PropertyDetails = {
  address: string;
  floorArea: number;
  yearBuilt: number;
  buildQuality: string;
  features: string[];
};

export type DashboardData = {
  property: PropertySnapshot;
  alerts: DashboardAlert[];
  marketplaceRequests: MarketplaceRequest[];
  lastHealthCheckDate: string;
  propertyDetails: PropertyDetails;
};

export const PLACEHOLDER_DASHBOARD: DashboardData = {
  property: {
    address: "14 Cameron Road, Tauranga",
    estimatedCurrentValue: 875_000,
    purchasePrice: 620_000,
    equityAmount: 395_000,
  },
  alerts: [
    {
      id: "mortgage-refix",
      category: "Mortgage",
      headline: "Mortgage refix in 47 days",
      description:
        "Your fixed rate expires on 7 July. Reviewing options now gives you time to compare rates before your lender contacts you.",
      actionLabel: "Review options",
      actionHref: "/report",
    },
    {
      id: "insurance-costs",
      category: "Insurance",
      headline: "Building costs risen 8% since last review",
      description:
        "Regional rebuild costs have moved since you last updated your sum insured. You may be underinsured for a full rebuild.",
      actionLabel: "Get new quotes",
      actionHref: "/marketplace/insurance",
    },
    {
      id: "maintenance-heat-pump",
      category: "Maintenance",
      headline: "Heat pump service due",
      description:
        "Your heat pump is due for its annual service. Regular maintenance keeps it efficient and extends its lifespan.",
      actionLabel: "Find a tradie",
      actionHref: "/report",
    },
    {
      id: "market-equity",
      category: "Market",
      headline: "3 homes sold nearby — estimated equity increased",
      description:
        "Recent sales on your street suggest your property value may have risen. Your estimated equity is up $28,000 since last quarter.",
      actionLabel: "See report",
      actionHref: "/report",
    },
  ],
  marketplaceRequests: [
    {
      id: "req-insurance-1",
      type: "Insurance",
      title: "Sum insured review — Bay of Plenty",
      status: "Quotes received",
      createdAt: "2026-05-12",
    },
    {
      id: "req-mortgage-1",
      type: "Mortgage",
      title: "Refix comparison — 14 Cameron Road",
      status: "Pending",
      createdAt: "2026-05-18",
    },
  ],
  lastHealthCheckDate: "2026-05-14",
  propertyDetails: {
    address: "14 Cameron Road, Tauranga",
    floorArea: 168,
    yearBuilt: 1998,
    buildQuality: "Above Standard",
    features: ["Garage", "Deck", "Heat Pump"],
  },
};

export function getEquityPercentage(
  equityAmount: number,
  estimatedValue: number
): number {
  if (estimatedValue <= 0) return 0;
  return Math.round((equityAmount / estimatedValue) * 1000) / 10;
}
