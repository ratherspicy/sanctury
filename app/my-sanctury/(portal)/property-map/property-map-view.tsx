"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window`, so the map must be client-only (no SSR).
const PropertyMapPreview = dynamic(
  () => import("@/components/property-map/PropertyMapPreview"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[440px] items-center justify-center rounded-xl border border-border bg-bg-secondary text-sm text-muted">
        Loading map…
      </div>
    ),
  }
);

export function PropertyMapView() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Property map
        </h1>
        <p className="mt-1 text-sm text-muted">
          The council&apos;s water network around your home — and a place to map
          what only you know.
        </p>
      </div>
      <PropertyMapPreview />
    </div>
  );
}
