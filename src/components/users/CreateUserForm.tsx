"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { CREATE_USER_ROLES } from "@/lib/data/users";
import { cn } from "@/lib/utils";
import { RoleSelect, type CreateRole } from "./RoleSelect";

export function CreateUserForm() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", password: "", confirm: "" });
  const [role, setRole] = useState<CreateRole | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const first = form.firstName.trim();
  const last = form.lastName.trim();
  const mismatch = form.confirm.length > 0 && form.confirm !== form.password;
  const roleTone = CREATE_USER_ROLES.find((r) => r.key === role)?.tone ?? "gray";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/users");
      }}
      className="flex w-full max-w-[560px] flex-col gap-5 rounded-xl border border-line bg-white p-7"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="first-name" label="First name">
          <Input id="first-name" placeholder="e.g. Natalia" value={form.firstName} onChange={set("firstName")} />
        </Field>
        <Field id="last-name" label="Last name">
          <Input id="last-name" placeholder="e.g. Herrera" value={form.lastName} onChange={set("lastName")} />
        </Field>
      </div>

      <Field id="password" label="Password">
        <Input id="password" type="password" placeholder="At least 8 characters" value={form.password} onChange={set("password")} />
      </Field>

      <Field id="confirm-password" label="Confirm password" error={mismatch && "Passwords don't match"}>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Repeat the password"
          value={form.confirm}
          onChange={set("confirm")}
          invalid={mismatch}
        />
      </Field>

      <div className="flex flex-wrap items-start gap-4">
        <RoleSelect value={role} onChange={setRole} />

        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-3.5 rounded-[10px] border border-line bg-tile p-4">
          <span className="text-xs font-medium tracking-[0.04em] text-muted uppercase">User preview</span>
          <div className="flex items-center gap-3">
            <Avatar name={`${first} ${last}`} label={(first[0] ?? "") + (last[0] ?? "") || "?"} size="lg" tone="brand" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className={cn("text-[15px] font-medium", !first && "text-muted")}>{first || "First name"}</span>
              <span className={cn("text-sm", last ? "text-ink-soft" : "text-muted")}>{last || "Last name"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-muted">Role</span>
            <Badge tone={roleTone}>{role ?? "Not selected"}</Badge>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2.5 border-t border-line-soft pt-4">
        <ButtonLink href="/users" variant="secondary">
          Cancel
        </ButtonLink>
        <Button type="submit">Create user</Button>
      </div>
    </form>
  );
}
