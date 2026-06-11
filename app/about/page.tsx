import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const principles = [
  {
    title: "Homeowner first",
    detail:
      "Every feature is judged by one test: does it serve the homeowner? Not the agent, not the vendor, not us.",
  },
  {
    title: "Radical transparency",
    detail:
      "You see what advisers are paid, what products cost, and what your options are. No hidden commissions, no smoke and mirrors.",
  },
  {
    title: "Your data is yours",
    detail:
      "You can view it, export it, and delete it. We use it to serve you — never to sell to third parties.",
  },
  {
    title: "Plain language, always",
    detail:
      "No jargon, no fine print, no complexity theatre. If it can't be understood by a first home buyer, we rewrite it.",
  },
];

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
            Sanctury is the financial co-pilot for New Zealand homeowners. For a
            generation that bought their homes in the most complex property
            market in history, we provide the transparency, intelligence, and
            trusted professional connections they need to protect their biggest
            asset and navigate every decision that comes with owning a home.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Banks have the data. Insurers have the models. Until now, homeowners
            had nothing. Sanctury gives you the same intelligence — your
            insurance gap, your mortgage position, your maintenance timeline —
            and connects you with independent professionals when you choose to
            act. Free for homeowners. Forever. Paid for by the professionals who
            want to serve you.
          </p>

          <h2 className="mt-12 text-xl font-semibold text-foreground">
            What we believe
          </h2>
          <ul className="mt-6 space-y-6">
            {principles.map((principle) => (
              <li key={principle.title}>
                <p className="text-base font-semibold text-foreground">
                  {principle.title}
                </p>
                <p className="mt-1 text-base leading-relaxed text-muted">
                  {principle.detail}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-xl font-semibold text-foreground">
            Where we are
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Sanctury is built in the Bay of Plenty and works anywhere in
            Aotearoa. We&apos;re starting with the Home Health Check — insurance,
            mortgage, and maintenance intelligence in five minutes — and growing
            into the platform that looks after every decision between buying a
            home and selling it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Want to talk? We&apos;d love to hear from you —{" "}
            <a href="/contact" className="font-medium text-violet hover:underline">
              get in touch
            </a>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
