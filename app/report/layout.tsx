import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Home Health Report — Sanctury",
  description:
    "Personalised insights on your insurance cover, mortgage strategy, and property maintenance.",
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
