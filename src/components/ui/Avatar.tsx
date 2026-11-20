import { cn, initials } from "@/lib/utils";

const SIZES = {
  xs: "size-7 text-[11px]",
  sm: "size-[34px] text-xs",
  md: "size-10 text-[13px]",
  lg: "size-11 text-[15px]",
} as const;

const TONES = {
  brand: "bg-avatar text-link-hover",
  chip: "bg-chip text-chip-ink",
} as const;

type AvatarProps = {
  name: string;
  /** Override the initials derived from `name`. */
  label?: string;
  size?: keyof typeof SIZES;
  tone?: keyof typeof TONES;
};

export function Avatar({ name, label, size = "sm", tone = "chip" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex flex-none items-center justify-center rounded-full font-semibold", SIZES[size], TONES[tone])}
    >
      {label ?? initials(name)}
    </span>
  );
}
