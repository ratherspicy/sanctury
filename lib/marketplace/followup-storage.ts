export const INSURANCE_FOLLOWUP_KEY = "sanctury-insurance-followup";

export type ContactCheckAnswer = "yes" | "not_yet";

export type OutcomeChoice = "updated" | "deciding" | "declined";

export type DeclineReason =
  | "too_expensive"
  | "not_right_time"
  | "better_quote"
  | "other";

export type SubmittedReview = {
  rating: number;
  comment: string;
  firstName: string;
};

export type InsuranceFollowupState = {
  contactCheck: ContactCheckAnswer | null;
  outcomeChoice: OutcomeChoice | null;
  reviewSubmitted: boolean;
  submittedReview: SubmittedReview | null;
  declineReason: DeclineReason | null;
};

const DEFAULT_STATE: InsuranceFollowupState = {
  contactCheck: null,
  outcomeChoice: null,
  reviewSubmitted: false,
  submittedReview: null,
  declineReason: null,
};

export function loadFollowupState(): InsuranceFollowupState {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = sessionStorage.getItem(INSURANCE_FOLLOWUP_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveFollowupState(state: InsuranceFollowupState): void {
  sessionStorage.setItem(INSURANCE_FOLLOWUP_KEY, JSON.stringify(state));
}

export function initFollowupState(): InsuranceFollowupState {
  const existing = loadFollowupState();
  if (existing.contactCheck !== null || existing.reviewSubmitted) {
    return existing;
  }
  saveFollowupState({ ...DEFAULT_STATE });
  return { ...DEFAULT_STATE };
}

export function setContactCheck(answer: ContactCheckAnswer): InsuranceFollowupState {
  const next = { ...loadFollowupState(), contactCheck: answer };
  saveFollowupState(next);
  return next;
}

export function setOutcomeChoice(choice: OutcomeChoice): InsuranceFollowupState {
  const next = { ...loadFollowupState(), outcomeChoice: choice };
  saveFollowupState(next);
  return next;
}

export function submitReview(review: SubmittedReview): InsuranceFollowupState {
  const next: InsuranceFollowupState = {
    ...loadFollowupState(),
    outcomeChoice: "updated",
    reviewSubmitted: true,
    submittedReview: review,
  };
  saveFollowupState(next);
  return next;
}

export function submitDeclineReason(reason: DeclineReason): InsuranceFollowupState {
  const next: InsuranceFollowupState = {
    ...loadFollowupState(),
    outcomeChoice: "declined",
    declineReason: reason,
  };
  saveFollowupState(next);
  return next;
}
