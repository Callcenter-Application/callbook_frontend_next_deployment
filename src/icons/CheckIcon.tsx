import { Icon, type IconProps } from "./Icon";

export function CheckIcon(props: IconProps) {
  return (
    <Icon strokeWidth={2.2} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}
