#!/usr/bin/env node
/**
 * fetch-tauranga-gis.mjs
 *
 * Pulls real Tauranga City Council 3-waters pipe geometry around the property
 * and writes it into ./mapData/*.json, replacing the illustrative placeholders.
 *
 * Run it locally (your machine can reach gis.tauranga.govt.nz; a CI sandbox may not):
 *     node property-map/fetch-tauranga-gis.mjs
 *
 * Requires Node 18+ (global fetch). No API key needed for the TCC layers.
 *
 * Data: © Tauranga City Council. Their service note asks you to let them know
 * if you use it in production — email gis@tauranga.govt.nz.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "mapData");
mkdirSync(OUT, { recursive: true });

// --- set this to your property's centroid (lat, lng) and a search radius (metres) ---
const CENTER = { lat: -37.6973927, lng: 176.2614558 }; // 11 Clydesdale Close, Papamoa Beach
const RADIUS_M = 150; // tighter radius for a single residential section

const BASE = "https://gis.tauranga.govt.nz/server/rest/services/Utilities_Multiple/MapServer";

// Layer IDs from the TCC "Utilities_Multiple" service.
// Each output file may contain several source layers (e.g. mains + service lines).
const OUTPUTS = {
  stormwater: [193], // Stormwater Pipe
  wastewater: [187], // Wastewater Pipe
  water: [188, 192], // Water Pipe + Water Service Line
};

// metres -> degrees (approx at this latitude)
const dLat = RADIUS_M / 111320;
const dLng = RADIUS_M / (111320 * Math.cos((CENTER.lat * Math.PI) / 180));
const envelope = [CENTER.lng - dLng, CENTER.lat - dLat, CENTER.lng + dLng, CENTER.lat + dLat].join(",");

async function fetchLayer(id) {
  const params = new URLSearchParams({
    where: "1=1",
    geometry: envelope,
    geometryType: "esriGeometryEnvelope",
    inSR: "4326",
    outSR: "4326",
    spatialRel: "esriSpatialRelIntersects",
    outFields: "*",
    returnGeometry: "true",
    f: "geojson",
  });
  const url = `${BASE}/${id}/query?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`layer ${id}: HTTP ${res.status}`);
  const gj = await res.json();
  if (!gj || !Array.isArray(gj.features)) {
    // ArcGIS sometimes returns {error:{...}} with HTTP 200
    throw new Error(`layer ${id}: ${gj?.error?.message || "no features in response"}`);
  }
  return gj.features;
}

let total = 0;
for (const [name, ids] of Object.entries(OUTPUTS)) {
  try {
    const groups = await Promise.all(ids.map(fetchLayer));
    const features = groups.flat();
    const fc = { type: "FeatureCollection", features };
    writeFileSync(join(OUT, `${name}.json`), JSON.stringify(fc));
    total += features.length;
    console.log(`\u2713 ${name}: ${features.length} features (layers ${ids.join(", ")})`);
  } catch (err) {
    console.warn(`\u2717 ${name}: ${err.message} — kept existing placeholder`);
  }
}

console.log(`\nDone. ${total} features written to ${OUT}`);
console.log(
  [
    "",
    "Parcel boundary is not fetched here. Two options:",
    "  1) Draw it once and paste the polygon into mapData/parcel.json, or",
    "  2) Wire LINZ Data Service (free LDS key) — NZ Primary Parcels, layer 50772:",
    "     https://data.linz.govt.nz/services;key=YOUR_LDS_KEY/wfs?service=WFS&version=2.0.0",
    "       &request=GetFeature&typeNames=layer-50772&outputFormat=application/json&srsName=EPSG:4326",
    "       &cql_filter=CONTAINS(shape,POINT(<lng> <lat>))",
    "",
    "If a TCC layer 404s or returns an error, open the service in a browser to confirm",
    "the layer ID and that f=geojson is supported:",
    "  " + BASE,
  ].join("\n"),
);
