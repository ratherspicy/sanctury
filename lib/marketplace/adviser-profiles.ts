import { getQuoteById } from "./insurance-quotes";

export type AdviserReview = {
  firstName: string;
  rating: number;
  comment: string;
};

export type AdviserProfile = {
  id: string;
  name: string;
  title: string;
  region: string;
  initials: string;
  photo?: string;
  yearsExperience: number;
  qualifications: string[];
  insurers: string[];
  specialities: string[];
  bio: string;
  responseRate: string;
  averageResponseTime: string;
  overallRating: number;
  reviewCount: number;
  reviews: AdviserReview[];
};

export const ADVISER_PROFILES: Record<string, AdviserProfile> = {
  "sarah-mitchell": {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    title: "Independent Insurance Adviser",
    region: "Bay of Plenty",
    initials: "SM",
    yearsExperience: 12,
    qualifications: ["Level 5 Financial Adviser NZ", "Certified Insurance Professional"],
    insurers: ["Tower", "AMI", "State", "FMG"],
    specialities: [
      "Home & contents",
      "Rural property",
      "Sum insured reviews",
      "Claims support",
    ],
    bio: "Sarah has spent over a decade helping Bay of Plenty homeowners get the right cover without the hard sell. She specialises in rebuild cost reviews and works with families across Tauranga, Rotorua, and the wider region. Clients value her straight-talking style and willingness to explain policies in plain English.",
    responseRate: "98% response rate",
    averageResponseTime: "Average response: under 1 hour",
    overallRating: 4.9,
    reviewCount: 127,
    reviews: [
      {
        firstName: "Karen",
        rating: 5,
        comment:
          "Sarah explained our underinsurance gap clearly and found us better cover for less than we expected. No pressure, just good advice.",
      },
      {
        firstName: "Mike",
        rating: 5,
        comment:
          "Responsive and thorough. She handled our claim paperwork when our garage flooded — saved us a lot of stress.",
      },
      {
        firstName: "Aroha",
        rating: 5,
        comment:
          "Finally an adviser who doesn't talk jargon. Updated our sum insured after the check and we sleep better at night.",
      },
      {
        firstName: "David",
        rating: 4,
        comment:
          "Took a day to get back to me over a long weekend but the follow-up was excellent. Happy with our new Tower policy.",
      },
    ],
  },
  "james-tauroa": {
    id: "james-tauroa",
    name: "James Tauroa",
    title: "Senior Insurance Broker",
    region: "Auckland",
    initials: "JT",
    yearsExperience: 18,
    qualifications: [
      "Level 5 Financial Adviser NZ",
      "Diploma in Financial Services",
    ],
    insurers: ["Vero", "IAG", "Tower", "AA Insurance", "Ando"],
    specialities: [
      "Premium home cover",
      "Auckland rebuild costs",
      "Multi-property portfolios",
      "Executive home insurance",
    ],
    bio: "James is one of Auckland's most experienced home insurance brokers, with a focus on higher-value properties and clients who want comprehensive cover. He works with Vero Premier and other top-tier products, and is known for building long-term relationships rather than one-off transactions.",
    responseRate: "96% response rate",
    averageResponseTime: "Average response: 1–2 hours",
    overallRating: 4.8,
    reviewCount: 203,
    reviews: [
      {
        firstName: "Priya",
        rating: 5,
        comment:
          "James recommended Vero Premier when our Ponsonby home needed a serious sum insured uplift. Worth every dollar of the premium.",
      },
      {
        firstName: "Tom",
        rating: 5,
        comment:
          "Professional from start to finish. Compared three insurers and laid out the trade-offs without pushing one option.",
      },
      {
        firstName: "Helen",
        rating: 4,
        comment:
          "Very knowledgeable on Auckland building costs. Slightly higher premiums but the cover is genuinely better.",
      },
      {
        firstName: "Raj",
        rating: 5,
        comment:
          "Helped us insure a home with a pool and sleepout — other brokers said it was too complicated. Highly recommend.",
      },
    ],
  },
  "rachel-chen": {
    id: "rachel-chen",
    name: "Rachel Chen",
    title: "Insurance Adviser",
    region: "Wellington",
    initials: "RC",
    yearsExperience: 9,
    qualifications: ["Level 5 Financial Adviser NZ", "Member ANZIIF"],
    insurers: ["AMI", "State", "Tower", "MAS"],
    specialities: [
      "Value-focused cover",
      "First-time homeowners",
      "Wellington weather-tightness",
      "Contents optimisation",
    ],
    bio: "Rachel helps Wellington homeowners find dependable cover at fair prices. She's particularly skilled at balancing sum insured with premium affordability — ideal for clients who want to close coverage gaps without overpaying. Based in the capital, she understands local rebuild trends and body corporate complexities.",
    responseRate: "99% response rate",
    averageResponseTime: "Average response: under 90 minutes",
    overallRating: 4.9,
    reviewCount: 89,
    reviews: [
      {
        firstName: "Sophie",
        rating: 5,
        comment:
          "Rachel found us AMI cover that fixed our underinsurance issue and saved $30 a month versus our old policy. Brilliant.",
      },
      {
        firstName: "James",
        rating: 5,
        comment:
          "Clear, friendly, and fast. She answered every question about excess and natural hazards without making us feel silly.",
      },
      {
        firstName: "Moana",
        rating: 5,
        comment:
          "Used Sanctury to connect with Rachel — the whole process felt modern and easy. Would use again.",
      },
      {
        firstName: "Chris",
        rating: 4,
        comment:
          "Solid advice on our Karori villa. Took time to explain why AMI was the best fit versus cheaper options with gaps.",
      },
    ],
  },
};

export function formatYearsExperience(years: number): string {
  return `${years} years' experience`;
}

export function getAdviserProfile(id: string): AdviserProfile | undefined {
  const profile = ADVISER_PROFILES[id];
  if (!profile) return undefined;

  const quote = getQuoteById(id);
  if (!quote) return profile;

  return {
    ...profile,
    photo: quote.photo,
    initials: quote.initials,
  };
}
