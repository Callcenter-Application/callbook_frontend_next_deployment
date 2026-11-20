import { Avatar } from "@/components/ui/Avatar";

/** Caller name with their phone number underneath (tables). */
export function CallerCell({ caller, number }: { caller: string; number: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-medium">{caller}</span>
      <span className="font-mono text-xs text-muted">{number}</span>
    </div>
  );
}

/** Avatar + name (+ optional secondary line). */
export function PersonCell({ name, detail, size = "sm" }: { name: string; detail?: string; size?: "xs" | "sm" }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar name={name} size={size} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-medium">{name}</span>
        {detail && <span className="text-xs text-muted">{detail}</span>}
      </div>
    </div>
  );
}
