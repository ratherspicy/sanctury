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
  urgent: "bg-danger-soft text-danger",
  new: "bg-teal-50 text-teal-600",
} as const;

const URGENCY_LABELS = {
  urgent: "Urgent",
  new: "New",
} as const;

export function PartnerDashboardView() {
  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <SiteHeader minimal />
      <PartnerNav />

      <main className="relative flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
          <div className="mb-8">
            <p className="text-sm text-muted">Bay of Plenty · Insurance marketplace</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Your pipeline
            </h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Active leads", value: String(PARTNER_STATS.activeLeads) },
              { label: "Proposals sent", value: String(PARTNER_STATS.proposalsSent) },
              { label: "Jobs won this month", value: String(PARTNER_STATS.jobsWonThisMonth) },
              {
                label: "Earnings this month",
                value: formatCurrency(PARTNER_STATS.earningsThisMonth),
                accent: true,
              },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="text-sm text-muted">{stat.label}</p>
                <p
                  className={`mt-2 text-2xl font-bold tracking-tight ${
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
              {PARTNER_LEADS.map((lead) => (
                <li key={lead.id} className="card p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground">{lead.name}</h3>
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${URGENCY_STYLES[lead.urgency]}`}
                        >
                          {URGENCY_LABELS[lead.urgency]}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{lead.location}</p>
                    </div>
                    <p className="text-xs text-muted">Posted {lead.postedLabel}</p>
                  </div>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
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
                  <Link
                    href={`/partners/dashboard/leads/${lead.id}`}
                    className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-teal-600 px-4 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                  >
                    View & respond
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Active proposals</h2>
            <ul className="mt-4 space-y-4">
              {ACTIVE_PROPOSALS.map((proposal) => (
                <li key={proposal.id} className="card p-5 sm:p-6">
                  <p className="font-bold text-foreground">{proposal.name}</p>
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
                    {" · "}
                    Status:{" "}
                    <span className="font-medium text-teal-600">{proposal.status}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Won jobs</h2>
            <ul className="mt-4 space-y-4">
              {WON_JOBS.map((job) => (
                <li key={job.id} className="card p-5 sm:p-6">
                  <p className="font-bold text-foreground">{job.name}</p>
                  <p className="mt-1 text-sm text-muted">Won {job.wonLabel}</p>
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
                    {" · "}
                    Success fee:{" "}
                    <span className="font-medium text-brand">
                      {formatCurrency(job.successFee)}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
