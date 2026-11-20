import { Icon, type IconProps } from "./Icon";

export function MoreIcon(props: IconProps) {
  return (
    <Icon filled {...props}>
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </Icon>
  );
}
