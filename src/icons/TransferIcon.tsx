import { Icon, type IconProps } from "./Icon";

export function TransferIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17 3l4 4-4 4" />
      <path d="M3 7h18" />
      <path d="M7 21l-4-4 4-4" />
      <path d="M21 17H3" />
    </Icon>
  );
}
