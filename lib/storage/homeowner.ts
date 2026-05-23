export const HOMEOWNER_CONTACT_KEY = "sanctury-homeowner-contact";

export type HomeownerContact = {
  name: string;
  email: string;
};

export function saveHomeownerContact(name: string, email: string): void {
  const payload: HomeownerContact = { name: name.trim(), email: email.trim() };
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
