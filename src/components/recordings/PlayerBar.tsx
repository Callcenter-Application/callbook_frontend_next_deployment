"use client";

import { IconButton } from "@/components/ui/Button";
import { Band } from "@/components/ui/Surface";
import { useCycle } from "@/hooks/useCycle";
import { DownloadIcon, PauseIcon, PlayIcon } from "@/icons";
import { PLAYBACK_SPEEDS } from "@/lib/data/recordings";
import type { Recording } from "@/lib/types";
import { formatClock } from "@/lib/utils";

type Props = { recording: Recording; playing: boolean; onTogglePlay: () => void };

/** Now-playing strip: play/pause, scrubber, speed and download. */
export function PlayerBar({ recording, playing, onTogglePlay }: Props) {
  const [speed, nextSpeed] = useCycle(PLAYBACK_SPEEDS);
  const position = Math.round(recording.secs * 0.33);
  const pct = Math.round((position / recording.secs) * 100);

  return (
    <Band className="flex-nowrap gap-3 overflow-x-auto px-2">
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={playing ? "Pause recording" : "Play recording"}
        className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-full bg-accent text-white"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="flex w-[230px] min-w-0 flex-none flex-col gap-0.5">
        <h2 className="truncate text-base font-semibold">{recording.caller}</h2>
        <span className="truncate text-[13px] text-muted">
          {recording.queue} · {recording.agent} · {recording.date}
        </span>
      </div>
      <span className="flex-none font-mono text-[13px] text-ink-soft">{formatClock(position)}</span>
      <div
        role="slider"
        aria-label="Playback position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="relative h-1.5 min-w-[120px] flex-1 rounded-[3px] bg-white"
      >
        <div className="absolute top-0 left-0 h-1.5 rounded-[3px] bg-accent" style={{ width: `${pct}%` }} />
        <div
          className="absolute -top-[5px] size-4 rounded-full border-2 border-accent bg-white"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <span className="flex-none font-mono text-[13px] text-ink-soft">{recording.length}</span>
      <button
        type="button"
        onClick={nextSpeed}
        aria-label="Playback speed"
        className="h-9 flex-none cursor-pointer rounded-lg bg-white px-3 font-mono text-[13px] font-medium"
      >
        {speed}
      </button>
      <IconButton label="Download recording" className="bg-white">
        <DownloadIcon />
      </IconButton>
    </Band>
  );
}
