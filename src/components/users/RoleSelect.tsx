"use client";

import { useState } from "react";
import { StatusDot } from "@/components/ui/StatusDot";
import { ChevronDownIcon } from "@/icons";
import { CREATE_USER_ROLES } from "@/lib/data/users";
import { cn } from "@/lib/utils";

export type CreateRole = (typeof CREATE_USER_ROLES)[number]["key"];

/** Custom listbox for picking the new user's role. */
export function RoleSelect({ value, onChange }: { value: CreateRole | null; onChange: (role: CreateRole) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-1.5">
      <span id="role-label" className="text-[13px] font-medium text-ink-soft">
        Role
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="role-label"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 cursor-pointer items-center justify-between rounded-lg border border-field bg-white px-3 text-left text-sm",
          value ? "text-ink" : "text-muted",
        )}
      >
        {value ?? "Select a role"}
        <ChevronDownIcon size={16} className={cn("text-ink-soft transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div
          role="listbox"
          aria-labelledby="role-label"
          className="flex flex-col gap-0.5 rounded-lg border border-line bg-white p-1 shadow-[0_6px_16px_rgba(16,39,61,0.08)]"
        >
          {CREATE_USER_ROLES.map((role) => {
            const selected = value === role.key;
            return (
              <button
                key={role.key}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(role.key);
                  setOpen(false);
                }}
                className={cn(
                  "flex h-11 cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-left text-sm",
                  selected ? "bg-surface font-medium" : "hover:bg-tile",
                )}
              >
                <StatusDot color={role.dot} size="md" />
                {role.key}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
