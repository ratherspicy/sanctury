import { NZ_REGIONS, type NzRegion } from "../constants/nz-regions";

const ADDY_REGION_MAP: Record<string, NzRegion> = {
  Northland: "Northland",
  Auckland: "Auckland",
  Waikato: "Waikato",
  "Bay of Plenty": "Bay of Plenty",
  Gisborne: "Gisborne",
  "Hawke's Bay": "Hawke's Bay",
  "Hawkes Bay": "Hawke's Bay",
  Taranaki: "Taranaki",
  "Manawatu-Whanganui": "Manawatū-Whanganui",
  "Manawatū-Whanganui": "Manawatū-Whanganui",
  Wellington: "Wellington",
  Tasman: "Tasman",
  Nelson: "Nelson",
  Marlborough: "Marlborough",
  "West Coast": "West Coast",
  Canterbury: "Canterbury",
  Otago: "Otago",
  Southland: "Southland",
};

export function mapAddyRegionToFormRegion(addyRegion: string): NzRegion | "" {
  const trimmed = addyRegion.trim();
  if (ADDY_REGION_MAP[trimmed]) return ADDY_REGION_MAP[trimmed];

  const match = NZ_REGIONS.find(
    (r) => r.toLowerCase() === trimmed.toLowerCase()
  );
  return match ?? "";
}
