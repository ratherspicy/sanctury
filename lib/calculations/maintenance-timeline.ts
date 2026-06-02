export type MaintenanceStatus = "green" | "amber" | "red";

export type MaintenanceMilestone = {
  id: string;
  label: string;
  detail: string;
  dueAge: number;
  status: MaintenanceStatus;
  recurring: boolean;
};

function recurringStatus(
  homeAge: number,
  interval: number
): { status: MaintenanceStatus; dueAge: number } {
  if (homeAge <= 0) {
    return { status: "green", dueAge: interval };
  }

  const cyclesCompleted = Math.floor(homeAge / interval);
  const nextDueAge = (cyclesCompleted + 1) * interval;
  const yearsUntil = nextDueAge - homeAge;

  if (yearsUntil <= 0) return { status: "red", dueAge: nextDueAge };
  if (yearsUntil <= 2) return { status: "amber", dueAge: nextDueAge };
  return { status: "green", dueAge: nextDueAge };
}

function rangeStatus(
  homeAge: number,
  minLife: number,
  maxLife: number
): MaintenanceStatus {
  const typicalDue = Math.round((minLife + maxLife) / 2);
  if (homeAge >= maxLife) return "red";
  if (homeAge >= typicalDue - 2) return "amber";
  return "green";
}

export function getMaintenanceMilestones(
  homeAge: number
): MaintenanceMilestone[] {
  const hotWaterStatus = rangeStatus(homeAge, 12, 15);
  const roofStatus = rangeStatus(homeAge, 20, 25);
  const repaint = recurringStatus(homeAge, 8);
  const heatPump = recurringStatus(homeAge, 2);
  const deck = recurringStatus(homeAge, 4);

  return [
    {
      id: "hot-water",
      label: "Hot water cylinder",
      detail: "Typical life 12–15 years",
      dueAge: 13,
      status: hotWaterStatus,
      recurring: false,
    },
    {
      id: "roof",
      label: "Roof inspection",
      detail: "Typical life 20–25 years",
      dueAge: 22,
      status: roofStatus,
      recurring: false,
    },
    {
      id: "repaint",
      label: "Exterior repaint",
      detail: "Every 7–10 years",
      dueAge: repaint.dueAge,
      status: repaint.status,
      recurring: true,
    },
    {
      id: "heat-pump",
      label: "Heat pump service",
      detail: "Every 2 years",
      dueAge: heatPump.dueAge,
      status: heatPump.status,
      recurring: true,
    },
    {
      id: "deck",
      label: "Deck re-stain",
      detail: "Every 3–5 years",
      dueAge: deck.dueAge,
      status: deck.status,
      recurring: true,
    },
  ];
}

export const CHART_COLORS = {
  brand: "#16A34A",
  brandLight: "#22C55E",
  cover: "#16A34A",
  gap: "#9B6FD4",
  gapLight: "#EEEDF8",
  current: "#9B6FD4",
  restructured: "#16A34A",
  savingsFill: "#EEEDF8",
  green: "#16A34A",
  amber: "#D97706",
  red: "#DC2626",
  muted: "#525252",
  border: "#E5E5E5",
  surface: "#FFFFFF",
};
