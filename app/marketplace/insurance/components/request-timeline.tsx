import type { RequestTimelineStep } from "@/lib/marketplace/request-timeline";

function StepIndicator({ status }: { status: RequestTimelineStep["status"] }) {
  if (status === "completed") {
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10"
        aria-hidden
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4 text-brand" fill="none">
          <path
            d="M3 8.5l3 3 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/40 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500 live-pulse" />
      </span>
    );
  }

  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background"
      aria-hidden
    >
      <span className="h-2 w-2 rounded-full bg-border" />
    </span>
  );
}

type RequestTimelineProps = {
  steps: RequestTimelineStep[];
  className?: string;
};

export function RequestTimeline({ steps, className = "" }: RequestTimelineProps) {
  return (
    <ol className={`space-y-0 ${className}`}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const statusLabel =
          step.status === "completed"
            ? "Completed"
            : step.status === "in_progress"
              ? "In progress"
              : "Pending";

        return (
          <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                className="absolute left-4 top-8 -ml-px h-[calc(100%-2rem)] w-0.5 bg-border"
                aria-hidden
              />
            )}
            <StepIndicator status={step.status} />
            <div className="min-w-0 flex-1 pt-1">
              <p
                className={`text-sm font-medium ${
                  step.status === "pending"
                    ? "text-muted"
                    : "text-foreground"
                }`}
              >
                {step.label}
              </p>
              <p className="mt-0.5 text-xs text-muted">{statusLabel}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
