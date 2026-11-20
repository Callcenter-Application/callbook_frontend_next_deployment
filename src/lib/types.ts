export type Tone =
  | "blue"
  | "sky"
  | "orange"
  | "green"
  | "gray"
  | "red"
  | "indigo"
  | "azure"
  | "teal";

export type Stat = { label: string; value: string; hint?: string };

export type Role = "supervisor" | "operator";

export type SessionUser = { name: string; role: Role; roleLabel: string };

export type CallStatus = "On call" | "Waiting" | "On hold" | "Wrap-up" | "In IVR" | "Ended";

export type LiveCall = {
  caller: string;
  number: string;
  queue: string;
  agent: string;
  duration: string;
  status: CallStatus;
};

export type OperatorCall = {
  type: string;
  caller: string;
  number: string;
  queue: string;
  handle: string;
  hold: string;
  status: CallStatus;
};

export type UserRole = "Administrator" | "Supervisor" | "Agent";
export type Presence = "Active" | "On break" | "Inactive";

export type User = {
  name: string;
  email: string;
  id: string;
  role: UserRole;
  team: string;
  status: Presence;
  lastActive: string;
};

export type Queue = {
  name: string;
  priority: string;
  waiting: number;
  longest: string;
  available: number;
  assigned: number;
  sla: number;
  aht: string;
};

export type ReviewStatus = "Reviewed" | "Pending" | "Flagged";

export type Recording = {
  caller: string;
  number: string;
  agent: string;
  queue: string;
  date: string;
  length: string;
  secs: number;
  review: ReviewStatus;
};
