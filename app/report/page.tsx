import Link from "next/link";
import { SancturyLogo } from "../components/sanctury-logo";
import { ReportView } from "./report-view";

export default function ReportPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" aria-label="Sanctury home">
            <SancturyLogo />
          </Link>
          <Link
            href="/check"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            New check
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -top-24 right-0 h-[400px] w-[400px] rounded-full bg-hero-glow/50 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-brand/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 py-10 lg:py-14">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
              Your personalised report
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Here&apos;s how your home is tracking
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              A clear snapshot of your insurance, mortgage, and maintenance —
              based on what you told us. Take what&apos;s useful, skip the rest.
            </p>

            <div className="mt-10">
              <ReportView />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted">
        <p>Not financial advice. For educational purposes only.</p>
      </footer>
    </div>
  );
}
