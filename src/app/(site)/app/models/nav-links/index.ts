import {
  HomeIcon,
  PlusSquare,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from "lucide-react";
import { ILink } from "./nav-links.models";
import { ClientRouting } from "@/models/routing/client";

export const NAV_LINKS: ILink[] = [
  {
    title: "Home",
    href: ClientRouting.app,
    icon: HomeIcon,
  },
  {
    title: "Search",
    href: ClientRouting.post().search.page,
    icon: SearchIcon,
  },
  {
    title: "Pins",
    href: " ",
    icon: StarIcon,
  },
  {
    title: "New Post",
    href: ClientRouting.post().newPost,
    icon: PlusSquare,
  },
  {
    title: "Configuration",
    href: ClientRouting.configuration.home,
    icon: SettingsIcon,
  },
];
