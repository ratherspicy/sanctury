"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/format";
import type { LoanBalancePoint } from "@/lib/calculations/loan-curves";
import { CHART_COLORS } from "@/lib/calculations/maintenance-timeline";

function formatAxisCurrency(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`;
  return `$${value}`;
}

type TooltipPayload = { payload?: LoanBalancePoint };

function BalanceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.[0]?.payload) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 text-sm">
      <p className="font-medium text-foreground">Year {d.year}</p>
      <p className="text-muted">
        Current:{" "}
        <span className="font-medium text-foreground">
          {formatCurrency(d.current)}
        </span>
      </p>
      <p className="text-muted">
        Restructured:{" "}
        <span className="font-medium text-foreground">
          {formatCurrency(d.restructured)}
        </span>
      </p>
    </div>
  );
}

export function MortgageBalanceChart({
  points,
}: {
  points: LoanBalancePoint[];
}) {
  if (points.length === 0) return null;

  return (
    <div className="w-full">
      <p className="mb-3 text-sm font-medium text-muted">
        Loan balance over time
      </p>
      <div className="h-56 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={points}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.border}
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: CHART_COLORS.muted }}
              tickLine={false}
              axisLine={{ stroke: CHART_COLORS.border }}
              label={{
                value: "Years remaining",
                position: "insideBottom",
                offset: -4,
                fontSize: 11,
                fill: CHART_COLORS.muted,
              }}
            />
            <YAxis
              tickFormatter={formatAxisCurrency}
              tick={{ fontSize: 11, fill: CHART_COLORS.muted }}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip content={<BalanceTooltip />} />
            <Area
              type="monotone"
              dataKey="restructured"
              stackId="band"
              fill={CHART_COLORS.savingsFill}
              stroke="none"
            />
            <Area
              type="monotone"
              dataKey="gap"
              stackId="band"
              fill={CHART_COLORS.savingsFill}
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke={CHART_COLORS.current}
              strokeWidth={2}
              dot={false}
              name="Current repayment"
            />
            <Line
              type="monotone"
              dataKey="restructured"
              stroke={CHART_COLORS.restructured}
              strokeWidth={2}
              dot={false}
              name="With restructure"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-2">
          <span
            className="h-0.5 w-5 rounded"
            style={{ backgroundColor: CHART_COLORS.current }}
          />
          <span className="text-muted">Current repayment</span>
        </span>
        <span className="flex items-center gap-2">
          <span
            className="h-0.5 w-5 rounded"
            style={{ backgroundColor: CHART_COLORS.restructured }}
          />
          <span className="text-muted">With restructure (+$500/mo)</span>
        </span>
        <span className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: CHART_COLORS.savingsFill }}
          />
          <span className="text-muted">Interest saved</span>
        </span>
      </div>
    </div>
  );
}

export function MortgagePayoffTimeline({
  currentPayoffYears,
  restructuredPayoffYears,
}: {
  currentPayoffYears: number;
  restructuredPayoffYears: number;
}) {
  const maxYears = Math.max(currentPayoffYears, 5);
  const currentPos = (currentPayoffYears / maxYears) * 100;
  const restructuredPos = (restructuredPayoffYears / maxYears) * 100;
  const yearsSaved = Math.max(
    0,
    Math.round((currentPayoffYears - restructuredPayoffYears) * 10) / 10
  );

  return (
    <div className="w-full">
      <p className="mb-3 text-sm font-medium text-muted">Loan paid off</p>
      <div className="relative pt-8 pb-2">
        <div className="h-3 rounded-full bg-border" />
        {/* Current marker */}
        <div
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${currentPos}%`, transform: "translateX(-50%)" }}
        >
          <span className="mb-1 whitespace-nowrap text-xs font-medium text-muted">
            Current · {currentPayoffYears} yrs
          </span>
          <span className="h-5 w-5 rounded-full border-2 border-surface bg-border" />
        </div>
        {/* Restructured marker */}
        <div
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${restructuredPos}%`, transform: "translateX(-50%)" }}
        >
          <span className="mb-1 whitespace-nowrap text-xs font-semibold text-violet">
            Restructured · {restructuredPayoffYears} yrs
          </span>
          <span
            className="h-5 w-5 rounded-full border-2 border-surface"
            style={{ backgroundColor: CHART_COLORS.restructured }}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-between text-xs text-muted">
        <span>Today</span>
        <span>{maxYears} years</span>
      </div>
      {yearsSaved > 0 && (
        <p className="mt-4 rounded-lg bg-bg-secondary px-4 py-3 text-sm text-foreground">
          Restructuring could pay off your loan{" "}
          <span className="font-semibold text-violet">{yearsSaved} years</span>{" "}
          sooner.
        </p>
      )}
    </div>
  );
}
