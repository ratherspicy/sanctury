import Image from "next/image";
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

const stats = [
  { value: "85%", label: "of NZ homes are underinsured" },
  { value: "$5.8B", label: "switched banks in December 2025 alone" },
  { value: "37%", label: "rise in house insurance since 2022" },
] as const;

const integrations = [
  { name: "Tall Poppy Real Estate", dotClass: "bg-green-500" },
  { name: "Relab Property Data", dotClass: "bg-blue-500" },
  { name: "Addy Address Intelligence", dotClass: "bg-violet-500" },
  { name: "IAG / State Insurance", dotClass: "bg-orange-500" },
  { name: "Squirrel Mortgage Advisers", dotClass: "bg-teal-500" },
] as const;

const reportChecks = [
  "Insurance gap analysis",
  "Mortgage strategy snapshot",
  "Maintenance timeline",
] as const;

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center lg:min-h-[85vh]">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[#3D2F8F]/75"
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-[700px] text-center text-white lg:mx-0 lg:text-left">
              <h1 className="!text-white text-[52px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[88px]">
                <span className="italic">Right,</span> from day one.
              </h1>
              <p className="mx-auto mt-6 max-w-[560px] text-xl text-white/85 lg:mx-0">
                The AI-powered marketplace that helps Kiwis get a fair deal on
                everything their home needs — free, forever.
              </p>
              <div
                id="get-started"
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
              >
                <a
                  href="/check"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-violet transition-opacity hover:opacity-90"
                >
                  Get started
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Learn how it works
                </a>
              </div>
              <p className="mt-6 text-sm text-white/70">
                85% of NZ homes are underinsured — find out where you stand in
                5 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-[#0A0A0A] py-12">
          <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-10 px-6 lg:gap-16 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-[56px] font-extrabold leading-none text-[#A78BFA]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature split */}
        <section className="bg-surface py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                For homeowners
              </p>
              <h2 className="mt-4 text-[44px] font-extrabold leading-[1.1] tracking-tight text-foreground max-sm:text-3xl">
                Your home. Finally sorted.
              </h2>
              <p className="mt-6 max-w-[440px] text-base leading-[1.7] text-[#525252]">
                Banks have the data. Insurers have the models. You had nothing.
                Until now. Sanctury gives you the same intelligence — free, right
                from day one.
              </p>
              <a
                href="/check"
                className="mt-8 inline-block text-base font-semibold text-violet hover:underline"
              >
                Run your free health check →
              </a>
            </div>
            <div className="relative order-1 h-[280px] w-full sm:h-[360px] lg:order-2 lg:h-[480px]">
              <Image
                src="/images/lifestyle.jpg"
                alt="Homeowner reviewing their property on a laptop at home"
                fill
                className="rounded-2xl object-cover shadow-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Tool cards */}
        <section id="tools" className="bg-bg-secondary py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-[44px] font-extrabold leading-[1.1] tracking-tight text-foreground max-sm:text-3xl">
                Everything your home needs. Finally in one place.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#525252]">
                The AI decides when you need help. The marketplace puts
                competing experts in front of you. You choose freely.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {tools.map((tool) => (
                <article
                  key={tool.name}
                  className="flex flex-col rounded-2xl border-l-4 border-[#6D5FD8] bg-white p-8 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-light text-violet">
                    {tool.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {tool.name}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#525252]">
                    {tool.description}
                  </p>
                  <a
                    href="/check"
                    className="mt-8 text-base font-semibold text-violet transition-colors hover:text-violet-dark hover:underline"
                  >
                    Get started →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Homeowner report */}
        <section className="bg-violet py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[420px]">
              <Image
                src="/images/homeowner.jpg"
                alt="New Zealand homeowner at home"
                fill
                className="rounded-2xl object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="text-white">
              <p className="mb-3 text-sm uppercase tracking-widest text-white/70">
                Get your report
              </p>
              <h2 className="!text-white text-[40px] font-extrabold leading-[1.1] tracking-tight max-sm:text-3xl">
                Know exactly where you stand.
              </h2>
              <p className="mb-6 mt-6 text-base leading-[1.7] text-white/80">
                In five minutes, Sanctury shows you your insurance gap, your
                mortgage payoff curve, and what maintenance is coming. No
                adviser. No sales pitch. No cost.
              </p>
              <ul className="space-y-3 text-white">
                {reportChecks.map((item) => (
                  <li key={item} className="flex gap-2 text-base text-white">
                    <span aria-hidden>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/check"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-violet transition-opacity hover:opacity-90"
              >
                Get started — it&apos;s free
              </a>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="bg-violet-light py-16">
          <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
            <h2 className="text-[28px] font-extrabold text-[#0A0A0A]">
              Built to work with what you already use
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-base text-[#525252]">
              Sanctury connects to the tools and data sources that power New
              Zealand property.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {integrations.map((integration) => (
                <span
                  key={integration.name}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E5] bg-white px-5 py-2.5"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${integration.dotClass}`}
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-[#0A0A0A]">
                    {integration.name}
                  </span>
                </span>
              ))}
            </div>

            <p className="mt-6 text-[13px] text-[#525252]">
              More integrations coming. Want to connect your platform?{" "}
              <a href="/contact" className="text-violet-600 hover:underline">
                Get in touch →
              </a>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section id="about" className="bg-foreground py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center text-white lg:px-8">
            <h2 className="!text-white text-[52px] font-extrabold leading-[1.1] max-sm:text-3xl">
              Stop accepting the deal you&apos;re offered.
            </h2>
            <p className="mx-auto mb-8 mt-6 max-w-xl text-lg text-white/70">
              Join homeowners across New Zealand who know exactly where they
              stand.
            </p>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/70">
              85% of NZ homes are underinsured. Most homeowners are paying too
              much on their mortgage. Sanctury gives you the intelligence to get
              what&apos;s fair.
            </p>
            <a
              href="/check"
              className="btn-accent mt-10 inline-flex rounded-full px-10 py-4 text-lg font-bold"
            >
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
