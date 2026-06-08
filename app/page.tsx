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

const integrations = [
  { name: "Tall Poppy Real Estate", dotClass: "bg-green-500" },
  { name: "Relab Property Data", dotClass: "bg-blue-500" },
  { name: "Addy Address Intelligence", dotClass: "bg-violet" },
  { name: "IAG / State Insurance", dotClass: "bg-orange-500" },
  { name: "Squirrel Mortgage Advisers", dotClass: "bg-teal-600" },
] as const;

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

        <section className="bg-surface py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Built to work with what you already use
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Sanctury connects to the tools and data sources that power New
              Zealand property.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {integrations.map((integration) => (
                <span
                  key={integration.name}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface px-5 py-2.5"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${integration.dotClass}`}
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-foreground">
                    {integration.name}
                  </span>
                </span>
              ))}
            </div>

            <p className="mt-8 text-[13px] text-muted">
              More integrations coming. Want to connect your platform?{" "}
              <a
                href="/contact"
                className="font-medium text-foreground transition-colors hover:text-violet"
              >
                Get in touch →
              </a>
            </p>
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
