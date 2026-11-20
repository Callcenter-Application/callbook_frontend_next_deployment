import type { CallStatus, Presence, ReviewStatus, Tone, UserRole } from "./types";

export const SLA_TARGET = 80;

export const TIME_RANGES = ["Today", "7 days", "30 days"] as const;
export type TimeRange = (typeof TIME_RANGES)[number];

export const CALL_STATUS_TONE: Record<CallStatus, Tone> = {
  "On call": "blue",
  Waiting: "orange",
  "On hold": "orange",
  "Wrap-up": "green",
  "In IVR": "sky",
  Ended: "gray",
};

export const USER_ROLE_TONE: Record<UserRole, Tone> = {
  Administrator: "indigo",
  Supervisor: "azure",
  Agent: "teal",
};

export const REVIEW_TONE: Record<ReviewStatus, Tone> = {
  Reviewed: "green",
  Pending: "gray",
  Flagged: "red",
};

/** Tailwind background class for presence dots. */
export const PRESENCE_DOT: Record<Presence, string> = {
  Active: "bg-success",
  "On break": "bg-warning",
  Inactive: "bg-offline",
};
