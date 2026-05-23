import type { InsuranceFollowupState } from "./followup-storage";

export type TimelineStepStatus = "completed" | "in_progress" | "pending";

export type RequestTimelineStep = {
  id: string;
  label: string;
  status: TimelineStepStatus;
};

export function getAdviserFirstName(fullName: string): string {
  return fullName.split(" ")[0] ?? fullName;
}

export function getHomeownerFirstName(fullName: string): string {
  return fullName.split(" ")[0] ?? fullName;
}

export function buildRequestTimelineSteps(
  adviserFirstName: string,
  followup: InsuranceFollowupState
): RequestTimelineStep[] {
  const contactConfirmed = followup.contactCheck === "yes";
  const reviewDone = followup.reviewSubmitted;

  return [
    {
      id: "request-sent",
      label: `Request sent to ${adviserFirstName}`,
      status: "completed",
    },
    {
      id: "reviews-details",
      label: `${adviserFirstName} reviews your details`,
      status: contactConfirmed ? "completed" : "in_progress",
    },
    {
      id: "contacts-you",
      label: `${adviserFirstName} contacts you`,
      status: contactConfirmed ? "completed" : "pending",
    },
    {
      id: "your-review",
      label: "You review your experience",
      status: reviewDone ? "completed" : "pending",
    },
  ];
}
