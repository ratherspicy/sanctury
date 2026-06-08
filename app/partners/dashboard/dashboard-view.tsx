import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";
import { formatCurrency } from "@/lib/format";
import {
  ACTIVE_PROPOSALS,
  PARTNER_LEADS,
  PARTNER_STATS,
  WON_JOBS,
} from "@/lib/partner/dashboard-data";
import { PartnerNav } from "./components/partner-nav";

const URGENCY_STYLES = {
  urgent: "bg-red-100 text-red-700 font-bold",
  new: "bg-teal-100 text-teal-700 font-bold",
} as const;

const URGENCY_LABELS = {
  urgent: "Urgent",
  new: "New",
} as const;

const AVATAR_CLASS =
  "w-12 h-12 rounded-full object-cover object-top flex-shrink-0";

const LEAD_PHOTOS: Record<string, { src: string; alt: string }> = {
  jane: {
    src: "/avatars/jane-thompson.jpg",
    alt: "Jane Thompson",
  },
  michael: {
    src: "https://randomuser.me/api/portraits/men/45.jpg",
    alt: "Michael Brown",
  },
};

const PROPOSAL_PHOTOS: Record<string, { src: string; alt: string }> = {
  "emma-wilson": {
    src: "/avatars/emma-wilson.jpg",
    alt: "Emma Wilson",
  },
};

const WON_JOB_PHOTOS: Record<string, { src: string; alt: string }> = {
  "david-chen": {
    src: "/avatars/david-chen.jpg",
    alt: "David Chen",
  },
};

const PARTNER_STATS_CONFIG = [
  {
    label: "Active leads",
    value: String(PARTNER_STATS.activeLeads),
    cardClass: "border-l-4 border-teal-600 bg-teal-50",
    accent: false,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Proposals sent",
    value: String(PARTNER_STATS.proposalsSent),
    cardClass: "border-l-4 border-blue-500 bg-blue-50",
    accent: false,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Jobs won this month",
    value: String(PARTNER_STATS.jobsWonThisMonth),
    cardClass: "border-l-4 border-green-500 bg-green-50",
    accent: false,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M8 21h8M12 17v4M6 4h12l2 4H4l2-4zM7 8v5M12 8v5M17 8v5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Earnings this month",
    value: formatCurrency(PARTNER_STATS.earningsThisMonth),
    cardClass: "border-l-4 border-emerald-500 bg-emerald-50",
    accent: true,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
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

function ProposalProgress() {
  return (
    <div className="mt-4 flex items-center gap-0">
      <div className="flex flex-col items-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
          1
        </span>
        <span className="mt-1 text-[10px] font-medium text-teal-600">Sent</span>
      </div>
      <div className="mx-1 h-0.5 w-12 bg-gray-200" />
      <div className="flex flex-col items-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 text-[10px] font-medium text-gray-400">
          2
        </span>
        <span className="mt-1 text-[10px] text-gray-400">Reviewed</span>
      </div>
      <div className="mx-1 h-0.5 w-12 bg-gray-200" />
      <div className="flex flex-col items-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 text-[10px] font-medium text-gray-400">
          3
        </span>
        <span className="mt-1 text-[10px] text-gray-400">Chosen</span>
      </div>
    </div>
  );
}

export function PartnerDashboardView() {
  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <SiteHeader minimal />
      <PartnerNav />

      <main className="relative flex-1">
        <section
          className="border-b-4 border-[#0D9488] px-8 py-10 text-white"
          style={{
            background:
              "linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #14B8A6 100%)",
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Bay of Plenty · Insurance marketplace
              </p>
              <h1 className="!text-white mt-2 text-4xl font-black lg:text-5xl">
                Good morning, Sarah.
              </h1>
              <p className="mt-2 text-base text-white/85">
                You have{" "}
                {PARTNER_LEADS.filter((l) => l.urgency === "new").length} new lead
                {PARTNER_LEADS.filter((l) => l.urgency === "new").length === 1
                  ? ""
                  : "s"}{" "}
                waiting for your proposal.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {PARTNER_STATS.activeLeads} active leads
              </span>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {PARTNER_STATS.proposalsSent} proposals sent
              </span>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {formatCurrency(PARTNER_STATS.earningsThisMonth)} earned
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {PARTNER_STATS_CONFIG.map((stat) => (
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
                    stat.accent ? "text-teal-600" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">New leads</h2>
            <p className="mt-1 text-sm text-muted">
              Homeowners requesting insurance quotes through Sanctury.
            </p>
            <ul className="mt-4 space-y-4">
              {PARTNER_LEADS.map((lead) => {
                const gapPercent = Math.round(
                  (lead.gap / lead.estimatedRebuild) * 100
                );
                const photo = LEAD_PHOTOS[lead.id];

                return (
                  <li
                    key={lead.id}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      {photo && (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className={AVATAR_CLASS}
                        />
                      )}
                      <h3 className="text-lg font-bold text-foreground">
                        {lead.name}
                      </h3>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${URGENCY_STYLES[lead.urgency]}`}
                      >
                        {URGENCY_LABELS[lead.urgency]}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">
                        Posted {lead.postedLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{lead.location}</p>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <dt className="text-muted">Current cover</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">
                          {formatCurrency(lead.currentCover)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted">Estimated rebuild</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">
                          {formatCurrency(lead.estimatedRebuild)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted">Gap</dt>
                        <dd className="mt-0.5 font-semibold text-danger">
                          {formatCurrency(lead.gap)}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Coverage gap</p>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{ width: `${gapPercent}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/partners/dashboard/leads/${lead.id}`}
                      className="mt-5 inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-700"
                    >
                      View & respond
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Active proposals</h2>
            <ul className="mt-4 space-y-4">
              {ACTIVE_PROPOSALS.map((proposal) => {
                const photo = PROPOSAL_PHOTOS[proposal.id];

                return (
                <li key={proposal.id} className="card p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    {photo && (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className={AVATAR_CLASS}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-bold text-foreground">{proposal.name}</p>
                    <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                      {proposal.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Proposal sent {proposal.sentLabel} — awaiting response
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Sum insured:{" "}
                    <span className="font-medium text-foreground">
                      {formatCurrency(proposal.sumInsured)}
                    </span>
                    {" · "}
                    Premium:{" "}
                    <span className="font-medium text-foreground">
                      {formatCurrency(proposal.premiumAnnual)}/year
                    </span>
                  </p>
                  <ProposalProgress />
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Won jobs</h2>
            <ul className="mt-4 space-y-4">
              {WON_JOBS.map((job) => {
                const photo = WON_JOB_PHOTOS[job.id];

                return (
                <li key={job.id} className="card flex gap-4 p-5 sm:p-6">
                  {photo ? (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className={AVATAR_CLASS}
                    />
                  ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                      <path
                        d="M8 12l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground">{job.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Won {job.wonLabel}
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      Sum insured:{" "}
                      <span className="font-medium text-foreground">
                        {formatCurrency(job.sumInsured)}
                      </span>
                      {" · "}
                      Premium:{" "}
                      <span className="font-medium text-foreground">
                        {formatCurrency(job.premiumAnnual)}/year
                      </span>
                    </p>
                    <p className="mt-2 text-lg font-bold text-green-600">
                      Success fee: {formatCurrency(job.successFee)}
                    </p>
                  </div>
                </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
