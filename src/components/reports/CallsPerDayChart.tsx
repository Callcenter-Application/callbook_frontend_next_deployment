"use client";

import { useState } from "react";
import { Hint, SectionHeader } from "@/components/ui/SectionHeader";
import { CALLS_PER_DAY } from "@/lib/data/reports";
import { cn } from "@/lib/utils";

const MAX = 400;
const HEIGHT = 200;
const total = CALLS_PER_DAY.reduce((sum, d) => sum + d.value, 0);

export function CallsPerDayChart() {
  const [hover, setHover] = useState<number | null>(null);
  const hovered = hover === null ? null : CALLS_PER_DAY[hover];

  return (
    <>
      <SectionHeader
        id="volume-title"
        title="Calls per day"
        action={<Hint>{hovered ? `${hovered.day}: ${hovered.value} calls` : `${total.toLocaleString("en-US")} calls this week`}</Hint>}
      />
      <div
        role="img"
        aria-label={`Calls per day: ${CALLS_PER_DAY.map((d) => `${d.day} ${d.value}`).join(", ")}`}
        className="relative flex gap-2.5 border-b border-field pl-9"
        style={{ height: HEIGHT }}
        onMouseLeave={() => setHover(null)}
      >
        {[400, 200, 0].map((v) => (
          <div
            key={v}
            className="absolute right-0 left-9 border-t border-dashed border-line"
            style={{ top: (1 - v / MAX) * HEIGHT }}
          >
            <span className="absolute -top-2 -left-9 font-mono text-[11px] text-muted">{v}</span>
          </div>
        ))}
        {CALLS_PER_DAY.map((d, i) => {
          const h = Math.round((d.value / MAX) * HEIGHT);
          return (
            <div key={d.day} onMouseEnter={() => setHover(i)} className="relative flex flex-1 flex-col items-center justify-end">
              {hover === i && (
                <span className="absolute font-mono text-xs font-medium" style={{ top: HEIGHT - h - 18 }}>
                  {d.value}
                </span>
              )}
              <div
                className={cn("w-full max-w-10 rounded-t bg-accent transition-opacity", hover !== null && hover !== i && "opacity-45")}
                style={{ height: h }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-2.5 pl-9">
        {CALLS_PER_DAY.map((d) => (
          <span key={d.day} className="flex-1 text-center text-xs text-muted">
            {d.day}
          </span>
        ))}
      </div>
    </>
  );
}
