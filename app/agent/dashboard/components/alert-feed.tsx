import type { AgentAlert, AlertUrgency } from "@/lib/agent/dashboard-data";

const URGENCY_STYLES: Record<
  AlertUrgency,
  { badge: string; dot: string; label: string }
> = {
  urgent: {
    badge: "text-danger",
    dot: "bg-danger",
    label: "Urgent",
  },
  amber: {
    badge: "text-warning",
    dot: "bg-warning",
    label: "Attention",
  },
  green: {
    badge: "text-[#2563EB]",
    dot: "bg-[#2563EB]",
    label: "Update",
  },
};

type AlertVisualType = "refix" | "insurance" | "equity" | "info";

function getAlertVisualType(alert: AgentAlert): AlertVisualType {
  const headline = alert.headline.toLowerCase();
  if (alert.urgency === "urgent" || headline.includes("refix")) return "refix";
  if (headline.includes("insurance") || headline.includes("gap")) {
    return "insurance";
  }
  if (headline.includes("equity")) return "equity";
  return "info";
}

const VISUAL_STYLES: Record<
  AlertVisualType,
  { circle: string; icon: React.ReactNode }
> = {
  refix: {
    circle: "bg-red-100 text-red-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  insurance: {
    circle: "bg-orange-100 text-orange-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  equity: {
    circle: "bg-green-100 text-green-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M3 17l6-6 4 4 8-10M21 21H3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  info: {
    circle: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

type AlertFeedProps = {
  alerts: AgentAlert[];
  onGenerate: (alertId: string) => void;
  onView: (alertId: string) => void;
};

export function AlertFeed({ alerts, onGenerate, onView }: AlertFeedProps) {
  const urgentCount = alerts.filter((a) => a.urgency === "urgent").length;

  return (
    <section id="alerts">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          <span className="text-danger" aria-hidden>
            ●{" "}
          </span>
          Action needed
        </h2>
        {urgentCount > 0 && (
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
            {urgentCount} urgent
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">
        Actionable insights from Sanctury Home Health Checks and property data.
      </p>
      <ul className="mt-4 space-y-3">
        {alerts.map((alert) => {
          const style = URGENCY_STYLES[alert.urgency];
          const visual = VISUAL_STYLES[getAlertVisualType(alert)];
          const isView = alert.action === "view";

          return (
            <li
              key={alert.id}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${visual.circle}`}
                >
                  {visual.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-muted">
                      {alert.clientName}
                    </p>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold ${style.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {style.label}
                    </span>
                  </div>
                  <p className="mt-1 text-[15px] font-bold text-foreground">
                    {alert.headline}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#525252]">
                    {alert.description}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      isView ? onView(alert.id) : onGenerate(alert.id)
                    }
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-[#2E8B57] py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#267349]"
                  >
                    {isView ? "View" : "Generate message"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
