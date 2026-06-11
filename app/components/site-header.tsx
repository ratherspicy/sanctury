import { SancturyLogo } from "./sanctury-logo";

type SiteHeaderProps = {
  minimal?: boolean;
};

export function SiteHeader({ minimal = false }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a href="/" aria-label="Sanctury home" className="justify-self-start">
          <SancturyLogo />
        </a>
        {!minimal && (
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/#tools"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Tools
            </a>
            <a
              href="/#about"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              About
            </a>
          </div>
        )}
        {!minimal && (
          <div className="flex items-center justify-self-end">
            <a
              href="/check"
              className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#262626]"
            >
              Get started
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
