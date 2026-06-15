export type StatusKey = "urgent" | "attention" | "good" | "unknown";

export type StatusStyle = {
  border: string;
  bg: string;
  text: string;
  /** Pill label. Empty string = no pill (used by "unknown" so it stays quiet). */
  label: string;
};

/**
 * Exactly four states. The whole point of this map is consistency and,
 * above all, that "unknown" reads QUIET — a light grey border, an almost
 * invisible background, and a muted icon/text colour. It must recede next
 * to "urgent" and "attention", never compete with them.
 */
export const STATUS_STYLES: Record<StatusKey, StatusStyle> = {
  urgent: { border: "#DC2626", bg: "#FEE2E2", text: "#DC2626", label: "Urgent" },
  attention: { border: "#D97706", bg: "#FEF3C7", text: "#D97706", label: "Attention" },
  good: { border: "#16A34A", bg: "#DCFCE7", text: "#16A34A", label: "Good" },
  unknown: { border: "#E5E7EB", bg: "#F9FAFB", text: "#9CA3AF", label: "" },
};

/** Quiet neutral tint for the "unknown" icon circle — barely there. */
export const UNKNOWN_ICON_BG = "#F3F4F6";
