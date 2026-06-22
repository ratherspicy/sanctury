"use client";

/**
 * PropertyMapPreview — "My Sanctury" homeowner preview map.
 *
 * Shows real Tauranga City Council 3-waters data over the property on a LINZ
 * aerial base, plus a draw tool so the homeowner can map what only they know:
 * a planned build, or the private drain the council has no record of.
 *
 * This is a PREVIEW: all overlay data is static (bundled JSON), so nothing
 * calls a live API while you demo. Swap in real data with fetch-tauranga-gis.mjs.
 *
 * Load it client-only to avoid SSR/window issues:
 *   const PropertyMapPreview = dynamic(() => import("@/components/property-map/PropertyMapPreview"), { ssr: false });
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, GeoJSON as LeafletGeoJSON, Layer as LeafletLayer } from "leaflet";
import type { Feature, FeatureCollection } from "geojson";

import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

import { PROPERTY_CENTER, PROPERTY_LABEL, DEFAULT_ZOOM } from "./mapData/config";
import parcelJson from "./mapData/parcel.json";
import stormwaterJson from "./mapData/stormwater.json";
import wastewaterJson from "./mapData/wastewater.json";
import waterJson from "./mapData/water.json";

const C = {
  navy: "#121A30",
  indigo: "#6A5BE2",
  indigoTint: "#EEEBFB",
  ink: "#1B2237",
  slate: "#55607A",
  slateLt: "#8C93A6",
  line: "#E4E6F0",
  card: "#F5F6FB",
  white: "#FFFFFF",
  stormwater: "#2D5FC9",
  wastewater: "#B0790A",
  water: "#0F8A8A",
};

const asFC = (x: unknown): FeatureCollection => x as unknown as FeatureCollection;

type OverlayKey = "boundary" | "stormwater" | "wastewater" | "water";

const OVERLAYS: {
  key: OverlayKey;
  label: string;
  color: string;
  data: FeatureCollection;
  dash?: string;
  isArea?: boolean;
}[] = [
  { key: "boundary", label: "Your boundary", color: C.indigo, data: asFC(parcelJson), dash: "6 5", isArea: true },
  { key: "stormwater", label: "Stormwater", color: C.stormwater, data: asFC(stormwaterJson) },
  { key: "wastewater", label: "Wastewater", color: C.wastewater, data: asFC(wastewaterJson) },
  { key: "water", label: "Water supply", color: C.water, data: asFC(waterJson) },
];

// Minimal typing for the Geoman methods we use (Geoman augments L.Map at runtime).
type GeomanMap = LeafletMap & {
  pm: {
    addControls: (opts: Record<string, unknown>) => void;
    setGlobalOptions: (opts: Record<string, unknown>) => void;
    getGeomanLayers: () => LeafletLayer[];
  };
};

export default function PropertyMapPreview({
  className = "",
  onFeaturesChange,
}: {
  className?: string;
  onFeaturesChange?: (features: FeatureCollection) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const overlayRefs = useRef<Partial<Record<OverlayKey, LeafletGeoJSON>>>({});
  const cbRef = useRef(onFeaturesChange);
  cbRef.current = onFeaturesChange;

  const [visible, setVisible] = useState<Record<OverlayKey, boolean>>({
    boundary: true,
    stormwater: true,
    wastewater: true,
    water: false,
  });
  const [drawn, setDrawn] = useState<FeatureCollection>({ type: "FeatureCollection", features: [] });
  const [fallbackBase, setFallbackBase] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("@geoman-io/leaflet-geoman-free");
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: PROPERTY_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
        scrollWheelZoom: false, // don't hijack page scroll; pinch / +- to zoom
      });
      mapRef.current = map;

      // --- base layer: LINZ aerial if a key is set, else Esri imagery (demo only) ---
      const linzKey = process.env.NEXT_PUBLIC_LINZ_API_KEY;
      if (linzKey) {
        L.tileLayer(
          `https://basemaps.linz.govt.nz/v1/tiles/aerial/WebMercatorQuad/{z}/{x}/{y}.webp?api=${linzKey}`,
          {
            maxZoom: 22,
            attribution:
              '© <a href="https://www.linz.govt.nz/linz-copyright" target="_blank" rel="noreferrer">LINZ</a> CC BY 4.0 · Tauranga City Council',
          },
        ).addTo(map);
      } else {
        setFallbackBase(true);
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 21,
          attribution: "Imagery © Esri · Tauranga City Council (demo)",
        }).addTo(map);
      }

      // --- council overlays (static, bundled) ---
      OVERLAYS.forEach((o) => {
        const layer = L.geoJSON(o.data, {
          style: () => ({
            color: o.color,
            weight: o.isArea ? 2.5 : 3,
            opacity: 0.95,
            dashArray: o.dash,
            fill: !!o.isArea,
            fillColor: o.color,
            fillOpacity: o.isArea ? 0.06 : 0,
          }),
          onEachFeature: (feature, lyr) => {
            const props = (feature.properties ?? {}) as Record<string, unknown>;
            const rows = Object.entries(props)
              .filter(([, v]) => v != null && v !== "")
              .slice(0, 6)
              .map(
                ([k, v]) =>
                  `<div style="display:flex;gap:10px;justify-content:space-between"><span style="color:#8C93A6;text-transform:capitalize">${k.replace(/_/g, " ")}</span><span style="color:#1B2237">${String(v)}</span></div>`,
              )
              .join("");
            lyr.bindPopup(
              `<div style="font:13px/1.5 system-ui,-apple-system,sans-serif;min-width:150px"><strong style="color:${o.color}">${o.label}</strong>${rows ? `<div style="margin-top:6px;display:grid;gap:2px">${rows}</div>` : ""}</div>`,
            );
          },
        });
        overlayRefs.current[o.key] = layer;
        if (visible[o.key]) layer.addTo(map);
      });

      // --- drawing: the homeowner's own additions ---
      const pm = (map as unknown as GeomanMap).pm;
      pm.addControls({
        position: "topright",
        drawMarker: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawText: false,
        drawPolyline: true, // a new pipe / private drain
        drawRectangle: true, // a planned build footprint (quick)
        drawPolygon: true, // a planned build footprint (freeform)
        editMode: true,
        dragMode: false,
        cutPolygon: false,
        removalMode: true,
        rotateMode: false,
      });
      pm.setGlobalOptions({
        pathOptions: { color: C.indigo, fillColor: C.indigo, fillOpacity: 0.18, weight: 3 },
      });

      const recompute = () => {
        const features = pm
          .getGeomanLayers()
          .map((l) => {
            try {
              return (l as unknown as { toGeoJSON: () => Feature }).toGeoJSON();
            } catch {
              return null;
            }
          })
          .filter((f): f is Feature => !!f);
        const fc: FeatureCollection = { type: "FeatureCollection", features };
        setDrawn(fc);
        cbRef.current?.(fc);
      };

      // Geoman fires custom events ("pm:*") that aren't in Leaflet's base event
      // types; bind them through a small typed helper to keep strict TS happy.
      const evt = (o: unknown) => o as { on: (event: string, fn: (e: unknown) => void) => void };
      evt(map).on("pm:create", (e) => {
        const layer = (e as { layer: LeafletLayer }).layer;
        evt(layer).on("pm:edit", recompute);
        evt(layer).on("pm:dragend", recompute);
        recompute();
      });
      evt(map).on("pm:remove", recompute);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback((key: OverlayKey) => {
    setVisible((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const map = mapRef.current;
      const layer = overlayRefs.current[key];
      if (map && layer) {
        if (next[key]) layer.addTo(map);
        else map.removeLayer(layer);
      }
      return next;
    });
  }, []);

  const copyDrawn = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(drawn, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }, [drawn]);

  const drawnCount = drawn.features.length;

  return (
    <div className={`s-map-card ${className}`}>
      <style>{CSS}</style>

      <div className="s-map-head">
        <div className="s-map-titlewrap">
          <h3 className="s-map-title">Property map</h3>
          <span className="s-map-pill">Preview</span>
        </div>
        <p className="s-map-sub">
          Real Tauranga City Council water data, on your property — and a place to map what only you know.
        </p>
      </div>

      <div className="s-map-toolbar" role="group" aria-label="Map layers">
        {OVERLAYS.map((o) => (
          <button
            key={o.key}
            type="button"
            className="s-map-chip"
            aria-pressed={visible[o.key]}
            onClick={() => toggle(o.key)}
          >
            <span className="s-map-dot" style={{ backgroundColor: o.color }} aria-hidden="true" />
            {o.label}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="s-map" role="application" aria-label={`Map of ${PROPERTY_LABEL}`} />

      <div className="s-map-foot">
        <div className="s-map-legend">
          <span className="s-map-dot s-map-dot--draw" aria-hidden="true" />
          <span>
            <strong>Your additions</strong> — use the tools (top-right) to draw a planned build or a private drain.
          </span>
        </div>
        <div className="s-map-count">
          <span className="s-map-badge">{drawnCount} added</span>
          <button type="button" className="s-map-copy" onClick={copyDrawn} disabled={drawnCount === 0}>
            {copied ? "Copied" : "Copy GeoJSON"}
          </button>
        </div>
      </div>

      <p className="s-map-note">
        Preview — illustrative data for {PROPERTY_LABEL}. Council records stop at your boundary; the private pipes and
        plans inside it are data only you hold.
      </p>
      {fallbackBase && (
        <p className="s-map-note s-map-note--warn">
          Showing fallback imagery. Add a free LINZ key as <code>NEXT_PUBLIC_LINZ_API_KEY</code> for NZ aerial down to 5cm.
        </p>
      )}
    </div>
  );
}

const CSS = `
.s-map-card{background:${C.white};border:1px solid ${C.line};border-radius:14px;padding:16px;box-shadow:0 6px 22px rgba(18,26,48,.06);color:${C.ink};font-family:inherit}
.s-map-head{margin-bottom:12px}
.s-map-titlewrap{display:flex;align-items:center;gap:10px}
.s-map-title{margin:0;font-size:18px;font-weight:700;color:${C.ink};letter-spacing:-.01em}
.s-map-pill{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${C.indigo};background:${C.indigoTint};border-radius:999px;padding:3px 9px}
.s-map-sub{margin:6px 0 0;font-size:13.5px;line-height:1.45;color:${C.slate}}
.s-map-toolbar{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
.s-map-chip{display:inline-flex;align-items:center;gap:8px;border:1px solid ${C.line};background:${C.white};color:${C.slate};border-radius:999px;padding:6px 12px;font-size:13px;font-family:inherit;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
.s-map-chip:hover{border-color:#cfd3e6}
.s-map-chip:focus-visible{outline:2px solid ${C.indigo};outline-offset:2px}
.s-map-chip[aria-pressed="true"]{background:${C.card};color:${C.ink};border-color:#cfd3e6}
.s-map-chip[aria-pressed="false"]{opacity:.55}
.s-map-dot{width:11px;height:11px;border-radius:3px;display:inline-block;flex:none}
.s-map-dot--draw{background:${C.indigo};border:2px solid ${C.indigo};background:${C.indigoTint}}
.s-map{width:100%;height:440px;border-radius:12px;overflow:hidden;border:1px solid ${C.line};background:${C.card}}
.s-map-foot{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-top:12px}
.s-map-legend{display:flex;align-items:center;gap:9px;font-size:12.5px;color:${C.slate};line-height:1.4}
.s-map-legend strong{color:${C.ink};font-weight:600}
.s-map-count{display:flex;align-items:center;gap:10px}
.s-map-badge{font-size:12px;font-weight:600;color:${C.indigo};background:${C.indigoTint};border-radius:999px;padding:4px 10px}
.s-map-copy{border:1px solid ${C.line};background:${C.white};color:${C.slate};border-radius:8px;padding:5px 10px;font-size:12px;font-family:inherit;cursor:pointer}
.s-map-copy:hover:not(:disabled){border-color:#cfd3e6;color:${C.ink}}
.s-map-copy:disabled{opacity:.4;cursor:default}
.s-map-note{margin:10px 0 0;font-size:11.5px;line-height:1.5;color:${C.slateLt}}
.s-map-note--warn{color:${C.wastewater}}
.s-map-note code{background:${C.card};border:1px solid ${C.line};border-radius:4px;padding:1px 5px;font-size:11px}
.s-map-card .leaflet-container{font:inherit;background:${C.card}}
.s-map-card .leaflet-bar a,.s-map-card .leaflet-bar a:hover{border-radius:0}
.s-map-card .leaflet-touch .leaflet-bar{border-radius:8px;overflow:hidden}
@media (max-width:520px){.s-map{height:340px}.s-map-foot{align-items:flex-start}}
@media (prefers-reduced-motion:reduce){.s-map-chip{transition:none}}
`;
