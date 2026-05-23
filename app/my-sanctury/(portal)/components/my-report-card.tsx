import Link from "next/link";
import { formatDate } from "@/lib/format";

type MyReportCardProps = {
  lastHealthCheckDate: string;
};

export function MyReportCardSection({ lastHealthCheckDate }: MyReportCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-foreground">My report</h2>
      <p className="mt-1 text-sm text-muted">
        Your personalised Home Health Check insights.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">Last Home Health Check</p>
          <p className="mt-1 text-xl font-semibold text-foreground">
            {formatDate(lastHealthCheckDate)}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href="/report"
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark"
          >
            View full report
          </Link>
          <Link
            href="/check"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/30"
          >
            Run a new check
          </Link>
        </div>
      </div>
    </section>
  );
}
