import { formatCurrency } from "@/lib/format";
import {
  getEquityPercentage,
  type PropertySnapshot,
} from "@/lib/my-sanctury/dashboard-data";

type PropertySnapshotProps = {
  data: PropertySnapshot;
};

export function PropertySnapshotSection({ data }: PropertySnapshotProps) {
  const equityPercent = getEquityPercentage(
    data.equityAmount,
    data.estimatedCurrentValue
  );

  return (
    <section className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/8 via-surface to-accent-soft/30 p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium text-brand">Your property</p>
      <h2 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
        {data.address}
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-muted">Estimated current value</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {formatCurrency(data.estimatedCurrentValue)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">Purchase price</p>
          <p className="mt-1 text-xl font-semibold text-foreground">
            {formatCurrency(data.purchasePrice)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">Equity built</p>
          <p className="mt-1 text-xl font-semibold text-brand">
            {formatCurrency(data.equityAmount)}
          </p>
          <p className="mt-0.5 text-sm text-muted">{equityPercent}% of value</p>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-sm text-muted">Ownership progress</p>
          <div className="mt-3">
            <div className="h-3 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${equityPercent}%` }}
                role="progressbar"
                aria-valuenow={equityPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${equityPercent}% equity`}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted">
              <span>Mortgage</span>
              <span>{equityPercent}% owned outright</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
