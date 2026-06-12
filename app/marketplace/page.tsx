import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import {
  CategoryGrid,
  FeaturedProviders,
  MarketplaceCtaBanner,
} from "./components/marketplace-sections";

export const metadata: Metadata = {
  title: "Marketplace — Sanctury",
  description:
    "Every service your home will ever need — matched to what it needs right now.",
};

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80";

export default function MarketplacePage() {
  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_PHOTO}
            alt="A homeowner cooking in a warm, light-filled kitchen"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.55) 55%, rgba(10, 10, 10, 0.35) 100%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 sm:py-28">
            <h1 className="!text-white text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Every service your home will ever need — matched to what it needs
              right now
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
              Sanctury connects you to trusted providers based on your property,
              not just your postcode
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/my-sanctury"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#6D5FD8] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-violet-dark sm:w-auto"
              >
                Sign in to see your personalised recommendations
              </Link>
              <a
                href="#categories"
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Browse all services
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
          <div id="categories">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-muted">
              Verified providers across everything your home touches.
            </p>
            <div className="mt-6">
              <CategoryGrid />
            </div>
          </div>

          <FeaturedProviders />

          <MarketplaceCtaBanner />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
