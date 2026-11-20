"use client";

import { Button, IconButton } from "@/components/ui/Button";
import { useDialer } from "@/hooks/useDialer";
import { BackspaceIcon, PhoneIcon } from "@/icons";
import { DIAL_KEYS } from "@/lib/data/calls";

export function Dialer({ callLabel }: { callLabel: string }) {
  const { digits, press, type, backspace } = useDialer();

  return (
    <aside
      aria-label="Dialer"
      className="flex max-w-[340px] flex-[1_1_280px] flex-col gap-4 rounded-xl border border-line bg-white p-5"
    >
      <div className="flex flex-col gap-1.5 rounded-[10px] bg-surface px-4 py-3.5">
        <label htmlFor="dial-input" className="text-xs font-medium tracking-[0.04em] text-ink-soft uppercase">
          Number or extension
        </label>
        <div className="flex items-center gap-2">
          <input
            id="dial-input"
            type="tel"
            placeholder="Dial…"
            value={digits}
            onChange={(e) => type(e.target.value)}
            className="h-10 min-w-0 flex-1 bg-transparent font-mono text-[22px] font-medium tracking-[0.04em] outline-none"
          />
          <IconButton label="Delete last digit" onClick={backspace}>
            <BackspaceIcon size={22} />
          </IconButton>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {DIAL_KEYS.map(([digit, letters]) => (
          <button
            key={digit}
            type="button"
            aria-label={`Dial ${digit}`}
            onClick={() => press(digit)}
            className="flex h-[52px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[10px] border border-line bg-tile hover:bg-surface"
          >
            <span className="font-mono text-xl leading-none font-medium">{digit}</span>
            <span className="min-h-2.5 text-[10px] leading-none tracking-[0.12em] text-muted">{letters}</span>
          </button>
        ))}
      </div>

      <Button size="lg">
        <PhoneIcon />
        {callLabel}
      </Button>
    </aside>
  );
}
