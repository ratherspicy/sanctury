import type { HealthCheckFormData } from "../types/health-check";

const REGIONAL_REBUILD_RATES: Record<string, number> = {
  Auckland: 3800,
  Wellington: 3600,
  Canterbury: 3200,
  "Bay of Plenty": 3300,
  Otago: 3400,
  Northland: 3200,
  Waikato: 3200,
};

const DEFAULT_REBUILD_RATE = 3100;

const FEATURE_COSTS: Record<string, number> = {
  Garage: 45000,
  Deck: 20000,
  Pool: 50000,
  "Solar Panels": 20000,
  "Heat Pump": 4000,
};

export type TrafficLightStatus = "green" | "amber" | "red";

export type InsuranceReport = {
  status: TrafficLightStatus;
  estimatedRebuildCost: number;
  currentSumInsured: number;
  insuranceGap: number;
  explanation: string;
};

export type MortgageReport = {
  daysUntilRefix: number;
  refixDate: string;
  revolvingCreditSavings: number;
  overpaymentYearsSaved: number;
  overpaymentInterestSaved: number;
  remainingLoanMonths: number;
};

export type MaintenanceReport = {
  yearBuilt: number;
  homeAge: number;
  alertTitle: string;
  alertMessage: string;
};

export type HealthCheckReport = {
  insurance: InsuranceReport;
  mortgage: MortgageReport;
  maintenance: MaintenanceReport;
  generatedAt: string;
};

function getRebuildRate(region: string): number {
  return REGIONAL_REBUILD_RATES[region] ?? DEFAULT_REBUILD_RATE;
}

function getBuildQualityMultiplier(buildQuality: string): number {
  if (buildQuality === "Above Standard") return 1.15;
  if (buildQuality === "High Spec") return 1.3;
  return 1;
}

export function calculateEstimatedRebuildCost(data: HealthCheckFormData): number {
  const floorArea = Number(data.floorArea) || 0;
  const rate = getRebuildRate(data.region);
  let base = floorArea * rate;
  base *= getBuildQualityMultiplier(data.buildQuality);

  let featureTotal = 0;
  for (const [feature, selected] of Object.entries(data.features)) {
    if (selected && FEATURE_COSTS[feature]) {
      featureTotal += FEATURE_COSTS[feature];
    }
  }

  return Math.round(base + featureTotal);
}

export function getInsuranceStatus(
  gap: number,
  estimatedRebuildCost: number
): TrafficLightStatus {
  if (gap <= 0) return "green";
  const gapPercent =
    estimatedRebuildCost > 0 ? (gap / estimatedRebuildCost) * 100 : 100;
  if (gapPercent <= 10) return "amber";
  return "red";
}

function getInsuranceExplanation(
  status: TrafficLightStatus,
  gap: number,
  estimatedRebuildCost: number,
  currentSumInsured: number
): string {
  const format = (n: number) =>
    n.toLocaleString("en-NZ", { style: "currency", currency: "NZD", maximumFractionDigits: 0 });

  if (status === "green") {
    if (gap <= 0) {
      return `Your current sum insured of ${format(currentSumInsured)} meets or exceeds our estimated rebuild cost of ${format(estimatedRebuildCost)}. You're in a solid position — it's still worth reviewing your policy annually to keep pace with building costs.`;
    }
    return `You're close to fully covered. A small buffer gives you peace of mind if building costs rise before your next review.`;
  }

  if (status === "amber") {
    return `Your sum insured is ${format(Math.abs(gap))} below what we'd expect for a full rebuild. That's a manageable gap — updating your cover at your next renewal could close it without a big premium jump.`;
  }

  return `There's a ${format(gap)} gap between your sum insured and estimated rebuild cost. Many Kiwi homeowners face this after years of rising build costs — a conversation with your insurer about updating your sum insured is a sensible next step.`;
}

export function calculateInsuranceReport(
  data: HealthCheckFormData
): InsuranceReport {
  const estimatedRebuildCost = calculateEstimatedRebuildCost(data);
  const currentSumInsured = Number(data.sumInsured) || 0;
  const insuranceGap = estimatedRebuildCost - currentSumInsured;
  const status = getInsuranceStatus(insuranceGap, estimatedRebuildCost);
  const explanation = getInsuranceExplanation(
    status,
    insuranceGap,
    estimatedRebuildCost,
    currentSumInsured
  );

  return {
    status,
    estimatedRebuildCost,
    currentSumInsured,
    insuranceGap,
    explanation,
  };
}

