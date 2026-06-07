import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-2xl px-6 py-10 lg:px-8 lg:py-14">
          <p className="badge-violet">About Sanctury</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Right, from day one.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Sanctury is the AI-powered marketplace helping New Zealand homeowners
            get a fair deal on insurance, mortgages, maintenance, and more —
            free, forever. This page will soon tell our full story.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
