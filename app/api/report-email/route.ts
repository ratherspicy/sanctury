import { NextResponse } from "next/server";
import {
  reportReadyHtml,
  reportReadyText,
  type ReportReadyEmailData,
} from "@/lib/email/report-ready-email";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const firstName =
    typeof body.firstName === "string" && body.firstName.trim()
      ? body.firstName.trim()
      : "there";
  const address =
    typeof body.address === "string" && body.address.trim()
      ? body.address.trim()
      : "your property";
  const insuranceGap = Number(body.insuranceGap) || 0;
  const daysUntilRefix = Number(body.daysUntilRefix) || 0;
  const thirdFinding =
    typeof body.thirdFinding === "string" && body.thirdFinding.trim()
      ? body.thirdFinding.trim()
      : "Maintenance: a few items worth planning for";

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Email is best-effort. With no key configured (the current state), we skip
  // sending and report success so the homeowner flow is never blocked.
  if (!apiKey) {
    console.warn("[report-email] RESEND_API_KEY not set — skipping send.");
    return NextResponse.json({ ok: true, skipped: true });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://sanctury-five.vercel.app";
  // Domain may not be verified yet — fall back to Resend's shared sender.
  const from = process.env.RESEND_FROM || "Sanctury <onboarding@resend.dev>";

  const data: ReportReadyEmailData = {
    firstName,
    address,
    insuranceGap,
    daysUntilRefix,
    thirdFinding,
    reportUrl: `${siteUrl}/my-sanctury`,
    siteUrl,
  };

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: `Your Sanctury report is ready, ${firstName}`,
      html: reportReadyHtml(data),
      text: reportReadyText(data),
    });

    if (error) {
      console.error("[report-email] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" });
    }

    return NextResponse.json({ ok: true, sent: true });
  } catch (err) {
    console.error("[report-email] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "exception" });
  }
}
