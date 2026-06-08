"use client";

import { useState } from "react";
import {
  AGENT_ALERTS,
  AGENT_CLIENTS,
  AGENT_STATS,
  getAlertById,
} from "@/lib/agent/dashboard-data";
import { formatCurrency } from "@/lib/format";
import { AgentNav } from "./components/agent-nav";
import { AlertFeed } from "./components/alert-feed";
import { ClientPortfolio } from "./components/client-portfolio";
import { MessageModal } from "./components/message-modal";
import { StatsBar } from "./components/stats-bar";

export function AgentDashboardView() {
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  const activeAlert = activeAlertId ? getAlertById(activeAlertId) ?? null : null;
  const urgentCount = AGENT_ALERTS.filter((a) => a.urgency === "urgent").length;
  const attentionCount = AGENT_ALERTS.filter(
    (a) => a.urgency === "urgent" || a.urgency === "amber"
  ).length;

  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <AgentNav />

      <main className="relative flex-1">
        <section
          className="border-b-4 border-[#3CB371] px-8 py-10 text-white"
          style={{
            background:
              "linear-gradient(135deg, #1a5c3a 0%, #2E8B57 50%, #3CB371 100%)",
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Bay of Plenty · Client intelligence
              </p>
              <h1 className="!text-white mt-2 text-4xl font-black lg:text-5xl">
                Good morning, Mark.
              </h1>
              <p className="mt-2 text-base text-white/85">
                You have {attentionCount} client{attentionCount === 1 ? "" : "s"}{" "}
                who need attention today.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {AGENT_STATS.totalClients} clients
              </span>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {AGENT_STATS.healthChecksCompleted} health checks
              </span>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {formatCurrency(AGENT_STATS.estimatedReferralIncome)} earned
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
          <StatsBar />

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,380px)_1fr]">
            <div id="alerts">
              <AlertFeed
                alerts={AGENT_ALERTS}
                onGenerate={setActiveAlertId}
                onView={setActiveAlertId}
              />
            </div>
            <div id="clients">
              <ClientPortfolio clients={AGENT_CLIENTS} />
            </div>
          </div>
        </div>
      </main>

      <MessageModal alert={activeAlert} onClose={() => setActiveAlertId(null)} />
    </div>
  );
}
