import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Light-blue tile used for stats and dashboard cards. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-[10px] bg-tile", className)} {...props} />;
}

/** White main content panel below the page bands. */
export function Panel({ className, ...props }: ComponentProps<"main">) {
  return (
    <main
      className={cn("flex min-w-0 flex-1 flex-col gap-5 rounded-xl border border-line bg-white p-5", className)}
      {...props}
    />
  );
}

/** Blue horizontal strip that holds a page title or a toolbar. */
export function Band({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-[58px] flex-wrap items-center gap-3 rounded-lg border border-surface bg-surface p-1", className)}
      {...props}
    />
  );
}
