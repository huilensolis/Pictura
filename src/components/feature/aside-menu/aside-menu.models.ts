import { IRLink } from "./shared.models";

type IAsideHeader = {
  title: string;
  subtitle: string;
};

export type IAsideMenuProps = {
  links: IRLink[];
  header?: IAsideHeader;
  showBorderOnLinks?: boolean;
};
