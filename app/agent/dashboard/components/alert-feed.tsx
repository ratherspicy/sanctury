import type { AgentAlert, AlertUrgency } from "@/lib/agent/dashboard-data";

const URGENCY_STYLES: Record<
  AlertUrgency,
  { border: string; badge: string; dot: string; label: string }
> = {
  urgent: {
    border: "border-l-danger",
    badge: "text-danger",
    dot: "bg-danger",
    label: "Urgent",
  },
  amber: {
    border: "border-l-warning",
    badge: "text-warning",
    dot: "bg-warning",
    label: "Attention",
  },
  green: {
    border: "border-l-violet",
    badge: "text-violet",
    dot: "bg-violet",
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
      <ul className="mt-4 space-y-3">
        {alerts.map((alert) => {
          const style = URGENCY_STYLES[alert.urgency];
          return (
            <li
              key={alert.id}
              className={`alert-card ${style.border}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {alert.clientName}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${style.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {style.label}
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-foreground">{alert.headline}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {alert.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  alert.action === "view" ? onView(alert.id) : onGenerate(alert.id)
                }
                className="btn-violet mt-4 inline-flex h-9 px-4 text-sm"
              >
                {alert.action === "view" ? "View details" : "Generate message"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
