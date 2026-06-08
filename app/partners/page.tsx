import Image from "next/image";
import { SiteHeader } from "../components/site-header";
import { SancturyLogo } from "../components/sanctury-logo";

const stats = [
  {
    value: "$0",
    label: "paid by homeowners — ever",
  },
  {
    value: "3",
    label: "competing advisers per lead on average",
  },
  {
    value: "$210",
    label: "average success fee per job won",
  },
] as const;

const featureCards = [
  {
    title: "Right timing",
    body: "Sanctury's AI identifies when a homeowner needs your service — refix windows, insurance gaps, maintenance due. You're notified the moment they're ready.",
  },
  {
    title: "Trusted introduction",
    body: "Homeowners come to you through a platform they trust. They've already seen the problem. You arrive as the solution, not a cold call.",
  },
  {
    title: "Only pay when you win",
    body: "A low monthly subscription keeps you listed. You pay a success fee only when a homeowner chooses you. No win, no fee.",
  },
] as const;

export default function PartnersPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center lg:min-h-[85vh]">
          <Image
            src="/images/adviser-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#134E4A", opacity: 0.72 }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-16 lg:py-20">
            <div className="max-w-[700px] text-white">
              <h1 className="!text-white text-[52px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[88px]">
                Be there when it matters.
              </h1>
              <p className="mt-4 max-w-[540px] text-xl text-white/85">
                Sanctury connects you with homeowners at the exact moment they
                need your help. No cold outreach. No wasted spend. Just the
                right homeowner, at the right time, ready to act.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/partners/login"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0D9488] transition-opacity hover:opacity-90"
                >
                  Adviser login →
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See how it works ↓
                </a>
              </div>
              <p className="mt-6 text-sm text-white/70">
                Homeowners come to you. You only pay when you win.
              </p>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-[#0A0A0A] py-14">
          <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-10 px-8 text-center lg:gap-16">
            {stats.map((stat) => (
              <div key={stat.value}>
                <p className="text-5xl font-black text-[#2DD4BF]">
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0D9488]">
                For insurance advisers
              </p>
              <h2 className="mb-4 text-[44px] font-extrabold leading-tight tracking-tight text-foreground max-sm:text-3xl">
                The homeowner already knows the problem.
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[#525252]">
                By the time a homeowner reaches out through Sanctury,
                they&apos;ve already seen their insurance gap in black and white.
                You don&apos;t arrive as a salesperson. You arrive as the
                solution they asked for.
              </p>
              <a
                href="/partners/login"
                className="text-base font-semibold text-[#0D9488] hover:underline"
              >
                Adviser login →
              </a>
            </div>
            <div className="relative h-[280px] w-full sm:h-[360px] lg:h-[480px]">
              <Image
                src="/images/adviser.jpg"
                alt="Insurance adviser meeting with a homeowner"
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
            <h2 className="mb-12 text-[44px] font-black leading-tight tracking-tight text-foreground max-sm:text-3xl">
              How the marketplace works.
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {featureCards.map((card) => (
                <article
                  key={card.title}
                  className="flex flex-col rounded-2xl border-l-4 border-[#0D9488] bg-white p-8 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#525252]">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0D9488] py-24 text-center text-white">
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="!text-white mb-4 text-[52px] font-extrabold leading-tight max-sm:text-3xl">
              The homeowner is ready. Are you?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
              Sanctury homeowners have already seen their coverage gap and their
              refix date. When they reach out, they know exactly what they need.
              Your job is to show up and deliver.
            </p>
            <a
              href="/partners/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-lg font-bold text-[#0D9488] transition-opacity hover:opacity-90"
            >
              Join as an adviser
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
