import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-2xl px-6 py-10 lg:px-8 lg:py-14">
          <p className="badge-violet">Privacy</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your privacy matters
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Our full privacy policy is coming soon. Sanctury uses your information
            only to generate your home health report, send timely alerts, and
            improve your experience — we never sell your data to third parties.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
