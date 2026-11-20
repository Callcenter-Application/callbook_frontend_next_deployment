import type { Stat } from "../types";

export const HOME_STATS: Stat[] = [
  { label: "Calls today", value: "312" },
  { label: "Answered", value: "94%" },
  { label: "Avg. wait", value: "01:32" },
  { label: "Agents online", value: "18/22" },
];

export const CALLS_BY_STATUS = [
  { key: "oncall", label: "On call", value: 14, color: "#2B7BC0" },
  { key: "waiting", label: "Waiting", value: 7, color: "#D97A1E" },
  { key: "hold", label: "On hold", value: 3, color: "#47A6E8" },
];

export const TEAM_STATUS = [
  { label: "On call", value: 14, dot: "bg-accent" },
  { label: "Available", value: 4, dot: "bg-success" },
  { label: "On break", value: 2, dot: "bg-warning" },
  { label: "Offline", value: 2, dot: "bg-offline" },
];
