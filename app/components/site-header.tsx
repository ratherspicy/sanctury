import { SancturyLogo } from "./sanctury-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <nav className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8">
        <a href="/" aria-label="Sanctury home" className="justify-self-start">
          <SancturyLogo />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#tools"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Tools
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            About
          </a>
        </div>
        <div className="flex items-center justify-self-end">
          <a href="/check" className="btn-primary">
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
