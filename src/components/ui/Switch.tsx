"use client";

import { cn } from "@/lib/utils";

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "flex h-[26px] w-11 flex-none cursor-pointer items-center rounded-full p-[3px] transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        checked ? "justify-end bg-accent" : "justify-start bg-field",
      )}
    >
      <span className="size-5 rounded-full bg-white shadow-[0_1px_2px_rgba(16,39,61,.25)]" />
    </button>
  );
}
