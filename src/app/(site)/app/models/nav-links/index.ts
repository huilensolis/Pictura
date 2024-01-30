import { HomeIcon, SearchIcon, SettingsIcon, StarIcon } from "lucide-react";
import { ILink } from "./nav-links.models";

// each navLink must start with '/'
export const NAV_LINKS: ILink[] = [
  {
    title: "Home",
    href: "/app",
    icon: HomeIcon,
  },
  {
    title: "Search",
    href: "/app/search",
    icon: SearchIcon,
  },
  {
    title: "My Pins",
    href: "/app/pins",
    icon: StarIcon,
  },
  {
    title: "Configuration",
    href: "/app/settings/section/profile",
    icon: SettingsIcon,
  },
];
