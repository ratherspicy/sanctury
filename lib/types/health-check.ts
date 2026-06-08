export const PROPERTY_FEATURES = [
  "Garage",
  "Deck",
  "Pool",
  "Solar Panels",
  "Heat Pump",
] as const;

export type FeatureKey = (typeof PROPERTY_FEATURES)[number];

export type HealthCheckFormData = {
  address: string;
  region: string;
  floorArea: string;
  yearBuilt: string;
  buildQuality: string;
  features: Record<FeatureKey, boolean>;
  sumInsured: string;
  sumInsuredYear: string;
  refixDate: string;
  loanAmount: string;
  interestRate: string;
  fixedLoanAmount: string;
  revolvingCreditAmount: string;
  monthlyIncome: string;
};

export const HEALTH_CHECK_STORAGE_KEY = "sanctury-health-check";

export const HOMEOWNER_GOAL_OPTIONS = [
  { id: "pay_off_mortgage", label: "Pay off my mortgage faster" },
  { id: "renovate", label: "Renovate in the next 2 years" },
  { id: "understand_equity", label: "Understand my equity position" },
  { id: "upsize", label: "Upsize when the time is right" },
  { id: "get_on_top", label: "Just get on top of everything" },
] as const;

export type HomeownerGoalId = (typeof HOMEOWNER_GOAL_OPTIONS)[number]["id"];
