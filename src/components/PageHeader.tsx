import type { ReactNode } from "react";
import { Band } from "@/components/ui/Surface";

/** Page title band: title + subtitle on the left, actions on the right. */
export function PageHeader({ title, subtitle, children }: { title: string; subtitle: ReactNode; children?: ReactNode }) {
  return (
    <Band>
      <div className="mr-auto flex flex-col gap-0.5 px-1">
        <h1 className="text-[26px] font-semibold tracking-[-0.015em] italic">{title}</h1>
        <span className="text-sm text-muted">{subtitle}</span>
      </div>
      {children}
    </Band>
  );
}
