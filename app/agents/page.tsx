import Image from "next/image";
import { SiteHeader } from "../components/site-header";
import { SancturyLogo } from "../components/sanctury-logo";

const stats = [
  {
    value: "18 months",
    label: "before a listing decision, the signal is there",
  },
  {
    value: "7 years",
    label: "between sales that Sanctury owns for you",
  },
  {
    value: "$480",
    label: "average monthly referral income per agent",
  },
] as const;

const featureCards = [
  {
    title: "Timed alerts",
    body: "Sanctury tells you when a client has a refix coming, an insurance gap, or an equity milestone. No guessing. No cold calls.",
    link: { href: "/agent/login", label: "View dashboard →" },
    badge: null,
  },
  {
    title: "Ready-to-send messages",
    body: "One click generates a personalised message for each alert. Reviewed by AI. Sent by you. Your clients feel looked after.",
    link: null,
    badge: null,
  },
  {
    title: "Listing signals",
    body: "See which clients are approaching the seven-year mark with growing equity. The next listing is visible 18 months before it happens.",
    link: null,
    badge: "POWERED BY SANCTURY AI",
  },
] as const;

export default function AgentsPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center lg:min-h-[85vh]">
          <Image
            src="/images/agent-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#1a5c3a", opacity: 0.72 }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-16 lg:py-20">
            <div className="max-w-[700px] text-white">
              <h1 className="!text-white text-[52px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[88px]">
                Own the listing before it exists.
              </h1>
              <p className="mt-4 max-w-[540px] text-xl text-white/85">
                Sanctury keeps you present through the seven years between sales.
                Know who needs attention, when — and have something genuine to
                say.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/agent/login"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#2E8B57] transition-opacity hover:opacity-90"
                >
                  Agent login →
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See how it works ↓
                </a>
              </div>
              <p className="mt-6 text-sm text-white/70">
                The listing is won 18 months before it happens. Sanctury sees it
                first.
              </p>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-[#0A0A0A] py-14">
          <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-10 px-8 text-center lg:gap-16">
            {stats.map((stat) => (
              <div key={stat.value}>
                <p className="text-5xl font-black text-[#3CB371]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature split */}
        <section className="bg-surface py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2E8B57]">
                For Tall Poppy agents
              </p>
              <h2 className="mb-4 text-[44px] font-black leading-tight tracking-tight text-foreground max-sm:text-3xl">
                The settlement meeting replaces the gift basket.
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[#525252]">
                At settlement, open Sanctury with your buyer. The property
                details you already know are pre-filled from the transaction.
                They enter their own financial details. They leave with their
                report. You leave with a reason to come back.
              </p>
              <a
                href="/agent/login"
                className="text-base font-semibold text-[#2E8B57] hover:underline"
              >
                Agent login →
              </a>
            </div>
            <div className="relative h-[280px] w-full sm:h-[360px] lg:h-[480px]">
              <Image
                src="/images/agent.jpg"
                alt="Real estate agent with clients at settlement"
                fill
                className="rounded-2xl object-cover shadow-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section id="how" className="bg-[#F7F7F7] py-20">
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="mb-4 text-[44px] font-black leading-tight tracking-tight text-foreground max-sm:text-3xl">
              Everything Sanctury gives you.
            </h2>
            <p className="mb-12 text-[#525252]">
              Built for agents who want to win the relationship, not just the
              transaction.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {featureCards.map((card) => (
                <article
                  key={card.title}
                  className="flex flex-col rounded-2xl border-l-4 border-[#3CB371] bg-white p-8 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {card.badge && (
                    <span className="mb-3 inline-flex w-fit rounded-full bg-[#d1fae5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2E8B57]">
                      {card.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#525252]">
                    {card.body}
                  </p>
                  {card.link && (
                    <a
                      href={card.link.href}
                      className="mt-6 text-base font-semibold text-[#2E8B57] hover:underline"
                    >
                      {card.link.label}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#2E8B57] py-24 text-center text-white">
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="!text-white mb-4 text-[52px] font-black leading-tight max-sm:text-3xl">
              Your clients, sorted.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
              Every alert. Every message. Every listing — earned before anyone
              else knew it was coming.
            </p>
            <a
              href="/agent/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-lg font-bold text-[#2E8B57] transition-opacity hover:opacity-90"
            >
              Get started as an agent
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
                    <a href="/#tools" className="hover:text-violet">
                      Home Health Check
                    </a>
                  </li>
                  <li>
                    <a href="/#tools" className="hover:text-violet">
                      Mortgage Strategy
                    </a>
                  </li>
                  <li>
                    <a href="/#tools" className="hover:text-violet">
                      Property Intelligence
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Company</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>
                    <a href="/#about" className="hover:text-violet">
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