export function calculateDaysUntilRefix(refixDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const refix = new Date(refixDate);
  refix.setHours(0, 0, 0, 0);
  const diffMs = refix.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/** Remaining months if the loan were on a standard 25-year P&I schedule at the current balance. */
export function calculateRemainingLoanMonths(
  loanAmount: number,
  annualRatePercent: number
): number {
  if (loanAmount <= 0) return 0;
  const r = annualRatePercent / 100 / 12;
  if (r <= 0) return 300;

  const termMonths = 25 * 12;
  const payment =
    (loanAmount * r * Math.pow(1 + r, termMonths)) /
    (Math.pow(1 + r, termMonths) - 1);

  let balance = loanAmount;
  let months = 0;

  while (balance > 0.5 && months < 600) {
    const interest = balance * r;
    const principal = payment - interest;
    balance -= principal;
    months++;
  }

  return months;
}

export function calculateRevolvingCreditSavings(
  loanAmount: number,
  annualRatePercent: number,
  monthlyIncome: number,
  remainingMonths: number
): number {
  const revolvingPortion = loanAmount * 0.3;
  const monthlyOffset = monthlyIncome * 0.8;
  const monthlyRate = annualRatePercent / 100 / 12;

  const effectiveOffset = Math.min(revolvingPortion, monthlyOffset);
  const monthlySavings = effectiveOffset * monthlyRate;

  return Math.round(monthlySavings * remainingMonths);
}

export function calculateOverpaymentImpact(
  loanAmount: number,
  annualRatePercent: number,
  extraMonthly = 500
): { yearsSaved: number; interestSaved: number } {
  if (loanAmount <= 0) {
    return { yearsSaved: 0, interestSaved: 0 };
  }

  const r = annualRatePercent / 100 / 12;
  const termMonths = 25 * 12;
  const payment =
    r > 0
      ? (loanAmount * r * Math.pow(1 + r, termMonths)) /
        (Math.pow(1 + r, termMonths) - 1)
      : loanAmount / termMonths;

  let balance = loanAmount;
  let baseMonths = 0;
  let baseInterest = 0;

  while (balance > 0.5 && baseMonths < 600) {
    const interest = balance * r;
    baseInterest += interest;
    balance = balance + interest - payment;
    baseMonths++;
  }

  balance = loanAmount;
  let extraMonths = 0;
  let extraInterest = 0;

  while (balance > 0.5 && extraMonths < 600) {
    const interest = balance * r;
    extraInterest += interest;
    balance = balance + interest - payment - extraMonthly;
    extraMonths++;
  }

  const monthsSaved = Math.max(0, baseMonths - extraMonths);

  return {
    yearsSaved: Math.round((monthsSaved / 12) * 10) / 10,
    interestSaved: Math.round(Math.max(0, baseInterest - extraInterest)),
  };
}

export function calculateMortgageReport(
  data: HealthCheckFormData
): MortgageReport {
  const loanAmount = Number(data.loanAmount) || 0;
  const interestRate = Number(data.interestRate) || 0;
  const monthlyIncome = Number(data.monthlyIncome) || 0;
  const remainingLoanMonths = calculateRemainingLoanMonths(
    loanAmount,
    interestRate
  );

  const revolvingCreditSavings = calculateRevolvingCreditSavings(
    loanAmount,
    interestRate,
    monthlyIncome,
    remainingLoanMonths
  );

  const { yearsSaved, interestSaved } = calculateOverpaymentImpact(
    loanAmount,
    interestRate
  );

  return {
    daysUntilRefix: calculateDaysUntilRefix(data.refixDate),
    refixDate: data.refixDate,
    revolvingCreditSavings,
    overpaymentYearsSaved: yearsSaved,
    overpaymentInterestSaved: interestSaved,
    remainingLoanMonths,
  };
}

export function calculateMaintenanceReport(
  data: HealthCheckFormData
): MaintenanceReport {
  const yearBuilt = Number(data.yearBuilt) || new Date().getFullYear();
  const homeAge = new Date().getFullYear() - yearBuilt;

  if (homeAge >= 40) {
    return {
      yearBuilt,
      homeAge,
      alertTitle: "Roof and cladding deserve a closer look",
      alertMessage:
        "Homes of this age often benefit from a professional roof inspection and a check on external cladding and flashings. Catching wear early is far cheaper than emergency repairs after a storm.",
    };
  }

  if (homeAge >= 25) {
    return {
      yearBuilt,
      homeAge,
      alertTitle: "Plan ahead for roof maintenance",
      alertMessage:
        "At 25+ years, roof materials and fixings may be nearing the end of their service life. Booking an inspection now helps you budget for replacement rather than reacting to a leak.",
    };
  }

  if (homeAge >= 15) {
    return {
      yearBuilt,
      homeAge,
      alertTitle: "Check gutters and drainage",
      alertMessage:
        "Mid-life homes often see blocked gutters and minor drainage issues that lead to moisture problems over time. A seasonal clear-out and a look at downpipes is a simple win.",
    };
  }

  if (homeAge >= 5) {
    return {
      yearBuilt,
      homeAge,
      alertTitle: "Stay on top of your maintenance schedule",
      alertMessage:
        "Your home is still settling into its rhythm. Keep a simple log of servicing for heating, ventilation, and exterior paint — it makes resale and insurance conversations much easier.",
    };
  }

  return {
    yearBuilt,
    homeAge,
    alertTitle: "You're in the low-maintenance window",
    alertMessage:
      "Newer builds typically need less structural upkeep, but don't skip the basics — document your build warranties and schedule annual checks on ventilation and weathertightness.",
  };
}

export function generateHealthCheckReport(
  data: HealthCheckFormData
): HealthCheckReport {
  return {
    insurance: calculateInsuranceReport(data),
    mortgage: calculateMortgageReport(data),
    maintenance: calculateMaintenanceReport(data),
    generatedAt: new Date().toISOString(),
  };
}
