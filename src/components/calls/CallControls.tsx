"use client";

import { Button } from "@/components/ui/Button";
import { SegmentButton, SegmentGroup } from "@/components/ui/Segmented";
import { StatusDot } from "@/components/ui/StatusDot";
import type { CallControlsState } from "@/hooks/useCallControls";

type Props = { controls: CallControlsState; duration: string; onEnd: () => void };

/** IVR, hold, mute, end call and live duration (supervisor + operator). */
export function CallControls({ controls, duration, onEnd }: Props) {
  const { active, ivr, held, muted } = controls;
  const dot = !active ? "bg-offline" : held ? "bg-warning" : "bg-success";

  return (
    <>
      <Button variant={ivr ? "primary" : "outline"} aria-pressed={ivr} onClick={controls.toggleIvr} disabled={!active}>
        IVR
      </Button>
      <SegmentGroup role="group" aria-label="Call controls">
        <SegmentButton active={held} aria-pressed={held} onClick={controls.toggleHold} disabled={!active}>
          {held ? "Resume" : "Hold"}
        </SegmentButton>
        <SegmentButton active={muted} aria-pressed={muted} onClick={controls.toggleMute} disabled={!active}>
          {muted ? "Unmute" : "Mute"}
        </SegmentButton>
      </SegmentGroup>
      <Button variant={active ? "danger" : "muted"} onClick={onEnd} disabled={!active}>
        End call
      </Button>
      <span className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-3.5 text-sm text-ink-soft">
        <StatusDot color={dot} />
        Duration
        <span className="font-mono font-medium text-ink">{duration}</span>
      </span>
    </>
  );
}
