import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  STATUS_STYLES,
  UNKNOWN_ICON_BG,
  type StatusKey,
} from "./status-system";

export type StatusCardProps = {
  icon: LucideIcon;
  label: string;
  status: StatusKey;
  detail: string;
  cta?: { label: string; href?: string };
  /** Smaller fixed-width variant for horizontal-scroll rows. */
  compact?: boolean;
};

export function StatusCard({
  icon: Icon,
  label,
  status,
  detail,
  cta,
  compact = false,
}: StatusCardProps) {
  const s = STATUS_STYLES[status];
  const isUnknown = status === "unknown";

  const iconBg = isUnknown ? UNKNOWN_ICON_BG : s.bg;
  const iconColor = s.text;
  const ctaColor = isUnknown ? "#6B7280" : s.text;

  const ctaInner = cta && (
    <>
      {cta.label}
      <ChevronRight className="h-4 w-4" strokeWidth={2} />
    </>
  );

  return (
    <div
      className={`flex flex-col rounded-xl border-l-4 bg-surface shadow-sm ${
        compact
          ? "min-w-[260px] snap-start p-3.5 sm:min-w-0"
          : "p-4"
      }`}
      style={{ borderLeftColor: s.border }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: iconBg, color: iconColor }}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
          <p className="truncate text-sm font-bold text-foreground">{label}</p>
        </div>
        {!isUnknown && s.label && (
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: s.bg, color: s.text }}
          >
            {s.label}
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{detail}</p>

      {cta &&
        (cta.href ? (
          <Link
            href={cta.href}
            className="mt-3 inline-flex items-center gap-0.5 text-sm font-semibold hover:underline"
            style={{ color: ctaColor }}
          >
            {ctaInner}
          </Link>
        ) : (
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-0.5 self-start text-sm font-semibold hover:underline"
            style={{ color: ctaColor }}
          >
            {ctaInner}
          </button>
        ))}
    </div>
  );
}
