import { ILink } from "@/app/(site)/app/models/nav-links/nav-links.models";
import { AsideBaseProps } from "../models/aside.models";

export interface MobileAsideProps extends AsideBaseProps {
  links: ILink[];
}
