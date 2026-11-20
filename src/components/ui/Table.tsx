import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Horizontally scrollable table that bleeds to the panel edges. */
export function Table({
  minWidth = 620,
  flush = true,
  className,
  ...props
}: ComponentProps<"table"> & { minWidth?: number; flush?: boolean }) {
  return (
    <div className={cn("overflow-x-auto", flush && "-mx-5 -mb-5 px-5 pb-2")}>
      <table className={cn("w-full border-collapse text-sm", className)} style={{ minWidth }} {...props} />
    </div>
  );
}

const align = { left: "text-left", right: "text-right" } as const;

export function Th({
  align: a = "left",
  className,
  ...props
}: ComponentProps<"th"> & { align?: keyof typeof align }) {
  return (
    <th
      className={cn(
        "border-b border-line px-3 py-2.5 text-xs font-medium tracking-[0.04em] text-muted uppercase first:pl-0 last:pr-0",
        align[a],
        className,
      )}
      {...props}
    />
  );
}

export function Td({
  align: a = "left",
  mono,
  className,
  ...props
}: ComponentProps<"td"> & { align?: keyof typeof align; mono?: boolean }) {
  return (
    <td
      className={cn("border-b border-line-soft px-3 py-3 first:pl-0 last:pr-0", align[a], mono && "font-mono", className)}
      {...props}
    />
  );
}
