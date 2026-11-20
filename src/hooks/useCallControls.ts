"use client";

import { useState } from "react";

const IDLE = { ivr: false, held: false, muted: false };

/**
 * IVR / hold / mute / end state shared by the supervisor and operator live-call views.
 * Toggles are ignored while `active` is false.
 */
export function useCallControls(active = true) {
  const [state, setState] = useState(IDLE);

  const toggle = (key: keyof typeof IDLE) => () => {
    if (active) setState((s) => ({ ...s, [key]: !s[key] }));
  };

  return {
    ...state,
    active,
    toggleIvr: toggle("ivr"),
    toggleHold: toggle("held"),
    toggleMute: toggle("muted"),
    reset: () => setState(IDLE),
  };
}

export type CallControlsState = ReturnType<typeof useCallControls>;
