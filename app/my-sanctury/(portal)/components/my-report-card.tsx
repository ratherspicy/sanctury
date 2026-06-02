import Link from "next/link";
import { formatDate } from "@/lib/format";

type MyReportCardProps = {
  lastHealthCheckDate: string;
};

export function MyReportCardSection({ lastHealthCheckDate }: MyReportCardProps) {
  return (
    <section className="card p-6 sm:p-8">
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
            className="btn-violet h-11 px-6 text-sm"
          >
            View full report
          </Link>
          <Link
            href="/check"
            className="btn-ghost h-11 px-6 text-sm"
          >
            Run a new check
          </Link>
        </div>
      </div>
    </section>
  );
}
