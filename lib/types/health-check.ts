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
