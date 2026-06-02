import Link from "next/link";
import { SancturyLogo } from "../components/sanctury-logo";
import { ReportView } from "./report-view";

export default function ReportPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-surface">
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

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
          <p className="badge-violet">Your personalised report</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Here&apos;s your full picture.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Based on what you told us — here is what you need to know about
            your home right now.
          </p>

          <div className="mt-10">
            <ReportView />
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted">
        <p>Not financial advice. For educational purposes only.</p>
      </footer>
    </div>
  );
}
