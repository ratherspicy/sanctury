import type { HomeownerGoalId } from "../types/health-check";

export const HOMEOWNER_CONTACT_KEY = "sanctury-homeowner-contact";

export type HomeownerContact = {
  name: string;
  email: string;
  goals?: HomeownerGoalId[];
};

export function saveHomeownerContact(
  name: string,
  email: string,
  goals?: HomeownerGoalId[]
): void {
  const payload: HomeownerContact = {
    name: name.trim(),
    email: email.trim(),
    ...(goals && goals.length > 0 ? { goals } : {}),
  };
  sessionStorage.setItem(HOMEOWNER_CONTACT_KEY, JSON.stringify(payload));
}

export function loadHomeownerContact(): HomeownerContact | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(HOMEOWNER_CONTACT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as HomeownerContact;
  } catch {
    return null;
  }
}
