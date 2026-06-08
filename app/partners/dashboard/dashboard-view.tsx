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

export function PartnerDashboardView() {
  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <SiteHeader minimal />
      <PartnerNav />

      <main className="relative flex-1">
        <section
          className="px-8 py-10 text-white"
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
              <h1 className="!text-white mt-2 text-4xl font-black">
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
            {[
              {
                label: "Active leads",
                value: String(PARTNER_STATS.activeLeads),
                cardClass: "border-l-4 border-teal-600 bg-teal-50",
                accent: false,
              },
              {
                label: "Proposals sent",
                value: String(PARTNER_STATS.proposalsSent),
                cardClass: "border-l-4 border-blue-500 bg-blue-50",
                accent: false,
              },
              {
                label: "Jobs won this month",
                value: String(PARTNER_STATS.jobsWonThisMonth),
                cardClass: "border-l-4 border-green-500 bg-green-50",
                accent: false,
              },
              {
                label: "Earnings this month",
                value: formatCurrency(PARTNER_STATS.earningsThisMonth),
                cardClass: "border-l-4 border-emerald-500 bg-emerald-50",
                accent: true,
              },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-xl p-5 ${stat.cardClass}`}>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
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
              {PARTNER_LEADS.map((lead) => (
                <li
                  key={lead.id}
                  className={`card p-5 sm:p-6 ${
                    lead.urgency === "urgent" ? "border-l-4 border-teal-500" : ""
                  }`}
                >
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
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-700"
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
