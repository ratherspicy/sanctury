"use client";

import { useState } from "react";
import {
  AGENT_ALERTS,
  AGENT_CLIENTS,
  getAlertById,
} from "@/lib/agent/dashboard-data";
import { AgentNav } from "./components/agent-nav";
import { AlertFeed } from "./components/alert-feed";
import { ClientPortfolio } from "./components/client-portfolio";
import { MessageModal } from "./components/message-modal";
import { StatsBar } from "./components/stats-bar";

export function AgentDashboardView() {
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  const activeAlert = activeAlertId ? getAlertById(activeAlertId) ?? null : null;

  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <AgentNav />

      <main className="relative flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
          <div className="mb-8">
            <p className="text-sm text-muted">Bay of Plenty · Client intelligence</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Your clients, sorted.
            </h1>
          </div>

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
