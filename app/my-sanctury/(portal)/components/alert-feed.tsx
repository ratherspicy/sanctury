import Link from "next/link";
import type { ReactNode } from "react";
import type { AlertCategory, DashboardAlert } from "@/lib/my-sanctury/dashboard-data";

const CATEGORY_STYLES: Record<
  AlertCategory,
  { border: string; tag: string; icon: ReactNode }
> = {
  Insurance: {
    border: "border-l-warning",
    tag: "text-warning",
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
  Mortgage: {
    border: "border-l-violet",
    tag: "text-violet",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 10v10h16V10M2 10l10-7 10 7M9 20v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  Maintenance: {
    border: "border-l-border",
    tag: "text-muted",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  Market: {
    border: "border-l-warning",
    tag: "text-warning",
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
};

type AlertFeedProps = {
  alerts: DashboardAlert[];
};

export function AlertFeedSection({ alerts }: AlertFeedProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">
        Things worth your attention
      </h2>
      <p className="mt-1 text-sm text-muted">
        We&apos;re keeping an eye on things so you don&apos;t have to.
      </p>
      <ul className="mt-4 space-y-3">
        {alerts.map((alert) => {
          const style = CATEGORY_STYLES[alert.category];
          return (
            <li
              key={alert.id}
              className={`alert-card ${style.border}`}
            >
              <div className="flex gap-4">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-bg-secondary ${style.tag}`}>
                  {style.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${style.tag}`}>
                    {alert.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-foreground">
                    {alert.headline}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {alert.description}
                  </p>
                  <Link
                    href={alert.actionHref}
                    className="btn-violet mt-3 inline-flex h-9 px-4 text-sm"
                  >
                    {alert.actionLabel}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
