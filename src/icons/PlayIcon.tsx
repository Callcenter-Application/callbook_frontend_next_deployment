import { Icon, type IconProps } from "./Icon";

export function PlayIcon(props: IconProps) {
  return (
    <Icon filled {...props}>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z" />
    </Icon>
  );
}
