type IAsideHeader = {
  title: string;
  subtitle: string;
};

export type AsideBaseProps = {
  header?: IAsideHeader;
  showBorderOnLinks?: boolean;
};
