"use client";

import { useRouter } from "next/navigation";
import type { ClientRow } from "@/lib/agent/dashboard-data";

type ClientAction =
  | { type: "message"; alertId: string }
  | { type: "view" }
  | null;

type ClientDisplay = {
  avatarImg: number;
  whatsHappening: string;
  urgencyBadge: { label: string; className: string } | null;
  rowClass: string;
  action: ClientAction;
  sortOrder: number;
};

const CLIENT_DISPLAY: Record<string, ClientDisplay> = {
  "sarah-chen": {
    avatarImg: 5,
    whatsHappening: "Mortgage refix in 14 days — action needed",
    urgencyBadge: { label: "14 days", className: "bg-red-100 text-red-700" },
    rowClass: "bg-red-50 border-l-4 border-red-500",
    action: { type: "message", alertId: "sarah-chen-refix" },
    sortOrder: 0,
  },
  "james-wilson": {
    avatarImg: 8,
    whatsHappening: "Insurance gap of $142,000 identified",
    urgencyBadge: { label: "Attention", className: "bg-orange-100 text-orange-700" },
    rowClass: "bg-orange-50 border-l-4 border-orange-400",
    action: { type: "message", alertId: "james-wilson-insurance" },
    sortOrder: 1,
  },
  "michael-brown": {
    avatarImg: 11,
    whatsHappening: "Bright-line test expires in 90 days",
    urgencyBadge: { label: "90 days", className: "bg-orange-100 text-orange-700" },
    rowClass: "bg-orange-50 border-l-4 border-orange-400",
    action: { type: "message", alertId: "michael-brown-brightline" },
    sortOrder: 2,
  },
  "jane-smith": {
    avatarImg: 15,
    whatsHappening: "Health check complete — refix in 89 days",
    urgencyBadge: { label: "89 days", className: "bg-yellow-100 text-yellow-700" },
    rowClass: "bg-yellow-50 border-l-4 border-yellow-400",
    action: { type: "message", alertId: "jane-smith-completed" },
    sortOrder: 3,
  },
  "emma-thompson": {
    avatarImg: 16,
    whatsHappening: "Equity up $95,000 since purchase",
    urgencyBadge: { label: "New", className: "bg-green-100 text-green-700" },
    rowClass: "bg-green-50 border-l-4 border-green-400",
    action: { type: "message", alertId: "emma-thompson-equity" },
    sortOrder: 4,
  },
  "david-park": {
    avatarImg: 13,
    whatsHappening: "Health check in progress",
    urgencyBadge: { label: "In progress", className: "bg-blue-100 text-blue-700" },
    rowClass: "bg-blue-50 border-l-4 border-blue-300",
    action: { type: "view" },
    sortOrder: 5,
  },
  "lisa-ngata": {
    avatarImg: 20,
    whatsHappening: "No current alerts",
    urgencyBadge: null,
    rowClass: "bg-white border-l-4 border-transparent",
    action: null,
    sortOrder: 6,
  },
  "tom-harrison": {
    avatarImg: 12,
    whatsHappening: "Refix in 456 days",
    urgencyBadge: null,
    rowClass: "bg-white border-l-4 border-transparent",
    action: null,
    sortOrder: 7,
  },
};

const ATTENTION_COUNT = 3;

function sortClients(clients: ClientRow[]): ClientRow[] {
  return [...clients].sort(
    (a, b) =>
      (CLIENT_DISPLAY[a.id]?.sortOrder ?? 99) -
      (CLIENT_DISPLAY[b.id]?.sortOrder ?? 99)
  );
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
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold text-foreground">Your clients</h2>
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          {ATTENTION_COUNT} need attention
        </span>
      </div>

      <ul className="mt-5">
        {sorted.map((client) => {
          const display = CLIENT_DISPLAY[client.id];
          if (!display) return null;

          return (
            <li
              key={client.id}
              onClick={() => router.push(`/agent/dashboard/clients/${client.id}`)}
              className={`mb-2 flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-shadow hover:shadow-md ${display.rowClass}`}
            >
              <img
                src={`https://i.pravatar.cc/48?img=${display.avatarImg}`}
                alt=""
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />

              <p className="w-36 shrink-0 text-base font-bold text-foreground">
                {client.name}
              </p>

              <p className="min-w-0 flex-1 text-sm text-[#525252]">
                {display.whatsHappening}
              </p>

              <div className="ml-auto flex shrink-0 items-center gap-3">
                {display.urgencyBadge && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${display.urgencyBadge.className}`}
                  >
                    {display.urgencyBadge.label}
                  </span>
                )}

                {display.action?.type === "message" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMessage(display.action.alertId);
                    }}
                    className="rounded-full bg-[#2E8B57] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#267349]"
                  >
                    Message →
                  </button>
                )}

                {display.action?.type === "view" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/agent/dashboard/clients/${client.id}`);
                    }}
                    className="rounded-full border border-[#2E8B57] px-4 py-1.5 text-xs font-semibold text-[#2E8B57] transition-colors hover:bg-[#2E8B57]/5"
                  >
                    View →
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
