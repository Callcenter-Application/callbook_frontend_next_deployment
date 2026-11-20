import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeader({ id, title, action }: { id?: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 id={id} className="text-base font-semibold">
        {title}
      </h2>
      {action}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-link hover:text-link-hover">
      {children}
    </Link>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <span className="text-[13px] text-muted">{children}</span>;
}
