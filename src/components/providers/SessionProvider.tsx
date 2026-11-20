"use client";

import { createContext, useState, type ReactNode } from "react";
import { DEMO_USERS } from "@/lib/data/session";
import type { Role, SessionUser } from "@/lib/types";

type SessionValue = { user: SessionUser; setRole: (role: Role) => void; switchRole: () => void };

export const SessionContext = createContext<SessionValue | null>(null);

/** Demo-only session: holds the signed-in role in memory (no auth). */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("supervisor");

  const value: SessionValue = {
    user: DEMO_USERS[role],
    setRole,
    switchRole: () => setRole((r) => (r === "supervisor" ? "operator" : "supervisor")),
  };

  return <SessionContext value={value}>{children}</SessionContext>;
}
