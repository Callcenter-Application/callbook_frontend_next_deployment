"use client";

import { useState } from "react";
import { CALLS_BY_STATUS } from "@/lib/data/home";
import { cn } from "@/lib/utils";

const R = 76;
const C = 2 * Math.PI * R;
const GAP = 2;
const total = CALLS_BY_STATUS.reduce((sum, d) => sum + d.value, 0);

const segments = CALLS_BY_STATUS.reduce<Array<(typeof CALLS_BY_STATUS)[number] & { dash: string; offset: number; pct: string }>>(
  (acc, d) => {
    const start = acc.reduce((sum, s) => sum + (s.value / total) * C, 0);
    const len = Math.max((d.value / total) * C - GAP, 0);
    acc.push({ ...d, dash: `${len} ${C - len}`, offset: -start, pct: `${Math.round((d.value / total) * 100)}%` });
    return acc;
  },
  [],
);

/** "Calls by status" donut with a hover-linked legend. */
export function StatusDonut() {
  const [hover, setHover] = useState<string | null>(null);
  const hovered = segments.find((s) => s.key === hover);

  return (
    <div className="flex flex-wrap items-center gap-6" onMouseLeave={() => setHover(null)}>
      <figure className="relative size-[200px] flex-none">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          role="img"
          aria-label={`Calls by status: ${segments.map((s) => `${s.label} ${s.value}`).join(", ")}`}
          className="-rotate-90"
        >
          <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-line-soft)" strokeWidth="30" />
          {segments.map((s) => (
            <circle
              key={s.key}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={hover === s.key ? 34 : 30}
              strokeDasharray={s.dash}
              strokeDashoffset={s.offset}
              onMouseEnter={() => setHover(s.key)}
              className="cursor-pointer transition-[stroke-width] duration-100"
            />
          ))}
        </svg>
        <figcaption className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="font-mono text-[32px] font-medium tracking-[-0.02em]">{hovered?.value ?? total}</span>
          <span className="text-[13px] text-muted">{hovered?.label ?? "Active calls"}</span>
        </figcaption>
      </figure>

      <ul className="flex min-w-0 flex-[1_1_160px] flex-col gap-2.5">
        {segments.map((s) => (
          <li
            key={s.key}
            onMouseEnter={() => setHover(s.key)}
            className={cn("flex items-center gap-2.5 rounded-md px-2 py-1.5", hover === s.key && "bg-white")}
          >
            <span className="size-3 flex-none rounded-[3px]" style={{ background: s.color }} />
            <span className="mr-auto text-sm">{s.label}</span>
            <span className="font-mono text-sm font-medium">{s.value}</span>
            <span className="w-10 text-right text-[13px] text-muted">{s.pct}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
