import Link from "next/link";
import {
  CATEGORY_GROUPS,
  FEATURED_PROVIDERS,
  type MarketplaceCategory,
} from "@/lib/marketplace/categories";

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function GroupIcon({ groupId }: { groupId: string }) {
  switch (groupId) {
    case "financial":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M4 19V5M4 19h16M8 15v-3m4 3V9m4 6v-5" {...strokeProps} />
        </svg>
      );
    case "property":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M4 10v10h16V10M2 11l10-8 10 8" {...strokeProps} />
        </svg>
      );
    case "trades":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
            {...strokeProps}
          />
        </svg>
      );
    case "home-systems":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M13 2L4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2z" {...strokeProps} />
        </svg>
      );
    case "services":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M1 8h12v9H1zM13 11h4l3 3v3h-7M5.5 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            {...strokeProps}
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5L14 8m-4 8l-2.5 2.5m9 0L14 16m-4-8L7.5 5.5"
            {...strokeProps}
          />
        </svg>
      );
  }
}

function CategoryTile({
  category,
  groupId,
}: {
  category: MarketplaceCategory;
  groupId: string;
}) {
  const inner = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-light text-violet">
        <GroupIcon groupId={groupId} />
      </span>
      <span className="mt-2.5 block text-sm font-semibold leading-snug text-foreground">
        {category.label}
      </span>
      <span className="mt-1 block text-xs text-muted">
        {category.comingSoon ? (
          <span className="inline-flex rounded-full bg-bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted">
            Coming soon
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-violet-light px-2 py-0.5 text-[11px] font-medium text-violet">
            {category.providerCount} providers
          </span>
        )}
      </span>
    </>
  );

  const tileClass =
    "block rounded-xl border-l-4 bg-surface p-3.5 shadow-sm transition-all sm:p-4";

  if (category.href) {
    return (
      <Link
        href={category.href}
        className={`${tileClass} hover:-translate-y-0.5 hover:shadow-md`}
        style={{ borderLeftColor: "#6D5FD8" }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={tileClass} style={{ borderLeftColor: "#6D5FD8" }}>
      {inner}
    </div>
  );
}

export function CategoryGrid() {
  return (
    <section aria-label="Service categories" className="space-y-8">
      {CATEGORY_GROUPS.map((group) => (
        <div key={group.id}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            {group.label}
          </h3>
          <div className="grid grid-cols-3 gap-2.5 lg:grid-cols-4 lg:gap-3">
            {group.categories.map((category) => (
              <CategoryTile
                key={category.id}
                category={category}
                groupId={group.id}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function FeaturedProviders() {
  return (
    <section aria-label="Featured providers">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        Featured providers
      </h2>
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
        {FEATURED_PROVIDERS.map((provider) => (
          <article
            key={provider.id}
            className="card flex min-w-[250px] snap-start items-start gap-3 p-4 sm:min-w-0"
          >
            {provider.photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={provider.photo}
                alt={provider.name}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-light text-sm font-bold text-violet">
                {provider.initials}
              </span>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">{provider.name}</p>
              <p className="text-xs font-medium text-violet">
                {provider.organisation}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                &ldquo;{provider.tagline}&rdquo;
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MarketplaceCtaBanner() {
  return (
    <section
      className="rounded-2xl px-6 py-8 text-center sm:px-10"
      style={{ backgroundColor: "#6D5FD8" }}
    >
      <p className="text-lg font-bold !text-white text-white">
        Already have a Sanctury account?
      </p>
      <p className="mt-1 text-sm text-white/85">
        Sign in to see what your home needs right now.
      </p>
      <Link
        href="/my-sanctury"
        className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-violet transition-opacity hover:opacity-90"
      >
        Go to my dashboard
      </Link>
    </section>
  );
}
