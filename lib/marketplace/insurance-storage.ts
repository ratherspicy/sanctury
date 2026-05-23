export const INSURANCE_MARKETPLACE_KEY = "sanctury-insurance-marketplace";
export const SELECTED_ADVISER_KEY = "sanctury-selected-adviser";

export type InsuranceJobPosting = {
  address: string;
  region: string;
  estimatedRebuildCost: number;
  currentSumInsured: number;
  coverageGap: number;
  sumInsuredYear: string;
  features: string[];
  notes: string;
  postedAt?: string;
};

export function saveInsuranceJobPosting(posting: InsuranceJobPosting): void {
  sessionStorage.setItem(
    INSURANCE_MARKETPLACE_KEY,
    JSON.stringify({ ...posting, postedAt: new Date().toISOString() })
  );
}

export function loadInsuranceJobPosting(): InsuranceJobPosting | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(INSURANCE_MARKETPLACE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as InsuranceJobPosting;
  } catch {
    return null;
  }
}

export function saveSelectedAdviser(adviserId: string): void {
  sessionStorage.setItem(SELECTED_ADVISER_KEY, adviserId);
}

export function loadSelectedAdviser(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SELECTED_ADVISER_KEY);
}
