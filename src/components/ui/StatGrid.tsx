import type { Stat } from "@/lib/types";
import { Card } from "./Surface";

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex flex-col gap-1.5 px-4 py-3.5">
          <span className="text-[13px] text-muted">{stat.label}</span>
          <span className="font-mono text-[26px] font-medium tracking-[-0.02em]">{stat.value}</span>
          {stat.hint && <span className="text-xs text-muted">{stat.hint}</span>}
        </Card>
      ))}
    </div>
  );
}
