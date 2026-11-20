"use client";

import { OperatorLiveCalls } from "@/components/calls/OperatorLiveCalls";
import { SupervisorLiveCalls } from "@/components/calls/SupervisorLiveCalls";
import { useSession } from "@/hooks/useSession";

/** Picks the live-calls screen for the signed-in role (switch it from the header). */
export function LiveCallsView() {
  const { user } = useSession();
  return user.role === "operator" ? <OperatorLiveCalls /> : <SupervisorLiveCalls />;
}
