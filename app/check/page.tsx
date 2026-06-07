import { SiteHeader } from "../components/site-header";
import { HomeHealthCheckForm } from "./home-health-check-form";

export default function CheckPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:py-14">
          <p className="badge-violet">Home Health Check</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s get your home sorted.
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted">
            A few questions about your property and finances. Takes 5 minutes.
            Completely free.
          </p>

          <div className="mt-10">
            <HomeHealthCheckForm />
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted">
        <p>Not financial advice. For educational purposes only.</p>
      </footer>
    </div>
  );
}
