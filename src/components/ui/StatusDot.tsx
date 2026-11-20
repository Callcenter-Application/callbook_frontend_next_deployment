import { cn } from "@/lib/utils";

/** Small colored dot. `color` is a Tailwind bg-* class. */
export function StatusDot({ color, size = "sm" }: { color: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block flex-none rounded-full", size === "sm" ? "size-2" : "size-2.5", color)}
    />
  );
}
