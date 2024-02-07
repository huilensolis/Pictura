import {
  HomeIcon,
  PlusSquare,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from "lucide-react";
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
    title: "Pins",
    href: "/app/pins",
    icon: StarIcon,
  },
  {
    title: "New Post",
    href: "/app/post/new",
    icon: PlusSquare,
  },
  {
    title: "Configuration",
    href: "/app/settings",
    icon: SettingsIcon,
  },
];
