import { ILink } from "@/app/(site)/app/models/nav-links/nav-links.models";

export type IRLink = Omit<ILink, "title">;
