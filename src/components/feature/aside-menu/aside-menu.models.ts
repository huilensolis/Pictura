import { ILink } from "@/app/(site)/app/models/nav-links/nav-links.models";

type IAsideHeader = {
  title: string;
  subtitle: string;
};

export type IAsideMenuProps = {
  links: ILink[];
  header?: IAsideHeader;
  showBorderOnLinks?: boolean;
};
