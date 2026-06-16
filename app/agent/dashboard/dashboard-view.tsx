"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AGENT_ALERTS,
  AGENT_CLIENTS,
  AGENT_STATS,
  getAlertById,
} from "@/lib/agent/dashboard-data";
import { formatCurrency } from "@/lib/format";
import { AgentNav } from "./components/agent-nav";
import { ClientPortfolio } from "./components/client-portfolio";
import { MessageModal } from "./components/message-modal";
import { StatsBar } from "./components/stats-bar";

export function AgentDashboardView() {
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  const activeAlert = activeAlertId ? getAlertById(activeAlertId) ?? null : null;
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
            <div className="flex flex-col gap-4 lg:items-end">
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
              <Link
                href="/agent/dashboard/properties/new"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1a5c3a] shadow-sm transition-opacity hover:opacity-90"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Create Property Record
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
          <StatsBar />
          <div className="mt-8">
            <ClientPortfolio
              clients={AGENT_CLIENTS}
              onMessage={setActiveAlertId}
            />
          </div>
        </div>
      </main>

      <MessageModal alert={activeAlert} onClose={() => setActiveAlertId(null)} />
    </div>
  );
}
