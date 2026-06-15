import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FeaturedProviders } from "@/app/marketplace/components/marketplace-sections";
import { FOR_YOU_CARDS, type ForYouTone } from "@/lib/marketplace/for-you";
import { PROPERTY } from "@/lib/my-sanctury/handover-data";
import { ICON_MAP } from "../components/icon-map";
import { HorizontalScroll } from "../components/horizontal-scroll";
import { StatusCard } from "../components/status-card";
import { CategoryIconGrid } from "../components/category-icon-grid";
import type { StatusKey } from "../components/status-system";

const FOR_YOU_ICON: Record<string, LucideIcon> = {
  "insurance-gap": ICON_MAP.insurance,
  "mortgage-refix": ICON_MAP.mortgage,
  "plumbing-certificate": ICON_MAP.plumbing,
  "pest-inspection": ICON_MAP.structural, // Home — building inspection
  "security-update": ICON_MAP.security,
  "heat-pump-service": ICON_MAP.warmth,
};

// Map the recommendation tone onto the four-state status system. The two
// urgent and one timely card become the "3 areas" that need attention;
// softer suggestions recede as quiet "unknown".
const TONE_TO_STATUS: Record<ForYouTone, StatusKey> = {
  urgent: "urgent",
  timely: "attention",
  suggested: "unknown",
  neutral: "unknown",
};

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
        <div className="mt-5">
          <HorizontalScroll smGridCols={3}>
            {FOR_YOU_CARDS.map((card) => (
              <StatusCard
                key={card.id}
                compact
                icon={FOR_YOU_ICON[card.id] ?? ICON_MAP.marketplace}
                label={card.headline}
                status={TONE_TO_STATUS[card.tone]}
                detail={card.provider}
                cta={{
                  label: card.cta.replace(/\s*→\s*$/, ""),
                  href: card.href,
                }}
              />
            ))}
          </HorizontalScroll>
        </div>
        <p className="mt-4 text-xs text-muted">
          These recommendations are generated from your property data, vault
          documents, and financial profile. Update your data to refresh them.
        </p>
      </section>

      {/* Browse by category — light icon grid */}
      <section>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Browse by category
        </h2>
        <div className="mt-6">
          <CategoryIconGrid />
        </div>
      </section>

      <FeaturedProviders />
    </div>
  );
}
