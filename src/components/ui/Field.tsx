import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-lg border bg-white text-sm text-ink placeholder:text-muted/80 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

export function fieldStyles(invalid = false) {
  return cn(control, invalid ? "border-danger" : "border-field");
}

export function Label(props: ComponentProps<"label">) {
  return <label className="text-[13px] font-medium text-ink-soft" {...props} />;
}

export function Input({ invalid, className, ...props }: ComponentProps<"input"> & { invalid?: boolean }) {
  return <input className={cn(fieldStyles(invalid), "h-11 px-3", className)} {...props} />;
}

export function Select({
  options,
  compact,
  className,
  ...props
}: ComponentProps<"select"> & { options: readonly string[]; compact?: boolean }) {
  return (
    <select className={cn(fieldStyles(), compact ? "h-10 w-auto" : "h-11", "px-2.5", className)} {...props}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

/** Label + control + optional error, stacked. */
export function Field({
  id,
  label,
  error,
  aside,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  error?: ReactNode;
  /** Extra content on the label row (e.g. "Forgot password?"). */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {aside}
      </div>
      {children}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
