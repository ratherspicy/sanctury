import Link from "next/link";
import type { PropertyDetails } from "@/lib/my-sanctury/dashboard-data";

type PropertyDetailsCardProps = {
  details: PropertyDetails;
};

export function PropertyDetailsSection({ details }: PropertyDetailsCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            My property details
          </h2>
          <p className="mt-1 text-sm text-muted">
            From your last Home Health Check.
          </p>
        </div>
        <Link
          href="/check"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand/30"
        >
          Edit
        </Link>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-background p-4 sm:col-span-2">
          <dt className="text-sm text-muted">Address</dt>
          <dd className="mt-1 font-medium text-foreground">{details.address}</dd>
        </div>
        <div className="rounded-xl bg-background p-4">
          <dt className="text-sm text-muted">Floor area</dt>
          <dd className="mt-1 font-medium text-foreground">
            {details.floorArea} m²
          </dd>
        </div>
        <div className="rounded-xl bg-background p-4">
          <dt className="text-sm text-muted">Year built</dt>
          <dd className="mt-1 font-medium text-foreground">
            {details.yearBuilt}
          </dd>
        </div>
        <div className="rounded-xl bg-background p-4">
          <dt className="text-sm text-muted">Build quality</dt>
          <dd className="mt-1 font-medium text-foreground">
            {details.buildQuality}
          </dd>
        </div>
        <div className="rounded-xl bg-background p-4">
          <dt className="text-sm text-muted">Features</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {details.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
              >
                {feature}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  );
}
