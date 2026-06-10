import { formatCurrency } from "@/lib/format";
import { AGENT_STATS } from "@/lib/agent/dashboard-data";

const STATS = [
  {
    label: "Total clients",
    value: String(AGENT_STATS.totalClients),
    accent: false,
    cardClass: "border-l-4 border-[#3CB371] bg-[#f0fdf4]",
    iconBg: "bg-[#f0fdf4]",
    iconColor: "text-[#3CB371]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Health checks completed",
    value: String(AGENT_STATS.healthChecksCompleted),
    accent: false,
    cardClass: "border-l-4 border-[#3CB371] bg-blue-50",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 12l3 3 5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Marketplace referrals generated",
    value: String(AGENT_STATS.marketplaceReferrals),
    accent: false,
    cardClass: "border-l-4 border-[#3CB371] bg-purple-50",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Estimated referral income",
    value: formatCurrency(AGENT_STATS.estimatedReferralIncome),
    accent: true,
    cardClass: "border-l-4 border-[#3CB371] bg-[#f0fdf4]",
    iconBg: "bg-[#f0fdf4]",
    iconColor: "text-[#3CB371]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

export function StatsBar() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className={`relative rounded-xl p-5 ${stat.cardClass}`}
        >
          <span
            className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor}`}
          >
            {stat.icon}
          </span>
          <p className="pr-10 text-xs font-medium uppercase tracking-wide text-gray-500">
            {stat.label}
          </p>
          <p
            className={`mt-2 text-3xl font-black tracking-tight ${
              stat.accent ? "text-[#2E8B57]" : "text-foreground"
            }`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
