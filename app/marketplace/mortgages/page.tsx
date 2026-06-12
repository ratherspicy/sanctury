import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = {
  title: "Mortgage advisers — Sanctury",
  description:
    "Compare refix and refinance proposals from independent mortgage advisers.",
};

export default function MortgagesPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <SiteHeader minimal />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex rounded-full bg-violet-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet">
            Mortgage marketplace
          </span>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-foreground">
            Refix and refinance, without the runaround.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Independent mortgage advisers will compare structures and rates for
            your refix — the same way Sanctury advisers quote your insurance
            today. This marketplace opens soon.
          </p>

          <div className="card mx-auto mt-8 max-w-sm p-5 text-left">
            <p className="text-sm font-bold text-foreground">Kahu Advisers</p>
            <p className="text-xs font-medium text-violet">Mortgage Brokers</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              &ldquo;Refix and refinance specialists&rdquo; — first adviser
              group joining the mortgage marketplace.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/check"
              className="inline-flex items-center justify-center rounded-full bg-[#6D5FD8] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-dark"
            >
              Run your free health check
            </Link>
            <Link
              href="/marketplace"
              className="text-sm font-medium text-violet hover:underline"
            >
              ← Back to marketplace
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
