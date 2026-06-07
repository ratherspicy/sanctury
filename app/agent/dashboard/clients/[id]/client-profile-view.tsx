"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getAlertsForClient,
  type AgentAlert,
  type ClientRow,
} from "@/lib/agent/dashboard-data";
import { formatCurrency, formatDate } from "@/lib/format";
import { AgentNav } from "../../components/agent-nav";
import { MessageModal } from "../../components/message-modal";

const STATUS_STYLES: Record<ClientRow["healthCheckStatus"], string> = {
  Completed: "bg-brand-light text-brand",
  "In progress": "bg-green-50 text-green-600",
  "Not started": "bg-background text-muted border border-border",
};

const URGENCY_STYLES: Record<
  AgentAlert["urgency"],
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
    border: "border-l-green-600",
    badge: "text-green-600",
    dot: "bg-green-600",
    label: "Update",
  },
};

const JUNE_2019 = new Date("2019-06-01");

function ownershipYears(purchaseDate: string): number {
  const purchase = new Date(purchaseDate);
  const now = new Date();
  return Math.floor(
    (now.getTime() - purchase.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );
}

function buildListingSignals(client: ClientRow): string[] {
  const signals: string[] = [];
  const purchase = new Date(client.purchaseDate);
  const equity = client.estimatedValue - client.purchasePrice;
  const years = ownershipYears(client.purchaseDate);

  if (purchase < JUNE_2019) {
    signals.push(
      `Tenure: ${years} years — approaching the 7-year listing window. Likelihood to list in next 18 months: elevated.`
    );
  }

  if (equity > 200_000) {
    signals.push(
      `Equity milestone: $${Math.round(equity / 1000)}k built. Borrowing power for upgrade conversation now relevant.`
    );
  }

  if (client.daysToRefix !== null && client.daysToRefix < 90) {
    signals.push(
      "Refix window open — highest financial engagement moment of the year. Ideal time for a check-in."
    );
  }

  return signals;
}

function buildCheckInAlert(client: ClientRow): AgentAlert {
  return {
    id: `${client.id}-check-in`,
    clientName: client.name,
    urgency: "green",
    headline: "General check-in",
    description: "Reach out to stay connected with your client.",
    action: "generate",
    situationSummary: `${client.name} owns ${client.address}. A friendly check-in to maintain the relationship.`,
    message: `Hi ${client.name.split(" ")[0]},

I hope you're doing well. I wanted to check in and see how things are going with your property at ${client.address.split(",")[0]}.

If there's anything I can help with — market updates, maintenance questions, or just a chat about your plans — I'm always happy to help.

Kind regards,
Mark Johnson
Tall Poppy Real Estate — Bay of Plenty`,
  };
}

type ClientProfileViewProps = {
  client: ClientRow;
};

export function ClientProfileView({ client }: ClientProfileViewProps) {
  const [activeAlert, setActiveAlert] = useState<AgentAlert | null>(null);
  const clientAlerts = getAlertsForClient(client.name);

  const equity = client.estimatedValue - client.purchasePrice;
  const years = ownershipYears(client.purchaseDate);
  const listingSignals = buildListingSignals(client);

  const openDefaultMessage = () => {
    setActiveAlert(clientAlerts[0] ?? buildCheckInAlert(client));
  };

  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <AgentNav />

      <main className="relative flex-1">
        <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8 lg:py-10">
          <Link
            href="/agent/dashboard#clients"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M12 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to clients
          </Link>

          <header className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              {client.name}
            </h1>
            <p className="mt-1 text-muted">{client.address}</p>
            <p className="mt-2 text-sm text-muted">
              Tall Poppy client since {formatDate(client.purchaseDate)}
            </p>
          </header>

          <div className="mt-8 space-y-6">
            {/* Property snapshot */}
            <section className="card">
              <div className="border-b border-border px-6 py-5">
                <h2 className="text-lg font-semibold text-foreground">
                  Property snapshot
                </h2>
              </div>
              <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted">Purchase price</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {formatCurrency(client.purchasePrice)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">Est. current value</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {formatCurrency(client.estimatedValue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">Equity built</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {formatCurrency(equity)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">Ownership duration</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {years} {years === 1 ? "year" : "years"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">Days to refix</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {client.daysToRefix !== null ? (
                      <span
                        className={
                          client.daysToRefix <= 30 ? "text-danger" : undefined
                        }
                      >
                        {client.daysToRefix} days
                      </span>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">Health check</p>
                  <p className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[client.healthCheckStatus]}`}
                    >
                      {client.healthCheckStatus}
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* Alerts for this client */}
            <section className="card">
              <div className="border-b border-border px-6 py-5">
                <h2 className="text-lg font-semibold text-foreground">
                  Alerts for this client
                </h2>
              </div>
              <div className="px-6 py-5">
                {clientAlerts.length === 0 ? (
                  <p className="text-sm text-muted">No active alerts.</p>
                ) : (
                  <ul className="space-y-3">
                    {clientAlerts.map((alert) => {
                      const style = URGENCY_STYLES[alert.urgency];
                      return (
                        <li
                          key={alert.id}
                          className={`alert-card ${style.border}`}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${style.badge}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                              />
                              {style.label}
                            </span>
                          </div>
                          <p className="mt-2 font-medium text-foreground">
                            {alert.headline}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {alert.description}
                          </p>
                          <button
                            type="button"
                            onClick={() => setActiveAlert(alert)}
                            className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700"
                          >
                            Generate message
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>

            {/* Predictive signals */}
            <section className="card">
              <div className="border-b border-border px-6 py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    Listing signals
                  </h2>
                  <span className="inline-flex items-center rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-600">
                    Powered by Sanctury AI
                  </span>
                </div>
              </div>
              <div className="px-6 py-5">
                {listingSignals.length === 0 ? (
                  <p className="text-sm text-muted">
                    No listing signals detected for this client yet.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {listingSignals.map((signal) => (
                      <li
                        key={signal}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                        {signal}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Marketplace activity */}
            <section className="card">
              <div className="border-b border-border px-6 py-5">
                <h2 className="text-lg font-semibold text-foreground">
                  Marketplace activity
                </h2>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm leading-relaxed text-muted">
                  {client.id === "sarah-chen"
                    ? "Insurance marketplace — chose Sarah Mitchell (Tower). Referral income earned: $220."
                    : "No marketplace activity yet."}
                </p>
              </div>
            </section>
          </div>

          {/* Action bar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openDefaultMessage}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-green-600 px-6 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              Generate message
            </button>
            <Link href="/report" className="btn-ghost h-11 px-6 text-sm">
              View health check report
            </Link>
          </div>
        </div>
      </main>

      <MessageModal alert={activeAlert} onClose={() => setActiveAlert(null)} />
    </div>
  );
}
