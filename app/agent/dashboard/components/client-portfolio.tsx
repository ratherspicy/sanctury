"use client";

import { useRouter } from "next/navigation";
import {
  AGENT_ALERTS,
  type AgentAlert,
  type ClientRow,
} from "@/lib/agent/dashboard-data";
import { formatCurrency } from "@/lib/format";

type ClientTier = "urgent" | "attention" | "update" | "none";

const STATUS_STYLES: Record<ClientRow["healthCheckStatus"], string> = {
  Completed: "bg-[#d1fae5] text-[#2E8B57]",
  "In progress": "bg-blue-100 text-blue-700",
  "Not started": "bg-gray-100 text-gray-500",
};

const TIER_ORDER: Record<ClientTier, number> = {
  urgent: 0,
  attention: 1,
  update: 2,
  none: 3,
};

const ROW_STYLES: Record<ClientTier, string> = {
  urgent: "bg-red-50 border-l-4 border-red-500",
  attention: "bg-orange-50 border-l-4 border-orange-400",
  update: "bg-blue-50 border-l-4 border-blue-400",
  none: "bg-white border-l-4 border-transparent",
};

const BADGE_STYLES: Record<Exclude<ClientTier, "none">, string> = {
  urgent: "bg-red-100 text-red-700",
  attention: "bg-orange-100 text-orange-700",
  update: "bg-blue-100 text-blue-700",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getPrimaryAlert(clientName: string): AgentAlert | undefined {
  return AGENT_ALERTS.find((a) => a.clientName === clientName);
}

function getClientTier(alert: AgentAlert | undefined): ClientTier {
  if (!alert) return "none";
  if (alert.urgency === "urgent") return "urgent";
  if (alert.urgency === "amber") return "attention";
  if (alert.urgency === "green" && alert.action === "view") return "update";
  return "none";
}

function getAlertBadgeLabel(alert: AgentAlert, client: ClientRow): string {
  if (alert.id === "sarah-chen-refix" && client.daysToRefix !== null) {
    return `Refix in ${client.daysToRefix} days`;
  }
  if (alert.id === "james-wilson-insurance") return "Insurance gap $142,000";
  if (alert.id === "emma-thompson-equity") return "Equity up $95,000";
  if (alert.id === "jane-smith-completed") return "Health check complete";
  return alert.headline;
}

function sortClients(clients: ClientRow[]): ClientRow[] {
  return clients
    .map((client, index) => ({ client, index }))
    .sort((a, b) => {
      const tierA = getClientTier(getPrimaryAlert(a.client.name));
      const tierB = getClientTier(getPrimaryAlert(b.client.name));
      const tierDiff = TIER_ORDER[tierA] - TIER_ORDER[tierB];
      return tierDiff !== 0 ? tierDiff : a.index - b.index;
    })
    .map(({ client }) => client);
}

type ClientPortfolioProps = {
  clients: ClientRow[];
  onMessage: (alertId: string) => void;
};

export function ClientPortfolio({ clients, onMessage }: ClientPortfolioProps) {
  const router = useRouter();
  const sorted = sortClients(clients);

  return (
    <section id="clients">
      <h2 className="text-lg font-semibold text-foreground">Your clients</h2>
      <p className="mt-1 text-sm text-muted">
        Bay of Plenty homeowners in your Sanctury network.
      </p>
      <ul className="mt-4">
        {sorted.map((client) => {
          const alert = getPrimaryAlert(client.name);
          const tier = getClientTier(alert);
          const showAlert = tier !== "none" && alert;

          return (
            <li
              key={client.id}
              onClick={() => router.push(`/agent/dashboard/clients/${client.id}`)}
              className={`mb-2 cursor-pointer rounded-xl p-4 shadow-sm transition-shadow hover:shadow-md ${ROW_STYLES[tier]}`}
            >
              <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:min-w-[240px]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2E8B57] text-sm font-bold text-white">
                    {getInitials(client.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold text-[#0A0A0A]">
                      {client.name}
                    </p>
                    <p className="truncate text-[13px] text-[#525252]">
                      {client.address}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-[160px] flex-1 items-center justify-center">
                  {showAlert && (
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${BADGE_STYLES[tier]}`}
                    >
                      {getAlertBadgeLabel(alert, client)}
                    </span>
                  )}
                </div>

                <div className="ml-auto flex flex-wrap items-center gap-4">
                  <span className="text-sm text-[#525252]">
                    {formatCurrency(client.estimatedValue)}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[client.healthCheckStatus]}`}
                  >
                    {client.healthCheckStatus}
                  </span>
                  {showAlert && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMessage(alert.id);
                      }}
                      className={
                        tier === "update"
                          ? "rounded-full border border-[#2E8B57] px-4 py-1.5 text-xs font-semibold text-[#2E8B57] transition-colors hover:bg-[#2E8B57]/5"
                          : "rounded-full bg-[#2E8B57] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#267349]"
                      }
                    >
                      Message →
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
