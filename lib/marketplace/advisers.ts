import { formatCurrency } from "@/lib/format";

export type InsuranceAdviser = {
  id: string;
  name: string;
  title: string;
  region: string;
  initials: string;
  responseTime: string;
  rating: number;
  reviewCount: number;
  getProposal: (gap: number, region: string, sumInsured: number) => string[];
};

export const INSURANCE_ADVISERS: InsuranceAdviser[] = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    title: "Independent Insurance Adviser",
    region: "Bay of Plenty",
    initials: "SM",
    responseTime: "Usually responds within 1 hour",
    rating: 4.9,
    reviewCount: 127,
    getProposal: (gap, region, sumInsured) => [
      `I've reviewed your Sanctury Home Health Check and can see a potential coverage gap of ${formatCurrency(gap)} for your ${region} property. With building costs continuing to rise across the Bay of Plenty, this is a common situation — and one that's straightforward to address with the right policy review.`,
      `Based on your current sum insured of ${formatCurrency(sumInsured)}, I'd recommend a structured review with two or three insurers to find cover that reflects today's rebuild costs. As an independent adviser, I'm not tied to any single insurer — my role is to find you the best fit at a fair premium.`,
      `I can walk you through exactly what's covered, what's not, and how to close the gap without overpaying. There's no cost to you for this advice — I'm paid by the insurer you choose. Happy to have an initial chat this week at a time that suits you.`,
    ],
  },
  {
    id: "james-tauroa",
    name: "James Tauroa",
    title: "Senior Insurance Broker",
    region: "Auckland",
    initials: "JT",
    responseTime: "Usually responds within 2 hours",
    rating: 4.8,
    reviewCount: 203,
    getProposal: (gap, region, sumInsured) => [
      `Your report shows you may be underinsured by around ${formatCurrency(gap)} — that's a meaningful gap, and it's worth acting on before the next renewal. Auckland rebuild costs have moved significantly in the past few years, and many homeowners are in a similar position to you.`,
      `With your current cover at ${formatCurrency(sumInsured)}, I can compare options across multiple insurers to find a sum insured that properly protects your home. I'll also check whether your policy covers the features you've listed — garages, decks, and pools often need explicit inclusion.`,
      `I'll prepare a clear comparison showing premium options at different cover levels, so you can make an informed choice. This service is completely free to you as a homeowner. Let me know a good time to call — I typically respond within a couple of hours.`,
    ],
  },
  {
    id: "rachel-chen",
    name: "Rachel Chen",
    title: "Insurance Adviser",
    region: "Wellington",
    initials: "RC",
    responseTime: "Usually responds within 90 minutes",
    rating: 4.9,
    reviewCount: 89,
    getProposal: (gap, region, sumInsured) => [
      `Thanks for sharing your Home Health Check results. The ${formatCurrency(gap)} coverage gap flagged in your report is something I see regularly with Wellington properties — especially where sum insured hasn't been updated in a few years.`,
      `You're currently insured for ${formatCurrency(sumInsured)}, and I'd like to help you understand whether that's enough for a full rebuild in today's market. I'll review your property details, features, and region-specific rebuild costs to recommend an appropriate level of cover.`,
      `My approach is simple: explain your options clearly, handle the insurer conversations, and make sure you're not paying for cover you don't need. There's no fee to you — I'm remunerated by whichever insurer you select. I look forward to helping you get this sorted.`,
    ],
  },
];

export function getAdviserById(id: string): InsuranceAdviser | undefined {
  return INSURANCE_ADVISERS.find((a) => a.id === id);
}
