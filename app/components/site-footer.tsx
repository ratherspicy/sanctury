import { SancturyLogo } from "./sanctury-logo";

export function SiteFooter() {
  return (
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
                  <a href="/about" className="hover:text-violet">
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
  );
}
