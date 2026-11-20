"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-7 bg-surface px-4 py-6 lg:sticky lg:top-0 lg:h-screen lg:w-[220px] lg:flex-none">
      <Link href="/home" className="px-2">
        <Logo />
      </Link>

      <nav aria-label="Main" className="-mx-1 flex gap-0.5 overflow-x-auto px-1 lg:flex-col lg:overflow-visible">
        {NAV_ITEMS.map(({ href, label, icon: NavIcon }) => {
          const current = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "flex min-h-11 flex-none items-center gap-2.5 rounded-lg px-3 text-sm whitespace-nowrap transition-colors",
                current
                  ? "bg-white font-medium text-ink shadow-[inset_3px_0_0_var(--color-accent)]"
                  : "text-ink-soft hover:bg-white/60",
              )}
            >
              <NavIcon />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden flex-col gap-1 rounded-[10px] bg-surface-strong px-3 py-3.5 lg:flex">
        <span className="text-xs text-faint">Queue health</span>
        <span className="text-sm font-medium">All queues within SLA</span>
      </div>
    </aside>
  );
}
