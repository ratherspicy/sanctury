import { SiteHeader } from "../components/site-header";
import { ReportView } from "./report-view";

export default function ReportPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader minimal />

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
          <p className="badge-violet">Your personalised report</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Here&apos;s your full picture.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Based on what you told us. No jargon, no sales pitch — just a clear
            picture of where your home stands today, and what&apos;s worth your
            attention.
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
