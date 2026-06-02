import { formatCurrency } from "@/lib/format";
import type { InsuranceJobPosting } from "@/lib/marketplace/insurance-storage";
import { getHomeownerFirstName } from "@/lib/marketplace/request-timeline";

type AdviserLeadNotificationProps = {
  adviserFirstName: string;
  adviserInitials: string;
  homeownerName: string;
  posting: InsuranceJobPosting;
  preferredContactMethod?: string;
};

export function AdviserLeadNotification({
  adviserFirstName,
  adviserInitials,
  homeownerName,
  posting,
  preferredContactMethod = "Email",
}: AdviserLeadNotificationProps) {
  const homeownerFirstName = getHomeownerFirstName(homeownerName);

  return (
    <aside className="rounded-xl border border-dashed border-border bg-background p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-violet">
        Adviser notification
      </p>
      <h2 className="mt-1 text-lg font-semibold text-foreground">
        What {adviserFirstName} receives
      </h2>
      <div className="mt-4 card p-4">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6] text-xs font-bold text-foreground">
            {adviserInitials}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              New Sanctury lead
            </p>
            <p className="text-xs text-muted">Just now</p>
          </div>
        </div>
        <dl className="mt-3 space-y-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Homeowner</dt>
            <dd className="font-medium text-foreground">{homeownerFirstName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Region</dt>
            <dd className="font-medium text-foreground">{posting.region}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Coverage gap</dt>
            <dd className="font-medium text-foreground">
              {posting.coverageGap > 0
                ? formatCurrency(posting.coverageGap)
                : "None identified"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Preferred contact</dt>
            <dd className="font-medium text-foreground">
              {preferredContactMethod}
            </dd>
          </div>
        </dl>
        <p className="mt-3 rounded-lg bg-bg-secondary px-3 py-2 text-xs leading-relaxed text-muted">
          Full contact details and property report summary are included with
          this notification.
        </p>
      </div>
    </aside>
  );
}
