import type { Queue } from "../types";

export const QUEUES: Queue[] = [
  { name: "Billing", priority: "Priority 1 · Spanish, English", waiting: 2, longest: "01:05", available: 2, assigned: 6, sla: 92, aht: "04:58" },
  { name: "Tech support", priority: "Priority 1 · Spanish, English", waiting: 3, longest: "02:41", available: 0, assigned: 7, sla: 74, aht: "07:12" },
  { name: "Sales", priority: "Priority 2 · Spanish", waiting: 1, longest: "00:38", available: 1, assigned: 5, sla: 88, aht: "05:20" },
  { name: "Retention", priority: "Priority 2 · Spanish", waiting: 1, longest: "00:52", available: 1, assigned: 3, sla: 81, aht: "06:05" },
  { name: "Collections", priority: "Priority 3 · Spanish", waiting: 0, longest: "—", available: 0, assigned: 1, sla: 85, aht: "04:40" },
];
