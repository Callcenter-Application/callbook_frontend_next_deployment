"use client";

import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/Button";
import { useSession } from "@/hooks/useSession";
import { BellIcon, SearchIcon } from "@/icons";

/** Top bar shared by every panel view. */
export function Header() {
  const { user, switchRole } = useSession();

  return (
    <header className="flex min-h-11 flex-wrap items-center gap-3 border-b border-line px-1 pb-3">
      <label
        htmlFor="global-search"
        className="flex h-10 max-w-[420px] flex-[1_1_260px] items-center gap-2 rounded-lg border border-field bg-white px-3 text-muted focus-within:border-accent"
      >
        <SearchIcon size={16} />
        <span className="sr-only">Search</span>
        <input
          id="global-search"
          type="search"
          placeholder="Search calls, agents, numbers"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none"
        />
      </label>

      <div className="ml-auto flex items-center gap-2">
        <IconButton label="Notifications">
          <BellIcon size={20} />
        </IconButton>
        <button
          type="button"
          onClick={switchRole}
          title="Demo: switch between supervisor and operator"
          className="flex cursor-pointer items-center gap-2.5 rounded-lg py-1 pr-2 pl-2 text-left hover:bg-white/70"
        >
          <Avatar name={user.name} tone="brand" size="sm" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted">{user.roleLabel}</span>
          </span>
        </button>
      </div>
    </header>
  );
}
