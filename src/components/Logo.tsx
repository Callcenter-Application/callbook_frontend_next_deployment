import { PhoneIcon } from "@/icons";
import { cn } from "@/lib/utils";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <div className="flex items-center gap-2.5">
      <div className={cn("flex items-center justify-center rounded-lg bg-accent text-white", lg ? "size-9" : "size-8")}>
        <PhoneIcon size={lg ? 20 : 18} />
      </div>
      <span className={cn("font-semibold tracking-[-0.01em]", lg ? "text-xl" : "text-lg")}>CallBook</span>
    </div>
  );
}
