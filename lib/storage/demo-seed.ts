import { saveHealthCheckAndReport } from "./health-check";
import { saveInsuranceJobPosting } from "../marketplace/insurance-storage";
import { HEALTH_CHECK_STORAGE_KEY } from "../types/health-check";

export function seedDemoDataIfEmpty(): void {
  if (typeof window === "undefined") return;
  const existing = sessionStorage.getItem(HEALTH_CHECK_STORAGE_KEY);
  if (existing) return;

  saveHealthCheckAndReport({
    address: "14 Cameron Road, Tauranga",
    region: "Bay of Plenty",
    floorArea: "262",
    yearBuilt: "1998",
    buildQuality: "Above Standard",
    features: {
      Garage: true,
      Deck: true,
      Pool: false,
      "Solar Panels": false,
      "Heat Pump": true,
    },
    sumInsured: "900000",
    sumInsuredYear: "2022",
    refixDate: "2026-10-01",
    loanAmount: "480000",
    interestRate: "6.5",
    fixedLoanAmount: "480000",
    revolvingCreditAmount: "0",
    monthlyIncome: "8500",
  });

  saveInsuranceJobPosting({
    address: "14 Cameron Road, Tauranga",
    region: "Bay of Plenty",
    estimatedRebuildCost: 1063290,
    currentSumInsured: 900000,
    coverageGap: 163290,
    sumInsuredYear: "2022",
    features: ["Garage", "Deck", "Heat Pump"],
    notes: "",
  });
}
