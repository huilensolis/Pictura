import { IArticleProps } from "@/components/ui/article/article.models";
import { ILink } from "./shared.models";

type IAsideHeader = {
  title: string;
  subtitle: string;
};

export type IAsideMenuProps = {
  links: ILink[];
  header: IAsideHeader;
};
