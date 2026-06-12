export type MarketplaceCategory = {
  id: string;
  label: string;
  providerCount: number;
  href?: string;
  comingSoon?: boolean;
};

export type CategoryGroup = {
  id: string;
  label: string;
  categories: MarketplaceCategory[];
};

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "financial",
    label: "Financial",
    categories: [
      { id: "insurance", label: "Insurance", providerCount: 3, href: "/marketplace/insurance" },
      { id: "mortgages", label: "Mortgages", providerCount: 4, href: "/marketplace/mortgages" },
      { id: "kiwisaver", label: "KiwiSaver", providerCount: 5, comingSoon: true },
      { id: "financial-planning", label: "Financial Planning", providerCount: 6, comingSoon: true },
    ],
  },
  {
    id: "property",
    label: "Property",
    categories: [
      { id: "building-inspections", label: "Building Inspections", providerCount: 4, comingSoon: true },
      { id: "valuations", label: "Valuations", providerCount: 3, comingSoon: true },
      { id: "surveyors", label: "Surveyors", providerCount: 2, comingSoon: true },
    ],
  },
  {
    id: "trades",
    label: "Trades",
    categories: [
      { id: "plumbers", label: "Plumbers", providerCount: 8, comingSoon: true },
      { id: "electricians", label: "Electricians", providerCount: 7, comingSoon: true },
      { id: "builders", label: "Builders", providerCount: 9, comingSoon: true },
      { id: "roofers", label: "Roofers", providerCount: 4, comingSoon: true },
      { id: "painters", label: "Painters", providerCount: 6, comingSoon: true },
      { id: "flooring", label: "Flooring", providerCount: 3, comingSoon: true },
    ],
  },
  {
    id: "home-systems",
    label: "Home Systems",
    categories: [
      { id: "heat-pumps", label: "Heat Pumps & HVAC", providerCount: 5, comingSoon: true },
      { id: "solar", label: "Solar", providerCount: 3, comingSoon: true },
      { id: "security", label: "Security", providerCount: 4, comingSoon: true },
      { id: "insulation", label: "Insulation", providerCount: 3, comingSoon: true },
      { id: "home-automation", label: "Home Automation", providerCount: 2, comingSoon: true },
    ],
  },
  {
    id: "services",
    label: "Services",
    categories: [
      { id: "movers", label: "Movers & Storage", providerCount: 5, comingSoon: true },
      { id: "cleaners", label: "Cleaners", providerCount: 7, comingSoon: true },
      { id: "lawn-garden", label: "Lawn & Garden", providerCount: 6, comingSoon: true },
      { id: "pest-control", label: "Pest Control", providerCount: 3, comingSoon: true },
      { id: "waste-removal", label: "Waste Removal", providerCount: 2, comingSoon: true },
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    categories: [
      { id: "power-gas", label: "Power & Gas", providerCount: 6, comingSoon: true },
      { id: "internet", label: "Internet & Telecoms", providerCount: 5, comingSoon: true },
      { id: "water-filtration", label: "Water Filtration", providerCount: 2, comingSoon: true },
    ],
  },
];

export type FeaturedProvider = {
  id: string;
  name: string;
  organisation: string;
  tagline: string;
  photo?: string;
  initials: string;
};

export const FEATURED_PROVIDERS: FeaturedProvider[] = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    organisation: "Tower Insurance",
    tagline: "Specialising in Bay of Plenty residential",
    photo: "/avatars/sarah-mitchell.jpg",
    initials: "SM",
  },
  {
    id: "rachel-chen",
    name: "Rachel Chen",
    organisation: "AMI",
    tagline: "Most competitive premiums in the region",
    photo: "/avatars/rachel-chen.jpg",
    initials: "RC",
  },
  {
    id: "kahu-advisers",
    name: "Kahu Advisers",
    organisation: "Mortgage Brokers",
    tagline: "Refix and refinance specialists",
    initials: "KA",
  },
];
