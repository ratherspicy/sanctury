import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const sections = [
  {
    heading: "What we collect",
    body: [
      "When you run a Home Health Check we ask for your property details (address, floor area, year built, features), your insurance sum insured, and your mortgage details. When you choose to see your report we also ask for your name and email address.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Your information is used for three things: generating your home health report, sending you timely alerts about your home (like an upcoming refix date), and personalising your My Sanctury dashboard.",
      "If you ask to be connected with an adviser, we share your name, email, property address, and coverage summary with that one adviser — and only after you've explicitly confirmed. No other adviser on Sanctury can see your details.",
    ],
  },
  {
    heading: "What we never do",
    body: [
      "We never sell your data to third parties. We never share your details with anyone without your explicit consent. We never send spam — every email we send has a clear reason and an unsubscribe link.",
    ],
  },
  {
    heading: "Your data belongs to you",
    body: [
      "You can ask to view, export, or delete everything we hold about you at any time. You can withdraw any consent you've given — including consent to share your details with an adviser — by emailing privacy@sanctury.co.nz.",
    ],
  },
  {
    heading: "How we store it",
    body: [
      "Your data is stored securely with our database provider in encrypted form, and access is limited to what's needed to run Sanctury. We use magic-link sign-in, so we never store a password for you.",
    ],
  },
  {
    heading: "The legal bit",
    body: [
      "Sanctury collects and handles personal information in accordance with the New Zealand Privacy Act 2020. Consent to share your details with an adviser is collected under Information Privacy Principle 11, and we keep a record of every consent you give.",
      "Questions, requests, or complaints: privacy@sanctury.co.nz. You can also contact the Office of the Privacy Commissioner at privacy.org.nz.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-2xl px-6 py-10 lg:px-8 lg:py-14">
          <p className="badge-violet">Privacy</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your privacy matters
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Sanctury exists to give homeowners transparency — and that starts
            with being transparent about your data. Here&apos;s how we handle it, in
            plain English.
          </p>
          {sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              {section.body.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="mt-3 text-base leading-relaxed text-muted"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}

          <p className="mt-12 text-sm text-muted">Last updated: June 2026</p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
