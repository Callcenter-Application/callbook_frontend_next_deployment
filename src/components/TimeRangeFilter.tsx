"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/Segmented";
import { TIME_RANGES, type TimeRange } from "@/lib/constants";

type Props = { value?: TimeRange; onChange?: (range: TimeRange) => void; defaultValue?: TimeRange };

/** Today / 7 days / 30 days picker. Controlled when `value` is passed. */
export function TimeRangeFilter({ value, onChange, defaultValue = "Today" }: Props) {
  const [internal, setInternal] = useState<TimeRange>(defaultValue);
  const current = value ?? internal;

  return (
    <SegmentedControl
      label="Time range"
      options={TIME_RANGES}
      value={current}
      onChange={(range) => {
        setInternal(range);
        onChange?.(range);
      }}
    />
  );
}
