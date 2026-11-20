"use client";

import { useState } from "react";

/** Step through a fixed list of values, wrapping at the end. */
export function useCycle<T>(values: readonly T[]) {
  const [index, setIndex] = useState(0);
  return [values[index], () => setIndex((i) => (i + 1) % values.length)] as const;
}
