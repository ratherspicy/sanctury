import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Marketplace — Sanctury",
  description:
    "Get free proposals from verified insurance advisers to review your home cover.",
};

export default function InsuranceMarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
