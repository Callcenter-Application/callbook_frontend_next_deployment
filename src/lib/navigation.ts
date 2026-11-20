import type { ComponentType } from "react";
import {
  ActivityIcon,
  ChartIcon,
  HomeIcon,
  ListIcon,
  MicIcon,
  SettingsIcon,
  UsersIcon,
  type IconProps,
} from "@/icons";

export type NavItem = { href: string; label: string; icon: ComponentType<IconProps> };

export const NAV_ITEMS: NavItem[] = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/live-calls", label: "Live calls IVR", icon: ActivityIcon },
  { href: "/users", label: "Users", icon: UsersIcon },
  { href: "/queues", label: "Queues", icon: ListIcon },
  { href: "/recordings", label: "Recordings", icon: MicIcon },
  { href: "/reports", label: "Reports", icon: ChartIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];
