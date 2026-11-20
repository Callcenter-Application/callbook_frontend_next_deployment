import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  size?: number;
};

type BaseProps = IconProps & { children: React.ReactNode; filled?: boolean };

/** Shared 24×24 SVG wrapper. Stroke icons by default; `filled` for solid glyphs. */
export function Icon({ size = 18, filled = false, strokeWidth = 2, children, ...props }: BaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...(filled
        ? { fill: "currentColor" }
        : {
            fill: "none",
            stroke: "currentColor",
            strokeWidth,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
          })}
      {...props}
    >
      {children}
    </svg>
  );
}
