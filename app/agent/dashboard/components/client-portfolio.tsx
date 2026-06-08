"use client";

import { useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/format";
import type { ClientRow } from "@/lib/agent/dashboard-data";

const STATUS_STYLES: Record<ClientRow["healthCheckStatus"], string> = {
  Completed: "bg-green-100 text-green-700",
  "In progress": "bg-blue-100 text-blue-700",
  "Not started": "bg-gray-100 text-gray-500",
};

function refixClass(days: number): string {
  if (days <= 30) return "font-bold text-danger";
  if (days <= 90) return "font-semibold text-warning";
  return "text-muted";
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
              <th className="min-w-[140px] px-6 py-3">Name</th>
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
                  <td className="px-6 py-4 text-base font-semibold text-foreground">
                    {client.name}
                  </td>
                  <td className="px-4 py-4 text-muted">{client.address}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-muted">
                    {formatDate(client.purchaseDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-foreground">
                    {formatCurrency(client.purchasePrice)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-foreground">
                    {formatCurrency(client.estimatedValue)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[client.healthCheckStatus]}`}
                    >
                      {client.healthCheckStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {client.daysToRefix !== null ? (
                      <span className={refixClass(client.daysToRefix)}>
                        {client.daysToRefix} days
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-lg font-medium text-green-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
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
