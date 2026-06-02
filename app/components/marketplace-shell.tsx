import Link from "next/link";
import { SancturyLogo } from "./sanctury-logo";

type MarketplaceShellProps = {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
};

export function MarketplaceShell({
  children,
  backHref = "/report",
  backLabel = "Back to report",
}: MarketplaceShellProps) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-surface">
        <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" aria-label="Sanctury home">
            <SancturyLogo />
          </Link>
          <Link
            href={backHref}
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {backLabel}
          </Link>
        </nav>
      </header>

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:py-14">{children}</div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted">
        <p>Not financial advice. For educational purposes only.</p>
      </footer>
    </div>
  );
}
