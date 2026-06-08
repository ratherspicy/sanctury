"use client";

import { useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/format";
import type { ClientRow } from "@/lib/agent/dashboard-data";

const STATUS_STYLES: Record<ClientRow["healthCheckStatus"], string> = {
  Completed: "bg-[#d1fae5] text-[#2E8B57]",
  "In progress": "bg-blue-100 text-blue-700",
  "Not started": "bg-gray-100 text-gray-500",
};

const AVATAR_GRADIENTS: Record<string, string> = {
  S: "bg-gradient-to-br from-[#2E8B57] to-[#3CB371]",
  C: "bg-gradient-to-br from-blue-500 to-blue-600",
  E: "bg-gradient-to-br from-purple-500 to-purple-600",
  M: "bg-gradient-to-br from-orange-500 to-orange-600",
  J: "bg-gradient-to-br from-teal-500 to-teal-600",
  D: "bg-gradient-to-br from-red-500 to-red-600",
  L: "bg-gradient-to-br from-pink-500 to-pink-600",
  T: "bg-gradient-to-br from-indigo-500 to-indigo-600",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function avatarClass(name: string): string {
  const letter = name.charAt(0).toUpperCase();
  return AVATAR_GRADIENTS[letter] ?? "bg-[#2E8B57]";
}

function RefixDisplay({ days }: { days: number }) {
  if (days <= 30) {
    return (
      <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
        {days} days
      </span>
    );
  }
  if (days <= 90) {
    return (
      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
        {days} days
      </span>
    );
  }
  return <span className="text-muted">{days} days</span>;
}

type ClientPortfolioProps = {
  clients: ClientRow[];
};

export function ClientPortfolio({ clients }: ClientPortfolioProps) {
  const router = useRouter();

  return (
    <section id="clients" className="card ">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-lg font-semibold text-foreground">Client portfolio</h2>
        <p className="mt-1 text-sm text-muted">
          Bay of Plenty homeowners in your Sanctury network.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] table-auto text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-background/80 text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="min-w-[180px] px-6 py-3">Name</th>
              <th className="min-w-[200px] px-4 py-3">Property address</th>
              <th className="min-w-[120px] px-4 py-3">Purchase date</th>
              <th className="min-w-[120px] px-4 py-3">Purchase price</th>
              <th className="min-w-[130px] px-4 py-3">Est. current value</th>
              <th className="min-w-[110px] px-4 py-3">Health check</th>
              <th className="min-w-[110px] px-4 py-3">Days to refix</th>
              <th className="w-10 min-w-[40px] px-4 py-3" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr
                key={client.id}
                onClick={() => router.push(`/agent/dashboard/clients/${client.id}`)}
                className={`group cursor-pointer border-b border-[#F0F0F0] transition-colors duration-150 hover:bg-[#F5F4FF] ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${avatarClass(client.name)}`}
                    >
                      {getInitials(client.name)}
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {client.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-muted">{client.address}</td>
                <td className="whitespace-nowrap px-4 py-4 text-muted">
                  {formatDate(client.purchaseDate)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-foreground">
                  {formatCurrency(client.purchasePrice)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 font-medium text-foreground">
                  {formatCurrency(client.estimatedValue)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[client.healthCheckStatus]}`}
                  >
                    {client.healthCheckStatus}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  {client.daysToRefix !== null ? (
                    <RefixDisplay days={client.daysToRefix} />
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-4 text-right text-lg font-medium text-[#3CB371] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  ›
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
