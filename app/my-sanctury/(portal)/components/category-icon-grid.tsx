import Link from "next/link";
import {
  Shield,
  Landmark,
  PiggyBank,
  LineChart,
  ClipboardCheck,
  Calculator,
  Ruler,
  Droplet,
  Zap,
  Hammer,
  Home,
  Paintbrush,
  Grid2x2,
  Thermometer,
  Sun,
  Lock,
  Layers,
  Cpu,
  Truck,
  Sparkles,
  Trees,
  Bug,
  Trash2,
  Flame,
  Wifi,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_GROUPS } from "@/lib/marketplace/categories";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  insurance: Shield,
  mortgages: Landmark,
  kiwisaver: PiggyBank,
  "financial-planning": LineChart,
  "building-inspections": ClipboardCheck,
  valuations: Calculator,
  surveyors: Ruler,
  plumbers: Droplet,
  electricians: Zap,
  builders: Hammer,
  roofers: Home,
  painters: Paintbrush,
  flooring: Grid2x2,
  "heat-pumps": Thermometer,
  solar: Sun,
  security: Lock,
  insulation: Layers,
  "home-automation": Cpu,
  movers: Truck,
  cleaners: Sparkles,
  "lawn-garden": Trees,
  "pest-control": Bug,
  "waste-removal": Trash2,
  "power-gas": Flame,
  internet: Wifi,
  "water-filtration": Droplets,
};

/**
 * Light, calm icon grid for the authenticated marketplace. Every category
 * is just an icon in a soft violet circle + label — no cards, no borders,
 * no "Coming soon" badges. Active categories get a small green dot so the
 * one or two live services stand out without the grid shouting "empty".
 *
 * Intentionally separate from the public marketplace's CategoryGrid so this
 * redesign never touches the public page.
 */
export function CategoryIconGrid() {
  const categories = CATEGORY_GROUPS.flatMap((g) => g.categories);

  return (
    <div>
      <div className="grid grid-cols-4 gap-x-2 gap-y-5 sm:grid-cols-6 lg:grid-cols-8">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id] ?? Grid2x2;
          const isActive = !category.comingSoon && Boolean(category.href);

          const tile = (
            <>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-violet-light text-violet">
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                {isActive && (
                  <span
                    className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-surface"
                    style={{ backgroundColor: "#16A34A" }}
                    aria-label="Active providers"
                  />
                )}
              </span>
              <span className="mt-1.5 block text-center text-[11px] font-medium leading-tight text-foreground">
                {category.label}
              </span>
            </>
          );

          return category.href ? (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-col items-center transition-opacity hover:opacity-80"
            >
              {tile}
            </Link>
          ) : (
            <div key={category.id} className="flex flex-col items-center">
              {tile}
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-center text-xs text-muted">
        More services added regularly
      </p>
    </div>
  );
}
