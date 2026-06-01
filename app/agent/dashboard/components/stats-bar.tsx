import { formatCurrency } from "@/lib/format";
import { AGENT_STATS } from "@/lib/agent/dashboard-data";

const STATS = [
  { label: "Total clients", value: String(AGENT_STATS.totalClients) },
  { label: "Health checks completed", value: String(AGENT_STATS.healthChecksCompleted) },
  { label: "Marketplace referrals generated", value: String(AGENT_STATS.marketplaceReferrals) },
  {
    label: "Estimated referral income",
    value: formatCurrency(AGENT_STATS.estimatedReferralIncome),
  },
] as const;

export function StatsBar() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
        >
          <p className="text-sm text-muted">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
