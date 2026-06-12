import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  CategoryGrid,
  FeaturedProviders,
} from "@/app/marketplace/components/marketplace-sections";
import { FOR_YOU_CARDS, type ForYouCard } from "@/lib/marketplace/for-you";
import { PROPERTY } from "@/lib/my-sanctury/handover-data";

const TONE_STYLES: Record<
  ForYouCard["tone"],
  { border: string; bg: string; tag: string }
> = {
  urgent: { border: "#DC2626", bg: "bg-red-50", tag: "text-danger" },
  timely: { border: "#F59E0B", bg: "bg-amber-50", tag: "text-warning" },
  suggested: { border: "#6D5FD8", bg: "bg-violet-light", tag: "text-violet" },
  neutral: { border: "#9CA3AF", bg: "bg-bg-secondary", tag: "text-muted" },
};

function ForYouCardView({ card }: { card: ForYouCard }) {
  const tone = TONE_STYLES[card.tone];
  const body = (
    <>
      <p
        className={`text-xs font-semibold uppercase tracking-wide ${tone.tag}`}
      >
        {card.tag}
      </p>
      <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground">
        {card.headline}
      </h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">
        {card.reasoning}
      </p>
      <p className="mt-3 text-xs font-semibold text-foreground">
        {card.provider}
      </p>
      <p className="mt-3 text-sm font-bold text-violet">{card.cta}</p>
    </>
  );

  const cardClass = `flex min-w-[270px] snap-start flex-col rounded-xl border-l-4 p-4 sm:min-w-0 ${tone.bg}`;
  const style = { borderLeftColor: tone.border };

  if (card.href) {
    return (
      <Link
        href={card.href}
        className={`${cardClass} transition-opacity hover:opacity-90`}
        style={style}
      >
        {body}
      </Link>
    );
  }
  return (
    <div className={cardClass} style={style}>
      {body}
    </div>
  );
}

export default async function PersonalisedMarketplacePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/my-sanctury/login");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-6 sm:px-6">
      {/* For you right now */}
      <section aria-label="For you right now">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet">
          Based on {PROPERTY.address.replace(", Tauranga", "")}
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">
          Your home needs attention in 3 areas
        </h1>
        <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {FOR_YOU_CARDS.map((card) => (
            <ForYouCardView key={card.id} card={card} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          These recommendations are generated from your property data, vault
          documents, and financial profile. Update your data to refresh them.
        </p>
      </section>

      {/* Full catalogue */}
      <section>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Browse by category
        </h2>
        <p className="mt-1 text-sm text-muted">
          Verified providers across everything your home touches.
        </p>
        <div className="mt-6">
          <CategoryGrid />
        </div>
      </section>

      <FeaturedProviders />
    </div>
  );
}
