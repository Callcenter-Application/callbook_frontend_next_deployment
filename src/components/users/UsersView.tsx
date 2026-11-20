"use client";

import { useState } from "react";
import { PersonCell } from "@/components/Identity";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/Segmented";
import { StatGrid } from "@/components/ui/StatGrid";
import { StatusDot } from "@/components/ui/StatusDot";
import { Panel } from "@/components/ui/Surface";
import { Table, Td, Th } from "@/components/ui/Table";
import { MoreIcon } from "@/icons";
import { PRESENCE_DOT, USER_ROLE_TONE } from "@/lib/constants";
import { USERS } from "@/lib/data/users";
import type { UserRole } from "@/lib/types";
import { countBy } from "@/lib/utils";

type Filter = "All" | UserRole;

const ROLE_GROUPS: Array<{ value: UserRole; label: string }> = [
  { value: "Supervisor", label: "Supervisors" },
  { value: "Agent", label: "Agents" },
  { value: "Administrator", label: "Administrators" },
];

const STATS = [
  { label: "Total users", value: String(USERS.length) },
  ...ROLE_GROUPS.map((g) => ({ label: g.label, value: String(countBy(USERS, "role", g.value)) })),
];

const FILTERS = [
  { value: "All" as Filter, label: "All", count: USERS.length },
  ...ROLE_GROUPS.map((g) => ({ ...g, count: countBy(USERS, "role", g.value) })),
];

export function UsersView() {
  const [filter, setFilter] = useState<Filter>("All");
  const users = filter === "All" ? USERS : USERS.filter((u) => u.role === filter);

  return (
    <Panel>
      <StatGrid stats={STATS} />
      <div className="self-start">
        <SegmentedControl label="Filter by role" tone="surface" options={FILTERS} value={filter} onChange={setFilter} />
      </div>
      <Table minWidth={760}>
        <thead>
          <tr>
            <Th>User</Th>
            <Th>ID</Th>
            <Th>Role</Th>
            <Th>Team</Th>
            <Th>Status</Th>
            <Th>Last active</Th>
            <Th>
              <span className="sr-only">Actions</span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <Td className="py-2.5">
                <PersonCell name={u.name} detail={u.email} />
              </Td>
              <Td mono className="text-[13px] text-ink-soft">
                {u.id}
              </Td>
              <Td>
                <Badge tone={USER_ROLE_TONE[u.role]}>{u.role}</Badge>
              </Td>
              <Td>{u.team}</Td>
              <Td>
                <span className="inline-flex items-center gap-1.5 text-[13px]">
                  <StatusDot color={PRESENCE_DOT[u.status]} />
                  {u.status}
                </span>
              </Td>
              <Td className="text-ink-soft">{u.lastActive}</Td>
              <Td align="right" className="py-1.5">
                <IconButton label={`More actions for ${u.name}`} className="size-9">
                  <MoreIcon />
                </IconButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Panel>
  );
}
