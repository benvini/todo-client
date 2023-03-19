import { CSSProperties, ReactNode } from "react";

export type ContainerProps = {
  props?: CSSProperties;
};

export type TitleProps = {
  children: ReactNode;
  props?: CSSProperties;
};
