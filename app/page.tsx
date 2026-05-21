import { SancturyLogo } from "./components/sanctury-logo";

const tools = [
  {
    name: "Home Health Check",
    description:
      "See how well your insurance covers your home and where gaps could leave you exposed.",
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
      "Understand your loan structure, repayment options, and how to plan ahead with confidence.",
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
      "Stay on top of maintenance, valuations, and the long-term health of your biggest asset.",
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
    <div className="flex min-h-full flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <a href="/" aria-label="Sanctury home">
            <SancturyLogo />
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#tools"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Tools
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              About
            </a>
          </div>
          <a
            href="/check"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            Get started
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
          >
            <div className="absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-hero-glow/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-brand/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
            <div className="max-w-2xl">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
                Free for New Zealand homeowners
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                Get your home finances{" "}
                <span className="text-brand">in order</span> — for free
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Sanctury helps Kiwi homeowners understand their insurance
                coverage, mortgage structure, and property maintenance — so you
                can protect what matters most with clarity and confidence.
              </p>
              <div
                id="get-started"
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <a
                  href="#tools"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark"
                >
                  Explore your tools
                </a>
                <a
                  href="#about"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-8 text-base font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-accent-soft/50"
                >
                  Learn how it works
                </a>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-16 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
              {[
                { label: "Built for NZ", detail: "Local insurance & lending context" },
                { label: "Always free", detail: "No subscription for homeowners" },
                { label: "Your data", detail: "Private, secure, and in your control" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section id="tools" className="border-t border-border bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Three tools. One clearer picture.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Everything you need to understand the financial health of your
                home — without the jargon or the sales pitch.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {tools.map((tool) => (
                <article
                  key={tool.name}
                  className="group flex flex-col rounded-2xl border border-border bg-background p-8 transition-shadow hover:shadow-lg hover:shadow-brand/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    {tool.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">
                    {tool.name}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                    {tool.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Coming soon
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path
                        d="M6 12l4-4-4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About / CTA */}
        <section
          id="about"
          className="border-t border-border py-20 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="rounded-3xl bg-brand px-8 py-14 text-center text-white sm:px-16 lg:py-20">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your home is your biggest investment.
                <br className="hidden sm:block" /> Treat it that way.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
                Sanctury brings insurance, mortgage, and property insights
                together — so you can make smarter decisions without paying for
                advice you don&apos;t need.
              </p>
              <a
                href="#get-started"
                className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-brand transition-colors hover:bg-accent-soft"
              >
                Join the waitlist
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <SancturyLogo />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                Financial health for New Zealand homeowners. Free, clear, and
                built for Kiwi homes.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-sm font-semibold text-foreground">Product</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>
                    <a href="#tools" className="hover:text-brand">
                      Home Health Check
                    </a>
                  </li>
                  <li>
                    <a href="#tools" className="hover:text-brand">
                      Mortgage Strategy
                    </a>
                  </li>
                  <li>
                    <a href="#tools" className="hover:text-brand">
                      Property Intelligence
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Company</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>
                    <a href="#about" className="hover:text-brand">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand">
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
