import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Health Check — Sanctury",
  description:
    "Tell us about your property, insurance, and mortgage to understand your home's financial health.",
};

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
