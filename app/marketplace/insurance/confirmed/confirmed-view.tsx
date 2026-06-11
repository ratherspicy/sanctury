"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdviserLeadNotification } from "@/app/marketplace/insurance/components/adviser-lead-notification";
import { RequestTimeline } from "@/app/marketplace/insurance/components/request-timeline";
import { getAdviserById } from "@/lib/marketplace/advisers";
import { initFollowupState, loadFollowupState } from "@/lib/marketplace/followup-storage";
import {
  loadInsuranceJobPosting,
  loadSelectedAdviser,
  type InsuranceJobPosting,
} from "@/lib/marketplace/insurance-storage";
import {
  buildRequestTimelineSteps,
  getAdviserFirstName,
} from "@/lib/marketplace/request-timeline";
import { loadHomeownerContact } from "@/lib/storage/homeowner";

export function InsuranceConfirmedView() {
  const router = useRouter();
  const [adviserId, setAdviserId] = useState<string | null>(null);
  const [contact, setContact] = useState<{ name: string; email: string } | null>(
    null
  );
  const [posting, setPosting] = useState<InsuranceJobPosting | null>(null);

  useEffect(() => {
    const selected = loadSelectedAdviser();
    const jobPosting = loadInsuranceJobPosting();

    if (!selected || !jobPosting) {
      router.replace("/marketplace/insurance");
      return;
    }

    initFollowupState();
    setAdviserId(selected);
    setPosting(jobPosting);
    setContact(
      loadHomeownerContact() ?? {
        name: "Your name on file",
        email: "your@email.com",
      }
    );
  }, [router]);

  const adviser = adviserId ? getAdviserById(adviserId) : null;
  const followup = loadFollowupState();
  const adviserFirstName = adviser ? getAdviserFirstName(adviser.name) : "";

  if (!adviser || !contact || !posting) {
    return <p className="text-muted">Confirming your selection…</p>;
  }

  const timelineSteps = buildRequestTimelineSteps(adviserFirstName, followup);

  return (
    <div className="space-y-8">
      <div>
        <p className="badge-success gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Request confirmed
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You&apos;re all set — {adviser.name} will be in touch
        </h1>
        <p className="mt-3 text-lg text-muted">
          Your adviser will contact you within{" "}
          <span className="font-semibold text-foreground">2 hours</span>.
        </p>
      </div>

      <article className="card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-lg font-bold text-white">
            {adviser.initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {adviser.name}
            </h2>
            <p className="text-sm text-muted">{adviser.title}</p>
            <p className="mt-1 text-sm text-muted">{adviser.region}</p>
            <span className="mt-3 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              {adviser.responseTime}
            </span>
          </div>
        </div>
      </article>

      <div className="card p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">
          Your request timeline
        </h2>
        <p className="mt-1 text-sm text-muted">
          Track what happens next from here.
        </p>
        <RequestTimeline steps={timelineSteps} className="mt-6" />
      </div>

      <AdviserLeadNotification
        adviserFirstName={adviserFirstName}
        adviserInitials={adviser.initials}
        homeownerName={contact.name}
        posting={posting}
      />

      <div className="card p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">
          Details shared with {adviser.name}
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-muted">Name</dt>
            <dd className="font-medium text-foreground">{contact.name}</dd>
          </div>
          <div>
            <dt className="text-muted">Email</dt>
            <dd className="font-medium text-foreground">{contact.email}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted">
          Only {adviser.name} receives your contact details. No other advisers
          on Sanctury can see your information.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-bg-secondary px-5 py-4">
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">The Sanctury promise:</span>{" "}if you
          haven&apos;t heard from {adviser.name}{" "}within 24 hours, we&apos;ll
          follow up on your behalf to make sure you&apos;re taken care of.
        </p>
      </div>

      <p className="text-sm text-muted">
        <Link
          href="/marketplace/insurance/followup"
          className="font-medium text-violet underline-offset-2 hover:underline"
        >
          Come back here after {adviserFirstName} contacts you to complete your
          review.
        </Link>
      </p>

      <Link
        href="/report"
        className="btn-violet h-12 px-8 text-base"
      >
        Back to your report
      </Link>
    </div>
  );
}
