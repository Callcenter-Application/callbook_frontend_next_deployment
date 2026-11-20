import { SLA_TARGET } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Service-level progress bar with the target marker. */
export function SlaBar({ name, value, muted = false, className }: { name: string; value: number; muted?: boolean; className?: string }) {
  return (
    <div
      title={`${name}: ${value}% answered within target`}
      className={cn("relative h-2 rounded bg-surface", className)}
    >
      <div className={cn("h-2 rounded", muted ? "bg-[#9DB3C7]" : "bg-accent")} style={{ width: `${value}%` }} />
      <div className="absolute -top-[3px] h-3.5 w-0.5 rounded-[1px] bg-ink-soft" style={{ left: `${SLA_TARGET}%` }} />
    </div>
  );
}
