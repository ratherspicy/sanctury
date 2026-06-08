import { formatCurrency } from "@/lib/format";
import { AGENT_STATS } from "@/lib/agent/dashboard-data";

const STATS = [
  {
    label: "Total clients",
    value: String(AGENT_STATS.totalClients),
    accent: false,
    cardClass: "border-l-4 border-green-600 bg-green-50",
  },
  {
    label: "Health checks completed",
    value: String(AGENT_STATS.healthChecksCompleted),
    accent: false,
    cardClass: "border-l-4 border-blue-500 bg-blue-50",
  },
  {
    label: "Marketplace referrals generated",
    value: String(AGENT_STATS.marketplaceReferrals),
    accent: false,
    cardClass: "border-l-4 border-purple-500 bg-purple-50",
  },
  {
    label: "Estimated referral income",
    value: formatCurrency(AGENT_STATS.estimatedReferralIncome),
    accent: true,
    cardClass: "border-l-4 border-emerald-500 bg-emerald-50",
  },
] as const;

export function StatsBar() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.label} className={`rounded-xl p-5 ${stat.cardClass}`}>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {stat.label}
          </p>
          <p
            className={`mt-2 text-3xl font-black tracking-tight ${
              stat.accent ? "text-green-600" : "text-foreground"
            }`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
