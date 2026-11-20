import type { Recording } from "../types";

export const RECORDINGS: Recording[] = [
  { caller: "Maria Gómez", number: "+57 300 555 0142", agent: "Andrés Pérez", queue: "Billing", date: "Today 09:42", length: "04:12", secs: 252, review: "Reviewed" },
  { caller: "James Carter", number: "+1 305 555 0198", agent: "Camila Rojas", queue: "Tech support", date: "Today 09:15", length: "11:38", secs: 698, review: "Flagged" },
  { caller: "Laura Méndez", number: "+57 315 555 0110", agent: "Camila Rojas", queue: "Sales", date: "Today 08:57", length: "07:30", secs: 450, review: "Pending" },
  { caller: "Daniel Ortiz", number: "+57 301 555 0177", agent: "Felipe Martínez", queue: "Billing", date: "Today 08:31", length: "02:05", secs: 125, review: "Reviewed" },
  { caller: "Sophie Turner", number: "+1 786 555 0123", agent: "Valeria Sánchez", queue: "Retention", date: "Yesterday 17:48", length: "06:44", secs: 404, review: "Pending" },
  { caller: "Carlos Ruiz", number: "+57 320 555 0189", agent: "Andrés Pérez", queue: "Tech support", date: "Yesterday 16:20", length: "09:03", secs: 543, review: "Pending" },
];

export const PLAYBACK_SPEEDS = ["1x", "1.5x", "2x"] as const;
