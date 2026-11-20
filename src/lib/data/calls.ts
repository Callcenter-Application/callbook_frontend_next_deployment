import type { LiveCall, OperatorCall, Stat } from "../types";

export const LIVE_CALLS: LiveCall[] = [
  { caller: "Maria Gómez", number: "+57 300 555 0142", queue: "Billing", agent: "Andrés P.", duration: "04:12", status: "On call" },
  { caller: "James Carter", number: "+1 305 555 0198", queue: "Tech support", agent: "—", duration: "01:47", status: "Waiting" },
  { caller: "Laura Méndez", number: "+57 315 555 0110", queue: "Sales", agent: "Camila R.", duration: "07:30", status: "On hold" },
  { caller: "Daniel Ortiz", number: "+57 301 555 0177", queue: "Billing", agent: "Felipe M.", duration: "02:05", status: "On call" },
  { caller: "Sophie Turner", number: "+1 786 555 0123", queue: "Retention", agent: "Valeria S.", duration: "00:42", status: "Wrap-up" },
  { caller: "Carlos Ruiz", number: "+57 320 555 0189", queue: "Tech support", agent: "—", duration: "00:58", status: "Waiting" },
];

export const SUPERVISOR_CALL_STATS: Stat[] = [
  { label: "Active calls", value: "24" },
  { label: "In queue", value: "7" },
  { label: "Avg. wait", value: "01:32" },
  { label: "Agents online", value: "18/22" },
];

export const OPERATOR_CALL_STATS: Stat[] = [
  { label: "Calls handled today", value: "18" },
  { label: "Avg. handle time", value: "05:42" },
  { label: "Avg. hold time", value: "00:48" },
  { label: "Transfers", value: "3" },
];

/** First entry is the operator's current call; its status is driven by call controls. */
export const OPERATOR_CALLS: OperatorCall[] = [
  { type: "Current call · Inbound", caller: "Maria Gómez", number: "+57 300 555 0142", queue: "Billing", handle: "15:35", hold: "01:10", status: "On call" },
  { type: "Outbound call", caller: "James Carter", number: "+1 305 555 0198", queue: "Tech support", handle: "02:14", hold: "00:30", status: "On hold" },
];

export const DIAL_KEYS: Array<[digit: string, letters: string]> = [
  ["1", ""], ["2", "ABC"], ["3", "DEF"],
  ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
  ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"],
  ["*", ""], ["0", "+"], ["#", ""],
];
