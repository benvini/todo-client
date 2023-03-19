import { CSSProperties, ReactNode } from "react";
import { COLOR } from "shared/Color";

type ColorValue = typeof COLOR[keyof typeof COLOR];
export type ButtonProps = {
  children: ReactNode;
  props?: CSSProperties;
  onClick: () => void;
  color?: ColorValue;
  disabled?: boolean;
};
