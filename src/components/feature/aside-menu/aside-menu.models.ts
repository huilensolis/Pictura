import { ILink } from "./shared.models";

type IAsideHeader = {
  title: string;
  subtitle: string;
};

interface ITLink extends ILink {
  title?: string;
}

export type IAsideMenuProps = {
  links: ITLink[];
  header?: IAsideHeader;
  showBorderOnLinks?: boolean;
};
