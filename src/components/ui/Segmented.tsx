"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Rounded track that groups segment buttons. */
export function SegmentGroup({
  tone = "canvas",
  className,
  ...props
}: ComponentProps<"div"> & { tone?: "canvas" | "surface" }) {
  return (
    <div
      className={cn(
        "flex max-w-full flex-wrap gap-1 rounded-lg p-[3px]",
        tone === "canvas" ? "bg-canvas" : "bg-surface",
        className,
      )}
      {...props}
    />
  );
}

export function SegmentButton({ active, className, ...props }: ComponentProps<"button"> & { active: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-md px-3.5 text-sm transition-colors",
        "focus-visible:outline-2 focus-visible:outline-accent",
        active ? "bg-white font-medium text-ink" : "text-ink-soft hover:text-ink",
        className,
      )}
      {...props}
    />
  );
}

export type SegmentOption<T extends string> = { value: T; label?: ReactNode; count?: number };

type SegmentedControlProps<T extends string> = {
  label: string;
  options: readonly (T | SegmentOption<T>)[];
  value: T;
  onChange: (value: T) => void;
  tone?: "canvas" | "surface";
  /** Render as an ARIA tablist instead of a group of toggle buttons. */
  asTabs?: boolean;
};

/** Single-choice segmented control (time ranges, filters, tabs). */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  tone,
  asTabs = false,
}: SegmentedControlProps<T>) {
  return (
    <SegmentGroup tone={tone} role={asTabs ? "tablist" : "group"} aria-label={label}>
      {options.map((option) => {
        const opt = typeof option === "string" ? { value: option } : option;
        const active = opt.value === value;
        return (
          <SegmentButton
            key={opt.value}
            active={active}
            onClick={() => onChange(opt.value)}
            {...(asTabs ? { role: "tab", "aria-selected": active } : { "aria-pressed": active })}
          >
            {opt.label ?? opt.value}
            {opt.count !== undefined && <span className="font-mono text-xs text-muted">{opt.count}</span>}
          </SegmentButton>
        );
      })}
    </SegmentGroup>
  );
}
