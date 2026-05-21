"use client";

import { useId } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/format";
import { CHART_COLORS } from "@/lib/calculations/maintenance-timeline";
import type { InsuranceReport } from "@/lib/calculations/report";

function formatCompact(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`;
  return formatCurrency(value);
}

export function InsuranceCoverBarChart({
  insurance,
}: {
  insurance: InsuranceReport;
}) {
  const cover = Math.min(
    insurance.currentSumInsured,
    insurance.estimatedRebuildCost
  );
  const gap = Math.max(0, insurance.insuranceGap);

  const data = [
    {
      name: "Rebuild",
      cover,
      gap,
      coverLabel: formatCompact(cover),
      gapLabel: gap > 0 ? formatCompact(gap) : "",
    },
  ];

  return (
    <div className="w-full">
      <p className="mb-3 text-sm font-medium text-muted">
        Cover vs estimated rebuild cost
      </p>
      <div className="h-16 w-full sm:h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 8, left: 8, bottom: 0 }}
            barSize={32}
          >
            <XAxis type="number" hide domain={[0, insurance.estimatedRebuildCost]} />
            <YAxis type="category" dataKey="name" hide width={0} />
            <Bar dataKey="cover" stackId="stack" radius={[8, 0, 0, 8]} fill={CHART_COLORS.cover}>
              <LabelList
                dataKey="coverLabel"
                position="center"
                fill="#fff"
                fontSize={12}
                fontWeight={600}
              />
            </Bar>
            <Bar dataKey="gap" stackId="stack" radius={[0, 8, 8, 0]} fill={CHART_COLORS.gap}>
              {gap > 0 && (
                <LabelList
                  dataKey="gapLabel"
                  position="center"
                  fill="#fff"
                  fontSize={12}
                  fontWeight={600}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: CHART_COLORS.cover }}
          />
          <span className="text-muted">
            Your cover{" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(cover)}
            </span>
          </span>
        </span>
        {gap > 0 && (
          <span className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: CHART_COLORS.gap }}
            />
            <span className="text-muted">
              Gap{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(gap)}
              </span>
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

function HouseIcon({
  fillPercent,
  fillColor,
}: {
  fillPercent: number;
  fillColor: string;
}) {
  const clipId = useId().replace(/:/g, "");
  const clamped = Math.min(100, Math.max(0, fillPercent));
  const fillHeight = (clamped / 100) * 80;

  return (
    <svg
      viewBox="0 0 120 100"
      className="mx-auto h-28 w-36 sm:h-32 sm:w-40"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y={100 - fillHeight} width="120" height={fillHeight} />
        </clipPath>
      </defs>
      {/* Grey base */}
      <path
        d="M60 12 L108 48 V88 H12 V48 Z"
        fill="#e8e0d4"
        stroke="#d4cdc0"
        strokeWidth="1.5"
      />
      <rect x="28" y="58" width="20" height="30" rx="1" fill="#d4cdc0" />
      <rect x="72" y="58" width="20" height="30" rx="1" fill="#d4cdc0" />
      {/* Green fill clipped from bottom */}
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M60 12 L108 48 V88 H12 V48 Z"
          fill={fillColor}
          stroke={fillColor}
          strokeWidth="1.5"
        />
        <rect x="28" y="58" width="20" height="30" rx="1" fill={fillColor} opacity="0.85" />
        <rect x="72" y="58" width="20" height="30" rx="1" fill={fillColor} opacity="0.85" />
      </g>
      <path
        d="M60 12 L108 48 V88 H12 V48 Z"
        fill="none"
        stroke="#d4cdc0"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function InsuranceHouseVisual({
  insurance,
}: {
  insurance: InsuranceReport;
}) {
  const coveragePercent =
    insurance.estimatedRebuildCost > 0
      ? (insurance.currentSumInsured / insurance.estimatedRebuildCost) * 100
      : 100;

  let fillColor = CHART_COLORS.cover;
  if (coveragePercent < 80) {
    fillColor = "#94a3a8";
  } else if (coveragePercent < 95) {
    fillColor = CHART_COLORS.brandLight;
  }

  const label =
    coveragePercent >= 95
      ? "Well covered"
      : coveragePercent >= 80
        ? "Mostly covered"
        : "Coverage gap";

  return (
    <div className="rounded-xl border border-border bg-background px-6 py-8 text-center">
      <p className="text-sm font-medium text-muted">Visual coverage</p>
      <HouseIcon fillPercent={coveragePercent} fillColor={fillColor} />
      <p className="mt-2 text-2xl font-bold text-foreground">
        {Math.round(Math.min(coveragePercent, 100))}%
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
      <p className="mt-3 text-xs text-muted">
        Coloured area = sum insured · Grey = gap to full rebuild
      </p>
    </div>
  );
}
