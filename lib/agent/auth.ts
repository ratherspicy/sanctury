export const AGENT_SESSION_COOKIE = "sanctury-agent-session";

export const DEMO_AGENT = {
  email: "agent@sanctury.co.nz",
  password: "demo1234",
  name: "Mark Johnson",
  agency: "Tall Poppy Real Estate Bay of Plenty",
} as const;

export function isValidAgentCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_AGENT.email &&
    password === DEMO_AGENT.password
  );
}
