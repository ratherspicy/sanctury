import { SiteHeader } from "../components/site-header";
import { SancturyLogo } from "../components/sanctury-logo";

const PARTNER_FEATURES = [
  {
    icon: "clock" as const,
    title: "Right timing",
    body: "Sanctury's AI identifies when a homeowner needs your service — refix windows, insurance gaps, maintenance due. You're notified the moment they're ready.",
  },
  {
    icon: "shield" as const,
    title: "Trusted introduction",
    body: "Homeowners come to you through a platform they trust. They've already seen the problem. You arrive as the solution, not a sales pitch.",
  },
  {
    icon: "check" as const,
    title: "Only pay when you win",
    body: "A low monthly subscription keeps you listed. You pay a success fee only when a homeowner chooses you. No win, no fee.",
  },
];

function FeatureIcon({ icon }: { icon: "clock" | "shield" | "check" }) {
  if (icon === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
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
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PartnersPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1">
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="max-w-4xl">
              <p className="badge-violet mb-10">Grow with Sanctury</p>
              <h1 className="text-hero text-foreground max-sm:text-5xl max-sm:tracking-[-0.03em]">
                Be there when it matters.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                Sanctury connects you with homeowners at the exact moment they
                need your help. No cold outreach. No wasted spend. Just the right
                homeowner, at the right time, ready to act.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="/contact" className="btn-violet h-11 px-8">
                  Get in touch →
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
              {PARTNER_FEATURES.map((item) => (
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
              The homeowner is ready. Are you?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
              Sanctury homeowners have already seen their insurance gap, their
              refix date, their maintenance schedule. When they reach out, they
              know what they need. Your job is to show up and deliver.
            </p>
            <a href="/contact" className="btn-accent mt-10 inline-flex h-11 px-8">
              Get in touch →
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
