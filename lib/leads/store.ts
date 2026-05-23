import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Lead = {
  name: string;
  email: string;
  createdAt: string;
};

const LEADS_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.json");

export async function saveLead(name: string, email: string): Promise<Lead> {
  await mkdir(LEADS_DIR, { recursive: true });

  let leads: Lead[] = [];
  try {
    const raw = await readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) leads = parsed;
  } catch {
    leads = [];
  }

  const lead: Lead = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  leads.push(lead);
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");

  return lead;
}
