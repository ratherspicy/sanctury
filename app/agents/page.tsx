import { SiteHeader } from "../components/site-header";
import { SancturyLogo } from "../components/sanctury-logo";

const AGENT_FEATURES = [
  {
    icon: "bell" as const,
    title: "Timed alerts",
    body: "Sanctury tells you when a client has a refix coming, an insurance gap, or an equity milestone. No guessing. No cold calls.",
  },
  {
    icon: "message" as const,
    title: "Ready-to-send messages",
    body: "One click generates a personalised message for each alert. Reviewed by AI. Sent by you. Your clients feel looked after.",
  },
  {
    icon: "chart" as const,
    title: "Listing signals",
    body: "See which clients are approaching the seven-year mark with growing equity. The next listing is visible 18 months before it happens.",
  },
];

function FeatureIcon({ icon }: { icon: "bell" | "message" | "chart" }) {
  if (icon === "bell") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "message") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AgentsPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1">
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="max-w-4xl">
              <p className="badge-violet mb-10">For Tall Poppy agents</p>
              <h1 className="text-hero text-foreground max-sm:text-5xl max-sm:tracking-[-0.03em]">
                Own the listing before it exists.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                Sanctury keeps you present through the seven years between sales.
                Know who needs attention, when — and have something genuine to say.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="/agent/login" className="btn-violet h-11 px-8">
                  Agent login →
                </a>
                <a href="#how" className="btn-ghost h-11 px-8">
                  See how it works ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {AGENT_FEATURES.map((item) => (
                <article key={item.title} className="card flex flex-col p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-light text-violet">
                    <FeatureIcon icon={item.icon} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="bg-foreground py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
            <h2 className="text-h2 !text-white max-sm:text-3xl">
              The settlement meeting replaces the gift basket.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
              At settlement, open Sanctury with your buyer. The property details
              you already know are pre-filled. They enter their financial details.
              They leave with their report. You leave with a reason to come back.
            </p>
            <a href="/agent/login" className="btn-accent mt-10 inline-flex h-11 px-8">
              Agent login →
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <SancturyLogo />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                Right, from day one. Built for New Zealand.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-sm font-semibold text-foreground">Product</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>
                    <a href="#tools" className="hover:text-violet">
                      Home Health Check
                    </a>
                  </li>
                  <li>
                    <a href="#tools" className="hover:text-violet">
                      Mortgage Strategy
                    </a>
                  </li>
                  <li>
                    <a href="#tools" className="hover:text-violet">
                      Property Intelligence
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Company</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>
                    <a href="#about" className="hover:text-violet">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="hover:text-violet">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-violet">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Sanctury. Made in Aotearoa New Zealand.</p>
            <p>Not financial advice. For educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
