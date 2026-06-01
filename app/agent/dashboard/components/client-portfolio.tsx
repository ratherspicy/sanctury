import { formatCurrency, formatDate } from "@/lib/format";
import type { ClientRow } from "@/lib/agent/dashboard-data";

const STATUS_STYLES: Record<ClientRow["healthCheckStatus"], string> = {
  Completed: "bg-brand/10 text-brand",
  "In progress": "bg-accent-soft text-accent",
  "Not started": "bg-background text-muted border border-border",
};

type ClientPortfolioProps = {
  clients: ClientRow[];
};

export function ClientPortfolio({ clients }: ClientPortfolioProps) {
  return (
    <section id="clients" className="rounded-2xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-lg font-semibold text-foreground">Client portfolio</h2>
        <p className="mt-1 text-sm text-muted">
          Bay of Plenty homeowners in your Sanctury network.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-background/80 text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="px-6 py-3">Name</th>
              <th className="px-4 py-3">Property address</th>
              <th className="px-4 py-3">Purchase date</th>
              <th className="px-4 py-3">Purchase price</th>
              <th className="px-4 py-3">Est. current value</th>
              <th className="px-4 py-3">Health check</th>
              <th className="px-6 py-3">Days to refix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clients.map((client) => (
              <tr key={client.id} className="transition-colors hover:bg-background/50">
                <td className="px-6 py-4 font-medium text-foreground">{client.name}</td>
                <td className="px-4 py-4 text-muted">{client.address}</td>
                <td className="px-4 py-4 text-muted whitespace-nowrap">
                  {formatDate(client.purchaseDate)}
                </td>
                <td className="px-4 py-4 text-foreground whitespace-nowrap">
                  {formatCurrency(client.purchasePrice)}
                </td>
                <td className="px-4 py-4 font-medium text-foreground whitespace-nowrap">
                  {formatCurrency(client.estimatedValue)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[client.healthCheckStatus]}`}
                  >
                    {client.healthCheckStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted whitespace-nowrap">
                  {client.daysToRefix !== null ? (
                    <span
                      className={
                        client.daysToRefix <= 30
                          ? "font-semibold text-red-600"
                          : undefined
                      }
                    >
                      {client.daysToRefix} days
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
