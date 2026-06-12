"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
  icon: React.ReactNode;
};

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/my-sanctury",
    isActive: (p) => p === "/my-sanctury",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path d="M4 10v10h16V10M2 11l10-8 10 8M9 20v-6h6v6" {...strokeProps} />
      </svg>
    ),
  },
  {
    label: "Finances",
    href: "/my-sanctury/finances",
    isActive: (p) => p.startsWith("/my-sanctury/finances"),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path d="M4 19V5M4 19h16M8 15v-3m4 3V9m4 6v-5" {...strokeProps} />
      </svg>
    ),
  },
  {
    label: "Documents",
    href: "/my-sanctury/vault",
    isActive: (p) => p.startsWith("/my-sanctury/vault"),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
          {...strokeProps}
        />
      </svg>
    ),
  },
  {
    label: "Maintenance",
    href: "/my-sanctury/maintenance",
    isActive: (p) => p.startsWith("/my-sanctury/maintenance"),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
          {...strokeProps}
        />
      </svg>
    ),
  },
  {
    label: "Marketplace",
    href: "/marketplace/insurance",
    isActive: (p) => p.startsWith("/marketplace"),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 7l1.5-4h13L20 7M4 7h16M4 7v12a1 1 0 001 1h14a1 1 0 001-1V7M9 11a3 3 0 006 0"
          {...strokeProps}
        />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="My Sanctury"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid grid-cols-5">
        {NAV_ITEMS.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="flex flex-col items-center gap-1 py-2.5"
              style={{ color: active ? "#6D5FD8" : "#9CA3AF" }}
            >
              {item.icon}
              <span
                className={`text-[10px] leading-none ${active ? "font-semibold" : "font-medium"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
