import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-accent text-white hover:bg-[#256DAB]",
  secondary: "border border-field bg-white text-ink-soft hover:bg-tile",
  subtle: "border border-field bg-white text-link hover:bg-tile",
  outline: "border border-accent bg-white text-link hover:bg-tile",
  light: "bg-white text-link hover:bg-tile",
  danger: "bg-danger text-white hover:bg-[#9A1E14]",
  muted: "bg-line-soft text-muted",
} as const;

const SIZES = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-[18px] text-sm",
  lg: "h-12 px-5 text-[15px] rounded-[10px]",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
type StyleProps = { variant?: ButtonVariant; size?: keyof typeof SIZES };

export function buttonStyles({ variant = "primary", size = "md" }: StyleProps = {}) {
  return cn(
    "inline-flex flex-none cursor-pointer items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed",
    VARIANTS[variant],
    SIZES[size],
  );
}

export function Button({ variant, size, className, type = "button", ...props }: ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

/** Square, borderless icon button (notifications, row actions, backspace…). */
export function IconButton({
  label,
  className,
  ...props
}: Omit<ComponentProps<"button">, "aria-label"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-tile",
        "focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    />
  );
}
