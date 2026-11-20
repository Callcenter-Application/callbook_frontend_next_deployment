"use client";

import { use } from "react";
import { SessionContext } from "@/components/providers/SessionProvider";

export function useSession() {
  const session = use(SessionContext);
  if (!session) throw new Error("useSession must be used inside <SessionProvider>");
  return session;
}
