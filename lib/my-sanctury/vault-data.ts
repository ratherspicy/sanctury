export type DocumentCategory = "Council" | "Consent" | "Certificate" | "Plans" | "Insurance";

export type VaultDocument = {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  category: DocumentCategory;
  note?: string;
};

export type MaintenanceCategory = "Plumbing" | "Roofing" | "Electrical" | "Renovation";

export type MaintenanceEvent = {
  id: string;
  date: string;
  category: MaintenanceCategory;
  title: string;
  contractor: string;
  cost: string;
  signOff: { type: "certified"; label: string } | { type: "missing"; label: string };
  notes: string;
  infoBox?: string;
};

export const VAULT_STATS = {
  documentCount: 5,
  maintenanceCount: 4,
  lastUpdated: "14 Mar 2024",
} as const;

export const VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: "lim-report",
    name: "LIM Report",
    issuer: "Tauranga City Council",
    dateIssued: "March 2023",
    category: "Council",
  },
  {
    id: "building-consent",
    name: "Building Consent BC2021/0847",
    issuer: "Tauranga City Council",
    dateIssued: "June 2021",
    category: "Consent",
    note: "Kitchen renovation — structural wall removal",
  },
  {
    id: "electrical-coc",
    name: "Certificate of Compliance — Electrical",
    issuer: "Bright Sparks Electrical Ltd",
    dateIssued: "July 2021",
    category: "Certificate",
  },
  {
    id: "dwelling-plans",
    name: "Original Dwelling Plans",
    issuer: "Tauranga City Council Archives",
    dateIssued: "1998",
    category: "Plans",
  },
  {
    id: "insurance-schedule",
    name: "Insurance Policy Schedule",
    issuer: "IAG — State House Insurance",
    dateIssued: "January 2026",
    category: "Insurance",
  },
];

export const MAINTENANCE_EVENTS: MaintenanceEvent[] = [
  {
    id: "kitchen-leak",
    date: "14 March 2024",
    category: "Plumbing",
    title: "Leak in kitchen wall cavity",
    contractor: "Tauranga Plumbing Co — Mike Tauroa · 027 445 8821",
    cost: "$380",
    signOff: { type: "missing", label: "No sign-off recorded" },
    notes:
      "Copper P-trap joint behind east wall was weeping. Replaced joint and sealed. Advised to monitor for further moisture. No council consent required for minor plumbing repair.",
    infoBox:
      "No certificate was obtained for this repair. If this issue recurs, contact Mike Tauroa directly — he knows the history of this wall.",
  },
  {
    id: "roof-inspection",
    date: "August 2023",
    category: "Roofing",
    title: "Annual roof inspection and repoint",
    contractor: "Bay Roofing Ltd — Steve Parkes · 07 578 2201",
    cost: "$650",
    signOff: { type: "certified", label: "Certificate obtained" },
    notes:
      "Inspector noted mortar deterioration on north face. Repointed 6 tiles. Recommend re-inspection in 2025.",
  },
  {
    id: "led-downlights",
    date: "November 2022",
    category: "Electrical",
    title: "LED downlight installation — living areas",
    contractor: "Bright Sparks Electrical Ltd · 07 571 4490",
    cost: "$890",
    signOff: { type: "certified", label: "Certificate obtained" },
    notes:
      "14 LED downlights installed throughout living room and hallway. CoC issued. All work to AS/NZS 3000 standard.",
  },
  {
    id: "kitchen-renovation",
    date: "May 2021",
    category: "Renovation",
    title: "Kitchen renovation — structural wall removal",
    contractor: "Coastal Builds Ltd — Dan Herewini · 027 332 9104",
    cost: "$47,500",
    signOff: {
      type: "certified",
      label: "Building consent BC2021/0847 obtained",
    },
    notes:
      "Full kitchen remodel. Load-bearing wall removed and replaced with steel lintel. New layout, cabinetry, and appliances. Electrical and plumbing subcontracted (see related certificates).",
  },
];
