"use client";

import { useRouter } from "next/navigation";
import type { ClientRow } from "@/lib/agent/dashboard-data";

type ClientAction =
  | { type: "message"; alertId: string }
  | { type: "view" }
  | null;

type ClientDisplay = {
  alertBadge: { label: string; className: string } | null;
  alertContext: string;
  rowClass: string;
  action: ClientAction;
  sortOrder: number;
};

const CLIENT_AVATARS: Record<string, { src: string; alt: string }> = {
  "sarah-chen": { src: "/avatars/sarah-chen.jpg", alt: "Sarah Chen" },
  "james-wilson": { src: "/avatars/james-wilson.jpg", alt: "James Wilson" },
  "emma-thompson": { src: "/avatars/emma-thompson.jpg", alt: "Emma Thompson" },
  "michael-brown": { src: "/avatars/michael-brown.jpg", alt: "Michael Brown" },
  "jane-smith": { src: "/avatars/jane-smith.jpg", alt: "Jane Smith" },
  "david-park": { src: "/avatars/david-park.jpg", alt: "David Park" },
  "lisa-ngata": { src: "/avatars/lisa-ngata.jpg", alt: "Lisa Ngata" },
  "tom-harrison": { src: "/avatars/tom-harrison.jpg", alt: "Tom Harrison" },
};

const AVATAR_CLASS =
  "w-14 h-14 rounded-full object-cover object-top flex-shrink-0";

const CLIENT_DISPLAY: Record<string, ClientDisplay> = {
  "sarah-chen": {
    alertBadge: { label: "Refix in 14 days", className: "bg-red-100 text-red-700" },
    alertContext: "Contact before 22 June or rate rolls to variable",
    rowClass: "bg-red-50 border-l-4 border-red-500",
    action: { type: "message", alertId: "sarah-chen-refix" },
    sortOrder: 0,
  },
  "james-wilson": {
    alertBadge: {
      label: "Insurance gap $142,000",
      className: "bg-orange-100 text-orange-700",
    },
    alertContext: "Rebuild cost exceeds current cover by $142k",
    rowClass: "bg-orange-50 border-l-4 border-orange-400",
    action: { type: "message", alertId: "james-wilson-insurance" },
    sortOrder: 1,
  },
  "michael-brown": {
    alertBadge: { label: "Bright-line in 90 days", className: "bg-orange-100 text-orange-700" },
    alertContext: "Tax event approaching — flag to client",
    rowClass: "bg-orange-50 border-l-4 border-orange-400",
    action: { type: "message", alertId: "michael-brown-brightline" },
    sortOrder: 2,
  },
  "jane-smith": {
    alertBadge: { label: "Health check done", className: "bg-yellow-100 text-yellow-700" },
    alertContext: "Refix due in 89 days — watch this one",
    rowClass: "bg-yellow-50 border-l-4 border-yellow-400",
    action: { type: "message", alertId: "jane-smith-completed" },
    sortOrder: 3,
  },
  "emma-thompson": {
    alertBadge: { label: "Equity up $95,000", className: "bg-green-100 text-green-700" },
    alertContext: "Good time to discuss borrowing power",
    rowClass: "bg-green-50 border-l-4 border-green-400",
    action: { type: "message", alertId: "emma-thompson-equity" },
    sortOrder: 4,
  },
  "david-park": {
    alertBadge: {
      label: "Health check in progress",
      className: "bg-blue-100 text-blue-700",
    },
    alertContext: "Awaiting client completion",
    rowClass: "bg-blue-50 border-l-4 border-blue-300",
    action: { type: "view" },
    sortOrder: 5,
  },
  "lisa-ngata": {
    alertBadge: null,
    alertContext: "No current alerts",
    rowClass: "bg-white border-l-4 border-transparent",
    action: null,
    sortOrder: 6,
  },
  "tom-harrison": {
    alertBadge: null,
    alertContext: "Refix in 456 days",
    rowClass: "bg-white border-l-4 border-transparent",
    action: null,
    sortOrder: 7,
  },
};

const ATTENTION_COUNT = 3;

function formatEstValue(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted =
      millions % 1 === 0
        ? `$${millions}m`
        : `$${millions.toFixed(2).replace(/\.?0+$/, "")}m`;
    return formatted;
  }
  return `$${Math.round(amount / 1000)}k`;
}

function getHealthCheckPill(status: ClientRow["healthCheckStatus"]) {
  if (status === "Completed") {
    return {
      label: "✓ Health check done",
      className: "bg-green-100 text-green-700",
    };
  }
  if (status === "In progress") {
    return {
      label: "○ Health check in progress",
      className: "bg-blue-100 text-blue-700",
    };
  }
  return {
    label: "○ No health check",
    className: "bg-gray-100 text-gray-400",
  };
}

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
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
          {ATTENTION_COUNT} need attention
        </span>
      </div>

      <ul className="mt-5">
        {sorted.map((client) => {
          const display = CLIENT_DISPLAY[client.id];
          const avatar = CLIENT_AVATARS[client.id];
          if (!display || !avatar) return null;

          const healthPill = getHealthCheckPill(client.healthCheckStatus);

          return (
            <li
              key={client.id}
              onClick={() => router.push(`/agent/dashboard/clients/${client.id}`)}
              className={`mb-2 grid cursor-pointer grid-cols-1 items-center gap-4 rounded-xl p-5 transition-shadow hover:shadow-md md:[grid-template-columns:2fr_2fr_160px] ${display.rowClass}`}
            >
              <div className="flex min-w-0 items-center gap-4">
                <img src={avatar.src} alt={avatar.alt} className={AVATAR_CLASS} />

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-lg font-bold text-[#0A0A0A]">{client.name}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      🏠 Est. {formatEstValue(client.estimatedValue)}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${healthPill.className}`}
                    >
                      {healthPill.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                {display.alertBadge && (
                  <span
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold ${display.alertBadge.className}`}
                  >
                    {display.alertBadge.label}
                  </span>
                )}
                {display.alertContext && (
                  <p className="text-xs leading-snug text-gray-500">
                    {display.alertContext}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                {display.action?.type === "message" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMessage(
                        display.action?.type === "message"
                          ? display.action.alertId
                          : ""
                      );
                    }}
                    className="rounded-full bg-[#2E8B57] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#267349]"
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
                    className="rounded-full border border-[#2E8B57] px-5 py-2 text-sm font-semibold text-[#2E8B57] transition-colors hover:bg-[#2E8B57]/5"
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
