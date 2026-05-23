import type {
  MarketplaceRequest,
  MarketplaceRequestStatus,
} from "@/lib/my-sanctury/dashboard-data";
import { formatDate } from "@/lib/format";

const STATUS_STYLES: Record<MarketplaceRequestStatus, string> = {
  Pending: "bg-accent-soft text-accent",
  "Quotes received": "bg-brand/10 text-brand",
  "Adviser chosen": "bg-brand/15 text-brand-dark",
  Completed: "bg-background text-muted border border-border",
};

type MarketplaceRequestsProps = {
  requests: MarketplaceRequest[];
};

export function MarketplaceRequestsSection({
  requests,
}: MarketplaceRequestsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-foreground">
        My marketplace requests
      </h2>
      <p className="mt-1 text-sm text-muted">
        Insurance and mortgage requests you&apos;ve made through Sanctury.
      </p>

      {requests.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          No requests yet. Start from your Home Health Report when you&apos;re
          ready.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-border">
          {requests.map((request) => (
            <li
              key={request.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {request.type}
                </p>
                <p className="mt-0.5 font-medium text-foreground">
                  {request.title}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Submitted {formatDate(request.createdAt)}
                </p>
              </div>
              <span
                className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[request.status]}`}
              >
                {request.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
