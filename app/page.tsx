import { SiteHeader } from "./components/site-header";
import { SancturyLogo } from "./components/sanctury-logo";

const tools = [
  {
    name: "Home Health Check",
    description:
"Find out if your insurance actually covers your home — and where the gaps are before they become a problem.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 14h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Mortgage Strategy",
    description:
"See how your loan is really working for you — and what small changes could save you years.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 18V8l8-4 8 4v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 14h8M8 11h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Property Intelligence",
    description:
"Know what maintenance is coming up and what your home is actually worth — before it catches you off guard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M5 19V9l7-4 7 4v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 15.5v3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="max-w-4xl">
              <p className="badge-violet mb-10">Your home sorted. For free.</p>
              <h1 className="text-hero text-foreground max-sm:text-5xl max-sm:tracking-[-0.03em]">
                <span className="text-violet">Right,</span> from day one.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                The AI-powered marketplace that helps Kiwis get a fair deal on
                everything their home needs — free, forever.
              </p>
              <div
                id="get-started"
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <a href="/check" className="btn-violet h-11 px-8">
                  Get started
                </a>
                <a href="#about" className="btn-ghost h-11 px-8">
                  Learn how it works
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                {
                  label: "Built for NZ",
                  detail:
"Rates, rebuild costs and lending rules specific to New Zealand",
                },
                {
                  label: "Always free",
                  detail: "No subscription, no hidden fees, ever",
                },
                { label: "Your data", detail: "You own it. We never sell it." },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className="bg-surface py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-h2 text-foreground max-sm:text-3xl">
                Everything your home needs. Finally in one place.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                The AI decides when you need help. The marketplace puts
                competing experts in front of you. You choose freely.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {tools.map((tool) => (
                <article key={tool.name} className="card flex flex-col p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-light text-violet">
                    {tool.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {tool.name}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                    {tool.description}
                  </p>
                  <a
                    href="/check"
                    className="mt-8 text-sm font-semibold text-violet transition-colors hover:text-violet-dark"
                  >
                    Get started →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="agents" className="bg-bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="badge-violet mb-6">For Tall Poppy agents</p>
              <h2 className="text-h2 text-foreground max-sm:text-3xl">
                Win the listing before it happens.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Sanctury keeps you present through the seven years between sales.
                Know who needs attention, when — and have something genuine to say.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "bell",
                  title: "Timed alerts",
                  body: "Sanctury tells you when a client has a refix coming, an insurance gap, or an equity milestone. No guessing. No cold calls.",
                },
                {
                  icon: "message",
                  title: "Ready-to-send messages",
                  body: "One click generates a personalised message for each alert. Reviewed by AI. Sent by you. Your clients feel looked after.",
                },
                {
                  icon: "chart",
                  title: "Listing signals",
                  body: "See which clients are approaching the seven-year mark with growing equity. The next listing is visible 18 months before it happens.",
                },
              ].map((item) => (
                <article key={item.title} className="card flex flex-col p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-light text-violet">
                    {item.icon === "bell" && (
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.icon === "message" && (
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.icon === "chart" && (
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{item.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-12">
              <a href="/agent/login" className="btn-violet h-11 px-8">
                Agent login →
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="bg-foreground py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
            <h2 className="text-h2 !text-white max-sm:text-3xl">
              Stop accepting the deal you&apos;re offered.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
              85% of NZ homes are underinsured. Most homeowners are paying too
              much on their mortgage. Sanctury gives you the intelligence to get
              what&apos;s fair.
            </p>
            <a href="/check" className="btn-accent mt-10 inline-flex h-11 px-8">
              Get started — it&apos;s free
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
