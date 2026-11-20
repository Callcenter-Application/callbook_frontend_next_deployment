"use client";

import { useState } from "react";

const MAX_DIGITS = 20;

export function useDialer() {
  const [digits, setDigits] = useState("");

  return {
    digits,
    press: (digit: string) => setDigits((d) => (d + digit).slice(0, MAX_DIGITS)),
    type: (value: string) => setDigits(value.replace(/[^0-9*#+]/g, "").slice(0, MAX_DIGITS)),
    backspace: () => setDigits((d) => d.slice(0, -1)),
  };
}
