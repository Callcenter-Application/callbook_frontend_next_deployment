import type { Role, SessionUser } from "../types";

export const DEMO_USERS: Record<Role, SessionUser> = {
  supervisor: { name: "Luis Reyes", role: "supervisor", roleLabel: "Supervisor" },
  operator: { name: "Erick Marcano", role: "operator", roleLabel: "Operator" },
};
