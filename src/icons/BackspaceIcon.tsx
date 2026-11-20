import { Icon, type IconProps } from "./Icon";

export function BackspaceIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 5H9l-7 7 7 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
      <path d="m18 9-6 6M12 9l6 6" />
    </Icon>
  );
}
