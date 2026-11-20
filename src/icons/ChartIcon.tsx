import { Icon, type IconProps } from "./Icon";

export function ChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 15v-3M12 15V8M17 15v-6" />
    </Icon>
  );
}
