# Property Map (Preview) — My Sanctury

A homeowner map for the My Sanctury section. It shows **real Tauranga City Council
3-waters data** (stormwater / wastewater / water pipes) over the property on a **LINZ
aerial** base, and gives the homeowner a **draw tool** to map what only they know — a
planned build, or the private drain the council has no record of.

It's a **preview**: every overlay is static (bundled JSON), so nothing calls a live API
while you demo. You swap in the real council data with one local command.

---

## 1. Install

```bash
npm i leaflet@1.9.4 @geoman-io/leaflet-geoman-free@2.19.3
npm i -D @types/leaflet@1.9.21 @types/geojson@7946.0.16
```

`tsconfig.json` needs `"resolveJsonModule": true` and `"esModuleInterop": true` (both are
on by default in a Next.js app).

## 2. Drop it in

Copy the whole `property-map/` folder into your app, e.g. `src/components/property-map/`.

Mount it **client-only** (Leaflet touches `window`, so disable SSR):

```tsx
// e.g. app/(homeowner)/property-map/page.tsx  — or a tab inside the dashboard
import dynamic from "next/dynamic";

const PropertyMapPreview = dynamic(
  () => import("@/components/property-map/PropertyMapPreview"),
  { ssr: false },
);

export default function Page() {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <PropertyMapPreview onFeaturesChange={(fc) => console.log("drawn:", fc)} />
    </div>
  );
}
```

For the pitch, the cleanest placement is a new **"Property map"** tab in the homeowner
dashboard, sitting alongside the report.

## 3. Make the data real

**a. LINZ aerial (free, 5cm urban).** Request a free developer key at
<https://basemaps.linz.govt.nz/> and add it to `.env.local`:

```
NEXT_PUBLIC_LINZ_API_KEY=your_key_here
```

Without it the map falls back to Esri imagery so it still renders — but LINZ is the right
NZ source. (CC BY 4.0: keep the attribution that's baked into the map.)

**b. Real council pipes.** Set `CENTER` in `fetch-tauranga-gis.mjs` to the real parcel
centroid, then run it locally (not in CI — your machine needs to reach the council server):

```bash
node property-map/fetch-tauranga-gis.mjs
```

It overwrites `mapData/stormwater.json`, `wastewater.json` and `water.json` with the
actual Tauranga reticulation around the property. If a layer errors it keeps the
placeholder and tells you.

**c. Parcel boundary.** Either draw it once and paste the polygon into
`mapData/parcel.json`, or wire LINZ Data Service (NZ Primary Parcels, layer 50772) — see
the note printed by the fetch script.

## 4. Saving what the homeowner draws (post-pitch)

The component already emits a GeoJSON `FeatureCollection` via `onFeaturesChange` every time
a shape is added, edited or removed. To persist it — and start building the dataset moat —
store it against the property in Supabase (PostGIS handles geometry natively):

```ts
// onFeaturesChange={(fc) => saveFeatures(propertyId, fc)}
async function saveFeatures(propertyId: string, fc: FeatureCollection) {
  await supabase.from("property_features").upsert({
    property_id: propertyId,
    features: fc,          // jsonb, or convert to a geometry column with PostGIS
    updated_at: new Date().toISOString(),
  });
}
```

For the pitch you don't need this wired — drawing + "Copy GeoJSON" is enough to show it.

## 5. Demoing it

1. Open the **Property map** tab — the home from above, with council water layers already on.
2. Toggle **Stormwater / Wastewater** to show the real council network running past the property.
3. Use the draw tools (top-right) to sketch a **planned deck** (rectangle) and a **private drain**
   (line) into the section.
4. The line to land: *council records stop at the boundary — the private drain, the planned
   build, the reno you did in 2019: no council, bank or insurer holds any of that. Sanctury is
   where the homeowner records it, and that data compounds.* That's the data-moat thesis, made physical.

## 6. Caveats / productionising

- **TCC data**: their service note asks you to let them know if you use it in production —
  email `gis@tauranga.govt.nz`. Confirm reuse terms before you ship beyond a demo.
- **Esri fallback** imagery is for demo/dev only; use the LINZ key for anything real.
- **Other councils**: the same pattern works elsewhere (most NZ councils expose ArcGIS REST
  or open-data portals) — point the fetch script at their service and layer IDs.
- **Upgrade path**: if you later want vector basemaps, 3D, or smoother styling, the same
  layers port to MapLibre GL with `maplibre-gl-draw` — but Leaflet is the right call tonight.

## Files

```
property-map/
├─ PropertyMapPreview.tsx     the component (client-only)
├─ fetch-tauranga-gis.mjs     pulls real TCC pipe data into mapData/
├─ mapData/
│  ├─ config.ts               PROPERTY_CENTER + label  ← set the centroid here
│  ├─ parcel.json             boundary (placeholder)
│  ├─ stormwater.json         stormwater pipes (placeholder → real)
│  ├─ wastewater.json         wastewater pipes (placeholder → real)
│  └─ water.json              water + service lines (placeholder → real)
└─ README.md
```
