export const PARTNER_SESSION_COOKIE = "sanctury-partner-session";

export const DEMO_PARTNER = {
  email: "adviser@sanctury.co.nz",
  password: "demo1234",
  name: "Sarah Mitchell",
  title: "Insurance Adviser",
} as const;

export function isValidPartnerCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_PARTNER.email &&
    password === DEMO_PARTNER.password
  );
}
