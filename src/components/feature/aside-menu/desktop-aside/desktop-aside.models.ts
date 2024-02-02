import { AsideBaseProps } from "../models/aside.models";
import { IRLink } from "../../nav/models";

export interface DesktopAsideProps extends AsideBaseProps {
  links: IRLink[];
}
