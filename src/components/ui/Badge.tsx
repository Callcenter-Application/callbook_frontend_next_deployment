import type { ReactNode } from "react";
import type { Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const TONES: Record<Tone, string> = {
  blue: "bg-[#E3EEF8] text-[#1F4E79]",
  sky: "bg-chip text-chip-ink",
  orange: "bg-[#FCEBD9] text-warning-ink",
  green: "bg-success-soft text-success-ink",
  gray: "bg-line-soft text-muted",
  red: "bg-[#FCE8E6] text-danger",
  indigo: "bg-[#E4E7FA] text-[#353F8F]",
  azure: "bg-[#D6EAFB] text-[#174A7A]",
  teal: "bg-[#DDF2F2] text-[#1D5C5E]",
};

export function Badge({ tone = "gray", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-[26px] flex-none items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
