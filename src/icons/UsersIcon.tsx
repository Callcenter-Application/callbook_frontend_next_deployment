import { Icon, type IconProps } from "./Icon";

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0" />
      <path d="M16 3.5a4 4 0 0 1 0 9" />
      <path d="M22 21a7 7 0 0 0-4-6.3" />
    </Icon>
  );
}
