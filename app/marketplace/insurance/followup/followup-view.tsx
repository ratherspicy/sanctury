"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RequestTimeline } from "@/app/marketplace/insurance/components/request-timeline";
import { getAdviserById } from "@/lib/marketplace/advisers";
import {
  loadFollowupState,
  setContactCheck,
  type ContactCheckAnswer,
} from "@/lib/marketplace/followup-storage";
import {
  loadInsuranceJobPosting,
  loadSelectedAdviser,
} from "@/lib/marketplace/insurance-storage";
import {
  buildRequestTimelineSteps,
  getAdviserFirstName,
} from "@/lib/marketplace/request-timeline";

type FollowupPhase = "question" | "yes_success" | "not_yet_message";

export function InsuranceFollowupView() {
  const router = useRouter();
  const [adviserFirstName, setAdviserFirstName] = useState("");
  const [phase, setPhase] = useState<FollowupPhase>("question");
  const [timelineSteps, setTimelineSteps] = useState(
    buildRequestTimelineSteps("", loadFollowupState())
  );

  useEffect(() => {
    const selected = loadSelectedAdviser();
    const posting = loadInsuranceJobPosting();

    if (!selected || !posting) {
      router.replace("/marketplace/insurance");
      return;
    }

    const adviser = getAdviserById(selected);
    if (!adviser) {
      router.replace("/marketplace/insurance");
      return;
    }

    const firstName = getAdviserFirstName(adviser.name);
    setAdviserFirstName(firstName);

    const followup = loadFollowupState();
    if (followup.contactCheck === "yes") {
      setPhase("yes_success");
    } else if (followup.contactCheck === "not_yet") {
      setPhase("not_yet_message");
    }

    setTimelineSteps(buildRequestTimelineSteps(firstName, followup));
  }, [router]);

  const handleAnswer = (answer: ContactCheckAnswer) => {
    const next = setContactCheck(answer);
    setTimelineSteps(buildRequestTimelineSteps(adviserFirstName, next));
    setPhase(answer === "yes" ? "yes_success" : "not_yet_message");
  };

  if (!adviserFirstName) {
    return <p className="text-muted">Loading…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
          24-hour check
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Has {adviserFirstName} been in touch?
        </h1>
        <p className="mt-3 text-lg text-muted">
          Help us keep your request on track and close the loop on your
          experience.
        </p>
      </div>

      {phase === "question" && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => handleAnswer("yes")}
            className="flex w-full items-center justify-center rounded-full bg-brand py-4 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark"
          >
            Yes, we have spoken
          </button>
          <button
            type="button"
            onClick={() => handleAnswer("not_yet")}
            className="flex w-full items-center justify-center rounded-full border border-border bg-surface py-4 text-base font-semibold text-foreground transition-colors hover:border-brand/40 hover:bg-background"
          >
            Not yet
          </button>
        </div>
      )}

      {phase === "yes_success" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:p-8">
            <p className="font-semibold text-foreground">
              Great — glad you connected with {adviserFirstName}.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your timeline has been updated. When you&apos;re ready, share a
              quick review to help other Sanctury homeowners.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Your request timeline
            </h2>
            <RequestTimeline steps={timelineSteps} className="mt-6" />
          </div>

          <Link
            href="/marketplace/insurance/outcome"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark sm:w-auto"
          >
            Leave your review
          </Link>
        </div>
      )}

      {phase === "not_yet_message" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <p className="font-semibold text-foreground">
              No problem — we will follow up with {adviserFirstName} on your
              behalf.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              You should hear from {adviserFirstName} within the next few hours.
              We&apos;ll make sure your request hasn&apos;t been missed.
            </p>
            <p className="mt-4 rounded-xl bg-accent-soft/50 px-4 py-3 text-sm leading-relaxed text-foreground">
              <span className="font-semibold">Reassurance:</span> Sanctury only
              shares your details with the adviser you chose. If you still
              haven&apos;t heard back tomorrow, come back to this page and we&apos;ll
              escalate again.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Your request timeline
            </h2>
            <RequestTimeline steps={timelineSteps} className="mt-6" />
          </div>

          <Link
            href="/marketplace/insurance/confirmed"
            className="text-sm font-medium text-brand underline-offset-2 hover:underline"
          >
            Back to confirmation
          </Link>
        </div>
      )}

      {phase === "question" && (
        <Link
          href="/marketplace/insurance/confirmed"
          className="inline-block text-sm font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
        >
          Back to confirmation
        </Link>
      )}
    </div>
  );
}
