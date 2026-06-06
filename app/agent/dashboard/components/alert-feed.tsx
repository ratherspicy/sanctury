import type { AgentAlert, AlertUrgency } from "@/lib/agent/dashboard-data";

const URGENCY_STYLES: Record<
  AlertUrgency,
  { card: string; badge: string; dot: string; label: string }
> = {
  urgent: {
    card: "border-l-danger hover:bg-[#FFF5F5]",
    badge: "text-danger",
    dot: "bg-danger",
    label: "Urgent",
  },
  amber: {
    card: "border-l-warning hover:bg-[#FFFBF0]",
    badge: "text-warning",
    dot: "bg-warning",
    label: "Attention",
  },
  green: {
    card: "border-l-[#2563EB] hover:bg-[#F0F7FF]",
    badge: "text-[#2563EB]",
    dot: "bg-[#2563EB]",
    label: "Update",
  },
};

type AlertFeedProps = {
  alerts: AgentAlert[];
  onGenerate: (alertId: string) => void;
  onView: (alertId: string) => void;
};

export function AlertFeed({ alerts, onGenerate, onView }: AlertFeedProps) {
  return (
    <section id="alerts">
      <h2 className="text-lg font-semibold text-foreground">
        Who needs your attention today
      </h2>
      <p className="mt-1 text-sm text-muted">
        Actionable insights from Sanctury Home Health Checks and property data.
      </p>
      <ul className="mt-4 space-y-2">
        {alerts.map((alert) => {
          const style = URGENCY_STYLES[alert.urgency];
          const isView = alert.action === "view";

          return (
            <li
              key={alert.id}
              className={`alert-card !p-3 transition-colors duration-150 ${style.card}`}
            >
              <div className="flex items-center justify-between gap-x-3 gap-y-1">
                <span className="text-sm font-semibold text-foreground">
                  {alert.clientName}
                </span>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold ${style.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  {style.label}
                </span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">{alert.headline}</p>
              <button
                type="button"
                onClick={() => (isView ? onView(alert.id) : onGenerate(alert.id))}
                className="mt-2 inline-flex items-center gap-1 rounded-lg border border-violet px-3 py-1.5 text-sm font-medium text-violet transition-colors hover:bg-violet hover:text-white"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden
                >
                  <path
                    d="M2.5 3.5h11v9h-11v-9zM5 6.5h6M5 8.5h4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isView ? "View" : "Message"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
