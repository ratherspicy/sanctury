"use client";

import type { MaintenanceMilestone } from "@/lib/calculations/maintenance-timeline";
import { CHART_COLORS } from "@/lib/calculations/maintenance-timeline";

const statusColors = {
  green: CHART_COLORS.green,
  amber: CHART_COLORS.amber,
  red: CHART_COLORS.red,
};

const statusLabels = {
  green: "Not yet due",
  amber: "Due soon",
  red: "Overdue",
};

export function MaintenanceTimelineChart({
  homeAge,
  milestones,
}: {
  homeAge: number;
  milestones: MaintenanceMilestone[];
}) {
  const maxAge = Math.max(50, homeAge + 8, ...milestones.map((m) => m.dueAge + 4));
  const agePosition = (homeAge / maxAge) * 100;

  return (
    <div className="w-full overflow-x-auto">
      <p className="mb-3 text-sm font-medium text-muted">
        Maintenance milestones by property age
      </p>

      <div className="min-w-[280px]">
        {/* Axis */}
        <div className="relative mb-2 h-2 rounded-full bg-border">
          {/* Property age marker */}
          <div
            className="absolute top-1/2 z-10 -translate-y-1/2"
            style={{ left: `${agePosition}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className="flex flex-col items-center">
              <span className="mb-1 whitespace-nowrap rounded-lg bg-violet px-2 py-0.5 text-xs font-semibold text-white">
                Your home · {homeAge} yrs
              </span>
              <span className="h-4 w-4 rotate-45 border-2 border-surface bg-violet" />
            </div>
          </div>
        </div>

        <div className="mb-4 flex justify-between text-xs text-muted">
          <span>0 yrs</span>
          <span>{maxAge} yrs</span>
        </div>

        {/* Milestone rows */}
        <ul className="space-y-4">
          {milestones.map((item) => {
            const pos = Math.min(98, (item.dueAge / maxAge) * 100);
            return (
              <li key={item.id} className="relative">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted">{item.detail}</p>
                  </div>
                  <span
                    className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${statusColors[item.status]}18`,
                      color: statusColors[item.status],
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: statusColors[item.status] }}
                    />
                    {statusLabels[item.status]}
                    {item.recurring ? " · recurring" : ""}
                  </span>
                </div>
                <div className="relative mt-2 h-1.5 rounded-full bg-border">
                  <span
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-surface"
                    style={{
                      left: `${pos}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: statusColors[item.status],
                    }}
                    title={`Typical due around year ${item.dueAge}`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
        {(["green", "amber", "red"] as const).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: statusColors[s] }}
            />
            {statusLabels[s]}
          </span>
        ))}
      </div>
    </div>
  );
}
